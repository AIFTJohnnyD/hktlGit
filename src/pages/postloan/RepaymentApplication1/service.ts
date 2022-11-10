// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { TableListItem } from './data';

/** 获取列表 GET /api/loan_application/postloan */
export async function loanApplicationPostloan(
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
  }>('/api/loan_application/postloan', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建 PUT /api/loan_application */
export async function updateLoanApplication_postloan(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListItem>('/api/loan_application/update_postloan', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

