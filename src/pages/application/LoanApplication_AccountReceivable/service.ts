import { request } from 'umi';
import { TableListItem } from './data';

/** 获取列表 GET /api/loan_application */
export async function loanApplication(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: TableListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  }>('/api/loan_application', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function fakeSubmitForm(params: any) {
  return request('/api/application', {
    method: 'PUT',
    data: params,
  });
}

export async function getBorrowerId(params: any) {
  return request('/api/Borrower/get_id', {
    method: 'PUT',
    data: params,
  });
}

