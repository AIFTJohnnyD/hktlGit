import { request } from 'umi';

export interface StateType {
  status?: 'ok' | 'error';
  currentAuthority?: 'user' | 'guest' | 'admin';
  remark?: '';
}

export interface UserRegisterParams {
  username: string;
  
  password: string;
  confirm: string;
  
  mail: string;

  country_code: string;
  mobile: string;
  captcha: string;
  
  prefix: string;
}

export async function fakeRegister(params: UserRegisterParams) {
  return request('/api/user/register', {
    method: 'POST',
    data: params,
  });
}

export async function sendSmsCode(country_code: string, mobile: string) {
  return request('/api/user/smscode', {
    method: 'POST',
    data: {"country_code": country_code, "mobile": mobile},
  });
}