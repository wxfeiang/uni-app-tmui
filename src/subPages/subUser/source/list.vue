<script setup lang="ts">
const { title, suessList, paramsData, curentlist } = useSource();
const router = useRouter();
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
const changeList = (item: number) => {
  paramsData.value!.size = item;
  suessList(paramsData.value);
};
const toDesc = (item: any) => {
  router.push({ name: "sourceDesc", params: { ...item } });
};
</script>
<template>
  <tm-app>
    <tm-navbar :title="title" linear="right" linearDeep="accent"> </tm-navbar>
    <view class="mb-32 mx-32 mt-32 round-3 overflow pb-100">
      <tm-cell
        :margin="[0, 0]"
        :titleFontSize="30"
        :title="item.name"
        v-for="(item, index) in curentlist"
        :key="index"
        @click="toDesc(item)"
      >
      </tm-cell>
    </view>
    <tm-sheet :padding="[12, 12]" :margin="[0, 16]" class="fixed b-0 l-0 r-0">
      <tm-pagination
        simple
        :total="1000"
        color="primary"
        @change="changeList"
      ></tm-pagination>
    </tm-sheet>
  </tm-app>
</template>
<style lang="scss" scoped></style>
