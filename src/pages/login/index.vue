<script lang="ts" setup>
// import dyForm from "@/components/dy-form/dy-from.vue";
const {
  Login,
  loginFrom,
  options,
  formPros,
  codeImg,
  getCodeUrl,
  footerBtns,
} = useLogin();
</script>

<template>
  <tm-app>
    <dy-form
      :options="options"
      v-model:formVal="loginFrom"
      @submit="Login"
      :formPros="formPros"
      ref="dyFromRef"
    >
      <template #verify>
        <tm-image :width="200" :height="50" :src="codeImg" @click="getCodeUrl"></tm-image>
      </template>
    </dy-form>

    <dy-footer :btns="footerBtns">
      <template #default> <view> moren cha </view></template>
    </dy-footer>
  </tm-app>
</template>
