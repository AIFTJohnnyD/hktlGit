// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { TableListItem } from './data';

/** 获取列表 GET /api/product */
export async function product(
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
  }>('/api/application', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建 PUT /api/product */
export async function applyProduct(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListItem>('/api/application', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

/** 删除 DELETE /api/product */
export async function removeApplication(data: { key: number[] }, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/plan', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}

/*
export async function applyProducts(data: { key: number[] }, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/application', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}
*/

export async function get_listloan(params: any) {
  return request('/api/application/listloan', {
    method: 'GET',
    data: params,
  });
}
