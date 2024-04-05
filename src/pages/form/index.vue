<script setup lang="ts">
const formVal = ref({
  username: "1212",
  password: "122434",
  radio: 3,
  checkbox: [],
  switch: true,

  rate: 1,
  slider: 40,
  segtab: "2",
  stepper: 20,
  pickerStr: "李子",
  pickerIndex: [2],
});
const options = ref([
  {
    type: "input",
    value: "",
    label: "用户名",
    prop: "username",
    placeholder: "请输入用户名",
    rules: [{ required: true, message: "不能为空" }],
    labelAttrs: {
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
    placeholder: "请选择",
    rules: [{ required: true, message: "请选择" }],
    // labelAttrs: {
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
