// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { TableListItem } from './data';

/** 获取列表 GET /api/loan */
export async function loan(
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
  }>('/api/loan', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建 PUT /api/loan */
export async function updateLoan(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListItem>('/api/loan', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

/** 删除 DELETE /api/loan */
export async function removeLoan(data: { key: number[] }, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/loan', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}
