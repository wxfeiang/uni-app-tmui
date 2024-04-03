<script setup lang="ts">
import { file } from "@/tmui/components/tm-upload/upload";
import { Toast } from "@/utils/uniapi/prompt";
const baseUrl = "http://47.99.93.97/v1/";
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
const emit = defineEmits(["update:urls"]);
const header = ref({
  host: "",
});
// 把传入的图片字符串转化数组格式
const list: any = ref([]);

const onSuccessAfter = (item: file) => {
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
const complateFile = (file: file) => {};
const onStart = (item: any) => {
  //
  return true;
};
const success = (item: any) => {
  let curl = JSON.parse(item.response).data.url;
  emit("update:urls", props.urls + "," + curl);
};
const fail = (item: any, fileList: any) => {
  Toast(item.status);
  list.value = list.value.filter((i: any) => i.scanCode == 3);
  emit("update:urls", props.urls + "," + item.url);
  //FIX: 1000s后清除失败的图片
  setTimeout(() => {
    const arr = changeImg(props.urls)
      .filter((i: any) => i !== baseUrl + item.url)
      .map((i: any) => i.replace(baseUrl, ""))
      .join(",");
    emit("update:urls", arr);
  }, 1000);
};
const remove = (item: any) => {
  let c =
    item.response && item.statusCode == 3
      ? baseUrl + JSON.parse(item.response).data.url
      : item.url.indexOf("blob") > -1
      ? baseUrl + item.url
      : item.url;

  const arr = changeImg(props.urls)
    .filter((i: any) => i !== c)
    .map((i: any) => i.replace(baseUrl, ""))
    .join(",");
  emit("update:urls", arr);
};

// 改不变默认有值的请情况
const changeImg = (str: any) => {
  if (!str) return [];
  return str.split(",").map((url: string) => baseUrl + url);
};
onMounted(() => {
  list.value = changeImg(props.urls);
});
watch(
  () => [props.urls],
  (n, o) => {
    list.value = changeImg(n[0]);
  }
);
</script>
<template>
  <view v-bind="$attrs"> </view>
  <tm-upload
    :imageHeight="200"
    :rows="2"
    v-model="list"
    :default-value="list"
    ref="up"
    :onSuccessAfter="onSuccessAfter"
    @complate="complateFile"
    @success="success"
    :onStart="onStart"
    @remove="remove"
    :width="636"
    @fail="fail"
    url="http://47.99.93.97/v1/base/uploadLocal"
  >
    <template v-slot:icon>
      <tm-text label="上传"></tm-text>
    </template>
  </tm-upload>
</template>
<style lang="scss" scoped></style>
