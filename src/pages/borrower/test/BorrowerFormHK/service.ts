import { request } from 'umi';

export async function submitForm( params: any) {
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
