import React from 'react';
import { Modal } from 'antd';
import ProForm, {
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
  ProFormDatePicker,
  ProFormDigit,
  ProFormMoney,
  ProFormDependency,
} from '@ant-design/pro-form';
import type { TableListItem, Shareholder_Person, Shareholder_Company, Director_Person, Director_Company } from '../data';

import { Card, Row, Col, Result, Button, Descriptions, Divider, Alert, Statistic, Table } from 'antd';
import styles from './style.less';

import { FormattedMessage } from 'umi';

import type { ProColumns } from '@ant-design/pro-table';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<TableListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<boolean>;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
};

const columns_shareholder_person: ProColumns<Shareholder_Person>[] = [
  {
    title: (<FormattedMessage id='pages.borrower_form.shareholder.person.name'/>),
    dataIndex: 'shareholder_person_name',
    valueType: 'textarea',
  },       
  {
    title: (<FormattedMessage id='pages.borrower_form.shareholder.person.name_english'/>),
    dataIndex: 'shareholder_person_name_english',
    valueType: 'textarea',
  },       

  {
    title: (<FormattedMessage id='pages.borrower_form.shareholder.person.nationality'/>),
    dataIndex: 'shareholder_person_nationality',
    valueType: 'textarea',
  },       
  {
    title: (<FormattedMessage id='pages.borrower_form.shareholder.person.position'/>),
    dataIndex: 'shareholder_person_position',
    valueType: 'textarea',
  },       

  {
    title: (<FormattedMessage id='pages.borrower_form.shareholder.person.phone'/>),
    dataIndex: 'shareholder_person_phone',
    valueType: 'textarea',
  },       
  {
    title: (<FormattedMessage id='pages.borrower_form.shareholder.person.email'/>),
    dataIndex: 'shareholder_person_email',
    valueType: 'textarea',
  },       

  {
    title: (<FormattedMessage id='pages.borrower_form.shareholder.person.rate'/>),
    dataIndex: 'shareholder_person_rate',
    valueType: 'textarea',
  },       
  {
    title: (<FormattedMessage id='pages.borrower_form.shareholder.person.address'/>),
    dataIndex: 'shareholder_person_address',
    valueType: 'textarea',
  },       
];

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

