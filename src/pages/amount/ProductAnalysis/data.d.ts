import { DataItem } from '@antv/g2plot/esm/interface/config';

export { DataItem };

//IntroduceRow
export type Product = {
  id: string;
  name: string;
  description: string;

  platform: string;
  platform_id: string;
  
  url: string;
  img: string,

  categories: string[];
};

export type Statistic = {
  sum_revenue: number;
  last_revenue: number;
  currency: string;

  //sales_amount_three_month_ratio: number;
  //sales_amount_one_month_ratio: number;

  total_visit_number: number;
  monthly_visit_number: number;

  sum_sales: number;
  last_sales: number;

  avg_price: number;
  last_price: number;

  avg_rank: number;
  last_rank: number;

  //review
  avg_rating: number;
  last_rating: number;

  sum_review: number;
  last_review: number;

  avg_review_rate: number;
  last_review_rate: number;

  sum_visit: number;
  last_visit: number;

  avg_revenue_month_on_month: number;
  last_revenue_month_on_month: number;

  avg_revenue_product_on_group: number;
  last_revenue_product_on_group: number;

  //TopSearch
  sponsored_keyword_search_number: number;
  sponsored_keyword_search_daily_ratio: number;

  organic_keyword_search_number: number;
  organic_keyword_search_daily_ratio: number;
};

export type OpenToBuy = {
  otb_sales: number;
  haircut: number;
  
  expected_sales: number;
  lost_sales: number;
  left_over: number;

  expected_gmv: number;
  expected_gp: number;

  expected_sales_ratio: number;
  lost_sales_ratio: number;
  left_over_ratio: number;
  
  profit_margin: number;

  marginal_rate_of_left_over: number;
  marginal_rate_of_lost_sales: number;
  marginal_rate_of_return: number;

  average_rate_of_return: number;
  
  otb_sales_amount: number;
  
  gp_variance: number;
};

export interface MonthDataType {
  x: string;
  y: number;
};

export interface VisitDataType {
  x: string;
  y: number;
};

export type SearchDataType = {
  index: number;
  keyword: string;
  count: number;
  range: number;
  status: number;
};

export type OfflineDataType = {
  name: string;
  profit_rate: number;
};

export interface OfflineChartData {
  date: number;
  type: number;
  value: number;
}

export interface AnalysisData {
  //IntroduceRow
  product: Product;
  statistic: Statistic;

  price: DataItem[];
  revenue: DataItem[];
  sales: DataItem[];
  rank: DataItem[];

  rating: DataItem[];
  review: DataItem[];
  review_rate: DataItem[];
  visit: DataItem[];

  revenue_month_on_month: DataItem[];
  revenue_product_on_group: DataItem[];

  sales_detail: DataItem[];

  group: DataItem[];

  open_to_buy: OpenToBuy;
  list_product_kyp: DataItem[];

  is_new_product: boolean;

  //backup -------------------

  visitDataMonthly: DataItem[];
  salesVolumeDataMonthly: DataItem[];

  //SalesCard
  salesData: DataItem[];
  visitData: DataItem[];

  similarProductSalesData: DataItem[];
  similarProductVisitData: DataItem[];

  //TopSearch  
  searchData: DataItem[];
  sponsorKeywordSearchData: DataItem[];
  organicKeywordSearchData: DataItem[];

  //ProportionReview
  salesTypeData: DataItem[];
  salesTypeDataOnline: DataItem[];
  salesTypeDataOffline: DataItem[];

  //SalesChartData 
  offlineChartData: DataItem[];
}
