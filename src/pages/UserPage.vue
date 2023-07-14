<template>
  <van-cell-group inset>
    <van-cell title="用户名" :value = "user?.userName"  />
    <van-cell title="个人信息" is-link to="/user/update"  />
    <van-cell title="我创建的队伍" is-link to="/user/team/created"  />
    <van-cell title="我加入的队伍" is-link to="/user/team/join"  />
  </van-cell-group>
</template>

<script setup lang="ts">

//定义后端接收到的数据
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {getCurrentUser} from "../services/user";

const user = ref();

//页面加载完成后执行
onMounted(async () => {
  //获取用户信息
  const res = await getCurrentUser();
  console.log('UserPage res ' + res.data);
  if (res.data){
    user.value = res;
    console.log( "user.value" + user.value)
    console.log('获取用户信息成功')
  }else {
    console.log('获取用户信息失败')
  }
})




const router = useRouter();
const toEdit = (editKey: string , editName: string, currentValue: string) =>{
  router.push({
    path: '/user/edit',
    query:{
      editKey,
      editName,
      currentValue,
    }
  })
}



</script>

<style scoped>

</style>