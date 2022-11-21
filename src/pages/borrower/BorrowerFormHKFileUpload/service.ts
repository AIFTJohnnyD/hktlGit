import { request } from 'umi';

// export async function fakeSubmitForm(params: any) {
//   return request('/api/advancedForm', {
//     method: 'POST',
//     data: params,
//   });
// }


export async function submitForm(params: any) {
  return request('/api/borrower/upload_file', {
    method: 'POST',
    data: params,
  });
}
export async function deleteForm(params: any) {
  return request('/api/borrower/delete_file', {
    method: 'POST',
    data: params,
  });
}
export async function downloadForm(params: any) {
  return request('/api/borrower/download_file', {
    method: 'POST',
    data: params,
  });
}