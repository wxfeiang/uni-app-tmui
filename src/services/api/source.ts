import { request } from '@/utils/http';
import { useRequest } from 'alova';
const TYPELIST = '/myresources/tbbType';
const CONTENTLIST = '/myresources/tbbTypeContList';
/**
 * 获取类型
 * @param params
 */

export function getTypeList(config: any) {
  return useRequest(request.Get(TYPELIST), { ...config });
}

/**
 * 类型类表
 * @param params
 */

export function getcontentList(config: any) {
  return useRequest((newTodo) => request.Post(CONTENTLIST, newTodo), {
    ...config,
  });
}
