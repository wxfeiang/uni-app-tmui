<script setup lang="ts">
import { FormOptions } from "@/components/dy-form/types/types";
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

  time: "",
  time2: "",
  time3: [],
  time3Str: [],

  dateStr: "",
  dateArry: [],

  city: [],

  keyboard: "",
  upload: [
    "public/uploads/image/1711870662452-0b2e2976-f237-41f9-8ce0-6c0813b3bf6c.png",
    "public/uploads/image/1711869878456-3045e1d1-c798-46b5-833e-1d03a0755267.jpg",
  ],
});
const options = ref<FormOptions[]>([
  {
    type: "input",

    label: "用户名",
    prop: "username",
    placeholder: "请输入用户名",
    rules: [{ required: true, message: "不能为空" }],
    formItemAttrs: {
      desc: "表单项目用户名",
      required: true,
    },
    typeAttrs: {
      // suffixLabel: "元",
      //inputPadding: [30, 20],
      // transprent: true,
      // showBottomBotder: false,
    },
  },
  {
    type: "input",
    value: "123456",
    label: "密码",
    prop: "password",
    placeholder: "请输入密码",
    rules: [
      {
        required: true,
        message: "用户名不能为空",
        trigger: "blur",
      },
    ],
    typeAttrs: {
      password: true,
      // prefix: "tmicon-lock-fill",
    },
  },

  {
    type: "radio-group",

    label: "水果单选",
    prop: "radio",
    placeholder: "请选择",
    rules: [{ required: true, message: "请选择水果" }],
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
    type: "checkbox-group",

    label: "水果多选",
    prop: "checkbox",
    placeholder: "请选择",
    rules: [{ required: true, message: "请选择水果" }],
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
    placeholder: "请选择",
    rules: [{ required: true, message: "请选择状态" }],
  },
  {
    type: "rate",

    label: "评分",
    prop: "rate",
    placeholder: "请选择",
    rules: [{ required: true, message: "请选择状态" }],
  },
  {
    type: "slider",
    label: "滑块",
    prop: "slider",
    placeholder: "请选择",
    rules: [{ required: true, message: "请选择状态" }],
  },
  {
    type: "segtab",

    label: "分割选择",
    prop: "segtab",
    placeholder: "请选择",
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
    placeholder: "请选择",
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
    placeholder: "请选择",
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
    type: "time-picker",

    label: "时间选择",
    prop: "time",
    pickerShow: false,
    placeholder: "请选择",
    rules: [{ required: true, message: "请选择时间" }],
    typeAttrs: {
      // format: "YYYY年MM月DD日",
      showDetail: { year: false, month: false, day: false, hour: true },
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
    type: "time-picker",
    label: "精确选择",
    prop: "time2",
    pickerShow: false,
    placeholder: "请选择",
    rules: [{ required: true, message: "请选择时间" }],
    typeAttrs: {
      // format: "YYYY年MM月DD日",
      showDetail: { year: true, month: true, day: true, hour: true },
    },
  },
  {
    type: "date-picker",

    label: "日期选择",
    prop: "dateArry",
    pickerShow: false,
    pickerIndex: "dateStr",
    rules: [{ required: true, message: "请选择日期" }],
    typeAttrs: {
      format: "YYYY年MM月DD日",
      model: "day", ///  day week month quarter year rang
      // start: "2024-01-01",
      // end: "2024-12-31",
    },
  },
  {
    type: "city-picker",
    label: "地区选择",
    prop: "city",
    pickerShow: false,
    pickerIndex: "cityStr",
    placeholder: "请选择",
    rules: [{ required: true, message: "请选择时间" }],
    typeAttrs: {
      // format: "YYYY年MM月DD日",
      showDetail: { year: true, month: true, day: true, hour: true },
    },
  },
  {
    type: "keyboard",

    label: "特殊键盘",
    prop: "keyboard",
    pickerShow: false,
    placeholder: "请输入",
    rules: [{ required: true, message: "输入" }],
    typeAttrs: {
      type: "card", // password card car number
    },
  },
  {
    type: "upload",
    label: "截图",
    prop: "upload",
    pickerShow: false,
    placeholder: "请上传截图",
    rules: [{ required: true, message: "请上传截图" }],
    typeAttrs: {
      rows: 3,
      width: 420,
    },
  },
]);
const btn = () => {
  console.log("🍟", formVal.value);
};
</script>
<template>
  <tm-app>
    <tm-sheet> 表单组件 </tm-sheet>
    <tm-sheet @click="btn"> 主组件获取 </tm-sheet>

    <dy-from :options="options" v-model:formVal="formVal"></dy-from>
  </tm-app>
</template>
