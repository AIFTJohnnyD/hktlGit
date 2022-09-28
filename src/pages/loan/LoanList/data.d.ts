export type TableListItem = {
  key: number;
  company_id: number;

  name: string;
  
  total_amount: number;
  used_amount: number;
  currency: string;

  start_date: string;  
  end_date: string;  
  
  annual_interest_rate: number;
  number_of_installments: number;

  other_cost_description: string;
  other_cost_type: string;
  other_cost_amount: number;
    
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
  company_id?: number;

  name?: string;

  total_amount?: number;
  used_amount?: number;
  currency?: string;

  start_date?: Date;  
  end_date?: Date;

  status: string;
  remark: string;  
  
  pageSize?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};
