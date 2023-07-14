<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="账号"
          label="账号"
          placeholder="账号"
          :rules="[{ required: true, message: '请填写账号' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        登录
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">

import {ref} from "vue";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
import {useRoute} from "vue-router";

const route = useRoute();
const userAccount = ref('');
const userPassword = ref('');
const onSubmit = async() => {
  const res = await myAxios.post(
      "/user/login",
      {
        userAccount: userAccount.value,
        userPassword: userPassword.value,
      }
  )
  // 根据返回的结果判断是否成功登录
  console.log('res' + res.code)
  if (res.code == 2000){

    Toast.success('登录成功')
    // //跳转之前的页面
    // const redirectUrl = route.query?.redirect as string ?? '/';
    // window.location.href = redirectUrl;
  }else {

    Toast('登录失败')
  }
}
</script>

<style scoped>

</style>