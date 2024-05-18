import { FormOptions, FormProps } from "@/components/dy-form/types/types";
import router from '@/router'; // js文件使用方法
import { captchaImage, downFile, login2, testToken } from '@/services/api/auth';
import { useAuthStore } from '@/store/authStore';
import { downBuffFile } from '@/utils';
const authStore = useAuthStore();
//


const loginFrom = ref(<LoginParams>{
  username: 'admin',
  password: '123456admin',
  verifyCode: ''
});
const options = ref<FormOptions[]>([
  {
    type: "input",
    label: "",
    prop: "username",
    rulesHide: true,
    typeAttrs: {
      prefix: "tmicon-account",
      showBottomBotder: false,
      showClear: true,
      transprent: false,
      right: true,
      slotRightName: "dy-inp-right",
    },
  },
  {
    type: "input",
    label: "",
    prop: "password",
    rulesHide: true,
    formItemAttrs: {
    },
    typeAttrs: {
      password: true,
      transprent: false,
      prefix: "tmicon-lock",
    },
  },
  {
    type: "input",
    label: "", // 不需要label
    prop: "verifyCode",
    rulesHide: true,
    formItemAttrs: {

    },
    typeAttrs: {
      prefix: "tmicon-collection",
      showBottomBotder: false,
      showClear: true,
      transprent: false,
      codeImg: true,
      codeImgAttrs: {
        src:
          "",
        callback: (e: any) => {
          getcode()
        },
      },
    },
  },
  {
    type: "readme",
    label: "", // 不需要label
    prop: "readme",
    rulesHide: true,
    formItemAttrs: {
      border: false,
    },
    typeAttrs: {

      color: "primary",
      label: "《合作协议/隐私协议》",
      url: "https://www.baidu.com", // 要跳转的地址
    },
  },
])
const formPros = ref<FormProps>({
  formBtns: [
    {
      formType: "submit",
      label: "登录",
      formBtnAttrs: {
        // disabled: false,
      }
    }
  ]
});

const { send: sendLogin2 } = login2(loginFrom.value, {
  immediate: false,
  loading: false,
});

const Login = async (form: any) => {
  if (form.validate) {
    const { token }: any = await sendLogin2();
    authStore.SETTIKEN(token);
    router.push({ name: 'Index' });
  } else {
    return;
  }
};

const { send: getcode, data: codeimg } = captchaImage({
  immediate: true,
  initialData: {},
});

const { send: tesToken, data: authInfo } = testToken({
  immediate: false, // 默认不发出请求
  initialData: {},
});
const {
  onSuccess: tesFile,
  data: FileData,
  send: download,
} = downFile({
  immediate: false, // 默认不发出请求
  initialData: {},
});
tesFile((e: any) => {
  downBuffFile(e);
});

export default () => {
  return { Login, tesToken, loginFrom, options, formPros, authInfo, download, codeimg, getcode };
};
