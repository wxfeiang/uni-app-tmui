<script setup lang="ts"></script>
<template>
  <view class="">
    <view class="flex flex-col flex-col-top-center">欢迎使用</view>
    <tm-sheet color="primary">
      <tm-text :font-size="24" _class="text-weight-b " label="登录"></tm-text>
      <tm-divider></tm-divider>
      <tm-input
        color="primary"
        focusColor="green"
        prefix="tmicon-user-fill"
        placeholder="请输入用户名"
      ></tm-input>
      <tm-input
        color="primary"
        focusColor="green"
        :margin="[0, 24]"
        prefix="tmicon-lock-fill"
        :password="true"
        placeholder="请输入密码"
      ></tm-input>
      <tm-divider></tm-divider>
      <tm-button form-type="submit" label="登录" block color="green"></tm-button>
    </tm-sheet>
    <dy-down />
  </view>
</template>
<style lang="scss" scoped></style>
