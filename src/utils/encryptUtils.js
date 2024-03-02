
import { useSystemStore } from '@/store/modules/system';
import { Decrypt } from "@/utils/aesMgr3";
import { createFilter } from "@/utils/filter";
import rsaencrypt from "@/utils/jsencrypt";
import { uuid } from "@/utils/uuid";
import CryptoJS from "crypto-js"; //引用AES源码js

const store = useSystemStore();
const httpParam = {
  appKey: store.appKey,
  appSecret: ''
}
export function getTimeStamp() {
  let date = Date.parse(new Date());
  return date;
}
export function seData(data, url) {
  let params;
  let sign;
  data = data || {};
  let time = getTimeStamp();
  Object.assign(data, {
    appKey: httpParam.appKey,
    userDId: store.userDId,
    timestamp: time,
    //replay: uni.$tm.u.getUid(20),
    replay: uuid(),
  });
  sign = generateSign(data);
  params = JSON.stringify(
    Object.assign({ sign }, data, { userDId: store.encryptId }),
  );


  return params;
}
//加密方法
export function Encrypt(word) {
  let key = '';
  let iv = '';
  if (store.appSecret) {
    let secretStr = store.appSecret;
    key = CryptoJS.enc.Utf8.parse(secretStr.slice(0, 16));
    iv = CryptoJS.enc.Utf8.parse(secretStr.slice(0, 16));
  } else {
    return;
  }
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  let hexStr = encrypted.ciphertext.toString().toUpperCase();
  return hexStr;
}
function objKeySort(obj) {
  //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
  var newkey = Object.keys(obj).sort();
  //创建一个新的对象，用于存放排好序的键值对
  var newObj = {};
  //遍历newkey数组
  for (var i = 0; i < newkey.length; i++) {
    //向新创建的对象中按照排好的顺序依次增加键值对
    newObj[newkey[i]] = obj[newkey[i]];
  }
  //返回排好序的新对象
  return newObj;
}
export function getSign(params) {
  const obj = objKeySort(params);
  const sdata = [];
  for (let key in obj) {
    let value = obj[key];
    if (value !== '' && value !== null && value !== undefined) {
      sdata.push(`${key}=${value}`);
    }
  }
  let signStr = sdata.join('&');
  signStr = CryptoJS.MD5(encodeURIComponent(signStr));
  return signStr;
}
export function generateSign(params) {

  let signMd5 = getSign(params);

  let signAes = Encrypt(signMd5);

  let signFinally = encodeURIComponent(encodeURIComponent(signAes));
  return signFinally
}
// 请求拦截参数处理
export function beforeQuest(config) {

  config.data = seData(config.data, config.url)
  let olaData = {
    body: config.data,
    headers: config.headers,
  }
  let newData = !config.meta?.ignoreEncrypt ? createFilter(olaData) : olaData
  config.data = {}
  config.data = newData.body
  config.headers = newData.headers

  return config

}
// 返回参数解密
export function responseAes(response) {
  let aesRes = rsaencrypt.decrypt(response.headers.responsek)
  let aesResiv = rsaencrypt.decrypt(response.headers.responsev)
  return JSON.parse(Decrypt(response.data, aesRes, aesResiv))
}
