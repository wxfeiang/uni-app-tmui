<script lang="ts" setup>
import cloneDeep from "lodash-es/cloneDeep";
import { FormOptions } from "./types/types";

let props = defineProps({
  // 表单的配置项
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true,
  },
  formVal: {
    type: Object,
    required: true,
    default: () => {
      return {};
    },
  },
  // 用户自定义上传方法
  httpRequest: {
    type: Function,
  },
});
let model = ref<any>(null);
let rules = ref<any>(null);
//let form = ref<FormInstance | null>()
let edit = ref();

// 初始化表单
let initForm = () => {
  if (props.options && props.options.length) {
    let m: any = {};
    let r: any = {};
    props.options.map((item: FormOptions) => {
      // m[item.prop!] =  props.!formVal[item.prop!];
      r[item.prop!] = item.rules;
      // if (item.type === "editor") {
      //   // 初始化富文本
      //   nextTick(() => {
      //     if (document.getElementById("editor")) {
      //       const editor = new E("#editor");
      //       editor.config.placeholder = item.placeholder!;
      //       editor.create();
      //       // 初始化富文本的内容
      //       editor.txt.html(item.value);
      //       editor.config.onchange = (newHtml: string) => {
      //         model.value[item.prop!] = newHtml;
      //       };
      //       edit.value = editor;
      //     }
      //   });
      // }
      // if (item.type === "picker" && item.pickerIndex) {
      //   m[item.pickerIndex!] = props.formVal[item.pickerIndex!];
      // } else {
      //   m[item.prop!] = props.formVal[item.prop!];
      // }
    });
    model.value = cloneDeep(props.formVal as object);
    rules.value = cloneDeep(r);
  }
};
onMounted(async () => {
  await initForm();
});
// 监听父组件传递进来的options
watch(
  () => props.options,
  () => {
    initForm();
  },
  { deep: true }
);
const showPicker = ref(false);

const confirm = (e: any) => {
  console.log(model.value, e.validate);
};
</script>

<template>
  <tm-form v-model="model" :label-width="190" v-if="model!" @submit="confirm">
    <template v-for="(item, index) in options" :key="index">
      <tm-form-item
        :label="item.label"
        :field="item.prop"
        :rules="item.rules"
        v-bind="item.labelAttrs"
      >
        <!-- 单选 -->
        <tm-radio-group v-model="model[item.prop!]" v-if="item.type === 'radio-group'">
          <template v-for="(r, index) in item.children" :key="index">
            <tm-radio :label="r.text" :value="r.id"></tm-radio>
          </template>
        </tm-radio-group>

        <!-- 多选 -->
        <tm-checkbox-group
          v-model="model[item.prop!]"
          v-if="item.type === 'checkbox-group'"
        >
          <template v-for="(r, index) in item.children" :key="index">
            <tm-checkbox :label="r.text" :value="r.id"></tm-checkbox>
          </template>
        </tm-checkbox-group>
        <!-- 开关 -->
        <tm-switch
          v-if="item.type === 'switch'"
          v-model="model[item.prop!]"
          v-bind="item.typeAttrs"
          :default-value="model[item.prop!]"
        ></tm-switch>
        <!--  评分-->
        <tm-rate
          v-if="item.type === 'rate'"
          v-model="model[item.prop!]"
          v-bind="item.typeAttrs"
          :default-value="model[item.prop!]"
        ></tm-rate>
        <!--滑块  -->
        <tm-slider
          v-if="item.type === 'slider'"
          :width="350"
          v-model="model[item.prop!]"
          v-bind="item.typeAttrs"
          :default-value="model[item.prop!]"
        ></tm-slider>
        <!-- 步骤器 -->
        <tm-segtab
          v-if="item.type === 'segtab'"
          :width="350"
          v-model="model[item.prop!]"
          v-bind="item.typeAttrs"
          :default-value="model[item.prop!]"
        ></tm-segtab>
        <!-- 进步 -->
        <tm-stepper
          v-if="item.type === 'stepper'"
          :width="350"
          v-model="model[item.prop!]"
          v-bind="item.typeAttrs"
          :default-value="model[item.prop!]"
        ></tm-stepper>
        <!-- 弹出选择 -->
        <template v-if="item.type === 'picker'">
          <view
            @click="showPicker = !showPicker"
            class="flex flex-row flex-row-center-between"
          >
            <tm-text
              :userInteractionEnabled="false"
              :label="model[item.prop!]|| '请选择'"
            ></tm-text>
            <tm-icon
              :userInteractionEnabled="false"
              :font-size="24"
              name="tmicon-angle-right"
            ></tm-icon>
          </view>
          <tm-picker
            v-bind="item.typeAttrs"
            v-model:model-str="model[item.prop!]"
            v-model:show="showPicker"
            :default-value="model[item.pickerIndex!]"
            v-model="model[item.pickerIndex!]"
          ></tm-picker>
        </template>

        <!-- 默认输入 -->
        <tm-input
          v-if="item.type === 'input'"
          v-model="model[item.prop!]"
          :transprent="true"
          :showBottomBotder="false"
          :placeholder="item.placeholder"
          :label="item.label"
          v-bind="item.typeAttrs"
        >
        </tm-input>
      </tm-form-item>
    </template>
    <tm-form-item :border="false">
      <view class="flex flex-row">
        <view class="flex-1 mr-32">
          <tm-button form-type="submit" label="提交表单" block></tm-button>
        </view>
        <view class="flex-1">
          <tm-button
            :shadow="0"
            text
            form-type="reset"
            label="重置表单"
            block
          ></tm-button>
        </view>
      </view>
    </tm-form-item>
  </tm-form>
</template>
