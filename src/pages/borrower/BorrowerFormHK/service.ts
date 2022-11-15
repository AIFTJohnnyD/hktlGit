import { request } from 'umi';

export async function submitForm( params: any) {
  return request('/local/seller/base_info', {
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


// export async function submitForm(path:string, params: any) {
//   return request('/api/borrower/' + path, {
//     method: 'POST',
//     data: params,
//   });
// }