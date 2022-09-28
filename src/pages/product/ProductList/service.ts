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
  }>('/api/product', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建 PUT /api/product */
export async function updateProduct(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListItem>('/api/product', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

/** 删除 DELETE /api/product */
export async function removeProduct(data: { key: number[] }, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/product', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}
