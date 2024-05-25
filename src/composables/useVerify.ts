import { captchaImage } from '@/services/api/auth';

// 获取验证码
const { send: getCodeUrl, onSuccess: codeSuccess } = captchaImage({
  immediate: true,
  loading: false,
});
const codeImg = ref('');
const codeflog = ref('');
codeSuccess((event: any) => {
  codeImg.value = 'data:image/svg+xml;base64,' + event.data.data;
});
export default () => {
  return {
    codeImg,
    getCodeUrl,
    codeflog,
  };
}
