<script lang="ts" setup>
const acc = ref(1);
function laodingfun(val: any) {
  return new Promise((res) => {
    setTimeout(function () {
      console.log("选中了：", val);
      res(true);
    }, 2000);
  });
}
const dateStr = ref("");
const showdate = ref(false);
const up = ref<InstanceType<typeof tmUpload> | null>(null);
const list = ref([]);
/**
 * 以下是测试上传后。如果服务返回 的不是json对象数据就让其失败。
 */
const test = (item: file) => {
  let d = item.response;
  let isOk = true;
  try {
    let p = JSON.parse(d);
    if (p?.code != 0) {
      isOk = false;
    }
  } catch (e) {
    isOk = false;
  }

  return isOk;
};
const complateFile = (file: file) => {
  console.log(file);
};
const onStart = (item: any) => {
  console.log(item);
  return true;
};
</script>
<template>
  <tm-app>
    <tm-sheet>
      <tm-text label="点击中间+按钮可以体验异步加载动态效果."></tm-text>
    </tm-sheet>
    <tm-upload
      showSort
      :onStart="onStart"
      v-model="list"
      ref="up"
      :width="636"
      :rows="4"
      url="https://mockapi.eolink.com/tNYKNA7ac71aa90bcbe83c5815871a5b419601e96a5524d/upload"
      @complate="complateFile"
    >
    </tm-upload>

    <tm-tabbar :autoSelect="false" v-model:active="acc">
      <tm-tabbar-item
        @click="acc = 0"
        activeColor="green"
        count="HOT"
        open-type="reLaunch"
        text="首页"
        icon="tmicon-collection-fill"
      ></tm-tabbar-item>
      <tm-tabbar-item
        @click="acc = 1"
        activeColor="orange"
        text="表单"
        icon="tmicon-cog-fill"
      ></tm-tabbar-item>
      <tm-tabbar-item
        @click="acc = 2"
        :shadow="2"
        :beforeClick="laodingfun"
        :data="'中间项'"
        btn-top
        fontColor="white"
        activeColor="white"
        linear="top"
        linearDeep="accent"
        color="yellow"
        icon="tmicon-plus"
      ></tm-tabbar-item>
      <tm-tabbar-item
        @click="acc = 3"
        activeColor="orange"
        url="/pages/fankui/index"
        text="反馈分类"
        unicon="tmicon-like"
        icon="tmicon-heart-fill"
      ></tm-tabbar-item>
      <tm-tabbar-item
        @click="acc = 4"
        activeColor="orange"
        :count="8"
        url="/pages/chart/index"
        active
        text="图表中心"
        unicon="tmicon-account"
        icon="tmicon-userplus-fill"
      ></tm-tabbar-item>
    </tm-tabbar>
  </tm-app>
</template>
