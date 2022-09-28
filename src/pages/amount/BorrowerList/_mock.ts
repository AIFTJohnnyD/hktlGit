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

      name: 'Laboratory for AI-Powered Financial Technologies Limited',  
      br_no: '2927232',
      phone_country_code: '+852',
      phone: '34625600',
      address: 'Units 1101-1102 & 1121-1123, Building 19W Science Park West Avenue, Hong Kong Science Park, Shatin, Hong Kong',
      email: 'info@hkaift.com',

      person: 'Chen Dawen',
      person_title: 'Engineer',
      person_office_phone_country_code: '+852',
      person_office_phone: '34625600',
      person_mobile_phone_country_code: '+852',
      person_mobile_phone: '34625600',
      person_address: 'Units 1101-1102 & 1121-1123, Building 19W Science Park West Avenue, Hong Kong Science Park, Shatin, Hong Kong',
      person_email: 'info@hkaift.com',
    
      role: ['lender', 'borrower'] [i % 2],

      status: ['CREATED', 'CLOSED'] [i % 2],
      remark: '',      
    });
  }
  tableListDataSource.reverse();
  return tableListDataSource;
};

let tableListDataSource = genList(1, 100);

function getCompany(req: Request, res: Response, u: string) {
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

  if (params.role) {
    dataSource = dataSource.filter((data) => data.role.includes(params.role || ''));
  }

  if (params.status) {
    dataSource = dataSource.filter((data) => data.status.includes(params.status || ''));
  }
  
  if (params.name) {
    dataSource = dataSource.filter((data) => data.name.includes(params.name || ''));
  }

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

function postCompany(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const body = (b && b.body) || req.body;
  const { key, 
    name,  br_no, phone_country_code, phone, address, email,
    person, person_title, person_office_phone_country_code, person_office_phone,
    person_mobile_phone_country_code, person_mobile_phone, person_address, person_email,
    status, remark} = body;

  switch (req.method) {
    /* eslint no-case-declarations:0 */
    case 'DELETE':
      tableListDataSource = tableListDataSource.filter((item) => key.indexOf(item.key) === -1);
      break;

    case 'PUT':
      (() => {
        let newCompany = {};
        tableListDataSource = tableListDataSource.map((item) => {
          if (item.key === key) {
            newCompany = { ...item, name,  br_no, phone_country_code, phone, address, email,
              person, person_title, person_office_phone_country_code, person_office_phone,
              person_mobile_phone_country_code, person_mobile_phone, person_address, person_email,
              status, remark };
            return { ...item, name,  br_no, phone_country_code, phone, address, email,
              person, person_title, person_office_phone_country_code, person_office_phone,
              person_mobile_phone_country_code, person_mobile_phone, person_address, person_email,
              status, remark };
          }
          return item;
        });
        return res.json(newCompany);
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
  'GET /api/company/list': getCompany,
  'DELETE /api/company/company': postCompany,
  'PUT /api/company/company': postCompany,
};
