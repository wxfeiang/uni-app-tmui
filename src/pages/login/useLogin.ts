import { router } from '@/router'; // js文件使用方法
import { login2, testToken } from '@/services/api/auth';
import { useAuthStore } from '@/store/authStore';
const authStore = useAuthStore();
//
import { useRequest } from 'alova';

const rules = {
  username: [
    {
      required: true,
      message: '用户名不能为空!',
      validator: (val: string) => val.length > 0,
    },
  ],
  password: {
    required: true,
    message: '密码不能为空',
  },
  code: [
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
  username: '18919853421',
  password: 'Zxe@2020',
  code: '',
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

const { send: tesToken, data: authInfo } = useRequest(testToken, {
  immediate: true, // 默认不发出请求
  initialData: {}, // 请求响应前，data的初始值
});
export default () => {
  return { Login, tesToken, loginFrom, rules };
};
