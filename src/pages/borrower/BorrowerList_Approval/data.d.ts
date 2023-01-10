export type BorrowerAmount = {
  //lender
  amount_monthly_ratio: string;
  monthly_revenue: number;
  amount_limit: number;
  currency: string;

  duration: number;
  annual_interest_rate: string;
  penalty_annual_interest_rate: string;

  monthly_revenue: number;

  status: string;             
  remark: string;
};

export type TableListItem = {
  key: string;

  br_hk: string,  
  br_cn: string,  
  policy_cn: string,  

  director_hk: string,  
  director_cn: string,

  name_cn: string;  
  credit_code_cn: string;
  address_cn: string;

  name_hk: string;  
  br_code_hk: string;
  address_hk: string;

  lear_name: string;
  lear_nationality: string;
  lear_country_code: string;
  lear_mobile: string;
  lear_email: string;
  lear_address: string;

  shareholder_person_cn: string;
  shareholder_company_cn: string;

  director_person_cn: string;
  director_company_cn: string;

  shareholder_person_hk: string;
  shareholder_company_hk: string;

  director_person_hk: string;
  director_company_hk: string;

  contact: string;

  shop: string;

  finance_type: string;
  lender_id_assign: number;

  status: string;             
  remark: string; 

  borrower_amount: BorrowerAmount;
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
  key: string;

  br_hk: string,  
  br_cn: string,  
  policy_cn: string,  

  director_hk: string,  
  director_cn: string,

  name_cn: string;  
  credit_code_cn: string;
  address_cn: string;

  name_hk: string;  
  br_code_hk: string;
  address_hk: string;

  lear_name: string;
  lear_nationality: string;
  lear_country_code: string;
  lear_mobile: string;
  lear_email: string;
  lear_address: string;

  shareholder_person_cn: string;
  shareholder_company_cn: string;

  director_person_cn: string;
  director_company_cn: string;

  shareholder_person_hk: string;
  shareholder_company_hk: string;

  director_person_hk: string;
  director_company_hk: string;

  contact: string;

  shop: string;

  finance_type: string;
  lender_id_assign: number;
  
  status: string;             
  remark: string; 
  
  //lender
  borrower_amount: BorrowerAmount;   

  pageSize?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};

export type Shareholder_Person = {
  shareholder_person_name: string;
  shareholder_person_name_english: string;

  shareholder_person_nationality: string;
  shareholder_person_position: string;

  shareholder_person_phone: string;
  shareholder_person_email: string;

  shareholder_person_rate: string;
  shareholder_person_address: string;
};

export type Shareholder_Company = {
  shareholder_company_name: string;
  shareholder_company_business_register_code: string;

  shareholder_company_register_address: string;
  shareholder_company_country: string;

  shareholder_company_rate: string;
  shareholder_company_address: string;
};

export type Director_Person = {
  director_person_name: string;
  director_person_name_english: string;

  director_person_nationality: string;
  director_person_position: string;

  director_person_phone: string;
  director_person_email: string;

  director_person_address: string;
};

export type Director_Company = {
  director_company_name: string;
  director_company_business_register_code: string;
  director_company_address: string;
};