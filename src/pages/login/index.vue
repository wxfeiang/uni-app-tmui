<script lang="ts" setup>
const { Login, loginFrom, options, formPros } = useLogin();
</script>

<template>
  <tm-app>
    <dy-from
      :options="options"
      v-model:formVal="loginFrom"
      @submit="Login"
      :formPros="formPros"
      ref="dyFromRef"
    >
    </dy-from>
  </tm-app>
</template>
