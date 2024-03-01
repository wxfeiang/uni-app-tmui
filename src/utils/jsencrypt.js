import { useSystemStore } from '@/store/modules/system';
import { JSEncrypt } from 'jsencrypt';
const store = useSystemStore();

// 加密
export function encrypt(txt) {
  let setPrivateKey = ''
  if (store.strppd) {
    setPrivateKey = store.state.user.strppd;
  } else {
    return
  }
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(setPrivateKey)

  return encryptor.encrypt(txt) // 对需要加密的数据进行加密
}
// 解密
export function decrypt(txt) {
  let publicKey = ''
  if (store.resstrppd) {
    publicKey = store.resstrppd;
  } else {
    return
  }
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(publicKey)
  return encryptor.decrypt(txt)
}

const rsa = { encrypt, decrypt }
export default rsa;
