import { Card, message, Row, Col, Button} from 'antd';
import ProForm, {
  ProFormSelect,  
} from '@ant-design/pro-form';
import { useRequest, history, request, FormattedMessage, useAccess } from 'umi';
import { FC, useState } from 'react';
import { updateLoanApplication } from './service';
import styles from './style.less';

import type { ProColumns } from '@ant-design/pro-table';
import { parse } from 'querystring';

import type { Shareholder_Company, Director_Company } from './data';
import BorrowerInfoDifference from './Components/BorrowerInfoDifference';
//import Nonperforming_Loan from "../../application/LoanApplicationListLender_Approval/components/nonperforming_loan";
import Nonperforming_Loan from "./Components/nonperforming_loan";

const columns_shareholder_company: ProColumns<Shareholder_Company>[] = [
  {
    title: (<FormattedMessage id='pages.borrower_form.shareholder.company.name'/>),
    dataIndex: 'shareholder_company_name',
    valueType: 'textarea',
  },       
  {
    title: (<FormattedMessage id='pages.borrower_form.shareholder.company.business_register_code'/>),
    dataIndex: 'shareholder_company_business_register_code',
    valueType: 'textarea',
  },       

  {
    title: (<FormattedMessage id='pages.borrower_form.shareholder.company.register_address'/>),
    dataIndex: 'shareholder_company_register_address',
    valueType: 'textarea',
  },       
  {
    title: (<FormattedMessage id='pages.borrower_form.shareholder.company.country'/>),
    dataIndex: 'shareholder_company_country',
    valueType: 'textarea',
  },       

  {
    title: (<FormattedMessage id='pages.borrower_form.shareholder.company.rate'/>),
    dataIndex: 'shareholder_company_rate',
    valueType: 'textarea',
  },       
  {
    title: (<FormattedMessage id='pages.borrower_form.shareholder.company.address'/>),
    dataIndex: 'shareholder_company_address',
    valueType: 'textarea',
  },       
];

const columns_director_company: ProColumns<Director_Company>[] = [
  {
    title: (<FormattedMessage id='pages.borrower_form.director.company.name'/>),
    dataIndex: 'director_company_name',
    valueType: 'textarea',
  },  
  {
    title: (<FormattedMessage id='pages.borrower_form.director.company.business_register_code'/>),
    dataIndex: 'director_company_business_register_code',
    valueType: 'textarea',
  },  
  {
    title: (<FormattedMessage id='pages.borrower_form.director.company.address'/>),
    dataIndex: 'director_company_address',
    valueType: 'textarea',
  },  
];

var dictStatus: any = {
  CREATED: <FormattedMessage id='pages.application.CREATED'/>,

  APPROVED: <FormattedMessage id='pages.application.APPROVED'/>,
  UNAPPROVED: <FormattedMessage id='pages.application.UNAPPROVED'/>,

  CLOSED: <FormattedMessage id='pages.application.CLOSED'/>,
};

var dictFinanceType: any = {
  ACCOUNT_RECEIVABLE_FINANCE: <FormattedMessage id='pages.borrower_list.borrower.account_receivable_finance'/>,
  INVENTORY_FINANCE: <FormattedMessage id='pages.borrower_list.borrower.inventory_finance'/>,
};

var dictStatusAmount: any = {
  NORMAL: (<FormattedMessage id='pages.amount.borrower_list.amount_status.NORMAL'/>),

  ABNORMAL_LOAN_OVERDUE: (<FormattedMessage id='pages.amount.borrower_list.amount_status.ABNORMAL_LOAN_OVERDUE'/>),
  ABNORMAL_PD_LGD_DECREASE: (<FormattedMessage id='pages.amount.borrower_list.amount_status.ABNORMAL_PD_LGD_DECREASE'/>),
  ABNORMAL_SHOP_CLOSE: (<FormattedMessage id='pages.amount.borrower_list.amount_status.ABNORMAL_SHOP_CLOSE'/>),
  ABNORMAL_ACOUNT_CHANGE: (<FormattedMessage id='pages.amount.borrower_list.amount_status.ABNORMAL_ACOUNT_CHANGE'/>),
  ABNORMAL_DIRECTOR_CHANGE: (<FormattedMessage id='pages.amount.borrower_list.amount_status.ABNORMAL_DIRECTOR_CHANGE'/>),
};

