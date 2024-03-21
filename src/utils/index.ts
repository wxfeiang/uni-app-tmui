import { isObject } from '@/utils/is';

/**
 * 深度合并
 * @param src
 * @param target
 */
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  for (key in target) {
    src[key] = isObject(src[key])
      ? deepMerge(src[key], target[key])
      : (src[key] = target[key]);
  }
  return src;
}
/**
 * @description:  下载文件
 * @param {} res
 * @return
 */
export function downBuffFile(res: any) {
  let fileName = res.data.header['content-disposition'].replace(
    /\attachment; filename=(.*)/,
    '$1',
  );
  const blob = new Blob([res.data.data], {
    type: res.data.header['content-type'],
  });
  const dom = document.createElement('a');
  const downUrl = window.URL.createObjectURL(blob);
  dom.href = downUrl;
  dom.download = decodeURIComponent(fileName);
  dom.style.display = 'none';
  document.body.appendChild(dom);
  dom.click();
  document.body.removeChild(dom);
}

/**
 * @description: 对数组对象相同的分组
 * @param {} arr 数组
 * @param {} fn (item: any) => item.type
 * @return {} 返回分组后数据
 */
export function arrGroup(arr: any, fn: any) {
  const obj: any = {};
  arr.forEach((item: any) => {
    const key: string = JSON.stringify(fn(item));
    obj[key] = obj[key] || [];
    obj[key].push(item);
  });
  return Object.keys(obj).map((k) => {
    return obj[k];
  });
}
