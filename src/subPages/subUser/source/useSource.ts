import router from '@/router'; // js文件使用方法
import {
  getTypeList,
  getcontentDesc,
  getcontentList,
} from '@/services/api/source';
import { arrGroup } from '@/utils';

const { onSuccess: suessTypeList } = getTypeList({
  immediate: true, // 默认不发出请求
  initialData: [],
});

const typeList = ref();
const SegtabList = ref();
const currEntValue = ref([]);
suessTypeList((e: any) => {
  let data = e.data;
  data = data.map((item: any, index: number) => {
    return {
      ...item,
      id: index,
      text: item.type,
    };
  });
  typeList.value = arrGroup(data, (item: any) => item.type);
  SegtabList.value = typeList.value.map((item: any) => item[0]);
  currEntValue.value = typeList.value[activeIndex.value];
});

const activeIndex = ref(0);
const SegtabClick = (e: any) => {
  activeIndex.value = e;
  currEntValue.value = typeList.value[activeIndex.value];
};

const cellClick = (item: any) => {
  router.push({ name: 'sourceList', params: { ...item } });
};

const title = ref('');
const paramsData = ref({});
const curentlist = ref([]);
const { send: getList } = getcontentList({
  immediate: false, // 默认不发出请求
  initialData: [],
});

const suessList = async (params: any) => {
  if (params.type) {
    const data: any = await getList(params);
    curentlist.value = data.list;
  } else {
    return;
  }
};

const paramsDesc = ref({});
const curentDesclist = ref([]);

const { send: getDesc } = getcontentDesc({
  immediate: false, // 默认不发出请求
  initialData: [],
});

const suessDesc = async (params: any) => {
  if (params.type) {
    const data: any = await getDesc(params);
    curentDesclist.value = data.list;
  } else {
    return;
  }
};

export default () => {
  return {
    typeList,
    SegtabList,
    activeIndex,
    cellClick,
    SegtabClick,
    currEntValue,

    suessList,
    paramsData,
    title,
    curentlist,

    suessDesc,
    curentDesclist,
    paramsDesc,
  };
};
