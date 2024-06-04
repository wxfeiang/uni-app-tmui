/**
 * @description:  匹配lable  做处理
 * @param {*} data
 * @return {*}
 */
import { file } from '@/tmui/components/tm-upload/upload';
import isArray from "lodash-es/isArray";
import isEmpty from "lodash-es/isEmpty";
import isObject from "lodash-es/isObject";
import isString from "lodash-es/isString";
import { FormOptions } from "./types/types";

/**
 * @description: 默认情况下填入占位符
 * @param {} data
 * @return {}
 */
export const changeProcessing = (data: FormOptions) => {
  let msg = "";
  let inType = "";
  switch (data.type) {
    case "input":
    case "password":
    case "textarea":
    case "number":
      msg = "请输入";
      inType = "input";
      break;
    case "inputnumber":
      msg = "请输入";
      inType = data.type;
      break;
    case "readme":
      msg = "请勾选";
      inType = data.type;
      break;
    default:
      msg = "请选择";
      inType = data.type;
      break;
  }
  return {
    placeholder: msg + data.label,
    inType,
  };
};

/**
 * @description: 处理占位符
 * @param {} data :FormOptions
 * @return {} 加入前缀
 */
export const changePlaceholder = (data: FormOptions) => {
  if (data.placeholderHide) {
    return "";
  }
  if (data.placeholder!) {
    return data.placeholder;
  } else {
    return changeProcessing(data).placeholder;
  }
};

/**
 * @description:  默认情况下填入必填项规则
 * @param {} data
 * @return {}
 */
export const changeRules = (data: FormOptions) => {
  if (data!.rules) {
    return data.rules;
  }
  if (data!.rulesHide!) {
    // 要显示 * 必填
    if (data.rules) {
      return [{ required: true, message: "必填项不能为空 " }, ...data.rules];
    } else {
      let message = data.type === "readme" ? "请阅读后勾选协议!" : "必填项不能为空!";
      return [{ required: true, message }];
    }
  } else {
    return [];
  }
};

export const changeDisabled = (data: FormOptions, disabled: boolean) => {
  if (disabled) {
    if (data.type === 'radio-group' || data.type === 'checkbox-group') {
      if (data?.formGroupAttrs) {
        data.formGroupAttrs.disabled = data.formGroupAttrs.disabled ?? disabled;
      } else {
        data.formGroupAttrs = {
          ...data.formGroupAttrs,
          disabled
        }
      }
    } else {
      if (data?.typeAttrs) {
        data.typeAttrs.disabled = data.typeAttrs.disabled ?? disabled;
      } else {
        data.typeAttrs = {
          ...data.typeAttrs,
          disabled
        }
      }
    }
  }


}

/**
 * @description: 拼接图片地址
 * @param {} data 图片list
 * @param {} url 前缀
 * @return {} []
 */
export const changeDefaultFileList = (data: string | Array<any>, url: string) => {
  let a: string[] = []
  if (isEmpty(data)) {
    return a
  }
  if (isString(data)) {
    a = data.split(",");
  }
  if (isArray(data)) {
    a = data
  }
  return a.map((item) => {
    return url + item
  })

}


/**
 * @description:  上传所需要的图片地址
 * @param {} data
 * @param {} url
 * @return {}
 */
export const changeUploadUrl = (data: Array<any>, url: string) => {
  let a: string[] = []
  if (isEmpty(data)) {
    return a
  } else {
    a = data.map(i => {
      if (isString(i)) {
        return i
      } else if (isObject(i)) {
        let f = i as file

        if (f.response) {
          let p = JSON.parse(f.response)

          f.url = p.data.url
        } else if (f.statusCode == 3) {
          f.url = f.url.replace(url, '')
        } else {
          f.url = ''
        }
        i = f
        return i.url
      }
    }).filter(i => i)
    // 最后删除空数据
    return a
  }
}
