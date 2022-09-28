// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { TableListItem } from './data';

/** 获取列表 GET /api/loan_application_created */
export async function loanApplication_created(
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
  }>('/api/loan_application_created', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取列表 GET /api/loan_application */
export async function loanApplication_progress(
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
  }>('/api/loan_application_progress', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取列表 GET /api/loan_application */
export async function loanApplication_approved(
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
  }>('/api/loan_application_approved', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建 PUT /api/loan_application */
export async function updateLoanApplication(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListItem>('/api/loan_application', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

/** 删除 DELETE /api/loan_application */
export async function removeLoanApplication(data: { key: number[] }, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/loan_application', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}
