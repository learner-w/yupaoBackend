<template>
  <div
      id="teamCardList"
  >
  <van-card
      v-for="team in props.teamList"
      :desc="team.description"
      thumb="https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/shayu931/shayu.png"
      :title="`${team.name} `"
  >
    <template #tags>
      <van-tag plain type="danger" style="margin-right: 8px; margin-top: 8px" >
        {{
          teamStatusEnum[team.status]
        }}
      </van-tag>
    </template>
    <template #bottom>
      <div>
        {{'已加入人数' + team.hasJoinNum}}
      </div>
      <div>
        {{'最大人数' + team.maxNum}}
      </div>
      <div>
        {{'过期时间' + team.expireTime}}
      </div>
      <div>
        {{'创建时间' + team.createTime}}
      </div>
    </template>
    <template #footer>
      <van-button v-if="team.userId !== currentUser?.id && !team.hasJoin" size="mini" plain type="primary" @click="preJoinTeam(team)">加入队伍</van-button>
      <van-button v-if="team.hasJoin" size="mini" plain type="warning" @click="doQuitTeam(team.id)">退出队伍</van-button>
      <!--todo 仅在队伍内显示退出按钮-->
      <van-button v-if="team.userId == currentUser?.id" size="mini" plain type="danger" @click="doDeleteTeam(team.id)">解散队伍</van-button>
      <van-button v-if="team.userId == currentUser?.id" size="mini" plain type="primary" @click="doUpdateTeam(team.id)">更新队伍</van-button>
    </template>
  </van-card>
  </div>
  <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button @confirm="doJoinTeam"
              @cancel="doJoinCancel">
    <van-field v-model="password" placeholder="请输入密码"/>
  </van-dialog>
</template>

<script setup lang="ts">
import {TeamType} from "../models/team";
import {teamStatusEnum} from "../constants/team";
import myAxios from "../plugins/myAxios";
import {Dialog, Toast} from "vant";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user";
import {useRouter} from "vue-router";

interface TeamCardListProps{
  teamList: TeamType[];
}
const props = withDefaults(defineProps<TeamCardListProps>(), {
  // @ts-ignore
  teamList: [] as TeamType[],
});

const currentUser = ref({});
const showPasswordDialog = ref(false);
const password = ref('');
const joinTeamId = ref(0);
const router = useRouter();

const VanDialog = Dialog.Component;
//获取用户信息
onMounted(async () =>{
  currentUser.value = await getCurrentUser();
})

const preJoinTeam = (team: TeamType) => {
  joinTeamId.value = team.id;
  if (team.status === 0) {
    doJoinTeam()
  } else {
    showPasswordDialog.value = true;
  }
}

const doJoinCancel = () => {
  joinTeamId.value = 0;
  password.value = '';
}

/**
 * 加入队伍
 */
const doJoinTeam = async () => {
  if (!joinTeamId.value) {
    return;
  }
  const res = await myAxios.post('/team/join', {
    teamId: joinTeamId.value,
    password: password.value
  })
  if (res?.data != null) {
    Toast.success('加入成功');
    doJoinCancel();
  } else {
    Toast('加入失败--'  + res?.description);
  }
}


//队伍列表加入队伍
const doQuitTeam = async(id: number) =>{
  const res = await myAxios.post("/team/quit",{
    teamId : id
  });

  if (res.data != null){
    Toast.success("退出成功");
    console.log(res.data);
  }else {
    Toast("退出失败");
  }
}
//队伍列表加入队伍
const doDeleteTeam = async(id: number) =>{
  const res = await myAxios.post("/team/delete",{
    teamId : id
  });
  if (res.data != null){
    Toast.success("解散成功");
  }else {
    Toast("解散失败");
  }
}

const doUpdateTeam = (id: number) =>{
  router.push({
    path: "/team/update",
    query:{
      id,
    }
  })
}




</script>

<style scoped>
#teamCardList :deep(.van-image__img){
  height: 128px;
  object-fit: unset;
}
</style>