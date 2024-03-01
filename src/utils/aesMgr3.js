
import CryptoJS from "crypto-js";
//解密方法
export function Decrypt(word, aesRes, aesResiv) {
  if (aesRes) {
    var key = CryptoJS.enc.Utf8.parse(aesRes.slice(0, 16));
    var iv = CryptoJS.enc.Utf8.parse(aesResiv.slice(0, 16));
  } else {
    return
  }
  let base64 = CryptoJS.enc.Base64.parse(word);
  let srcs = CryptoJS.enc.Base64.stringify(base64);
  var decrypt = CryptoJS.AES.decrypt(srcs, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr;
}


export function generateCiphertext(data) {
  let jsonStr = JSON.stringify(data || {});
  return Encrypt(jsonStr);
}


