import { request } from 'umi';

export async function fakeSubmitForm(params: any) {
  return request('/api/loan', {
    method: 'POST',
    data: params,
  });
}
