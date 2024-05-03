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

export const useSystemStore = defineStore("systemStore", () => {

  const appSecret = ref("");

  const resstrppd = ref(""); // 解密
  const filterData = ref(<STSCONFIG>{});
  const userDId = ref("");
  const dot = ref("");

  function RESSTRPPD(value: string) {
    resstrppd.value = value;
  }

  function fILTERDATA(value: STSCONFIG) {
    filterData.value = value;
  }
  function DOT(value: string) {
    dot.value = value;
  }

  function initSystemInfo() {
    if (!resstrppd.value || !filterData.value || !dot.value) {
      useSystem(true)
    }
  }
  return {
    RESSTRPPD,
    fILTERDATA,
    DOT,

    appSecret,
    resstrppd,
    filterData,
    userDId,
    dot,
    initSystemInfo,
  };
});
