<script setup lang="ts">
const { title, suessDesc, paramsDesc, curentDesclist } = useSource();
const key = ref("");
onLoad((option) => {
  if (option && option.key) {
    key.value = option.key;

    paramsDesc.value = {
      type: option.type,
      id: option.linkUrl,
    };

    suessDesc(paramsDesc.value);
  }
});
const imgClick = (item) => {
  console.log("🦀[item]:", item);
};
</script>
<template>
  <tm-app>
    <view class="flex flex-col flex-col-top-center" v-if="key === 'img'">
      <tm-waterfall ref="wall" :width="718">
        <tm-waterfall-item
          :img="item.imgUrl"
          v-for="(item, index) in curentDesclist"
          :key="index"
          @click="imgClick(item)"
        >
        </tm-waterfall-item>
      </tm-waterfall>
    </view>
    <view class="pa-32" v-if="key === 'html'">
      <view v-html="curentDesclist[0]"> </view>
    </view>
  </tm-app>
</template>
<style lang="scss" scoped></style>
