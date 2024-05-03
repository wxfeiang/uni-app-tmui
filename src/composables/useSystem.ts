import {
  captchaConfig,
  getDot,
  getResponseConfig
} from '@/services/api/system';
import { useSystemStore } from '@/store/modules/system';
import { changeRes } from '@/utils/aes/encryptUtils';
export default (inifConfig: boolean) => {

  const systemStore = useSystemStore();
  const { data: captchaConfigData, onSuccess: sysConfigSuccess } = captchaConfig({
    immediate: inifConfig,
    loading: false,
  });
  sysConfigSuccess((data: any) => {
    const newData = { ...data.data.data.data };
    const code = changeRes(data.data, newData.paramId);
    newData.paramId = code;
    systemStore.fILTERDATA(newData);
  });
  // 处理加密
  const { onSuccess: getDotSuccess } = getDot({
    immediate: inifConfig,
    loading: false,
  });
  getDotSuccess((data: any) => {
    const code = changeRes(data.data, data.data.data.data);
    systemStore.DOT(code);
  });


  // 处理解密
  const { onSuccess: responseConfigSuccess } = getResponseConfig({
    immediate: inifConfig,
    loading: false,
  });
  responseConfigSuccess((data: any) => {
    const code = changeRes(data.data, data.data.data.data.paramRespId);
    systemStore.RESSTRPPD(code);
  });


  // return {
  //   getDotSuccess,
  //   responseConfigSuccess,
  //   sysConfigSuccess
  // };
};
