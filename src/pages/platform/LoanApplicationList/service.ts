// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { TableListItem } from './data';

/** 获取列表 GET /api/platform/loan_application_list */
export async function loanApplicationList(
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
  }>('/api/platform/loan_application_list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

