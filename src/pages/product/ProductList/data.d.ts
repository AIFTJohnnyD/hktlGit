export type TableListItem = {
  key: number;

  product_id: number;

  platform: string,
  product_id_in_platform: string,
  
  url: string,

  title: string;  
  description: string;  

  category_0: string;
  category_1: string;
  category_2: string;
  category_3: string;
  category_4: string;
  category_5: string;

  list_price: number;
  discount_price: number;
  currency: string;

  minimal_demand: number,
  likely_demand: number,
  maximum_demand: number,

  can_analytics: boolean;
  
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

  product_id: number;
  
  platform: string,
  product_id_in_platform: string,
  
  title: string;  
  
  pageSize?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};
