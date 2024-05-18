
interface FormBtns {
  formType: 'submit' | 'reset',
  label: string,
  formBtnAttrs?: any,
  callback?: () => void,
}
interface baseAttrs {
  callback?: () => void,

}
export interface FormOptions {
  // 表单项显示的元素
  type: 'input' | 'textarea' | 'password' |
  'number' | 'inputnumber' | 'radio-group' |
  'radio' | 'checkbox-group' | 'checkbox' | 'rate' | 'slider' |
  'segtab' | 'switch' | 'upload' | 'text' | 'icon' | 'calendar' | 'picker' |
  'city-picker' | 'time-picker' | 'date-picker' | 'time-between' | 'keyboard' | 'year-picker' | 'color-picker' | 'ditor' | 'stepper' | 'readme'
  // 表单项的值
  value?: any,
  pickerIndex?: string,
  // 表单项label
  label?: string,
  // 表单项的标识
  prop?: string,
  // 表单项的验证规则
  rules?: any[],
  // 表单项的验证规则
  rulesHide?: boolean,
  // 表单项的占位符
  placeholder?: string
  // 表单项的占位符不显示
  placeholderHide?: boolean,
  // 弹框框
  pickerShow?: boolean
  // 表单项的子元素
  children?: any[],
  // 表单项其他
  formItemAttrs?: any,
  // 表单框项其他
  typeAttrs?: baseAttrs | any,
  // 表单组
  formGroupAttrs?: any,
  // 表单组项其他
  formGroupItemAttrs?: any,
  // 表单view
  formViewAttrs?: any,
  // 表单右侧图标
  formRightIconAttrs?: any,
  // 表单文本
  formTextAttrs?: any,

}

export interface FormProps {
  // 表单的值
  model?: any,
  // 表单的验证规则
  rules?: any,
  // 表单的属性
  formOptions?: FormOptions[],
  // 表单底部操作按钮
  formBtns?: FormBtns[],
  // 表单顶部插槽
  formTopSlot?: any,
  //  表单顶部
  formTopSlotName?: any,
  // 表单底部插槽
  formBottomSlot?: any,
  // 表单底部插槽名
  formBottomSlotName: string
  // 表单底部插槽数据
  formBottomSlotData?: any,
  // 禁用所有表单项目
  disabled?: boolean,

}
export interface FormEvents {
  // 表单提交
  submit: () => void,
  // 表单重置
  reset: () => void,
  // 表单验证
  validate: () => void,
  // 表单验证
  validateField: (prop: string) => void,
  // 表单验证

}




export interface FormActions {
  // 表单项其他
  formItemAttrs?: any,
  btns: any[],
  formType: string,
}
