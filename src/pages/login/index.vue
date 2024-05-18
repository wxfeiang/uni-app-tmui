<script lang="ts" setup>
const { Login, tesToken, loginFrom, options, formPros, getcode } = useLogin();
const router = useRouter();
const form = ref(null);
function goto() {
  router.push({ name: "Home" });
}
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
