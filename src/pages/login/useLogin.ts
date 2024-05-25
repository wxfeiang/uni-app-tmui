import useImageVerify from '@/components/ReImageVerify/useImageVerify';
import { FormOptions, FormProps } from "@/components/dy-form/types/types";
import router from '@/router';
import { login } from '@/services/api/auth';
import { useAuthStore } from '@/store/authStore';
import { encrypt } from '@/utils/aes/jsencrypt';
const { getCodeUrl, codeflog, codeImg } = useImageVerify();
const authStore = useAuthStore();
//

const rules = {
  na: [
    {
      required: true,
      message: '用户名不能为空!',
      validator: (val: string) => val.length > 0,
    },
  ],
  ps: {
    required: true,
    message: '密码不能为空',
  },
  co: [
    {
      required: true,
      message: '验证码不能为空',
    },
    {
      message: '输入不合法!',
      validator: (val: string) => val.length < 4,
    },
  ],
};


const loginFrom = ref(<LoginParams>{
  na: 18919853421,
  ps: 'Zxe@2020',
  co: '',
});
const options = ref<FormOptions[]>([
  {
    type: "input",
    label: "",
    prop: "na",
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
    prop: "ps",
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
    prop: "co",
    rulesHide: true,
    rules: [
      {
        message: '输入不合法!',
        validator: (val: string) => val.length < 4,
      },
    ],
    formItemAttrs: {
    },
    typeAttrs: {
      prefix: "tmicon-collection",
      showBottomBotder: false,
      showClear: true,
      transprent: false,
      right: true,
      slotRightName: "verify",
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
    formGroupItemAttrs: {
      size: 30
    },
    formTextAttrs: {
      fontSize: 20,
      label: "请仔细请阅读",
    },
    typeAttrs: {
      fontSize: 20,
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
      label: "登 录",
      formBtnAttrs: {
        // disabled: false,
      }
    }
  ]
});
const { send: sendLogin } = login(
  {},
  {
    immediate: false,
    loading: false,
  },
);
const Login = async (form: any) => {


  let nval = {
    appKey: 'default',
    na: form.na,
    ps: encodeURI(encrypt(form.ps.trim()) as string).replace(
      /\+/g,
      "%2B"
    ),
    co: form.co,
    u: codeflog.value,
    type: 1,
    terminal: 'WEAPP',
  };
  console.log('🥦', nval);
  try {
    const { token }: any = await sendLogin(nval);
    authStore.SETTIKEN(token);
    router.push({ name: 'Index' });
  } catch (error) {
    getCodeUrl()
  }
};


export default () => {
  return { Login, loginFrom, options, formPros, codeImg, getCodeUrl };
};
