import { router } from '@/router'; // js文件使用方法
import { login, login2, testToken } from '@/services/api/auth';
import { useAuthStore } from '@/store/authStore';
const authStore = useAuthStore();
//
import { useRequest } from 'alova';

const rules = {
  username: {
    type: 'string',
    required: true,
    message: '请填用户名',
    trigger: ['blur'],
  },
  password: {
    type: 'string',
    required: true,
    message: '请输入密码',
    trigger: ['blur', 'change'],
  },
};
const loginFrom = ref(<LoginParams>{
  username: '',
  password: '',
});

const { send: sendLogin } = useRequest(login(loginFrom.value), {
  immediate: false,
});
const { send: sendLogin2 } = login2(loginFrom.value, {
  immediate: false,
  loading: false,
});

const Login = async () => {
  sendLogin2().then((res: any) => {
    authStore.SETTIKEN(res.token);
    router.push({ name: 'Index' });
  });
};
const { send: tesToken, data: authInfo } = useRequest(testToken, {
  immediate: false, // 默认不发出请求
  initialData: {},
});
export default () => {
  return { Login, tesToken, loginFrom, rules, authInfo };
};
