export type TableListItem = {
  key: string;
  
  name: string;  

  //list_merchandise_group: string[];
  amount_limit: number;
  annual_interest_rate: number;
  probability_of_default: number;
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

/*
export type TableListParams = {
  key?: string;
  id: string;

  name_cn?: string;  
  
  half_month_cash_flow: number;
  amount_limit: number;

  approved_amount: number;
  approved_number: number;

  delinquent_amount: number;
  delinquent_number: number;

  repay_amount: number;
  repay_number: number;

  available_amount: number;
  
  status: string;

  probability_of_default: number;
  loss_given_default: number;
  product_competitiveness: number;

  amount_status: string;  
  amount_remark: string;   

  loan_settlement_amount: number;
  loan_settlement_number: number;

  liquidated_amount: number;
  liquidated_number: number;

  created_date: string;
  approved_date: string;

  pageSize?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};
*/