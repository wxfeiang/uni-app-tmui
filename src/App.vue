<script lang="ts" setup></script>
<template>
  <tm-app ref="app">
    <!-- 这里是你的页面代码。 -->
  </tm-app>
</template>
<style>
/* #ifdef APP-PLUS-NVUE */
@import './tmui/scss/nvue.css';
/* #endif */
/* #ifndef APP-PLUS-NVUE */
@import './tmui/scss/noNvue.css';
/* #endif */

/* 每个页面公共css */
@import './static/css/base.scss';
/* scss公共类 */
</style>
