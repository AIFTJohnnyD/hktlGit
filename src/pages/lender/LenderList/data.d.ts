export type TableListItem = {
  key: number;

  name: string;  
  br_no: string;
  phone_country_code: string;
  phone: string;
  address: string;
  email: string;

  person: string;
  person_title: string;
  person_office_phone_country_code: string;
  person_office_phone: string;
  person_mobile_phone_country_code: string;
  person_mobile_phone: string;
  person_address: string;
  person_email: string;

  role: string;

  status: string;
  remark: string;  
};

export type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type TableListData = {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
};

export type TableListParams = {
  key?: number;

  name?: string;  
  br_no?: string;
  phone_country_code?: string;
  phone?: string;
  address?: string;
  email?: string; 

  role?: string;
  
  status: string;

  pageSize?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};
