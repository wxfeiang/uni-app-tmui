<script lang="ts" setup>
import { getBaseUrl, getEnvValue } from "@/utils/env";
import cloneDeep from "lodash-es/cloneDeep";
import { FormOptions } from "./types/types";
const baseUrl = getEnvValue("VITE_IMG_URL");
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
  uploadUrl: {
    type: String,
    default: () => getEnvValue("VITE_BASE_URL") + getBaseUrl() + "/base/uploadLocal",
  },
});
let model = ref<any>(null);
let rules = ref<any>(null);
let showPicker = ref<any>(null);
//let form = ref<FormInstance | null>()
let edit = ref();

// 初始化表单
let initForm = () => {
  if (props.options && props.options.length) {
    let m: any = {};
    let r: any = {};
    let s: any = {};
    props.options.map((item: FormOptions) => {
      m[item.prop!] = props.formVal[item.prop!];
      r[item.prop!] = item.rules;
      // if (item.type === "editor") {
      //   // 初始化富文加入富文本测试本
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

      // 所有的弹框标志
      if (item.pickerShow == false) {
        s[item.prop!] = item.pickerShow;
      }
      // 单选弹出框option匹配
      if (item.type === "picker") {
        let cur = props.formVal[item.pickerIndex!][0];
        // 转换出显示的内容
        m[item.prop!] = item.typeAttrs.columns.find((i: any) => i.id == cur)?.text ?? "";
      }

      // 单选弹出框option匹配
      if (item.type === "date-picker") {
        console.log("🍩[item.pickerIndex!]:", item.pickerIndex!);
        let cur = props.formVal[item.pickerIndex!];
        console.log("🥘[cur]:", cur);

        //console.log("🥧[cur]:", cur, props.formVal, item.pickerIndex);
        // 转换出显示的内容
        // m[item.prop!] = []; //item.typeAttrs.columns.find((i: any) => i.id == cur)?.text ?? "";
      }
    });

    // model.value = cloneDeep(props.formVal as object);
    model.value = cloneDeep(m);
    console.log("🌭[ model.value]:", model.value);

    rules.value = cloneDeep(r);
    showPicker.value = cloneDeep(s);
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
// 提交
const confirm = (e: any) => {
  console.log(model.value);
};
// 重置
const reset = (e: any) => {
  initForm();
};
</script>

<template>
  <tm-form
    v-model="model"
    :label-width="190"
    v-if="model!"
    @submit="confirm"
    @reset="reset"
  >
    <template v-for="(item, index) in options" :key="index">
      <tm-form-item
        :label="item.label"
        :field="item.prop"
        :rules="item.rules"
        v-bind="item.formItemAttrs"
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
            @click="showPicker[item.prop!] = !showPicker[item.prop!]"
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
            v-model:show="showPicker[item.prop!]"
            :default-value="model[item.pickerIndex!]"
            v-model="model[item.pickerIndex!]"
          ></tm-picker>
        </template>
        <!-- 时间选择范围 -->
        <template v-if="item.type === 'time-between'">
          <view
            @click="showPicker[item.prop!] = !showPicker[item.prop!]"
            class="flex flex-row flex-row-center-between"
          >
            <tm-text
              :userInteractionEnabled="false"
              :label="model[item.prop!].join('~')|| '请选择'"
            ></tm-text>
            <tm-icon
              :userInteractionEnabled="false"
              :font-size="24"
              name="tmicon-angle-right"
            ></tm-icon>
          </view>

          <tm-drawer v-model:show="showPicker[item.prop!]" :height="900" hideHeader>
            <view class="pa-16">
              <tm-time-between
                @confirm="showPicker[item.prop!] = !showPicker[item.prop!]"
                v-model="model[item.pickerIndex!]"
                v-model:model-str="model[item.prop!]"
                :default-value="model[item.pickerIndex!]"
              ></tm-time-between>
            </view>
          </tm-drawer>
        </template>
        <template v-if="item.type === 'city-picker'">
          <!-- 地区选择-->
          <view
            @click="showPicker[item.prop!] = !showPicker[item.prop!]"
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

          <tm-time-picker
            v-model="model[item.prop!]"
            v-model:show="showPicker[item.prop!]"
            v-bind="item.typeAttrs"
          ></tm-time-picker>
        </template>

        <template v-if="item.type === 'city-picker'">
          <!-- 地区选择-->

          <view
            @click="showPicker[item.prop!] = !showPicker[item.prop!]"
            class="flex flex-row flex-row-center-between"
          >
            <tm-text
              :userInteractionEnabled="false"
              :label="model[item.pickerIndex!]|| '请选择'"
            ></tm-text>
            <tm-icon
              :userInteractionEnabled="false"
              :font-size="24"
              name="tmicon-angle-right"
            ></tm-icon>
          </view>
          <tm-city-picker
            v-model="model[item.prop!]"
            v-model:model-str="model[item.pickerIndex!]"
            v-model:show="showPicker[item.prop!]"
            :default-value="model[item.prop!]"
            v-bind="item.typeAttrs"
          >
          </tm-city-picker>
        </template>
        <!-- 日期选择 -->
        <template v-if="item.type === 'date-picker'">
          {{ item.prop! }} ////////{{ item.pickerIndex! }}
          {{ model[item.prop!]







          }}/////===={{ model[item.pickerIndex!] }}
          <view
            @click="showPicker[item.prop!] = !showPicker[item.prop!]"
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

          <tm-calendar
            v-model="model[item.pickerIndex!]"
            v-model:show="showPicker[item.prop!]"
            :default-value="model[item.pickerIndex!]"
            v-model:model-str="model[item.prop!]"
            v-bind="item.typeAttrs"
          ></tm-calendar>
        </template>
        <!-- 特殊键盘 -->
        <template v-if="item.type === 'keyboard'">
          <view
            @click="showPicker[item.prop!] = !showPicker[item.prop!]"
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
          <tm-keyboard
            decimal
            v-bind="item.typeAttrs"
            v-model="model[item.prop!]"
            :default-value="model[item.prop!]"
            v-model:show="showPicker[item.prop!]"
          ></tm-keyboard>
        </template>
        <template v-if="item.type === 'upload'">
          <tm-upload
            :default-value="model[item.prop!]"
            v-model="model[item.prop!]"
            v-bind="item.typeAttrs"
            :url="uploadUrl"
          ></tm-upload>
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