const ApprovalForm: FC<Record<string, any>> = () => {
  let urlParams = parse(window.location.href.split('?')[1]);
  const borrower_key = urlParams.borrower_key;
  //console.log(borrower_key)
  //???????????????????????????
  const [Style, setStyle] = useState(false);
  //?????????????????????disabled??????
  const [disabled, setDisabled] = useState(true);
  const [checkBoxDisabled, setCheckBoxDisabled] = useState(true);

  const access = useAccess();

  const onCheckboxChange = () => {
    console.log('checked = ');
    setDisabled(!disabled);}

  const { run } = useRequest(updateLoanApplication, {
    manual: true,
    onSuccess: () => {
      message.success('Submitted Successfully');

      history.push({
        pathname: '/result/success',
      });      
    },
  });

  const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

  const onFinish = async (values: Record<string, any>) => {
    
    //console.log(borrower_id);

    //let urlParams = parse(window.location.href.split('?')[1]);
    //const borrower_id = urlParams.borrower_id;
    
    values["key"] = borrower_key;
    console.log(values)
    run(values);
    await waitTime(1500);
    window.close();    
  };
  
  const onExit = () => {
    window.opener = null;
    window.open('', '_self');
    window.close();
  };

  const { data, error, loading } = useRequest(() => {
    return request(
      '/api/borrower/get_borrower_from_id?borrower_key=' + borrower_key,
    );
  });
  let kyc_url:string = '/application/borrower-analysis-amount-approval?borrower_key=' + borrower_key
  let kyp_url:string = '/product/product-analysis'

  //const access = useAccess();

  return (
    <ProForm
      layout="vertical"
      onFinish={onFinish}

      initialValues={data}
      params={data}
      request={(params) => {
        return Promise.resolve({
          data: params,
          success: true,
        })
      }}
      
      submitter={{
        resetButtonProps: {
          style: {            
            display: 'none',  // ??????????????????
          },
        },
        submitButtonProps: {
          style: {            
            display: 'none',  // ??????????????????
          },
        },
      }}           
    >
      <BorrowerInfoDifference borrower_key={borrower_key} show_documents={true}/>
      <p></p>

      <Nonperforming_Loan 
        dict_nonperforming_loan = {data?.dict_nonperforming_loan}
        name_cn = {data?.name_cn}
      >      
      </Nonperforming_Loan>
      <p></p>

      <Card
        title='??????KYC???KYP??????'
        className="styles.card"
        bordered={false}
        size= "small"
        headStyle = {{color:'#2f54eb', fontSize: 16, fontWeight:'bold'}}
      >
        <Card title="" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col xl={6} lg={6} md={12} sm={24}>            
              <Button type={Style? 'default':'primary'} 
                  onClick={() => {
                    setStyle(!Style)
                    //?????????????????????checkBoxDisabled???false
                    if(checkBoxDisabled){
                      setCheckBoxDisabled(!checkBoxDisabled);
                    }
                    window.open(kyc_url,'KYC_Window','height=900, width=1720, top=80, left=200, scrollbars =no,toolbar=no, menuRender=false, status=no')
                  }}>
                  ????????????KYC
              </Button>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>
              <Button type={Style? 'default':'primary'} 
                  onClick={() => {
                    setStyle(!Style)
                    //?????????????????????checkBoxDisabled???false
                    if(checkBoxDisabled){
                      setCheckBoxDisabled(!checkBoxDisabled);
                    }
                    window.open(kyp_url,'KYC_Window','height=900, width=1720, top=80, left=200, scrollbars =no,toolbar=no, menuRender=false, status=no')
                  }}>
                  ????????????KYP
              </Button>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 24 }} sm={24}>
              {/* <Checkbox  
                // hecked={checked} 
                disabled={checkBoxDisabled} 
                onChange={onCheckboxChange}
                >
                ??????KYC
              </Checkbox> */}
            </Col>
            
          </Row>       
        </Card>      
      </Card>      

      {access.canAdmin == true && (
      <Card
        title={<FormattedMessage id='pages.borrower_form.account_receivable.admin_setting'/>}
        className="styles.card"
        bordered={false}
        size= "small"
        headStyle = {{color:'#2f54eb', fontSize: 16, fontWeight:'bold'}}
      >
        <Card title="" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col xl={6} lg={6} md={12} sm={24}>            
              <ProFormSelect
                allowClear={false}
                label={<FormattedMessage id='pages.borrower_list.borrower.lender_id_assign_name'/>}
                width="md"
                name="lender_id_assign"
                rules={[{ required: true, message: '' }]}
                valueEnum={data?.dict_lender}
              />
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 24 }} sm={24}>
            </Col>
          </Row>       
        </Card>      
      </Card>
      )}
    
    </ProForm>
  );
};

export default ApprovalForm;
