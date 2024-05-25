<script lang="ts" setup>
const { Login, loginFrom, options, formPros, codeImg, getCodeUrl } = useLogin();
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
      <template #verify>
        <tm-image :width="200" :height="50" :src="codeImg" @click="getCodeUrl"></tm-image>
      </template>
    </dy-from>
  </tm-app>
</template>
