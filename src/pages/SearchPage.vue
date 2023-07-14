<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索的标签"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>

  <van-divider content-position="left">已选标签</van-divider>

  <!--占位符-->
  <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }" v-if="activeIds.length === 0"
  >
    请选择标签
  </van-divider>

  <van-space wrap>
    <van-tag v-for="tag in activeIds"  closeable size="medium" type="primary" @close="doClose(tag)">
      {{tag}}
    </van-tag>
  </van-space>

  <van-divider content-position="left">选择标签</van-divider>

  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />
  <div style="padding: 16px">
    <van-button block type="primary" @click = "doSearchResult">搜索</van-button>
  </div>


</template>


<script setup lang="ts">

import {ref} from 'vue';
import {Toast} from 'vant';
import {useRouter} from "vue-router";
//标签对象
const originTagList =  [
  {
    text: '性别',
    children: [
      {text: '男', id: '男'},
      {text: '女', id: '女'},
    ],
  },
  {
    text: '年级',
    children: [
      {text: '大一', id: '大一'},
      {text: '大二', id: '大二'},
      {text: '大三', id: '大三'},
    ],
  },
  {
    text: '语言',
    children: [
      {text: 'Python', id: 'Python'},
      {text: 'Java', id: 'Java'}
    ]
  }
];

let tagList = ref(originTagList);

const searchText = ref('');
const onSearch = (val) => {
  tagList.value = originTagList.map(parentTag => {
    const tempChildren = [...parentTag.children];
    const tempParentTag = {...parentTag};
    tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value));
    return tempParentTag;
  });
}
const onCancel = () => {
  searchText.value = '';
  tagList.value = originTagList;
};
//标签相关常量
const activeIds = ref([]);
const activeIndex = ref(0)


//移除标签时同时取消选中
const doClose = (tag) =>{
  activeIds.value = activeIds.value.filter(item =>{
    return item !== tag;
  })
}

//需要useRouter来完成跳转
var router = useRouter();
//搜索方法
const doSearchResult = () =>{
  router.push({
    path: 'user/list',
    //query表示当前地址的search对象
    query:{
        tags : activeIds.value
    }
      }
  )
}


</script>

<style scoped>

</style>