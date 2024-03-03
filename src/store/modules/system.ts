interface AuthState {
  token?: string;
}
interface STSCONFIG {
  paramId: string;
  enable: boolean;
  paramList: any;
  expandMap: any;
  headerKey: string;
  type: string;
}

export const useSystemStore = defineStore('systemStore', () => {
  const appKey = ref('test');
  const appSecret = ref('');
  const strppd = ref('');
  const resstrppd = ref('');
  const filterData = ref({} as STSCONFIG);
  const secretStr = ref('');
  const encryptId = ref('');
  const userDId = ref('');

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
    encryptId,
    userDId,
  };
});
