import { DataItem } from '@antv/g2plot/esm/interface/config';

export { DataItem };

//IntroduceRow
export type Seller = {
  id: string;

  company_name: string;
  company_name_abbreviation: string;
  company_name_chinese: string;

  description: string;
  address: string;
  
  in_degree: int;
  out_degree: int;
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
  marginal_rate_of_return: number;
  average_rate_of_return: number;  
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

export type SellerScore = {
  top: int;
  relative_top: int;
  median: int;
  relative_low: int;
  low: int;

  number_of_product: int;
  score: number;
};

export type OtbPlanBank = {
  interest_rate: number;

  average_rate_of_return: number;
  profit_margin: number;
  
  quick_ratio: number;
  current_ratio: number;
  cash_ratio: number;

  inventory_turnover: number;
  working_capital_turnover: number;
  debt_to_EBITDA_margin: number;
  interest_coverage_ratio: number;
};

export interface AnalysisData {
  //IntroduceRow
  seller: Seller;
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
  revenue_seller_on_group: DataItem[];

  sales_detail: DataItem[];

  group: DataItem[];

  open_to_buy: OpenToBuy;
  list_product_kyp: DataItem[];

  seller_score: SellerScore;

  list_otb_plan: DataItem[];

  otb_plan_bank: OtbPlanBank;
  
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
