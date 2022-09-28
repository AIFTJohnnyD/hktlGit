export type TableListItem = {
    key: number;
    borrower_id: number;
    borrower_name: string;
  
    loan_id: number;
    loan_name: string;
    
    amount: number;
    currency: string;
  
    start_date: string;  
    end_date: string;  
    
    purpose: string;
  
    created_date: string;
  
    annual_interest_rate: number;
    number_of_installments: number;
  
    start_date_approved: string;
    end_date_approved: string;
  
    amount_approved: number;
    outstanding_balance: number;
  
    day_approved: number;
  
    annual_interest_rate_approved: number;
    number_of_installments_approved: number;
  
    loan_overdue: string;
    loan_overdue_amount: number;
  
    collateral_amount_original: number;
    collateral_amount_current: number;
  
    status: string;
    remark: string;
    
    list_product: [];
  
    list_otb_plan_index: [];
    list_mortgage_liquidity_index: [];
    list_financial_index: [];
    list_company_index: [];
  
    list_price_elasticity: [];
  
  /*
    history_apply_times: number;
    history_apply_approval_times: number;
    history_default_times: number;
    history_default_ratio: number;
    history_default_money_ratio: number;
  */
};

export type ProductListItem = {
  key: number;
  asin: string;
  name: string;
  price: number;
  sales_num: number;
  amount: number;
  cost: number;
  stock: number;
}
  