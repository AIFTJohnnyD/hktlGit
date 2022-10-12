import { request } from 'umi';

export async function fakeSubmitForm(params: any) {
  return request('/api/application', {
    method: 'PUT',
    data: params,
  });
}
