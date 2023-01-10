export type TableListItem = {
  id: React.Key;

  name_cn: string;
  credit_code_cn: string;

  name_hk: string;
  br_code_hk: string;

  past_one_month_cashflow: number;
  past_three_month_cashflow: number;
  history_apply_times: number;
  history_apply_approval_times: number;
  
  history_default_times: number;
  history_default_ratio: number;
  history_default_money_ratio: number;

  average_rate_of_return: number;
  profit_margin: number;
  quick_ratio: number;
  current_ratio: number;
  cash_ratio: number;
  inventory_turnover: number;
  working_capital_turnover: number;
  debt_to_EBITDA_margin: number;
  interest_coverage_ratio: number;

  application_amount: number;
  interest_rate: number;
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

  name_cn: string;
  credit_code_cn: string;

  name_hk: string;
  br_code_hk: string;

  past_three_month_cashflow: number;
  history_apply_times: number;
  history_apply_approval_times: number;
  
  history_default_times: number;
  history_default_ratio: number;
  history_default_money_ratio: number;
  
  average_rate_of_return: number;
  profit_margin: number;
  quick_ratio: number;
  current_ratio: number;
  cash_ratio: number;
  inventory_turnover: number;
  working_capital_turnover: number;
  debt_to_EBITDA_margin: number;
  interest_coverage_ratio: number;
  
  application_amount: number;
  interest_rate: number;

  pageSize?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};
