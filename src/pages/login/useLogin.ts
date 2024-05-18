import useImageVerify from '@/components/ReImageVerify/useImageVerify';
import { router } from '@/router'; // js文件使用方法
import { testToken } from '@/services/api/auth';
import { useAuthStore } from '@/store/authStore';
const { getCodeUrl, codeflog } = useImageVerify();
const authStore = useAuthStore();
//
import { useRequest } from 'alova';

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
const loginFrom = ref({
  na: '18919853421',
  ps: 'Zxe@2020',
  co: '',


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
          htmlcallback: (e: any) => {
            return codeimg.value.data;
          },
          callback: () => {
            getcode();
          }
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
    // 转化响应式对象
    toRef(form)
    try {
      const { token }: any = await sendLogin(form);
      authStore.SETTIKEN(token);
      router.push({ name: 'Index' });
    } catch (error) {
      getcode()
    }
  };

  const { send: getcode, data: codeimg }: { send: any; data: any } = captchaImage({
    immediate: true,
    initialData: {},
  });

const { send: tesToken, data: authInfo } = useRequest(testToken, {
  immediate: false, // 默认不发出请求
  initialData: {}, // 请求响应前，data的初始值
});
export default () => {
  return { Login, tesToken, loginFrom, options, formPros, authInfo, download, codeimg, getcode };
};
