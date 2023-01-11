// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { TableListItem } from './data';

/** 获取列表 GET /api/borrower/get_list */
export async function getList(
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
  }>('/api/borrower/get_list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建 PUT /api/borrower/update */
export async function updateItem(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListItem>('/api/borrower/update', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

/** 删除 DELETE /api/borrower/delete */
export async function removeItem(data: { key: number[] }, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/borrower/delete', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}
