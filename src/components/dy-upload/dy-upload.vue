<script setup lang="ts">
import { file } from "@/tmui/components/tm-upload/upload";
const props = defineProps({
  urls: {
    type: String,
    default: "",
  },
  file: {
    type: String,
    default: "",
  },
});
const header = ref({
  host: "",
});
// 把传入的图片字符串转化数组格式
const list: any = ref([]);
// watch(
//   () => [props.urls],
//   (newV, oldV) => {
//     console.log("🍜[newV,oldV]:", newV, oldV);
//     const arrr = props.urls.split(",");
//     console.log("🥥[arrr]:", arrr);
//     list.value = arrr.map((url) => {
//       // return "http://47.99.93.97/v1" + url;
//       return {
//         url: "http://47.99.93.97/v1" + url,
//       };
//     });
//   }
// );
const test = (item: file) => {
  let d = item.response;
  let isOk = true;
  try {
    let p = JSON.parse(d);
    if (p?.code != 200) {
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
  console.log("🍑[item]:", item);
  return true;
};
const success = (item: any) => {
  console.log("🍒[item]:", item);
};

// 改不变默认有值的请情况
const changeImg = (str: any) => {
  if (!str) return [];
  return str.split(",").map((url: string) => "http://47.99.93.97/v1" + url);
};
</script>
<template>
  <view v-bind="$attrs"> </view>
  {{ urls }}
  <view>=======================</view>

  {{ list }}
  <tm-upload
    :imageHeight="200"
    :rows="2"
    v-model="list"
    :default-value="changeImg(props.urls)"
    ref="up"
    :onSuccessAfter="test"
    @complate="complateFile"
    @success="success"
    :onStart="onStart"
    :width="636"
    url="http://47.99.93.97/v1/base/uploadLocal"
  >
    <template v-slot:icon>
      <tm-text label="上传"></tm-text>
    </template>
  </tm-upload>
</template>
<style lang="scss" scoped></style>
