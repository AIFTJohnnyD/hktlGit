// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { TableListItem } from './data';

/** 获取列表 GET /api/company */
export async function company(
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
  }>('/api/amount/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建 PUT /api/lender */
export async function updateCompany(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListItem>('/api/amount/company', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

/** 删除 DELETE /api/lender */
export async function removeLender(data: { key: number[] }, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/amount/company', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}
