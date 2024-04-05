/**
 * @description:  匹配lable  做处理
 * @param {*} data
 * @return {*}
 */
import { FormOptions } from "./types/types";
export const typeProcessing = (data:FormOptions) => {
  let msg = ''
  let inType = ''
  switch (data.type) {
    case 'input':
    case 'password':
    case 'textarea':
    case 'number':
      msg = '请输入'
      inType = 'input'
      break
    case 'inputnumber':
      msg = '请输入'
      inType = data.type
      break

    default:
      msg = '请选择'
      inType = data.type
      break
  }
  return {
    placeholder: msg + data.label,
    inType
  }
}
