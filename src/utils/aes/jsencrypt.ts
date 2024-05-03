import { useSystemStore } from '@/store/modules/system';
import JSEncrypt from 'jsencrypt';



// 加密
export function encrypt(txt: string) {
  const store = useSystemStore();
  let setPrivateKey = '';
  if (store.dot) {
    setPrivateKey = store.dot;
  }
  const encryptor = new JSEncrypt();

  encryptor.setPublicKey(setPrivateKey); // 设置公钥
  return encryptor.encrypt(txt); // 对需要加密的数据进行加密
}
// 解密
export function decrypt(txt: string) {
  const store = useSystemStore();
  let publicKey = '';
  if (store.resstrppd) {
    publicKey = store.resstrppd;
  }
  const encryptor = new JSEncrypt();
  encryptor.setPrivateKey(publicKey);
  return encryptor.decrypt(txt);
}
