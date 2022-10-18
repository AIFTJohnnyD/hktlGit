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
} from '@ant-design/pro-form';
import type { TableListItem } from '../data';

import { Card, Row, Col, Result, Button, Descriptions, Divider, Alert, Statistic } from 'antd';
import styles from './style.less';

import { FormattedMessage } from 'umi';

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
          //company_id: props.values.company_id,

          name: props.values.name,
          //company_name: props.values.company_name,

          total_amount: props.values.total_amount,
          used_amount: props.values.used_amount,
          currency: props.values.currency,

          start_date: props.values.start_date,
          end_date: props.values.end_date,
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
              <ProFormText
                name="name"
                label={<FormattedMessage id='pages.loan_form.loan_name'/>}
                width="md"
                rules={[
                  {
                    required: true,
                    message: 'Please input the loan name.',
                  },
                ]}
              />
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 24 }} sm={24}>
              {/*
              <ProFormText
                name="company_name"
                label="Company Name"
                width="md"
                disabled
              />
              */}
            </Col>
            
          </Row>


          <Row gutter={16}>
            <Col xl={6} lg={6} md={12} sm={24}>
              <ProFormMoney
                name="total_amount"
                label={<FormattedMessage id='pages.loan_form.total_amount'/>}
                width="md"
                locale="en-US"
                rules={[
                  {
                    required: true,
                    message: 'Please input the total amount.',
                  },
                ]}
              />
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>                
              <ProFormMoney
                name="used_amount"
                label={<FormattedMessage id='pages.loan_list.used_amount'/>}
                width="md"
                locale="en-US"
                disabled
              />
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 24 }} sm={24}>
              <ProFormSelect
                label={<FormattedMessage id='pages.util.currency'/>}
                width="md"
                name="currency"
                rules={[{ required: true, message: 'Please input the currency.' }]}
                valueEnum={{
                  USD: 'USD',
                  HKD: 'HKD',
                }}
              />
            </Col>
          </Row>
  
          <Row gutter={16}>
            <Col xl={6} lg={6} md={12} sm={24}>
              <ProFormDatePicker
                name="start_date"
                width="md"
                label={<FormattedMessage id='pages.util.start_date'/>}
                rules={[
                  {
                    required: true,
                    message: 'Please select the start date',
                  },
                ]}
              />
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>                
              <ProFormDatePicker
                name="end_date"
                width="md"
                label={<FormattedMessage id='pages.util.end_date'/>}
                rules={[
                  {
                    required: true,
                    message: 'Please select the end date',
                  },
                ]}
              />
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 24 }} sm={24}>
            </Col>
          </Row>
        </Card>
      </StepsForm.StepForm>

      <StepsForm.StepForm
        initialValues={{
          annual_interest_rate: props.values.annual_interest_rate,
          number_of_installments: props.values.number_of_installments,

          other_cost_description: props.values.other_cost_description,
          other_cost_type: props.values.other_cost_type,
          other_cost_amount: props.values.other_cost_amount,
        }}
        title={<FormattedMessage id='pages.loan_form.other_cost'/>}
      >

        <Card title="" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col xl={6} lg={6} md={12} sm={24}>
              <ProFormDigit
                label={<FormattedMessage id='pages.loan_form.annual_interest_rate'/>}
                width="md"
                name="annual_interest_rate"
                min={0}
                max={1}                
                rules={[{ required: true, message: 'Please input the annual interest rate.' }]}
              />
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>
              <ProFormDigit
                label={<FormattedMessage id='pages.loan_form.number_of_installments'/>}
                width="md"
                name="number_of_installments"
                min={1}
                rules={[{ required: true, message: 'Please input the number of installments.' }]}
              />
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 24 }} sm={24}>
            </Col>
            
          </Row>


          <Row gutter={16}>
            <Col xl={6} lg={6} md={12} sm={24}>
              <ProFormText
                label={<FormattedMessage id='pages.loan_form.other_cost_description'/>}
                width="md"
                name="other_cost_description"
                rules={[{ required: true, message: 'Please input the other cost description.' }]}
              />  
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>                
              <ProFormText
                label={<FormattedMessage id='pages.loan_form.other_cost_type'/>}
                width="md"
                name="other_cost_type"
                rules={[{ required: true, message: 'Please input the other cost type.' }]}
              />   
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 24 }} sm={24}>
              <ProFormDigit
                label={<FormattedMessage id='pages.loan_form.other_cost_amount'/>}
                width="md"
                name="other_cost_amount"
                rules={[{ required: true, message: 'Please input the other cost amount.' }]}
              />
            </Col>
          </Row>		
        </Card>
      </StepsForm.StepForm>

      <StepsForm.StepForm
        initialValues={{
          status: props.values.status,
          remark: props.values.remark,
        }}
        title={<FormattedMessage id='pages.util.review_info'/>}
      >            
        <Card title="" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col lg={12} md={12} sm={24}>
              <ProFormSelect
                label={<FormattedMessage id='pages.util.status'/>}
                width="md"
                name="status"
                rules={[{ required: true, message: 'Please input the status.' }]}
                valueEnum={{
                  ACTIVE: (<FormattedMessage id='pages.application.ACTIVE'/>),
                  INACTIVE: (<FormattedMessage id='pages.application.INACTIVE'/>),
                }}
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
                rules={[{ required: false, message: 'Please input the remark.' }]}
              /> 
            </Col>            
          </Row>			
        </Card>      
      </StepsForm.StepForm>
    </StepsForm>
  );
};

export default UpdateForm;
