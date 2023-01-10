import { request } from 'umi';

export async function submitForm(params: any) {
  return request('/api/borrower/upload_file', {
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


export async function downloadForm(params: any) {
  return request('/api/borrower/download_file', {
    method: 'POST',
    data: params,
  });
}