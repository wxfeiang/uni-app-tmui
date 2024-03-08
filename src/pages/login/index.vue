<script lang="ts" setup>
const { Login, tesToken, loginFrom, rules } = useLogin();
const { captchaConfigData, codeImg, getCodeUrl } = useSystem();
const router = useRouter();
const form = ref(null);
function goto() {
  router.push({ name: "Home" });
}
</script>

<template>
  <tm-sheet color="primary">
    <tm-text :font-size="24" _class="text-weight-b" label="登录"></tm-text>
    <tm-divider></tm-divider>
    <tm-form ref="form" v-model="loginFrom" @submit="Login">
      <tm-form-item field="na" :rules="rules.na">
        <tm-input
          prefix="tmicon-user-fill"
          v-model="loginFrom.na"
          placeholder="用户名"
        ></tm-input>
      </tm-form-item>
      <tm-form-item field="ps" :rules="rules.ps">
        <tm-input
          prefix="tmicon-lock-fill"
          password
          placeholder="密码"
          v-model="loginFrom.ps"
        >
        </tm-input>
      </tm-form-item>
      <tm-form-item field="co" :rules="rules.co">
        <tm-input placeholder="验证码" v-model="loginFrom.co">
          <template #right>
            <tm-image
              :width="200"
              :height="50"
              :src="codeImg"
              @click="getCodeUrl"
            ></tm-image>
          </template>
        </tm-input>
      </tm-form-item>
      <tm-button form-type="submit" label="登录" block color="green"></tm-button>
    </tm-form>
  </tm-sheet>
  <view class="fontFily"> asdca </view>
</template>
