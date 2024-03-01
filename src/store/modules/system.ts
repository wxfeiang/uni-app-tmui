export const useSystemStore = defineStore('systemStore', () => {
  const appKey = ref('test');
  const appSecret = ref('');
  const strppd = ref('');
  const resstrppd = ref('');
  const filterData = ref('');
  const secretStr = ref('');

  function SETAPPKEY(value: string) {
    appKey.value = value;
  }

  return {
    SETAPPKEY,
    appKey,
    appSecret,
    strppd,
    resstrppd,
    filterData,
    secretStr,
  };
});
