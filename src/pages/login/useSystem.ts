import {
  captchaConfig,
  getCode,
  getDot,
  getResponseConfig,
} from '@/services/api/system';
import { useSystemStore } from '@/store/modules/system';
import { base64_encode } from '@/utils/base64Encode';
import { changeRes } from '@/utils/encryptUtils';
const systemStore = useSystemStore();

const { data: captchaConfigData, onSuccess: sysConfigSuccess } = captchaConfig({
  immediate: true,
  loading: false,
});
sysConfigSuccess((data: any) => {
  const newData = { ...data.data.data.data };
  const code = changeRes(data.data, newData.paramId);

  //
  newData.paramId = code;
  systemStore.fILTERDATA(newData);
});

// 处理解密
const { onSuccess: responseConfigSuccess } = getResponseConfig({
  immediate: true,
  loading: false,
});
responseConfigSuccess((data: any) => {
  const code = changeRes(data.data, data.data.data.data.paramRespId);
  systemStore.RESSTRPPD(code);
});

// 处理加密
const { onSuccess: getDotSuccess } = getDot({
  immediate: true,
  loading: false,
});
getDotSuccess((data: any) => {
  const code = changeRes(data.data, data.data.data.data);
  systemStore.DOT(code);
});

// 获取验证码
const { send: getCodeUrl, onSuccess: codeSuccess } = getCode({
  immediate: true,
  loading: false,
});
const codeImg = ref('');
const codeflog = ref('');
codeSuccess((event: any) => {
  codeflog.value = event.data.header.flag;
  let img = base64_encode(
    new Uint8Array(event.data.data).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      '',
    ),
  );
  codeImg.value = 'data:image/gif;base64,' + img;
});

export default () => {
  return { captchaConfigData, codeImg, getCodeUrl, codeflog };
};
