import { useSystemStore } from '@/store/modules/system';
import CryptoJS from 'crypto-js';
import JSEncrypt from 'jsencrypt';
import { sm2, sm4 } from 'sm-crypto';
const store = useSystemStore();

let API_ENCRYPT_KEY: string =
  'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp5t8glnlZKID+pMuDrOSdHB5ADX3sh9EeSaEk0LdydPKR/+xSp63xlIx1FJRaTdljWDaLx3NTVJn5cyEOV3kXU/2diDVPBUOrfljJGFC1FaZh70tO8KWJNQZErImIHYTeDie5yV9Kk55ZYH6p6zjTWZHZ3+tYKWyLef107twkxQhDSDM6mjKfpT6UCvewLrRLa4CM2HR+bvbizNlVWAtYajhtkmDZdQPNHw92ujqltf5GOBVY98KN+VKfRhor7XZeKaXX23KLAyGzpY+PkhHm5ksG3dDXQdtHjQJ+VZD/EcPBMICTwhfgZsLtwgWbqgEat5j9AHHRyDKmUZkmY+DzQIDAQAB';
let API_ENCRYPT_WHITE = [
  '*.js',
  '*.css',
  '*.json',
  '*.html',
  '*.png',
  '.jpg',
  '.gif',
];
let API_ENCRYPT_PARAM: any = [];
let API_ENCRYPT_EXPAND: any = {};
let API_ENCRYPT_HEADER = 'puubke';
let API_ENCRYPT_ENABLE = true;
let API_ENCRYPR_TYPE = 'aes';
let AES_KEY = '';

export function createFilter<T>(config: T) {
  const utils = {
    getConf: async () => {
      if (store.filterData) {
        const data = store.filterData;

        API_ENCRYPT_KEY = data.paramId || API_ENCRYPT_KEY;
        API_ENCRYPT_ENABLE = data.enable;
        API_ENCRYPT_PARAM = data.paramList;
        API_ENCRYPT_EXPAND = data.expandMap;
        API_ENCRYPT_HEADER = data.headerKey;
        API_ENCRYPR_TYPE = data.type;
      }

      AES_KEY = (await utils.getAesKey()) as string;
      console.log('🥪[AES_KEY]:', AES_KEY);

      utils.onRequest(config);
    },
    onRequest: (config: any) => {
      const aesKey = AES_KEY;
      const body = config.body;
      config.body = utils.syEncry(body, aesKey);
      let headers = { ...config.headers };
      headers[API_ENCRYPT_HEADER] = utils.asyEncry(aesKey, API_ENCRYPT_KEY);
      config.headers = headers;
      return config;
    },
    /**
     * 处理url参数加密
     * @param {*} url
     */
    buildUrl: (url: string, aeskey: string) => {
      url = decodeURIComponent(url);
      let params: any = {},
        tempArr: any = [];
      tempArr = url.split('?')[1].split('&');
      tempArr.forEach((v: string) => {
        if (v.split('=')[0] && v.split('=')[0].indexOf('[]') >= 0) {
          //如果参数是数组 进行处理
          let key = v.split('=')[0].replace(/\[\]/, '');
          if (params[key]) {
            params[key].push(v.split('=')[1]);
          } else {
            params[key] = [v.split('=')[1]];
          }
        } else {
          params[v.split('=')[0]] = v.split('=')[1];
        }
      });
      if (params) {
        params = utils.encryptParam(params, url, aeskey);
        let path = url.split('?')[0] + '?';
        for (var k in params) {
          path +=
            (path.indexOf('=') != -1 ? '&' : '') +
            k +
            '=' +
            encodeURIComponent(params[k]);
        }
        url = path;
      }
      return url;
    },

    md5: (data: string) => {
      return CryptoJS.MD5(data).toString();
    },

    // rsa 加密
    rsaEncrypt: (data: string, key: string) => {
      const encryptTool = new JSEncrypt();
      encryptTool.setPublicKey(key);
      return encryptTool.encrypt(data);
    },

    // aes 加密
    aesEncrypt: (data: string, key: string) => {
      let readyKey = CryptoJS.enc.Utf8.parse(key);
      let readyText = CryptoJS.enc.Utf8.parse(data);
      let encryptedText = CryptoJS.AES.encrypt(readyText, readyKey, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      });
      return encryptedText.toString();
    },

    // sm4加密
    sm4Encrypt: (data: string, key: string) => {
      // @ts-ignore
      return sm4.encrypt(data, key, { mode: 'ecb' });
    },

    //sm2加密
    sm2Encrypt: (data: string, key: string) => {
      return '04' + sm2.doEncrypt(data, key, 1).toUpperCase();
    },

    // 生成随机的加密key
    getAesKey: () => {
      // #ifndef MP-WEIXIN
      if (API_ENCRYPR_TYPE == 'sm') {
        return utils.md5(
          window.crypto.getRandomValues(new Uint32Array(1))[0] as any,
        );
      }
      return utils
        .md5(window.crypto.getRandomValues(new Uint32Array(1))[0] as any)
        .substring(0, 16);
      // #endif
      // #ifdef MP-WEIXIN
      const Key = new Promise((resolve, reject) => {
        // @ts-ignore
        wx.getRandomValues({
          length: 6, // 生成 6 个字节长度的随机数,
          success: (res: any) => {
            // @ts-ignore
            let key = wx.arrayBufferToBase64(res.randomValues);
            // 转换为 base64 字符串后打印
            resolve(key);
          },
        });
      });
      return Key;
      // #endif
    },

    /**
     * AES 加密各参数
     */
    encryptParam: (param: any, url: string, aeskey: string) => {
      let obj: any = {};
      for (let prop in param) {
        if (!param[prop]) {
          obj[prop] = '';
        } else if (API_ENCRYPT_PARAM.indexOf(prop) > -1) {
          obj[prop] = param[prop];
        } else if (Object.keys(API_ENCRYPT_EXPAND).length > 0) {
          let isEncrypt = true;
          for (let k in API_ENCRYPT_EXPAND) {
            let key = k.replaceAll('-', '/');
            let value = API_ENCRYPT_EXPAND[k];
            if (url.indexOf(key) > -1 && value.indexOf(prop) > -1) {
              isEncrypt = false;
            }
          }
          if (isEncrypt) {
            obj[prop] = utils.syEncry(param[prop].toString(), aeskey);
          } else {
            obj[prop] = param[prop];
          }
        } else {
          obj[prop] = utils.syEncry(param[prop].toString(), aeskey);
        }
      }
      return obj;
    },

    // 对称加密
    syEncry: (data: string, key: string) => {
      if (API_ENCRYPR_TYPE == 'sm') {
        return utils.sm4Encrypt(data, key);
      }
      return utils.aesEncrypt(data, key);
    },
    // 非对称加密
    asyEncry: (data: string, key: string) => {
      if (API_ENCRYPR_TYPE == 'sm') {
        return utils.sm2Encrypt(data, key);
      }
      return utils.rsaEncrypt(data, key);
    },
  };

  utils.getConf();
  return config;
}
