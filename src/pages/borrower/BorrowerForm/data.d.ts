export interface StepDataType {
  key: string;

  file_br_hk: string,  
  file_br_cn: string,  
  file_policy_cn: string,  

  file_director_hk: string,  
  file_director_cn: string,

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

  status: string;             
  remark: string;
  
}

export type CurrentTypes = 'base' | 'confirm' | 'result';
