import { devMode, getBaseUrl } from '@/utils/env';
import AdapterUniapp from '@alova/adapter-uniapp';
import { createAlova } from 'alova';

import { ContentTypeEnum, ResultEnum } from '@/enums/httpEnum';
import { API } from '@/services/model/baseModel';
import { useAuthStore } from '@/store/authStore';
import { beforeQuest, responseAes } from '@/utils/encryptUtils';
import { checkStatus } from '@/utils/http/checkStatus';
import { Toast } from '@/utils/uniapi/prompt';
import { assign } from 'lodash-es';
const BASE_URL = getBaseUrl();
const authStore = useAuthStore();
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
    beforeQuest(method);
    method.config.headers = assign(
      method.config.headers,
      HEADER,
      authStore.getAuthorization(),
    );
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

      const { statusCode, data: rawData } = response as any;
      const { msg, data, code } = rawData as API;
      // 文件流处理形式
      if (statusCode == 200 && config.responseType) {
        return response;
      }
      // 正常数据处理
      if (statusCode == 200) {
        if (meta?.resAll) {
          return response;
        }
        if (enableDownload) {
          // 下载处理
          return rawData;
        }
        if (enableUpload) {
          // 上传处理
          return rawData;
        }

        const resAllData = responseAes(response);
        const { data: rdata, code: rode, msg: rmsg } = resAllData;
        if (rode == ResultEnum.CODE) {
          return rdata as any;
        } else {
          rmsg && Toast(rmsg || 'asdbvabsd');
        }
        checkStatus(statusCode, msg || '');
        return Promise.reject(resAllData);
      }
      //TODO: 小程序端解密key 有问题 ,H5端 系统错误
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
      checkStatus(0);
      return Promise.reject({ err, method });
    },
  },
});

export const request = alovaInstance;
