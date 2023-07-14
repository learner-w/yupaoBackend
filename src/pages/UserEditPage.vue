<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="editUser.currentValue"
          :name="editUser.editKey"
          :label="editUser.editName"
          :placeholder = "`请输入${editUser.editName}`"
          :rules="[{ required: true, message: `请填写${editUser.editName}` }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

</template>

<script setup lang="ts">

import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
import {getCurrentUser} from "../services/user";

const route =useRoute()
const router = useRouter();
const editUser = ref({
  editKey : route.query.editKey,
  editName : route.query.editName,
  currentValue: route.query.currentValue
})

// 提交
const onSubmit = async () => {
  //获取用户信息
  const currentUser = await getCurrentUser();
  if (!currentUser){
    Toast.success('用户未登录')
    return;
  }
  const  res = await  myAxios.post(
      "/user/update",
      {
        'id': currentUser.id,
        [editUser.value.editKey]: editUser.value.currentValue
      })
      //根据myAxios.post的结果判断显示成功
      if ( res.data > 0){
        console.log('修改用户信息成功');
        Toast.success('修改用户信息成功');
        router.back();
      } else {
        console.log('修改用户信息失败');
        Toast.success('修改失败');
      }
};
</script>

<style scoped>

</style>