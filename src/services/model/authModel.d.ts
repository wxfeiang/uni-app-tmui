declare interface LoginParams {
  phone: string;
  password: string;
  code?: number | string;
  verifyCode?: string;
}
declare interface LoginModel {
  token: string;
}

declare interface resData {

  code?: number | string;
  data?: any
}
