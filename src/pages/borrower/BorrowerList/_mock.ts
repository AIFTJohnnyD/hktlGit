// eslint-disable-next-line import/no-extraneous-dependencies
import type { Request, Response } from 'express';
import { parse } from 'url';
import type { TableListItem, TableListParams } from './data.d';

// mock tableListDataSource
const genList = (current: number, pageSize: number) => {
  const tableListDataSource: TableListItem[] = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i;
    tableListDataSource.push({
      key: index,
      company_id: index,

      name: `Loan No. ${index}`,

      total_amount: index * 10000,
      used_amount: index * 100,
      currency: ['HKD', 'CNY', 'USD'] [i % 3],
    
      start_date: '2021-01-01',
      end_date: '2021-01-01',

      annual_interest_rate: 0.1,
      number_of_installments: 3,
    
      other_cost_description: 'Other Cost',
      other_cost_type: 'Fee',
      other_cost_amount: 10,

      status: ['ACTIVE', 'INACTIVE'] [i % 2],
      remark: '',      
    });
  }
  tableListDataSource.reverse();
  return tableListDataSource;
};

let tableListDataSource = genList(1, 100);

function getLoan(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  const params = parse(realUrl, true).query as unknown as TableListParams;

  let dataSource = [...tableListDataSource].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );
  if (params.sorter) {
    const sorter = JSON.parse(params.sorter as any);
    dataSource = dataSource.sort((prev, next) => {
      let sortNumber = 0;
      Object.keys(sorter).forEach((key) => {
        if (sorter[key] === 'descend') {
          if (prev[key] - next[key] > 0) {
            sortNumber += -1;
          } else {
            sortNumber += 1;
          }
          return;
        }
        if (prev[key] - next[key] > 0) {
          sortNumber += 1;
        } else {
          sortNumber += -1;
        }
      });
      return sortNumber;
    });
  }

  if (params.filter) {
    const filter = JSON.parse(params.filter as any) as Record<string, string[]>;
    if (Object.keys(filter).length > 0) {
      dataSource = dataSource.filter((item) => {
        return Object.keys(filter).some((key) => {
          if (!filter[key]) {
            return true;
          }
          if (filter[key].includes(`${item[key]}`)) {
            return true;
          }
          return false;
        });
      });
    }
  }

  if (params.key) {
    dataSource = dataSource.filter((data) => data.key == params.key );
  }

  if (params.name) {
    dataSource = dataSource.filter((data) => data.name.includes(params.name || ''));
  }

  /*
  if (params.company_name) {
    dataSource = dataSource.filter((data) => data.company_name.includes(params.company_name || ''));
  }
  */

  let finalPageSize = 10;
  if (params.pageSize) {
    finalPageSize = parseInt(`${params.pageSize}`, 10);
  }

  const result = {
    data: dataSource,
    total: tableListDataSource.length,
    success: true,
    pageSize: finalPageSize,
    current: parseInt(`${params.currentPage}`, 10) || 1,
  };

  return res.json(result);
}

function postLoan(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const body = (b && b.body) || req.body;
  const { key, company_id, name, 
    total_amount, used_amount, currency,
    start_date, end_date,
    annual_interest_rate, number_of_installments,
    other_cost_description, other_cost_type, other_cost_amount,
    status, remark} = body;

  switch (req.method) {
    /* eslint no-case-declarations:0 */
    case 'DELETE':
      tableListDataSource = tableListDataSource.filter((item) => key.indexOf(item.key) === -1);
      break;

    case 'PUT':
      (() => {
        let newLoan = {};
        tableListDataSource = tableListDataSource.map((item) => {
          if (item.key === key) {
            newLoan = { ...item, company_id, name, 
              total_amount, used_amount, currency,
              start_date, end_date,
              annual_interest_rate, number_of_installments,
              other_cost_description, other_cost_type, other_cost_amount,
              status, remark };
            return { ...item, company_id, name, 
              total_amount, used_amount, currency,
              start_date, end_date,
              annual_interest_rate, number_of_installments,
              other_cost_description, other_cost_type, other_cost_amount,
              status, remark };
          }
          return item;
        });
        return res.json(newLoan);
      })();
      return;
    
    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };

  res.json(result);
}

export default {
  'GET /api/loan': getLoan,
  'DELETE /api/loan': postLoan,
  'PUT /api/loan': postLoan,
};
