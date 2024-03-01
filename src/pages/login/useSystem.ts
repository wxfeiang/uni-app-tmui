import {
  captchaConfig,
  getCode,
  getDot,
  getResponseConfig,
} from '@/services/api/system';
import { useAuthStore } from '@/store/authStore';
import { base64_encode } from '@/utils/base64Encode';
const authStore = useAuthStore();

const { data: captchaConfigData } = captchaConfig({
  immediate: true,
  loading: false,
});

const { data: getResponseConfigData, onSuccess: responseConfigSuccess } =
  getResponseConfig({
    immediate: true,
    loading: false,
  });
responseConfigSuccess((data: any) => {
  //
});

const { onSuccess: getDotSuccess } = getDot({
  immediate: true,
  loading: false,
});
getDotSuccess((data: any) => {
  //
  console.log('🥑', data);
});

// 获取验证
const { send: getCodeUrl, onSuccess: codeSuccess } = getCode({
  immediate: true,
  loading: false,
});
const codeImg = ref('');
codeSuccess((event: any) => {
  let img = base64_encode(
    new Uint8Array(event.data.data).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      '',
    ),
  );
  codeImg.value = 'data:image/gif;base64,' + img;
});

export default () => {
  return { getResponseConfigData, captchaConfigData, codeImg, getCodeUrl };
};
