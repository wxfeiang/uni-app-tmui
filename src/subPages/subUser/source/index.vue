<script setup lang="ts">
const {
  typeList,
  SegtabList,
  activeIndex,
  cellClick,
  SegtabClick,
  currEntValue,
} = useSource();
</script>
<template>
  <tm-app>
    <tm-sheet>
      <tm-segtab
        :list="SegtabList"
        @click="SegtabClick"
        :default-value="activeIndex"
      ></tm-segtab>
    </tm-sheet>
    <view class="mb-32 mx-32 mround-3 overflow">
      <tm-cell
        :margin="[0, 0]"
        :titleFontSize="30"
        :title="item.name"
        v-for="(item, index) in currEntValue"
        :key="index"
        @click="cellClick(item)"
      >
      </tm-cell>
    </view>
  </tm-app>
</template>
<style lang="scss" scoped></style>
