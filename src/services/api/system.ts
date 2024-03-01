import { request } from '@/utils/http';
import { useRequest } from 'alova';
const CONFIG = '/captcha/config';
const CODE = '/captcha/getCode';
const LOGIN = '/login';
const RESCONFIG = '/captcha/getResponseConfig';
const GETDOT = '/system/api/user/getDot';
/**
 * 获取配置
 * @param params
 */
export const captchaConfig = (config: any) => {
  const methodInstance = request.Post(CONFIG);
  methodInstance.meta = {
    ignoreEncrypt: true,
    resAll: true,
  };

  return useRequest(methodInstance, config);
};

export const getResponseConfig = (config: any) => {
  const methodInstance = request.Post(RESCONFIG);
  methodInstance.meta = {
    ignoreEncrypt: true,
    resAll: true,
  };

  return useRequest(methodInstance, config);
};

/**
 * 获取验证吗
 * @param params
 */

export function getCode(config: any) {
  const methodInstance = request.Post(
    CODE,
    {},
    {
      responseType: 'arraybuffer',
    },
  );
  methodInstance.meta = {
    ignoreEncrypt: true,
    buffer: true,
    responseType: 'arraybuffer',
  };

  return useRequest(methodInstance, config);
}

export const getDot = (config: any) => {
  const methodInstance = request.Post(GETDOT);
  methodInstance.meta = {
    ignoreEncrypt: true,
    resAll: true,
  };

  return useRequest(methodInstance, config);
};
/**
 * 登录
 * @param params
 */

export function login(params: LoginParams, config: any) {
  return useRequest(request.Post(LOGIN, params), { ...config });
}
