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



export async function updateLoanApplication(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListItem>('/api/loan_application', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}