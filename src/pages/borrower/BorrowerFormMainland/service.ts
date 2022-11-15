import { request } from 'umi';

export async function submitForm(path:string, params: any) {
  return request('/local/seller/base_info', {
    method: 'POST',
    data: params,
  });
}