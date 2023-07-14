<template>
  <div id="teamPage">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索队伍关键词"
        @search="onSearch"
    >
      <template #action>
        <div @click="onClickButton">搜索</div>
      </template>
    </van-search>
    <van-tabs v-model:active="active" @change="onTabChange" >
      <van-tab title="公开" name="public"/>
      <van-tab title="加密" name="private"/>
    </van-tabs>
    <team-card-list :team-list = "teamList"/>
    <van-empty v-if="teamList.length < 1 " description="数据为空"/>

    <van-button class="add-button" type="primary"  icon="plus" @click="doAddTeam" />

  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {Toast} from "vant";
import TeamCardList from "../components/TeamCardList.vue";


const router = useRouter();
const active = ref('public')

const onTabChange = (name) =>{
  if (name === 'public'){
    listTeam(searchText.value,0);
  }else {
    listTeam(searchText.value,2);
  }

}



//跳转方法
const doAddTeam = () =>{
  router.push({
    path:"/team/add"
  })
}

const teamList = ref([]);
//页面加载完成触发查询所有队伍
onMounted( ()=>{
  listTeam()
})
const searchText = ref('');
const onClickButton = () => listTeam(searchText.value);
const onSearch = (val) => listTeam(val);

//搜索队伍方法
const listTeam = async (val = '', status = 0) =>{
  const res = await myAxios.get("/team/list",{
    params:{
      searchText: val,
      pageNum:1,
      status,
    }
  });
  if (res?.data){
    teamList.value = res.data;
  }else {
    Toast.fail("查询队伍失败")
  }
}

</script>

<style scoped>

</style>