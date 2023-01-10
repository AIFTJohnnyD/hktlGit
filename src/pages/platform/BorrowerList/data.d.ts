export type TableListItem = {
  key: React.Key;

  name_cn: string;
  credit_code_cn: string;

  name_hk: string;
  br_code_hk: string;

  one_three_month_cashflow: number;
  past_three_month_cashflow: number;
  history_apply_times: number;
  history_apply_approval_times: number;
  
  history_default_times: number;
  history_default_ratio: number;
  history_default_money_ratio: number;
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
  key: React.Key;

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
  
  pageSize?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};
