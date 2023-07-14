<template>
  <van-cell center title="心动模式">
    <template #right-icon>
      <van-switch v-model="isMatchMode"  size="24" />
    </template>
  </van-cell>

  <user-card-list :user-list = "userList" :loading="loading" />
  <!-- 搜索提示 -->
  <van-empty v-if=" !userList || userList.length < 1"  description="数据为空" />
</template>

<script setup lang="ts">

import {ref, watchEffect} from "vue";
import {useRoute} from "vue-router";

const isMatchMode = ref<boolean>(false);

const route = useRoute();
//从路由中获取标签数据
const {tags} = route.query;
import myAxios from '../plugins/myAxios'
import {Toast} from "vant";
import UserCardList from "../components/UserCardList.vue";
import loading = Toast.loading;
import {userType} from "../models/user";
//查询到的用户列表
const userList = ref([]);
const loading = ref(true);


const loadData = async () => {
  let userListData;
  loading.value = true;
  // 心动模式，根据标签匹配用户
  if (isMatchMode.value) {
    const num = 10;
    userListData = await myAxios.get('/user/match', {
      params: {
        num,
      },
    })
        .then(function (response) {
          console.log('/user/match succeed', response);
          return response?.data;
        })
        .catch(function (error) {
          console.error('/user/match error', error);
          Toast.fail('请求失败');
        })
  } else {
    // 普通模式，直接分页查询用户
    userListData = await myAxios.get('/user/recommend', {
      params: {
        pageSize: 8,
        pageNum: 1,
      },
    })
        .then(function (response) {
          console.log('/user/recommend succeed', response);
          return response?.data?.records;
        })
        .catch(function (error) {
          console.error('/user/recommend error', error);
          Toast.fail('请求失败');
        })
  }
  if (userListData) {
    userListData.forEach((user: userType) => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
  loading.value = false;
  }

//用于监控某个变量的钩子
watchEffect(()=>{
  loadData();
})

</script>

<style scoped>

</style>