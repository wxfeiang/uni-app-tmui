export interface IData {
  data: any
  expire?: number
}

export default () => {
  /**
   * 设置缓存
   * @param key 缓存的KEY
   * @param data 缓存数据
   * @param expire 过期时间
   */
  function set(key: string, data: any, expire?: number): void {
    let cache: IData = { data, expire }
    if (expire) {
      cache.expire = new Date().getTime() + expire * 1000
    }
    uni.setStorageSync(key, cache)
  }

  /**
   * 获取缓存
   * @param key 缓存的KEY
   * @param defaultValue 缓存不存在时的默认值
   * @returns
   */
  function get(key: string, defaultValue: any = null): any {
    const cacheStore = uni.getStorageSync(key)
    if (cacheStore) {
      const cache = JSON.parse(cacheStore)
      const expire = cache?.expire
      if (expire && expire < new Date().getTime()) {
        uni.removeStorageSync(key)
        return defaultValue
      }
      return cache.data
    }
    return defaultValue
  }

  /**
   * 删除缓存
   * @param key 缓存KEY
   */
  function remove(key: string) {
    uni.removeStorageSync(key)
  }
  /**
   * 删除全部
   * @param key 缓存KEY
   */
  function removeAll(key: string) {
    uni.clearStorageSync()
  }

  return { set, get, remove }
}
