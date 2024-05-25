<script setup lang="ts">
import { FormOptions, FormProps } from "@/components/dy-form/types/types";
const dyFromRef = ref<any>(null);
// 默认按钮
const formVal = ref({
  username: "admim",
  password: "123456",
  radio: 3,
  checkbox: [1],
  switch: true,
  rate: 1,
  slider: 40,
  segtab: "2",
  stepper: 20,
  pickerArr: [], // 弹出选中的 和绑定的字段不一样
  time: "2024年5月2日",
  time3: [],
  time3Str: [],
  date: ["2024/12/13"],
  dateStr: "",
  dateArry: "",
  dateStr2: "",
  city: [],
  cityStr: "",
  keyboard: "",
  upload: ["public/uploads/image/1711870662452-0b2e2976-f237-41f9-8ce0-6c0813b3bf6c.png"],
  no: "",
  readme: null,
});
// 数据配置
const options = ref<FormOptions[]>([
  {
    type: "input",
    label: "用户名",
    prop: "username",

    formItemAttrs: {
      desc: "表单项目用户名",
      required: true,
      help: "adifnvi",
    },
    typeAttrs: {
      // suffixLabel: "元",
      // inputPadding: [30, 20],
      // transprent: true,
      // showBottomBotder: false,
    },
  },
  {
    type: "input",
    value: "123456",
    label: "密码",
    prop: "password",
    rulesHide: true,
    formItemAttrs: {
      desc: "这个密码很大",
    },
    typeAttrs: {
      password: true,
      disabled: false,
      // prefix: "tmicon-lock-fill",
    },
  },
  {
    type: "radio-group",
    label: "水果单选",
    prop: "radio",
    placeholder: "请选择",
    rulesHide: true,
    children: [
      {
        text: "苹果",
        id: 1,
      },
      {
        text: "香蕉",
        id: 2,
      },
      {
        text: "李子",
        id: 3,
      },
      {
        text: "椰子",
        id: 4,
      },
    ],
    formGroupAttrs: {
      a: 1,
      disabled: false,
    },
  },
  {
    type: "checkbox-group",
    label: "水果多选",
    prop: "checkbox",
    rulesHide: true,
    children: [
      {
        text: "苹果",
        id: 1,
      },
      {
        text: "香蕉",
        id: 2,
      },
      {
        text: "李子",
        id: 3,
      },
      {
        text: "椰子",
        id: 4,
      },
    ],
  },
  {
    type: "switch",
    label: "状态",
    prop: "switch",

    rules: [{ required: true, message: "请选择状态" }],
  },
  {
    type: "rate",

    label: "评分",
    prop: "rate",

    rules: [{ required: true, message: "请选择状态" }],
  },
  {
    type: "slider",
    label: "滑块",
    prop: "slider",
    rules: [{ required: true, message: "请选择状态" }],
  },
  {
    type: "segtab",

    label: "分割选择",
    prop: "segtab",
    rules: [{ required: true, message: "请选择" }],
    typeAttrs: {
      list: [
        { text: "苹果", id: "1" },
        { text: "啪啪干", id: "2" },
      ],
    },
  },
  {
    type: "stepper",
    label: "分割选择",
    prop: "stepper",
    rules: [{ required: true, message: "请选择" }],
    typeAttrs: {
      width: 200,
      height: 62,
      //	:beforeEnter="beforeEnter"
      // color: "red",
      // linear: "bottom",
      bgColor: "red",
      // circular: true,
    },
  },
  {
    type: "picker",
    label: "弹出选择",
    prop: "pickerStr",
    pickerIndex: "pickerArr",
    pickerShow: false,
    rules: [{ required: true, message: "请选择" }],
    // formItemAttrs: {
    //   class:"flex flex-row flex-row-center-between"
    // },
    typeAttrs: {
      columns: [
        {
          text: "苹果",
          id: 1,
        },
        {
          text: "香蕉",
          id: 2,
        },
        {
          text: "李子",
          id: 3,
        },
        {
          text: "椰子",
          id: 4,
        },
      ],
      selectedModel: "id",
    },
  },
  {
    type: "keyboard",
    label: "特殊键盘",
    prop: "keyboard",
    pickerShow: false,
    typeAttrs: {
      type: "card", // password card car number
      show: false,
    },
  },
  {
    type: "upload",
    label: "截图",
    prop: "upload",
    pickerShow: false,
    placeholder: "请上传截图",
    rulesHide: true,
    typeAttrs: {
      rows: 1,
      width: 420,
      imageHeight: 300,
    },
  },
  {
    type: "time-picker",
    label: "时间选择",
    prop: "time",
    pickerShow: false,
    placeholder: "请选择",
    rules: [{ required: true, message: "请选择时间" }],
    typeAttrs: {
      disabledDate: ["2024-5-23"],
      format: "YYYY年MM月DD日",
      showDetail: {
        year: true,
        month: true,
        day: true,
        hour: false,
        minute: false,
        second: false,
      },
    },
  },
  {
    type: "date-picker",
    value: "",
    label: "日历选择",
    prop: "dateStr",
    pickerIndex: "date",
    placeholder: "请选择",
    pickerShow: false,
    rules: [{ required: true, message: "请选择日期" }],
    typeAttrs: {
      // format: "YYYY年MM月DD日",
      model: "day", ///  day week month quarter year rang
      //start: "2024-01-01",
      // end: "2024-12-31",
    },
  },
  {
    type: "time-between",
    label: "时间范围",
    prop: "time3",
    pickerIndex: "time3Str",
    pickerShow: false,
    placeholder: "请选择",
    rules: [{ required: true, message: "请选择时间" }],
    // typeAttrs: {
    //   // format: "YYYY年MM月DD日",
    //   showDetail: { year: false, month: false, day: false, hour: true },
    // },
  },

  {
    type: "city-picker",
    label: "地区",
    prop: "city",
    pickerShow: false,
    pickerIndex: "cityStr",
    rules: [{ required: true, message: "请选择时间" }],
    typeAttrs: {
      // format: "YYYY年MM月DD日",
      showDetail: { year: true, month: true, day: true, hour: true },
    },
    formRightIconAttrs: {
      fontSize: 30,
      name: "tmicon-position",
    },
  },
  {
    type: "date-picker",
    label: "日期/日历选择",
    prop: "dateArry",
    pickerShow: false,
    pickerIndex: "dateStr2",
    rules: [{ required: true, message: "请选择日期" }],
    typeAttrs: {
      format: "YYYY年MM月DD日",
      model: "day", ///  day week month quarter year rang
      // start: "2024-01-01",
      // end: "2024-12-31",
    },
  },
  {
    type: "input",
    label: "", // 不需要label
    prop: "no",
    placeholder: "请输入用户名",
    rules: [{ required: true, message: "不能为空" }],
    formItemAttrs: {
      desc: "没有label",
      required: true,
      border: false,
    },
    typeAttrs: {
      color: "primary",
      focusColor: "green",
      prefix: "tmicon-user-fill",
      showBottomBotder: false,
      showClear: true,
      align: "right",
      transprent: false,
      right: true,
      slotRightName: "dy-inp-right",
      // callback: (e: any) => {
      //   console.log("🥝回调函数===");
      //   console.log(e);
      // },
    },
  },
  {
    type: "input",
    label: "", // 不需要label
    prop: "no",
    placeholder: "请输入用户名",
    rules: [{ required: true, message: "不能为空" }],
    formItemAttrs: {
      required: true,
    },
    typeAttrs: {
      color: "primary",
      focusColor: "green",
      prefix: "tmicon-user-fill",
      showBottomBotder: false,
      showClear: true,
      align: "right",
      transprent: false,
      // codeImg: true,
      // codeImgAttrs: {
      //   src:
      //     "https://ts1.cn.mm.bing.net/th/id/R-C.ccd320596cb9b0499c2d9e89079c7990?rik=bo30tkANeNk4Aw&riu=http%3a%2f%2fwww.finebornchina.cn%2fuploads%2fallimg%2f140430%2f1-140430150445413.jpg&ehk=Hjpp13uPkWtPTUVLZH%2f7V3MKAnXYJJNjmjRq1TE136k%3d&risl=&pid=ImgRaw&r=0",
      //   callback: (e: any) => {
      //     console.log("🥝回调函数===");
      //     console.log(e);
      //   },
      // },
    },
  },
  {
    type: "readme",
    label: "", // 不需要label
    prop: "readme",
    rulesHide: true,
    typeAttrs: {
      color: "primary",
      label: "《合作协议/隐私协议》",
      url: "https://www.baidu.com", // 要跳转的地址
    },
  },
]);
const submit = (e: any) => {
  console.log("表单项数据", e);
  // 获取格式化的 图片地址
  let a = dyFromRef.value.resultUrl(e.upload);
  console.log("需要的格式化图片地址:", a);
};
// 表单布局配置
const formPros = ref<FormProps>({
  // disabled: true,
  formBtns: [
    {
      formType: "submit",
      label: "提交",
      formBtnAttrs: {
        // disabled: false,
      },
    },
  ],
  formBottomSlot: true,
  formBottomSlotName: "dy-bottom",
  formBottomSlotData: {
    sds: "ddd",
  },
});
</script>
<template>
  <!-- TODO: 选择的回调  -->
  <tm-app>
    <dy-form
      :options="options"
      v-model:formVal="formVal"
      @submit="submit"
      :formPros="formPros"
      ref="dyFromRef"
    >
      <template #dy-inp-right>
        <view> 我是插槽 </view>
      </template>
      <template #dy-bottom="scope">
        <view> 我是底部插槽表单的数据{{ scope }} </view>
        <view> 我是底部插槽表单的数据{{ scope.data }} </view>
        <view> 我是底部插槽表单的数据{{ scope.model?.username }} </view>
      </template>
    </dy-form>
  </tm-app>
</template>
