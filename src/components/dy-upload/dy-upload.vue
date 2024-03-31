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
watch(
  () => [list.value],
  (newV, oldV) => {
    console.log("🍜[newV,oldV]:", newV, oldV);
    const arrr = props.urls.split(",");
    console.log("🥥[arrr]:", arrr);
    list.value = arrr.map((url) => {
      return {
        url: "http://47.99.93.97/v1" + url,
      };
    });
  }
);
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
  console.log("🍍", list.value);
};
const onStart = (item: any) => {
  return true;
};
</script>
<template>
  <view v-bind="$attrs"> </view>
  {{ list }}
  <tm-upload
    :imageHeight="200"
    :rows="2"
    v-model="list"
    showSort
    :default-value="list"
    ref="up"
    :onSuccessAfter="test"
    @complate="complateFile"
    :onStart="onStart"
    :width="636"
    url="http://47.99.93.97/v1/base/uploadLocal"
  >
    <!--  -->
    <template v-slot:icon>
      <tm-text label="上传"></tm-text>
    </template>
  </tm-upload>
</template>
<style lang="scss" scoped></style>
