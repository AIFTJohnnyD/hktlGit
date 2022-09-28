export type TableListItem = {
  key: number;
  //borrower_id: number;
  //borrower_name: string;

  name: string,

  gross_merchandising_value: number;
  gross_profit: number;
  marginal_rate_of_return: string;
  average_rate_of_return: string;

  //loan
  loan_id: number;
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
  borrower_id: number;
  
  name: string,
  
  pageSize?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};

export type TableListItemLoan = {
  key: number;
  loan_name: string;
  loan_currency: string;
  
  loan_start_date: string;
  loan_end_date: string;
  
  lower_bound: number;
  upper_bound: number;
  
  annual_interest_rate: number;
  number_of_installments: number;
  
  other_cost_description: string;
  other_cost_type: string;
  other_cost_amount: number;
};
