import { ResultEnum } from '@/enums/httpEnum';

declare interface API<T = any> {
  code: ResultEnum;
  data?: T;
  msg: string;
  message?: string;
  success?: Boolean;
}

declare interface RESPONSE<T = any> {
  data?: T;
}
