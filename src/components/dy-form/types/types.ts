

export interface FormOptions {
   // 表单项显示的元素
  type : 'input'| 'textarea'| 'password'|
  'number'| 'inputnumber'|'radio-group' |
  'radio' | 'checkbox-group'| 'checkbox' |'rate' | 'slider' |
  'segtab' | 'switch' | 'upload' | 'text' | 'icon' |'calendar' | 'picker'|
  'city-picker' | 'time-picker' | 'date-picker' | 'keyboard'| 'year-picker'  | 'color-picker' | 'ditor' |'stepper' ,
   // 表单项的值
   value?: any,
   pickerIndex?: string,
   // 表单项label
   label?: string,
   // 表单项的标识
   prop?: string,
   // 表单项的验证规则
   rules?: any[],
   // 表单项的占位符
   placeholder?: string,
    // 弹框框
   pickerShow ?:boolean
   // 表单项的子元素
   children?: any[],
   // 表单项其他
   formItemAttrs ?: any,
    // 表单框项其他
   typeAttrs ?: any,



}
