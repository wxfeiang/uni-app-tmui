import { request } from '@/utils/http';
import { useRequest } from 'alova';
const CONFIG = '/captcha/config';
const CODE = '/captcha/getCode';
const LOGIN = '/login';
const RESCONFIG = '/captcha/getResponseConfig';
const GETDOT = '/system/api/user/getDot';

export const getDot = (config: any) => {
  const methodInstance = request.Post(
    GETDOT,
    // {
    //   useID: 1212,
    // },
    // {
    //   params: {
    //     test: 1,
    //   },
    // },
  );
  methodInstance.meta = {
    resAll: true,
    ignorEencrypt: true,
  };

  return useRequest(methodInstance, config);
};

/**
 * 获取配置
 * @param params
 */
export const captchaConfig = (config: any) => {
  const methodInstance = request.Post(CONFIG);
  methodInstance.meta = {
    ignoreSign: true,
    ignorEencrypt: true,
    resAll: true,
  };

  return useRequest(methodInstance, config);
};

export const getResponseConfig = (config: any) => {
  const methodInstance = request.Post(RESCONFIG);
  methodInstance.meta = {
    ignoreSign: true,
    ignorEencrypt: true,
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
    CODE, // 请求地址
    {},
    {
      responseType: 'arraybuffer', // 配置参数
    },
  );

  methodInstance.meta = {
    ignoreSign: true,
    ignorEencrypt: true,
  };

  return useRequest(methodInstance, config);
}

/**
 * 登录
 * @param params
 */

export function login(params: LoginParams, config: any) {
  return useRequest(request.Post(LOGIN, params), { ...config });
}
