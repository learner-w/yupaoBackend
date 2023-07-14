<template>
  <user-card-list :user-list="userList"/>
  <!-- 搜索提示 -->
  <van-empty v-if=" !userList || userList.length < 1"  description="搜索结果为空" />


</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import qs from 'qs';

const route = useRoute();

//从路由中获取标签数据
const {tags} = route.query;
import myAxios from '../plugins/myAxios'
import {Toast} from "vant";
import UserCardList from "../components/UserCardList.vue";
//查询到的用户列表
const userList = ref([]);


//onMounted是一个构子，表示在页面加载完成后做的事情
onMounted(async () => {
      const userListData = await myAxios.get('/user/search/tags', {
        params: {
          tagNameList: tags
        },
        //序列化
        paramsSerializer:  params => {
          return  qs.stringify(params, {indices: false})
        }
      })
          .then(function (response) {
            console.log('/user/search/tags succeed', response.data);
            return response.data;
          })
          .catch(function (error) {
            console.log('/user/search/tags error', error);
            Toast.fail('请求失败')
          });

      if (userListData) {
        console.log('收到数据为' + userListData)
        userListData.forEach(user => {
          if (user.tags) {
            user.tags = JSON.parse(user.tags);
          }
        })
        userList.value = userListData;
      }
    }
)


//测试用户
const testUser = {
  id: 1,
  userName: "abc",
  userAccount: "string",
  avatarUrl: "https://th.bing.com/th/id/R.b9c32b65fc9bca4bcf9cff5f9f1aad5e?rik=Y6FXLswi%2bzXiuw&pid=ImgRaw&r=0",
  profile: "我是又菜又爱玩coder",
  gender: "男",
  phone: '1233131',
  tags: ['Java', 'Python', '八岁会编程', '天天写bug'],
  email: '43242344@qq.com',
  userStatus: '1',
  userRole: '1',
  planetCode: '23',
  createTime: Date,
  avatar: Blob,
};





</script>

<style scoped>

</style>