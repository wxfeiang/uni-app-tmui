<script lang="ts" setup>
const { Login, tesToken, loginFrom, rules, authInfo } = useLogin();
const router = useRouter();
const form = ref(null);
function goto() {
  router.push({ name: "Home" });
}
</script>
<template>
  <view class="">
    <view class="flex flex-col flex-col-top-center">欢迎使用</view>
    <tm-sheet color="primary">
      <tm-text :font-size="24" _class="text-weight-b " label="登录"></tm-text>
      <tm-divider></tm-divider>

      <tm-form ref="form" v-model="loginFrom" @submit="Login">
        <tm-form-item required field="username" :rules="rules.username">
          <tm-input
            focusColor="green"
            color="primary"
            prefix="tmicon-user-fill"
            placeholder="请输入用户名"
            v-model.lazy="loginFrom.username"
          ></tm-input>
          <!-- 不要问我为什么用v-model.lazy，我很受伤。 -->
        </tm-form-item>
        <tm-form-item required>
          <tm-input
            color="primary"
            focusColor="green"
            :margin="[0, 24]"
            prefix="tmicon-lock-fill"
            :password="true"
            placeholder="请输入密码"
            v-model.lazy="loginFrom.password"
          ></tm-input>
        </tm-form-item>
        <tm-button form-type="submit" label="登录" block color="green"></tm-button>
      </tm-form>
      <tm-divider></tm-divider>
    </tm-sheet>

    <dy-down />
  </view>
</template>
<style lang="scss" scoped></style>
