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
import type { TableListItem, RepaymentListItem } from '../data';

import { Card, Row, Col, Result, Button, Descriptions, Divider, Alert, Statistic, Table } from 'antd';
import styles from './style.less';

import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';

import { FormattedMessage } from 'umi';
import { useAccess } from 'umi';

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

const columns_repayment: ProColumns<RepaymentListItem>[] = [
  {
    title: (<FormattedMessage id='pages.loan_application.repayment_installment_id'/>),
    dataIndex: 'installment',
    valueType: 'digit',
  },         
  {
    title: (<FormattedMessage id='pages.loan_application.repayment_amount'/>),
    dataIndex: 'amount',
    valueType: 'digit',
  },         

  {
    title: (<FormattedMessage id='pages.util.start_date'/>),
    dataIndex: 'start_date',
    valueType: 'textarea',
  },         
  {
    title: (<FormattedMessage id='pages.util.end_date'/>),
    dataIndex: 'end_date',
    valueType: 'textarea',
  },         
/*
  {
    title: (<FormattedMessage id='pages.util.status'/>),
    dataIndex: 'status',
    valueType: 'textarea',
  },         
  {
    title: (<FormattedMessage id='pages.util.remark'/>),
    dataIndex: 'remark',
    valueType: 'textarea',
  },
*/           
];

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const access = useAccess();
  //console.log(access);
  var dictStatus:any = {};
  var bApproved:boolean = false;

  switch (props.values.status) {
    case 'CREATED':
      dictStatus = {
        "CREATED": <FormattedMessage id='pages.application.CREATED'/>,
        "CANCELLED": <FormattedMessage id='pages.application.CANCELLED'/>,
      };
      break;

    case 'PENDING':
      dictStatus = {
        "PENDING": <FormattedMessage id='pages.application.PENDING'/>,
        "CANCELLED": <FormattedMessage id='pages.application.CANCELLED'/>,
      };
      break;

    case 'APPROVED':
      dictStatus = {
        "APPROVED": <FormattedMessage id='pages.application.APPROVED'/>,

        "ACCEPTED": <FormattedMessage id='pages.application.ACCEPTED'/>,
        "UNACCEPTED": <FormattedMessage id='pages.application.UNACCEPTED'/>,
      };
      
      bApproved = true;

      break;

    default:
      break;      
  };
  
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
          borrower_id: props.values.borrower_id,
          borrower_name: props.values.borrower_name,

          plan_name: props.values.plan_name,
          plan_gross_merchandising_value: props.values.plan_gross_merchandising_value,
        }}
        title={<FormattedMessage id='pages.loan_application.loan_info'/>}
      >

        <Card title="" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col span={12}>
              <ProFormText
                name="key"
                label={<FormattedMessage id='pages.loan_application_list.loan_application_id'/>}
                width="md"
                disabled
              />
            </Col>
            <Col span={12}>
            
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <ProFormText
                name="borrower_id"
                label={<FormattedMessage id='pages.loan_application_list.company_id'/>}
                width="md"
                disabled
              />
            </Col>
            <Col span={12}>
              <ProFormText
                name="borrower_name"
                label={<FormattedMessage id='pages.borrower_list.borrower.name_cn'/>}
                width="md"
                disabled
              />            
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <ProFormText
                name="plan_name"
                label={<FormattedMessage id='pages.util.name'/>}
                width="md"
                disabled
              />
            </Col>
            <Col span={12}>
              <ProFormText
                name="plan_gross_merchandising_value"
                label={<FormattedMessage id='pages.loan_application.gross_merchandising_value'/>}
                width="md"
                disabled
              />            
            </Col>
          </Row>
        </Card>
      </StepsForm.StepForm>

      <StepsForm.StepForm
        initialValues={{
          amount: props.values.amount,
          currency: props.values.currency,

          start_date: props.values.start_date,
          end_date: props.values.end_date,
        }}
        title={<FormattedMessage id='pages.loan_application_list.loan_application_details'/>}
      >

        <Card title="" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col span={12}>
              <ProFormMoney
                name="amount"
                label={<FormattedMessage id='pages.loan_application.application_amount'/>}
                width="md"
                locale="en-US"
                rules={[
                  {
                    required: true,
                    message: 'Please input the amount.',
                  },
                ]}
                disabled={bApproved}
              />
            </Col>
            <Col span={12}>
              <ProFormSelect
                name="currency"
                label={<FormattedMessage id='pages.util.currency'/>}
                width="md"
                rules={[{ required: true, message: 'Please input the currency.' }]}
                valueEnum={{
                  USD: 'USD',
                  HKD: 'HKD',
                }}
                disabled={bApproved}
              />            
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
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
                disabled={bApproved}
              />
            </Col>
            <Col span={12}>
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
                disabled={bApproved}
              />            
            </Col>
          </Row>

          {/* <Row gutter={16}>
            <Col span={24}>
              <h4><FormattedMessage id='pages.loan_application.repayment_plan'/></h4>
              <Table 
                columns={columns_repayment} 
                dataSource={props.values.list_replayment} 
                size={"small"}
                pagination={false}
              />
            </Col>
          </Row> */}
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
                valueEnum={dictStatus}
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
