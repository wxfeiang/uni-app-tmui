<script setup lang="ts">
const { menu } = useUser();
</script>
<template>
  <tm-app>
    <tm-sheet>
      <tm-text :font-size="24" _class="text-weight-b" label="资源列表"></tm-text>
    </tm-sheet>
    <view class="mb-32 mx-32 round-3 overflow">
      <tm-cell :margin="[0, 0]" :titleFontSize="30" title="头像 Avatar"> </tm-cell>
      <tm-cell :margin="[0, 0]" :titleFontSize="30" title="徽标 Badge"> </tm-cell>
      <tm-cell :margin="[0, 0]" :titleFontSize="30" title="卡片 Card"> </tm-cell>
    </view>
    <tm-sheet>
      <tm-text :font-size="24" _class="text-weight-b" label="功能区"></tm-text>
      <tm-divider></tm-divider>
      <tm-grid :width="638" :col="3">
        <tm-grid-item
          :height="120"
          dot
          v-for="(item, index) in menu"
          :key="index"
          :url="item.url"
        >
          <tm-icon :name="item.icon" :font-size="42"></tm-icon>
          <tm-text _class="pt-10" :font-size="22" :label="item.label"></tm-text>
        </tm-grid-item>
      </tm-grid>
    </tm-sheet>
  </tm-app>
</template>
<style lang="scss" scoped></style>
