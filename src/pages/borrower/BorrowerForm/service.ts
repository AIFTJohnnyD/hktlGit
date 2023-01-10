import { request } from 'umi';

export async function fakeSubmitForm(params: any) {
  return request('/api/stepForm', {
    method: 'POST',
    data: params,
  });
}

export async function submitForm(path:string, params: any) {
  // return request('/api/borrower/' + path, {
  return request('/api/borrower/post_borrower', {
    method: 'POST',
    data: params,
  });
}

export function get_borrower(params: any) {
  return request('/api/borrower/get_borrower', {
    method: 'GET',
    data: params,
  });
}

