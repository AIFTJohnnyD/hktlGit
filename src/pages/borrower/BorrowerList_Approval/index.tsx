import { Card, message, Row, Col, Table, Button, Descriptions, Checkbox, Spin, Space} from 'antd';
import ProForm, {
  ProFormDateRangePicker,
  ProFormDependency,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormMoney,
  ProFormDatePicker,  
} from '@ant-design/pro-form';
import { useRequest, history, request, FormattedMessage, useAccess } from 'umi';
import { FC, useEffect, useMemo, useState } from 'react';
import { PageContainer, PageLoading } from '@ant-design/pro-layout';
import { updateLoanApplication } from './service';
import styles from './style.less';

import type { ProColumns } from '@ant-design/pro-table';
import { parse } from 'querystring';
import { CheckCircleTwoTone, ExclamationCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';

import type { BorrowerAmount, TableListItem, Shareholder_Person, Shareholder_Company, Director_Person, Director_Company } from './data';
import { List } from 'lodash';
import e from 'express';
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
  //用于修改按钮的样式
  const [Style, setStyle] = useState(false);
  //控制提交按钮的disabled属性
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
  //console.log(data)

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
        render: (props, doms) => {
          return [
            <button type="button" key="rest" onClick={() => props.form?.resetFields()}>
              重置
            </button>,
            <button disabled ={disabled}
              type="button" key="submit" onClick={() => props.form?.submit?.()}>
              提交
            </button>,
            
          ];
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
        title={<FormattedMessage id='pages.borrower_form.account_receivable.amount_setting'/>}
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
                label={<FormattedMessage id='pages.borrower_form.account_receivable.amount_monthly_ratio'/>}
                width="md"
                name="amount_monthly_ratio"
                rules={[{ required: true, message: 'Please input the status.' }]}
                valueEnum={{
                  "1.0": "1.0", 
                  "1.5": "1.5", 
                  "2.0": "2.0"}}
              />
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>
              <ProFormDependency name={['amount_monthly_ratio', 'monthly_revenue']}>
                  {({ amount_monthly_ratio, monthly_revenue }) => {
                      return (          
                        <ProFormDigit
                          label={<FormattedMessage id='pages.borrower_form.account_receivable.amount_limit'/>}
                          width="md"
                          name=""
                          //rules={[{ required: true, message: '' }]}
                          value={amount_monthly_ratio * monthly_revenue}
                        />
                      );
                  }}
              </ProFormDependency>              
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 24 }} sm={24}>
              <ProFormSelect
                allowClear={false}
                label={<FormattedMessage id='pages.util.currency'/>}
                width="md"
                name="currency"
                rules={[{ required: true, message: '' }]}
                valueEnum={{
                  USD: 'USD',
                  HKD: 'HKD',
                }}
              />
            </Col>            
          </Row>

          <Row gutter={16}>
            <Col xl={6} lg={6} md={12} sm={24}>
              <ProFormSelect
                allowClear={false}
                label={<FormattedMessage id='pages.borrower_form.account_receivable.duration'/>}
                width="md"
                name="duration"
                rules={[{ required: true, message: '' }]}
                valueEnum={{7: 7, 14: 14, 30: 30, 45: 45, 60: 60, 90: 90, 180: 180}}
              />
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>
              <ProFormSelect
                allowClear={false}
                label={<FormattedMessage id='pages.borrower_form.account_receivable.annual_interest_rate'/>}
                width="md"
                name="annual_interest_rate"
                rules={[{ required: true, message: '' }]}
                valueEnum={{
                  "0.075": "7.5%",
                  "0.08": "8.0%", "0.085": "8.5%",
                  "0.09": "9.0%", "0.095": "9.5%",
                  "0.1": "10.0%", "0.105": "10.5%",
                  "0.11": "11.0%", "0.115": "11.5%",
                  "0.12": "12.0%", "0.125": "12.5%",
                  "0.13": "13.0%", "0.135": "13.5%",
                  "0.14": "14.0%", "0.145": "14.5%",
                  "0.15": "15.0%", "0.155": "15.5%",
                  "0.16": "16.0%",
                }}
              />
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 24 }} sm={24}>
              <ProFormSelect
                allowClear={false}
                label={<FormattedMessage id='pages.borrower_form.account_receivable.penalty_annual_interest_rate'/>}
                width="md"
                name="penalty_annual_interest_rate"
                rules={[{ required: true, message: '' }]}
                valueEnum={{
                  "0.18": "18.0%", "0.185": "18.5%",
                  "0.19": "19.0%", "0.195": "19.5%",
                  "0.2": "20.0%",  "0.205": "20.5%",
                  "0.21": "21.0%", "0.215": "21.5%",
                  "0.22": "22.0%", "0.225": "22.5%",
                  "0.23": "23.0%", "0.235": "23.5%",
                  "0.24": "24.0%",
                }}
              />              
            </Col>            
          </Row>

          <Row gutter={16}>
            <Col xl={6} lg={6} md={12} sm={24}>
              <ProFormSelect
                allowClear={false}
                label={<FormattedMessage id='pages.util.status'/>}
                width="md"
                name="status_lender"
                rules={[{ required: true, message: 'Please input the status.' }]}
                valueEnum={dictStatusAmount}
              />
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>
              <ProFormSelect
                allowClear={false}
                label={<FormattedMessage id='pages.borrower_list.borrower.finance_type'/>}
                width="md"
                name="finance_type"
                rules={[{ required: true, message: '' }]}
                valueEnum={dictFinanceType}
              />
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 24 }} sm={24}>
            </Col>
            
          </Row>

          <Row gutter={16}>
            <Col xl={6} lg={6} md={12} sm={24}>
              <ProFormTextArea
                label={<FormattedMessage id='pages.util.remark'/>}
                width="lg"
                name="remark_lender"
                rules={[{ required: false, message: '' }]}
              /> 
            </Col>            
          </Row> 

          <Row gutter={16}>
            <Col xl={6} lg={6} md={12} sm={24}>            
              <Button type={Style? 'default':'primary'} 
                  onClick={() => {
                    setStyle(!Style)
                    //点击按钮后保持checkBoxDisabled为false
                    if(checkBoxDisabled){
                      setCheckBoxDisabled(!checkBoxDisabled);
                    }
                    window.open(kyc_url,'KYC_Window','height=900, width=1720, top=80, left=200, scrollbars =no,toolbar=no, menuRender=false, status=no')
                  }}>
                  请查看并确认客户KYC
              </Button>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>
              <Checkbox  
                // hecked={checked} 
                disabled={checkBoxDisabled} 
                onChange={onCheckboxChange}
                >
                确认KYC
              </Checkbox>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 24 }} sm={24}>
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
