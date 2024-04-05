

export interface FormOptions {
   // 表单项显示的元素
  type : 'input'| 'textarea'| 'password'|
  'number'| 'inputnumber'|'radio-group' |
  'radio' | 'checkbox-group'| 'checkbox' |'rate' | 'slider' |
  'segtab' | 'switch' | 'upload' | 'text' | 'icon' |'calendar' |
   'city-picker' | 'time-picker' | 'picker' | 'editor' |'stepper' ,
   // 表单项的值
   value?: any,
   pickerIndex: string,
   // 表单项label
   label?: string,
   // 表单项的标识
   prop?: string,
   // 表单项的验证规则
   rules?: any[],
   // 表单项的占位符
   placeholder?: string,
   children?: any[],
   // 表单项其他
   labelAttrs : any,

    // 表单框项其他
    typeAttrs : any,

}
