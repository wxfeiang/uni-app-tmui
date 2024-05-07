<script setup lang="ts">
import useImageVerify from "./useImageVerify";
const { getCodeUrl, codeImg } = useImageVerify();
// vue3.2 版本不支持
// defineOptions({
//   name: "ReImageVerify",
// });

let props = defineProps({
  width: {
    type: Number || String,
    default: 200,
  },
  height: {
    type: Number || String,
    default: 50,
  },
});
</script>

<template>
  <tm-image
    :width="props.width"
    :height="props.height"
    :src="codeImg"
    @click="getCodeUrl"
  ></tm-image>
</template>
