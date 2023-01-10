export type RepaymentListItem = {
  id: string;
  
  installment: number;
  amount: number;

  start_date: Date;  
  end_date: Date;

  status: string;
  remark: string;    
}

export type TableListItem = {
  key: string;
  borrower_key: string;
  borrower_name: string;

  plan_name: number;
  plan_gross_merchandising_value: string;
  
  amount: number;
  currency: string;

  start_date: string;  
  end_date: string;  
  
  status: string;
  remark: string;
  
  list_replayment: RepaymentListItem[];
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
  key?: string;
  borrower_key?: string;
  borrower_name?: string;

  plan_name: number;
  plan_gross_merchandising_value: string;

  amount?: number;
  currency?: string;

  start_date?: Date;  
  end_date?: Date;

  status: string;
  remark: string;  

  list_replayment: RepaymentListItem[];
  
  pageSize?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};

