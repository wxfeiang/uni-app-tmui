<script lang="ts" setup>
const {
  Login,
  tesToken,
  loginFrom,
  rules,
  authInfo,
  download,
  codeimg,
  getcode,
} = useLogin();
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
      <tm-form-item field="username" :rules="rules.username">
        <tm-input
          prefix="tmicon-user-fill"
          v-model="loginFrom.username"
          placeholder="用户名"
        ></tm-input>
      </tm-form-item>
      <tm-form-item field="password" :rules="rules.password">
        <tm-input
          prefix="tmicon-lock-fill"
          password
          placeholder="密码"
          v-model="loginFrom.password"
        >
        </tm-input>
      </tm-form-item>
      <tm-form-item field="code" :rules="rules.code">
        <tm-input placeholder="验证码" v-model="loginFrom.code">
          <template #right>
            <!-- <tm-image
              :width="200"
              :height="50"
              :src="codeImg"
              @click="getcode"
            ></tm-image> -->
            <view v-html="codeimg" @click="getcode" class="w-200 h-50"></view>
          </template>
        </tm-input>
      </tm-form-item>
      <tm-button form-type="submit" label="登录" block color="green"></tm-button>
    </tm-form>

    <tm-button form-type="submit" label="下载文件" @click="download"></tm-button>
  </tm-sheet>
  <view class="fontFily"> asdca </view>
</template>
