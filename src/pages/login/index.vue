<script lang="ts" setup>
// import dyForm from "@/components/dy-form/dy-from.vue";
const { Login, loginFrom, options, formPros } = useLogin();
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
    </dy-form>
  </tm-app>
</template>
