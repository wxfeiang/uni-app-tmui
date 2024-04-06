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
  pickerStr: "李子",
  pickerIndex: [3],

  date: [],
  dateStr: "",

  time: "",
  time2: "",
  city: [],
  cityStr: "",
  keyboard: "",
});
const options = ref<FormOptions[]>([
  {
    type: "input",
    value: "",
    label: "用户名",
    prop: "username",
    placeholder: "请输入用户名",
    rules: [{ required: true, message: "不能为空" }],
    formItemAttrs: {
      desc: "表单项目用户名",
      required: true,
    },
    typeAttrs: {
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
    value: "",
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
    value: "",
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
    value: "",
    label: "状态",
    prop: "switch",
    placeholder: "请选择",
    rules: [{ required: true, message: "请选择状态" }],
  },
  {
    type: "rate",
    value: "",
    label: "评分",
    prop: "rate",
    placeholder: "请选择",
    rules: [{ required: true, message: "请选择状态" }],
  },
  {
    type: "slider",
    value: "",
    label: "滑块",
    prop: "slider",
    placeholder: "请选择",
    rules: [{ required: true, message: "请选择状态" }],
  },
  {
    type: "segtab",
    value: "",
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
    value: "",
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
    value: "",
    label: "弹出选择",
    prop: "pickerStr",
    pickerIndex: "pickerIndex",
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
    type: "date-picker",
    value: "",

    label: "日期选择",
    prop: "date",
    pickerIndex: "dateStr",
    placeholder: "请选择",
    pickerShow: false,
    rules: [{ required: true, message: "请选择日期" }],
    // formItemAttrs: {
    //   class:"flex flex-row flex-row-center-between"
    // },
    typeAttrs: {
      format: "YYYY年MM月DD日",
      model: "quarter", ///  day week month quarter year rang
      dateStyle: [
        // 选中特定日期
        // {
        //   date: "2022-12-8", //日期
        //   text: false, //浅色背景。
        //   color: "red", //主题色.
        //   extra: "测试", //额外的内容，在日期下方显示的文本。
        // },
        // {
        //   date: "2022-12-24", //日期
        //   text: false, //浅色背景。
        //   color: "orange", //主题色.
        //   extra: "签到", //额外的内容，在日期下方显示的文本。
        // },
      ],
    },
  },
  {
    type: "time-picker",
    value: "",
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
    type: "time-picker",
    value: "",
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
    type: "city-picker",
    value: "",
    label: "地区选择",
    prop: "cityStr",
    pickerShow: false,
    pickerIndex: "city",
    placeholder: "请选择",
    rules: [{ required: true, message: "请选择时间" }],
    typeAttrs: {
      // format: "YYYY年MM月DD日",
      showDetail: { year: true, month: true, day: true, hour: true },
    },
  },
  {
    type: "keyboard",
    value: "",
    label: "特殊键盘",
    prop: "keyboard",
    pickerShow: false,
    placeholder: "请输入",
    rules: [{ required: true, message: "输入" }],
    typeAttrs: {
      type: "card", // password card car number
    },
  },
]);
</script>
<template>
  <tm-app>
    <tm-sheet> 表单组件 </tm-sheet>

    <dy-from :options="options" :formVal="formVal"></dy-from>
  </tm-app>
</template>
