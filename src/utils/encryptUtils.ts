import { useSystemStore } from '@/store/modules/system';
import { Decrypt, Encrypt } from '@/utils/aesMgr';
import { decrypt } from '@/utils/jsencrypt';
import { uuid } from '@/utils/uuid';
import { Base64 } from 'js-base64'; // 引入
import { md5 } from 'js-md5';
import { createFilter } from './filter';
const store = useSystemStore();
const httpParam = {
  appKey: store.appKey,
  appSecret: '',
};

// 生成时间
export function getTimeStamp() {
  let date = Date.parse(new Date() as any);
  return date;
}
export function convertObjToStr(obj: any) {
  let arr = new Array();
  let num = 0;
  let str = '';
  for (let key in obj) {
    if (typeof obj[key] === 'string') {
      // 判断空格的情况
      obj[key] = obj[key].trim();
    }
    if (obj[key] || obj[key] === false) {
      arr[num] = key;
      num++;
    } else if (obj[key] === 0) {
      arr[num] = key;
      num++;
    }
  }
  let sortArr = arr.sort();
  if (Object.keys(arr).length <= 0) {
    str = '';
  } else {
    for (let i in sortArr) {
      if (obj[sortArr[i]] instanceof Array && obj[sortArr[i]].length !== 0) {
        str = str + sortArr[i] + '=' + JSON.stringify(obj[sortArr[i]]) + '&';
      } else if (
        obj[sortArr[i]] instanceof Array &&
        obj[sortArr[i]].length === 0
      ) {
        str += sortArr[i] + '=[]&';
      } else {
        str += sortArr[i] + '=' + obj[sortArr[i]] + '&';
      }
    }
  }
  return str;
}

// 签名生成
export function sign(obj: any) {
  let str = convertObjToStr(obj);
  str = str.slice(0, str.length - 1);
  let md5Str = md5(str);
  return Encrypt(md5Str);
}

// 请求拦截参数处理
export function beforeQuest(method: any) {
  const { config, data, params } = method;
  const ignoreSign = method?.meta?.ignoreSign;

  // 数据合并转换
  let initParams = {
    appKey: httpParam.appKey,
    timestamp: getTimeStamp(),
    replay: uuid(),
  };

  if (method.type === 'GET') {
    method.params = {
      ...initParams,
      ...params,
    };
    config.headers['sign'] = !ignoreSign ? sign(method.params) : '';
  }
  if (method.type === 'POST') {
    method.data = {
      ...initParams,
      ...data,
    };

    config.headers['sign'] = !ignoreSign ? sign(method.data) : '';
  }
  console.log('🍵[method]:', method);
  const a = createFilter(method);
  return '1212';
}

// 返回数据cont处理配置
export function changeRes(res: any, code: string) {
  let count: number = (res.header.count || res.header.Count) * 1;

  if (count > 0) {
    for (let i = 0; i < count; i++) {
      code = Base64.decode(code);
    }
  }
  return code;
}
// 返回参数解密
export function responseAes(res: any) {
  let aesRes = decrypt(res.header.responsek || res.header.Responsek);
  let aesResiv = decrypt(res.header.responsev || res.header.Responsev);
  if (!aesRes || !aesResiv) {
    return { msg: '解密出现问题了----' };
  }
  return JSON.parse(Decrypt(res.data, aesRes, aesResiv) as any);
}
