import { request } from '@/utils/http';
import { useRequest } from 'alova';
const LOGIN = '/employee/login';
const LOGIN_OUT = '/logout';
const REFRESH_TOKEN = '/refresh/token';
const TEST_TOKEN = '/employee/test';
const DOWNFILE = '/employee/exporeList';
const CODEIMG = '/base/captchaImage';
/**
 * 登录
 * @param params
 */
export function login(params: LoginParams) {
  return request.Post(LOGIN, params);
}
export function login2(params: LoginParams, config: any) {
  return useRequest(request.Post(LOGIN, params), { ...config });
}
export function captchaImage(config: any) {
  return useRequest(request.Post(CODEIMG), { ...config });
}

/**
 * 测试token
 * @param params
 */

export const testToken = (config: any) => {
  const methodInstance = request.Get(TEST_TOKEN, {
    params: {
      userId: 1,
    },
  });
  methodInstance.meta = {
    ignoreToken: true,
  };

  return useRequest(methodInstance, config);
};

// export const downFile = (config: any) => {
//   const methodInstance = request.Post(
//     DOWNFILE,
//     {
//       params: {
//         userId: 2,
//       },
//     },
//     {
//       responseType: 'arraybuffer',
//       params: {
//         userId: 2,
//       },
//     },
//   );
//   methodInstance.meta = {
//     ignoreToken: true,
//   };

//   return useRequest(methodInstance, config);
// };
export const downFile = (config: any) => {
  const methodInstance = request.Post(DOWNFILE, {
    params: {
      userId: 2,
    },
    responseType: 'arraybuffer',
  });
  // methodInstance.meta = {
  //   ignoreToken: true,
  // };

  return useRequest(methodInstance, config);
};

/**
 * 登出
 */
export function logout() {
  return request.Post(LOGIN_OUT, {});
}

/**
 * 刷新token
 */
export function refreshToken() {
  return request.Post<LoginModel>(REFRESH_TOKEN, {});
}
