<script setup lang="ts">
const { title, suessList, paramsData, curentlist } = useSource();
onLoad((option) => {
  if (option && option.name) {
    title.value = option.name;
    paramsData.value = {
      type: option.linkUrl,
      size: "1",
    };

    suessList(paramsData.value);
  }
});
</script>
<template>
  <tm-app>
    <tm-navbar :title="title" linear="right" linearDeep="accent"> </tm-navbar>
    <view class="mb-32 mx-32 mt-32 round-3 overflow">
      <tm-cell
        :margin="[0, 0]"
        :titleFontSize="30"
        :title="item.name"
        v-for="(item, index) in curentlist"
        :key="index"
      >
      </tm-cell>
    </view>
  </tm-app>
</template>
<style lang="scss" scoped></style>
