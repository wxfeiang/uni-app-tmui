declare interface LoginParams {
  phone: string;
  password: string;
  code?: number | string;
}
declare interface LoginModel {
  token: string;
}
