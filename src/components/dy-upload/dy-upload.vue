<script setup lang="ts">
import { file } from "@/tmui/components/tm-upload/upload";
import { getBaseUrl, getEnvValue } from "@/utils/env";
import { Toast } from "@/utils/uniapi/prompt";
const baseUrl = getEnvValue("VITE_IMG_URL");
const props = defineProps({
  urls: {
    type: String,
    default: "",
  },
  cUrl: {
    type: String,
  },
  attrs: {
    type: Object as PropType<AnyObject>,
    default: () => ({}),
  },
  header: {
    type: Object as PropType<AnyObject>,
    default: () => ({
      host: "",
    }),
  },
  uploadUrl: {
    type: String,
    default: () => getEnvValue("VITE_BASE_URL") + getBaseUrl() + "/base/uploadLocal",
  },
});
const emit = defineEmits(["update:urls"]);
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
// 开始上传
const onStart = (item: file) => {
  //
  return false;
};
// 上传成功
const success = (item: file) => {
  let curl = JSON.parse(item.response).data.url;
  emit("update:urls", props.urls + "," + curl);
};
// 上传失败
const fail = (item: file) => {
  Toast(item.status + "上传失败");

  list.value = list.value.filter((i: file) => i.statusCode == 3);
  emit("update:urls", props.urls + "," + item.url);
  //FIX: 1000s后清除失败的图片
  setTimeout(() => {
    const arr = changeImg(props.urls)
      .filter((i: string) => i !== baseUrl + item.url)
      .map((i: string) => i.replace(baseUrl, ""))
      .join(",");
    emit("update:urls", arr);
  }, 3000);
};

// 点击删除按钮
const remove = (item: file) => {
  let c =
    item.response && item.statusCode == 3
      ? baseUrl + JSON.parse(item.response).data.url
      : item.url.indexOf("blob") > -1
      ? baseUrl + item.url
      : item.url;

  const arr = changeImg(props.urls)
    .filter((i: string) => i !== c)
    .map((i: string) => i.replace(baseUrl, ""))
    .join(",");
  emit("update:urls", arr);
};

// 改变默认有值,回显图片
const changeImg = (str: string) => {
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
  {{ uploadUrl }}
  <tm-upload
    v-model="list"
    :default-value="list"
    ref="up"
    :onSuccessAfter="onSuccessAfter"
    @complate="complateFile"
    @success="success"
    :onStart="onStart"
    @remove="remove"
    :width="650"
    @fail="fail"
    :url="uploadUrl || props.cUrl"
    v-bind="props.attrs"
  >
    <template v-slot:icon>
      <tm-text label="上传"></tm-text>
    </template>
  </tm-upload>
</template>
<style lang="scss" scoped></style>
