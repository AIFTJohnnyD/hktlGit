import { request } from 'umi';

export async function fakeSubmitForm(params: any) {
  return request('/api/product', {
    method: 'POST',
    data: params,
  });
}

export function get_product_info(params: any) {
  return request('/api/product/get_product_info', {
    method: 'POST',
    data: params,
  });
}