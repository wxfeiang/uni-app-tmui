<script lang="ts" setup>
import { getBaseUrl, getEnvValue } from "@/utils/env";
import cloneDeep from "lodash-es/cloneDeep";
import { FormOptions, FormProps } from "./types/types";
import {
  changeDefaultFileList,
  changeDisabled,
  changePlaceholder,
  changeRules,
  changeUploadUrl,
} from "./utils";
const baseUrl = getEnvValue("VITE_IMG_URL");

const emit = defineEmits<{
  (e: "submit", value: any): void;
  (e: "reset", value: any): void;
}>();
let props = defineProps({
  // 表单的配置
  formPros: {
    type: Object as PropType<FormProps>,
    default: () => {
      return {
        formBtns: [
          {
            formType: "submit",
            label: "提交",
          },
          {
            formType: "reset",
            label: "重置",
            formBtnAttrs: {
              shadow: 0,
              text: true,
            },
          },
        ],
      };
    },
  },
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

// 初始化表单
let initForm = () => {
  if (props.options && props.options.length) {
    let m: any = {};
    let r: any = {};
    let s: any = {};
    let f: any = {};
    props.options.map((item: FormOptions) => {
      m[item.prop!] = props.formVal[item.prop!];
      r[item.prop!] = changeRules(item);
      item.placeholder = changePlaceholder(item);
      // 整体表单禁用a
      changeDisabled(item, props.formPros?.disabled || false);

      //TODO: 富文本编辑器功能开发中

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
        // console.log("🍩[item.pickerIndex!]:", item.pickerIndex!);
        //let cur = props.formVal[item.pickerIndex!];
        //console.log("🥘[cur]:", cur);
        //console.log("🥧[cur]:", cur, props.formVal, item.pickerIndex);
        // 转换出显示的内容
        // m[item.prop!] = []; //item.typeAttrs.columns.find((i: any) => i.id == cur)?.text ?? "";
      }
      if (item.type === "upload") {
        m[item.prop!] = changeDefaultFileList(props.formVal[item.prop!], baseUrl);
      }
    });

    // model.value = cloneDeep(props.formVal as object);
    model.value = cloneDeep(m);
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
// 弹出选择框
const handPicker = (item: FormOptions) => {
  if (!item.typeAttrs?.disabled) {
    showPicker.value[item.prop!] = !showPicker.value[item.prop!];
  }
};
// 阅读handReadme
const handReadme = (item: FormOptions) => {
  item.typeAttrs?.callback && item.typeAttrs.callback(item);
};
// 提交表单
const confirm = (e: any) => {
  if (e.validate) {
    // 校验通过 抛出表单项目
    emit("submit", model.value);
  }
};
// 确定图片上传地址
const resultUrl = (urls: string[]) => {
  let nurls = cloneDeep(urls);
  return changeUploadUrl(nurls, baseUrl);
};
// 重点！！这里需要使用defineExpose暴露出去
defineExpose({
  resultUrl,
});
</script>
<template>
  <template v-if="formPros!.formTopSlot">
    <slot :name="formPros.formTopSlotName"></slot>
  </template>
  <tm-form v-model="model" :label-width="190" v-if="model!" @submit="confirm">
    <template v-for="(item, index) in options" :key="index">
      <tm-form-item
        :label="item.label"
        :field="item.prop"
        :rules="rules[item.prop!]"
        v-bind="item.formItemAttrs"
      >
        <!-- 单选 -->
        <template v-if="item.type === 'radio-group'">
          <tm-radio-group v-model="model[item.prop!]" v-bind="item.formGroupAttrs">
            <template v-for="(r, rIndex) in item.children" :key="rIndex">
              <tm-radio :label="r.text" :value="r.id"></tm-radio>
            </template>
          </tm-radio-group>
        </template>

        <!-- 多选 -->
        <template v-if="item.type === 'checkbox-group'">
          <tm-checkbox-group v-model="model[item.prop!]" v-bind="item.formGroupAttrs">
            <template v-for="(r, rIndex) in item.children" :key="rIndex">
              <tm-checkbox :label="r.text" :value="r.id"></tm-checkbox>
            </template>
          </tm-checkbox-group>
        </template>
        <template v-if="item.type === 'readme'">
          <tm-checkbox
            :round="10"
            v-model="model[item.prop!]"
            v-bind="item.formGroupItemAttrs"
          >
            <template v-slot:default="{ checked }">
              <view class="flex flex-row">
                <tm-text v-bind="item.formTextAttrs"></tm-text>
                <view>
                  <tm-text
                    v-bind="item.typeAttrs"
                    @click.stop="handReadme(item.typeAttrs.url)"
                  ></tm-text>
                </view>
              </view>
            </template>
          </tm-checkbox>
        </template>

        <!-- 开关 -->
        <template v-if="item.type === 'switch'">
          <tm-switch
            v-model="model[item.prop!]"
            v-bind="item.typeAttrs"
            :default-value="model[item.prop!]"
          ></tm-switch>
        </template>

        <!--  评分-->
        <template v-if="item.type === 'rate'">
          <tm-rate
            v-model="model[item.prop!]"
            v-bind="item.typeAttrs"
            :default-value="model[item.prop!]"
          ></tm-rate>
        </template>

        <!--滑块  -->
        <template v-if="item.type === 'slider'">
          <tm-slider
            :width="350"
            v-model="model[item.prop!]"
            v-bind="item.typeAttrs"
            :default-value="model[item.prop!]"
          ></tm-slider>
        </template>

        <!-- 步骤器 -->
        <template v-if="item.type === 'segtab'">
          <tm-segtab
            v-if="item.type === 'segtab'"
            :width="350"
            v-model="model[item.prop!]"
            v-bind="item.typeAttrs"
            :default-value="model[item.prop!]"
          ></tm-segtab>
        </template>

        <!-- 进步 -->
        <template v-if="item.type === 'stepper'">
          <tm-stepper
            :width="350"
            v-model="model[item.prop!]"
            v-bind="item.typeAttrs"
            :default-value="model[item.prop!]"
          ></tm-stepper>
        </template>

        <!-- 弹出选择 -->
        <template v-if="item.type === 'picker'">
          <view @click="handPicker(item)" class="flex flex-row flex-row-center-between">
            <tm-text
              :userInteractionEnabled="false"
              :label="model[item.prop!]|| item.placeholder"
              :color="model[item.prop!]? '#000':'grey'"
            ></tm-text>
            <tm-icon
              :userInteractionEnabled="false"
              :font-size="24"
              name="tmicon-angle-right"
              v-bind="item.formRightIconAttrs"
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
        <!-- 时间选择 -->
        <template v-if="item.type === 'time-picker'">
          <view @click="handPicker(item)" class="flex flex-row flex-row-center-between">
            <tm-text
              :userInteractionEnabled="false"
              :label="model[item.prop!]|| item.placeholder"
              :color="model[item.prop!]? '#000':'grey'"
            ></tm-text>
            <tm-icon
              :userInteractionEnabled="false"
              :font-size="24"
              name="tmicon-angle-right"
              v-bind="item.formRightIconAttrs"
            ></tm-icon>
          </view>

          <tm-time-picker
            v-model="model[item.prop!]"
            v-model:show="showPicker[item.prop!]"
            v-bind="item.typeAttrs"
            v-model:model-str="model[item.prop!]"
            :defaultValue="model[item.prop!]"
          ></tm-time-picker>
        </template>
        <!-- 时间选择范围 -->
        <template v-if="item.type === 'time-between'">
          <view @click="handPicker(item)" class="flex flex-row flex-row-center-between">
            <tm-text
              :userInteractionEnabled="false"
              :label="model[item.prop!].join('~')|| item.placeholder"
              :color="model[item.prop!].length>0 ? '#000':'grey'"
            ></tm-text>
            <tm-icon
              :userInteractionEnabled="false"
              :font-size="24"
              name="tmicon-angle-right"
              v-bind="item.formRightIconAttrs"
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

        <!-- 地区选择-->
        <template v-if="item.type === 'city-picker'">
          <view @click="handPicker(item)" class="flex flex-row flex-row-center-between">
            <tm-text
              :userInteractionEnabled="false"
              :label="model[item.pickerIndex!]|| item.placeholder"
              :color="model[item.prop!].length>0 ? '#000':'grey'"
            ></tm-text>
            <tm-icon
              :userInteractionEnabled="false"
              name="tmicon-angle-right"
              :font-size="24"
              v-bind="item.formRightIconAttrs"
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
        <!-- 日期/日历选择 -->
        <template v-if="item.type === 'date-picker'">
          <view @click="handPicker(item)" class="flex flex-row flex-row-center-between">
            <tm-text
              :userInteractionEnabled="false"
              :label="model[item.prop!]|| item.placeholder"
              :color="model[item.prop!]? '#000':'grey'"
            ></tm-text>
            <tm-icon
              :userInteractionEnabled="false"
              :font-size="24"
              name="tmicon-angle-right"
              v-bind="item.formRightIconAttrs"
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
          <view @click="handPicker(item)" class="flex flex-row flex-row-center-between">
            <tm-text
              :userInteractionEnabled="false"
              :label="model[item.prop!]|| '请选择'"
              :color="model[item.prop!]? '#000':'grey'"
            ></tm-text>
            <tm-icon
              :userInteractionEnabled="false"
              :font-size="24"
              name="tmicon-angle-right"
              v-bind="item.formRightIconAttrs"
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
            :defaultValue="model[item.prop!]"
            v-model="model[item.prop!]"
            :url="uploadUrl"
            v-bind="item.typeAttrs"
          ></tm-upload>
        </template>

        <!-- 默认输入 -->
        <template v-if="item.type === 'input'">
          <tm-input
            v-model="model[item.prop!]"
            :transprent="true"
            :showBottomBotder="false"
            :placeholder="item.placeholder"
            :label="item.label"
            v-bind="item.typeAttrs"
          >
            <template #right v-if="item.typeAttrs.codeImg!">
              <template v-if="item.typeAttrs.codeImgAttrs!.src">
                <tm-image
                  :width="200"
                  :height="50"
                  v-bind="item.typeAttrs.codeImgAttrs"
                  @click="item.typeAttrs.codeImgAttrs?.callback()"
                ></tm-image>
              </template>
              <template v-else>
                <view
                  v-html="item.typeAttrs.codeImgAttrs!.htmlcallback && item.typeAttrs.codeImgAttrs!.htmlcallback()"
                  @click="item.typeAttrs.codeImgAttrs!.callback() "
                ></view>
              </template>
            </template>
            <template #right v-if="item.typeAttrs.right">
              <slot
                :name="item.typeAttrs.slotRightName"
                @click="item.typeAttrs.codeImgAttrs?.callback()"
              ></slot>
            </template>
            <template #left v-if="item.typeAttrs.left">
              <slot :name="item.typeAttrs.slotLeftName"></slot>
            </template>
          </tm-input>
        </template>
      </tm-form-item>
    </template>
    <tm-form-item :border="false">
      <view class="flex flex-row gap-10" v-if="formPros!.formBtns!.length>0">
        <view class="flex-1" v-for="(item ,index) in formPros!.formBtns" :key="index">
          <tm-button
            :form-type="item.formType"
            :label="item.label"
            block
            :disabled="formPros.disabled"
            v-bind="item.formBtnAttrs"
          ></tm-button>
        </view>
      </view>
    </tm-form-item>
  </tm-form>
  <template v-if="formPros!.formBottomSlot">
    <slot
      :name="formPros.formBottomSlotName"
      :data="formPros!.formBottomSlotData"
      :model="model"
    ></slot>
  </template>
</template>
