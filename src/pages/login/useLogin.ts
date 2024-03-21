import router from '@/router'; // js文件使用方法
import { downFile, login2, testToken } from '@/services/api/auth';
import { useAuthStore } from '@/store/authStore';
import { downBuffFile } from '@/utils';
const authStore = useAuthStore();
//

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
};
const loginFrom = ref(<LoginParams>{
  username: 'admin',
  password: '123456',
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

const { send: tesToken, data: authInfo } = testToken({
  immediate: true, // 默认不发出请求
  initialData: {},
});
console.log('🌽[authInfo]:', authInfo.value);

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
  return { Login, tesToken, loginFrom, rules, authInfo, download };
};
