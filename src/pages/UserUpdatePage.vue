<template>
  <template v-if="user">
    <van-cell-group inset>
      <van-cell title="个人ID" :value="user.id" />
      <van-cell title="昵称" is-link to="/user/edit"   :value="user.userName"
                @click ="toEdit('userName','昵称',user.userName)" />
      <van-cell title="账号" :value="user.userAccount"/>
      <van-cell title="头像"   :value="user.avatarUrl" >
        <img style="height: 48px" :src="user.avatarUrl">
      </van-cell>
      <van-cell title="性别" is-link to="/user/edit"   :value="user.gender"
                @click ="toEdit('gender','性别',user.gender)"/>
      <van-cell title="电话" is-link to="/user/edit"   :value="user.phone"
                @click ="toEdit('phone','电话',user.phone)"/>
      <van-cell title="邮箱" is-link to="/user/edit"   :value="user.email"
                @click ="toEdit('email','邮箱',user.email)"/>
      <van-cell title="用户状态" :value="user.userStatus"  />
      <van-cell title="星球编号" :value="user.planetCode"  />
      <van-cell title="注册时间" :value="user.createTime"/>
    </van-cell-group>
  </template>
</template>

<script setup lang="ts">
// const user = {
//   id : 1,
//   userName :"abc",
//   userAccount:"string",
//   avatarUrl:"https://fastly.jsdelivr.net/npm/@vant/assets/logo.png",
//   gender:"男",
//   phone:'1233131',
//   email:'43242344@qq.com',
//   userStatus:'1',
//   userRole:'1',
//   planetCode:'23',
//   createTime: Date,
//   avatar:Blob,
// };

//定义后端接收到的数据
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
import {getCurrentUser} from "../services/user";

const user = ref();

//页面加载完成后执行
onMounted(async () => {
 //获取用户信息
  const res = await getCurrentUser();
  console.log('UserPage res' + res);
  if (res.data  !== null){
    user.value = res;
    console.log(user.value)
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