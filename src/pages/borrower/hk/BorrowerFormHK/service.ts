import { request } from 'umi';

// export async function fakeSubmitForm(params: any) {
//   return request('/api/advancedForm', {
//     method: 'POST',
//     data: params,
//   });
// }


export async function submitForm(path:string, params: any) {
  return request('/api/borrower/' + path, {
    method: 'POST',
    data: params,
  });
}