const columns_director_person: ProColumns<Director_Person>[] = [
  {
    title: (<FormattedMessage id='pages.borrower_form.director.person.name'/>),
    dataIndex: 'director_person_name',
    valueType: 'textarea',
  },       
  {
    title: (<FormattedMessage id='pages.borrower_form.director.person.name_english'/>),
    dataIndex: 'director_person_name_english',
    valueType: 'textarea',
  },       

  {
    title: (<FormattedMessage id='pages.borrower_form.director.person.nationality'/>),
    dataIndex: 'director_person_nationality',
    valueType: 'textarea',
  },       
  {
    title: (<FormattedMessage id='pages.borrower_form.director.person.position'/>),
    dataIndex: 'director_person_position',
    valueType: 'textarea',
  },       

  {
    title: (<FormattedMessage id='pages.borrower_form.director.person.phone'/>),
    dataIndex: 'director_person_phone',
    valueType: 'textarea',
  },       
  {
    title: (<FormattedMessage id='pages.borrower_form.director.person.email'/>),
    dataIndex: 'director_person_email',
    valueType: 'textarea',
  },       

  {
    title: (<FormattedMessage id='pages.borrower_form.director.person.address'/>),
    dataIndex: 'director_person_address',
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
  CREATED: <FormattedMessage id='pages.application.CREATED'/>,

  APPROVED: <FormattedMessage id='pages.application.APPROVED'/>,
  UNAPPROVED: <FormattedMessage id='pages.application.UNAPPROVED'/>,

  PENDING: <FormattedMessage id='pages.application.PENDING'/>,
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  return (
    <StepsForm
      stepsProps={{
        size: 'small',
      }}
      stepsFormRender={(dom, submitter) => {
        return (
          <Modal
            width={1080}
            bodyStyle={{
              padding: '32px 40px 48px',
            }}
            destroyOnClose
            title={<FormattedMessage id='pages.util.update_info'/>}
            visible={props.updateModalVisible}
            footer={submitter}
            onCancel={() => {
              props.onCancel();
            }}
          >
            {dom}
          </Modal>
        );
      }}
      onFinish={props.onSubmit}
    >

      <StepsForm.StepForm
        initialValues={{
          key: props.values.key,

          name_cn: props.values.name_cn,
          credit_code_cn: props.values.credit_code_cn,
          address_cn: props.values.address_cn,

          name_hk: props.values.name_hk,
          br_code_hk: props.values.br_code_hk,
          address_hk: props.values.address_hk,
        }}
        title={<FormattedMessage id='pages.loan_form.basic_info'/>}
      >

        <Card title="" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col xl={6} lg={6} md={12} sm={24}>
              <ProFormText
                name="key"
                label={<FormattedMessage id='pages.util.id'/>}
                width="md"
                disabled
              />
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>                
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 24 }} sm={24}>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xl={6} lg={6} md={12} sm={24}>
              <ProFormText
                name="name_cn"
                label={<FormattedMessage id='pages.borrower_list.borrower.name'/>}
                width="md"
                rules={[
                  {
                    required: true,
                    message: '',
                  },
                ]}
                disabled
              />
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>
              <ProFormText
                name="credit_code_cn"
                label={<FormattedMessage id='pages.borrower_list.borrower.credit_code_cn'/>}
                width="md"
                rules={[
                  {
                    required: true,
                    message: '',
                  },
                ]}
                disabled
              />
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 24 }} sm={24}>
              <ProFormText
                name="address_cn"
                label={<FormattedMessage id='pages.borrower_list.borrower.address_cn'/>}
                width="md"
                rules={[
                  {
                    required: true,
                    message: '',
                  },
                ]}
                disabled
              />              
            </Col>
            
          </Row>


          <Row gutter={16}>
            <Col xl={6} lg={6} md={12} sm={24}>
              <ProFormText
                name="name_hk"
                label={<FormattedMessage id='pages.borrower_list.borrower.name_hk'/>}
                width="md"
                rules={[
                  {
                    required: true,
                    message: '',
                  },
                ]}
                disabled
              />              
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>                
              <ProFormText
                name="br_code_hk"
                label={<FormattedMessage id='pages.borrower_list.borrower.br_code_hk'/>}
                width="md"
                rules={[
                  {
                    required: true,
                    message: '',
                  },
                ]}
                disabled
              />              
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 24 }} sm={24}>
              <ProFormText
                name="address_hk"
                label={<FormattedMessage id='pages.borrower_list.borrower.address_hk'/>}
                width="md"
                rules={[
                  {
                    required: true,
                    message: '',
                  },
                ]}
                disabled
              />              
            </Col>
          </Row>  
        </Card>
      </StepsForm.StepForm>

      <StepsForm.StepForm
        title={<FormattedMessage id='pages.borrower_list.shareholder_director_information_cn'/>}
      >
        <Card title="" className={styles.card} bordered={false}>
          <div style={{margin: 'auto', width: 900}}>
            <Table 
              title={() => <FormattedMessage id='pages.borrower_list.shareholder_person'/>}
              columns={columns_shareholder_person} 
              dataSource={props.values.shareholder_person_cn} 
              size={"small"}
              pagination={false}
            />
          </div>		
        </Card>
        <Card title="" className={styles.card} bordered={false}>
          <div style={{margin: 'auto', width: 900}}>
            <Table 
              title={() => <FormattedMessage id='pages.borrower_list.shareholder_company'/>}
              columns={columns_shareholder_company} 
              dataSource={props.values.shareholder_company_cn} 
              size={"small"}
              pagination={false}
            />
          </div>		
        </Card>

        <Card title="" className={styles.card} bordered={false}>
          <div style={{margin: 'auto', width: 900}}>
            <Table 
              title={() => <FormattedMessage id='pages.borrower_list.director_person'/>}
              columns={columns_director_person} 
              dataSource={props.values.director_person_cn} 
              size={"small"}
              pagination={false}
            />
          </div>		
        </Card>
        <Card title="" className={styles.card} bordered={false}>
          <div style={{margin: 'auto', width: 900}}>
            <Table 
              title={() => <FormattedMessage id='pages.borrower_list.director_company'/>}
              columns={columns_director_company} 
              dataSource={props.values.director_company_cn} 
              size={"small"}
              pagination={false}
            />
          </div>		
        </Card>        
      </StepsForm.StepForm>

      <StepsForm.StepForm
        title={<FormattedMessage id='pages.borrower_list.shareholder_director_information_hk'/>}
      >
        <Card title="" className={styles.card} bordered={false}>
          <div style={{margin: 'auto', width: 900}}>
            <Table 
              title={() => <FormattedMessage id='pages.borrower_list.shareholder_person'/>}
              columns={columns_shareholder_person} 
              dataSource={props.values.shareholder_person_hk} 
              size={"small"}
              pagination={false}
            />
          </div>		
        </Card>
        <Card title="" className={styles.card} bordered={false}>
          <div style={{margin: 'auto', width: 900}}>
            <Table 
              title={() => <FormattedMessage id='pages.borrower_list.shareholder_company'/>}
              columns={columns_shareholder_company} 
              dataSource={props.values.shareholder_company_hk} 
              size={"small"}
              pagination={false}
            />
          </div>		
        </Card>

        <Card title="" className={styles.card} bordered={false}>
          <div style={{margin: 'auto', width: 900}}>
            <Table 
              title={() => <FormattedMessage id='pages.borrower_list.director_person'/>}
              columns={columns_director_person} 
              dataSource={props.values.director_person_hk} 
              size={"small"}
              pagination={false}
            />
          </div>		
        </Card>
        <Card title="" className={styles.card} bordered={false}>
          <div style={{margin: 'auto', width: 900}}>
            <Table 
              title={() => <FormattedMessage id='pages.borrower_list.director_company'/>}
              columns={columns_director_company} 
              dataSource={props.values.director_company_hk} 
              size={"small"}
              pagination={false}
            />
          </div>		
        </Card>        
      </StepsForm.StepForm>

      <StepsForm.StepForm
        initialValues={{
          amount_monthly_ratio: props.values.borrower_amount?.amount_monthly_ratio,
          //amount_limit: props.values.borrower_amount?.amount_limit,
          currency: props.values.borrower_amount?.currency,
          
          duration: props.values.borrower_amount?.duration,
          annual_interest_rate: props.values.borrower_amount?.annual_interest_rate,
          penalty_annual_interest_rate: props.values.borrower_amount?.penalty_annual_interest_rate,

          status_lender: props.values.borrower_amount?.status,
          remark_lender: props.values.borrower_amount?.remark,
        }}
        title={<FormattedMessage id='pages.borrower_form.account_receivable.amount_setting'/>}
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
                  1.0: 1, 
                  1.5: 1.5, 
                  2.0: 2}}
              />
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>
            <ProFormDependency name={['amount_monthly_ratio']}>
                {({ amount_monthly_ratio }) => {
                    return (          
                      <ProFormDigit
                        label={<FormattedMessage id='pages.borrower_form.account_receivable.amount_limit'/>}
                        width="md"
                        name="amount_limit"
                        //rules={[{ required: true, message: '' }]}
                        value={ amount_monthly_ratio * props.values.borrower_amount?.monthly_revenue}
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
                  "0.09": "9.0%", "0.095": "8.5%",
                  "0.10": "10.0%", "0.105": "10.5%",
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
                  "0.20": "20.0%", "0.205": "20.5%",
                  "0.21": "21.0%", "0.215": "21.5%",
                  "0.22": "22.0%", "0.225": "22.5%",
                  "0.23": "23.0%", "0.235": "23.5%",
                  "0.24": "24.0%",
                }}
              />              
            </Col>            
          </Row>

          <Row gutter={16}>
            <Col lg={12} md={12} sm={24}>
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
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 24 }} sm={24}>
            </Col>
            
          </Row>

          <Row gutter={16}>
            <Col xl={{ span: 16, offset: 0 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <ProFormTextArea
                label={<FormattedMessage id='pages.util.remark'/>}
                width="lg"
                name="remark_lender"
                rules={[{ required: false, message: '' }]}
              /> 
            </Col>            
          </Row>          
        </Card>      
      </StepsForm.StepForm>

      <StepsForm.StepForm
        initialValues={{
          finance_type: props.values.finance_type,
          lender_id_assign: props.values.lender_id_assign,
          
          status: props.values.status,
          remark: props.values.remark,
        }}
        title={<FormattedMessage id='pages.util.admin_review_info'/>}
      >            
        <Card title="" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col lg={12} md={12} sm={24}>
              <ProFormSelect
                allowClear={false}
                label={<FormattedMessage id='pages.borrower_list.borrower.finance_type'/>}
                width="md"
                name="finance_type"
                rules={[{ required: true, message: '' }]}
                valueEnum={dictFinanceType}
              />
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>
              <ProFormText
                name="lender_id_assign"
                label={<FormattedMessage id='pages.borrower_list.borrower.lender_id_assign'/>}
                width="md"
                rules={[{ required: true, message: '' }]}
              />
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 24 }} sm={24}>
            </Col>
            
          </Row>

          <Row gutter={16}>
            <Col lg={12} md={12} sm={24}>
              <ProFormSelect
                allowClear={false}
                label={<FormattedMessage id='pages.util.status'/>}
                width="md"
                name="status"
                rules={[{ required: true, message: 'Please input the status.' }]}
                valueEnum={dictStatus}
                disable = {true}
              />
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 24 }} sm={24}>
            </Col>
            
          </Row>

          <Row gutter={16}>
            <Col xl={{ span: 16, offset: 0 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <ProFormTextArea
                label={<FormattedMessage id='pages.util.remark'/>}
                width="lg"
                name="remark"
                rules={[{ required: false, message: '' }]}
              /> 
            </Col>            
          </Row>			
        </Card>      
      </StepsForm.StepForm>

    </StepsForm>
  );
};

export default UpdateForm;
