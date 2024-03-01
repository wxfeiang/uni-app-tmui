import { devMode, getBaseUrl } from '@/utils/env';
import AdapterUniapp from '@alova/adapter-uniapp';
import { createAlova } from 'alova';

import { ContentTypeEnum, ResultEnum } from '@/enums/httpEnum';
import { API } from '@/services/model/baseModel';
import { useAuthStore } from '@/store/authStore';
import { checkStatus } from '@/utils/http/checkStatus';
import { Toast } from '@/utils/uniapi/prompt';
import { assign } from 'lodash-es';

// @ts-ignore
import { beforeQuest } from '@/utils/encryptUtils';

const BASE_URL = getBaseUrl();

const HEADER = {
  'Content-Type': ContentTypeEnum.JSON,
  Accept: 'application/json, text/plain, */*',
};

/**
 * alova 请求实例
 * @link
 */
const alovaInstance = createAlova({
  baseURL: BASE_URL,
  ...AdapterUniapp({}),

  timeout: 5000,
  // 在开发环境开启错误日志
  errorLogger: process.env.NODE_ENV === devMode,
  // //在开发环境开启缓存命中日志
  cacheLogger: process.env.NODE_ENV === devMode,
  // 请求拦截器

  beforeRequest: (method) => {
    const authStore = useAuthStore();
    method.config = beforeQuest(method);
    method.config.headers = assign(
      method.config.headers,
      HEADER,
      authStore.getAuthorization(),
    );
    // @ts-ignore
    method.responseType = method.meta?.responseType ?? '';
  },
  responsed: {
    /**
     * 请求成功的拦截器
     * 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
     * @param response
     * @param method
     */
    onSuccess: async (response, method) => {
      const { config, meta } = method;
      const { enableDownload, enableUpload } = config;
      // @ts-ignore
      const { statusCode, data: rawData } = response;
      const { code, msg, data } = rawData as API;
      if (statusCode == 200 && meta && meta?.buffer) {
        return response;
      }

      if (code == 200) {
        if (enableDownload) {
          // 下载处理
          return rawData;
        }
        if (enableUpload) {
          // 上传处理
          return rawData;
        }
        if (meta!.resAll) {
          // 上传处理
          return response;
        }
        if (msg.toLowerCase() === ResultEnum.TYPE) {
          return data as any;
        }
        msg && Toast(msg);
        return Promise.reject(rawData);
      }
      checkStatus(statusCode, msg || '');
      return Promise.reject(rawData);
    },

    /**
     * 请求失败的拦截器，请求错误时将会进入该拦截器。
     * 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
     * @param err
     * @param method
     */
    onError: (err, method) => {
      // error('Request Error!');
      return Promise.reject({ err, method });
    },
  },
});

export const request = alovaInstance;
