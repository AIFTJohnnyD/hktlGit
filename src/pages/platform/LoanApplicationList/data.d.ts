export type TableListItem = {
  id: React.Key;
  name: string;

  amount: number;
  amount_approved: number;

  list_product: any;

  gross_merchandising_value: number;
  gross_profit: number;

  gmv_expected_sales_ratio: number;
  gmv_lost_sales_ratio: number;
  gmv_left_over_ratio: number;

  cost_expected_sales_ratio: number;
  cost_lost_sales_ratio: number;
  cost_left_over_ratio: number;

  marginal_rate_of_return: number;
  average_rate_of_return: number;
  
  profit_margin: number;

  //bank
  quick_ratio: number;
  current_ratio: number;
  cash_ratio: number;

  inventory_turnover: number;
  working_capital_turnover: number;
  debt_to_EBITDA_margin: number;
  interest_coverage_ratio: number;

  loan_id: number;  

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
  id: React.Key;
  name: string;

  amount: number;
  amount_approved: number;

  list_product: any;

  gross_merchandising_value: number;
  gross_profit: number;

  gmv_expected_sales_ratio: number;
  gmv_lost_sales_ratio: number;
  gmv_left_over_ratio: number;

  cost_expected_sales_ratio: number;
  cost_lost_sales_ratio: number;
  cost_left_over_ratio: number;

  marginal_rate_of_return: number;
  average_rate_of_return: number;
  
  profit_margin: number;

  //bank
  quick_ratio: number;
  current_ratio: number;
  cash_ratio: number;

  inventory_turnover: number;
  working_capital_turnover: number;
  debt_to_EBITDA_margin: number;
  interest_coverage_ratio: number;

  loan_id: number;

  status: string;
  remark: string;  
  
  pageSize?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};
