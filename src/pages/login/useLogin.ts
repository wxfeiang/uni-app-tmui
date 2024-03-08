import { router } from '@/router'; // js文件使用方法
import { login2, testToken } from '@/services/api/auth';
import { useAuthStore } from '@/store/authStore';
import { encrypt } from '@/utils/jsencrypt';
const { getCodeUrl, codeflog } = useSystem();
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
});

const newData = ref({});

const { send: sendLogin2 } = login2(
  {},
  {
    immediate: false,
    loading: false,
  },
);

const Login = async (form: any) => {
  if (form.validate) {
    newData.value = {
      appKey: 'app',
      na: loginFrom.value.na,
      ps: encodeURI(encrypt(loginFrom.value.ps) as string),
      co: loginFrom.value.co,
      u: codeflog,
      type: 1,
      terminal: 'WEAPP',
    };
    try {
      const { token }: any = await sendLogin2(newData.value);
      authStore.SETTIKEN(token);
      router.push({ name: 'Index' });
    } catch (error) {
      getCodeUrl();
    }
  } else {
    return;
  }
};

const { send: tesToken, data: authInfo } = useRequest(testToken, {
  immediate: false, // 默认不发出请求
  initialData: {}, // 请求响应前，data的初始值
});
export default () => {
  return { Login, tesToken, loginFrom, rules };
};
