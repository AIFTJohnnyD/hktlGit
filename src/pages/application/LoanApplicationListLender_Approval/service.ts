import { request } from 'umi';
import { TableListItem } from './data';

export async function updateLoanApplication(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListItem>('/api/loan_application', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}