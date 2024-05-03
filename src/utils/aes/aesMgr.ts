import CryptoJS from 'crypto-js';
const secretStr = 'c1e73438-9892-4f31-a334-1e83b147a760';
var key = CryptoJS.enc.Utf8.parse(secretStr.slice(0, 16));
var iv = CryptoJS.enc.Utf8.parse(secretStr.slice(0, 16));

//解密方法
export function Decrypt(word: any, aesRes: any, aesResiv: any) {
  if (aesRes) {
    var key = CryptoJS.enc.Utf8.parse(aesRes.slice(0, 16));
    var iv = CryptoJS.enc.Utf8.parse(aesResiv.slice(0, 16));
  } else {
    return;
  }
  let base64 = CryptoJS.enc.Base64.parse(word);
  let srcs = CryptoJS.enc.Base64.stringify(base64);
  var decrypt = CryptoJS.AES.decrypt(srcs, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr;
}

//加密方法
export function Encrypt(word: any) {
  var srcs = CryptoJS.enc.Utf8.parse(word);
  var encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  var base64Str = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
  return base64Str;
}
