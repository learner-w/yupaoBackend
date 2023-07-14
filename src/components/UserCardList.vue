<template>

  <van-skeleton title avatar :row="3" :loading="props.loading" v-for="user in props.userList">
    <van-card
        v-for="user in props.userList"
        :desc="user.profile"
        :title="`${user.userName} (${user.planetCode})`"
        :thumb ="user.avatarUrl" style="size: 50px"
    >
      <template #tags>
        <van-tag plain type="primary" v-for="tag in user.tags"
                 style="margin-right: 8px; margin-left: 8px; margin-top: 8px"> {{ tag }}
        </van-tag>
      </template>
      <template #footer>
        <van-button size="mini">交个朋友</van-button>
      </template>
    </van-card>
  </van-skeleton>

  <!-- 搜索提示 -->
  <van-empty v-if=" !userList || userList.length < 1"  description="搜索结果为空" />
</template>

<script setup lang="ts">

import {defineProps, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import qs from 'qs';
import {userType} from "../models/user";

interface UserCardListProps{
  loading: boolean;
  userList: userType[];
}

const props = withDefaults(defineProps<UserCardListProps>(),{
  loading: true,
  userList: [] as userType[],
});

</script>

<style scoped>

</style>