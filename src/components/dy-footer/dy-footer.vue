<script setup lang="ts">
import { FooterBtns, FooterWarp } from "./types/types";

let props = defineProps({
  // 外层属性
  footWarp: {
    type: Object as PropType<FooterWarp>,
  },
  // 组件的属性
  btns: {
    type: Array as PropType<FooterBtns[]>,
  },
});
</script>
<template>
  <tm-sheet class="fixed b-0 l-0 r-0" :margin="[0]">
    <slot></slot>

    <template v-if="props.btns">
      <view class="flex flex-row gap-10">
        <view class="flex-1" v-for="(item, index) in props.btns" :key="index">
          <tm-button block size="normal" :label="item.label"> </tm-button>
        </view>
      </view>
    </template>
  </tm-sheet>
</template>
<style lang="scss" scoped></style>
