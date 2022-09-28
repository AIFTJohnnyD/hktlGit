import { request } from 'umi';

export async function fakeSubmitForm(params: any) {
  return request('/api/lender/index', {
    method: 'POST',
    data: params,
  });
}

export async function get_lender(params: any) {
  return request('/api/lender/company', {
    method: 'GET',
    data: params,
  });
}