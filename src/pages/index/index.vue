<script lang="tsx" setup>
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
const urls = ref(
  "/public/uploads/image/1711870662452-0b2e2976-f237-41f9-8ce0-6c0813b3bf6c.png,/public/uploads/image/1711869878456-3045e1d1-c798-46b5-833e-1d03a0755267.jpg"
);
</script>
<template>
  <tm-app>
    <tm-sheet>
      <tm-text label="点击中间+按钮可以体验异步加载动态效果."></tm-text>
    </tm-sheet>
    <tm-sheet>
      <dy-upload :urls="urls" width="220px"></dy-upload>
    </tm-sheet>
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
        url="/pages/user/index"
        active
        text="我的"
        unicon="tmicon-account"
        icon="tmicon-userplus-fill"
      ></tm-tabbar-item>
    </tm-tabbar>
  </tm-app>
</template>
