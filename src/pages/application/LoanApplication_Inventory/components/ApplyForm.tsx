import React from 'react';
import { Modal, Space, Table } from 'antd';
import ProForm, {
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
  ProFormDatePicker,
  ProFormDigit,
  ProFormMoney,
} from '@ant-design/pro-form';
import type { TableListItem, TableListItemLoan } from '../data';

import { Card, Row, Col, Result, Button, Descriptions, Divider, Alert, Statistic } from 'antd';

import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';

import styles from './style.less';
import { FormItemPrefixContext } from 'antd/lib/form/context';

import { useRequest, history } from 'umi';
import { get_listloan } from '../service';

import { FormattedMessage } from 'umi';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<TableListItem>;

export type ApplyFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<boolean>;
  applyModalVisible: boolean;
  values: Partial<TableListItem>;
};

const ApplyForm: React.FC<ApplyFormProps> = (props) => {
  const { data, error, loading } = useRequest(get_listloan);

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
            title={<FormattedMessage id='pages.loan_application.loan_application'/>}
            visible={props.applyModalVisible}
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
          
          name: props.values.name,  
        }}
        title={<FormattedMessage id='pages.loan_application.product_info'/>}
      >

        <Card title="" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col span={12}>
              <ProFormText
                name="key"
                label={<FormattedMessage id='pages.util.id'/>}
                width="md"
                disabled
              />                  
            </Col>
            <Col span={12}>
              <ProFormText
                name="name"
                label={<FormattedMessage id='pages.util.name'/>}
                width="md"
                disabled
              />        
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <ProFormText
                name="borrower_id"
                label={<FormattedMessage id='pages.loan_application.company_id'/>}
                width="md"
                disabled
              />            
            </Col>
            <Col span={12}>
              <ProFormText
                name="borrower_name"
                label={<FormattedMessage id='pages.loan_application.company_name'/>}
                width="md"
                disabled
              />            
            </Col>
          </Row> 
        </Card>
      </StepsForm.StepForm>

{/*
      <StepsForm.StepForm
        title={<FormattedMessage id='pages.loan_application.loan_info'/>}
      >
        <ProTable<TableListItemLoan>
          columns={columns}
          rowSelection={{
            onChange: (selectedRowKeys, selectedRows) => {
              if (selectedRowKeys.length > 1) {
                selectedRowKeys.shift()                
              }
            },
            
            onSelect: (record, selected, selectedRows, nativeEvent) => {
              //console.log(record)
              if (selected == true) {
                props.values.loan_id = record.key
              } else {
                props.values.loan_id = -1
              }
              //console.log(props.values)
            }
          }}
          dataSource={data}
          scroll={{ x: 1080, y: 300 }}
          options={false}
          search={false}
          pagination={false}
          rowKey="key"
        />
      </StepsForm.StepForm>
*/}

      <StepsForm.StepForm
        title={<FormattedMessage id='pages.util.review_info'/>}
      >

        <Card title="" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col span={12}>
              <ProFormText
                name="application_amount"
                label={<FormattedMessage id='pages.loan_application.application_amount'/>}
                width="md"
                rules={[
                  {
                    required: true,
                    message: 'Please input the application amount.',
                  },
                ]}
              />
            </Col>
            <Col span={12}>
              <ProFormSelect
                label={<FormattedMessage id='pages.util.currency'/>}
                width="md"
                name="application_currency"
                rules={[{ required: true, message: 'Please input the currency.' }]}
                valueEnum={{
                    HKD: 'HKD',
                    CNY: 'CNY',
                    USD: 'USD',
                }}
              />            
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <ProFormDatePicker
                name="application_start_date"
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
            <Col span={12}>
              <ProFormDatePicker
                name="application_end_date"
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
          </Row>

          <Row gutter={16}>
            <Col xl={{ span: 16, offset: 0 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <ProFormTextArea
                label={<FormattedMessage id='pages.util.remark'/>}
                width="md"
                name="application_remark"
                rules={[{ required: false, message: 'Please input the remark.' }]}
              />
            </Col>            
          </Row>			
        </Card>
      </StepsForm.StepForm>      
    </StepsForm>
  );
};

export default ApplyForm;

/*
const columns: ProColumns<TableListItemLoan>[] = [
  {
    title: (<FormattedMessage id='pages.util.id'/>),
    width: 90,
    dataIndex: 'key',
    fixed: 'left',
    render: (_) => <a>{_}</a>,
    sorter: (a, b) => a.key - b.key,
  },
  {
    title: (<FormattedMessage id='pages.loan_list.loan_name'/>),
    width: 120,
    dataIndex: 'loan_name',
    align: 'left',
  },
  {
    title: (<FormattedMessage id='pages.util.currency'/>),
    width: 120,
    align: 'right',
    dataIndex: 'loan_currency',
  },

  {
    title: (<FormattedMessage id='pages.loan_form.lower_bound'/>),
    width: 120,
    align: 'right',
    dataIndex: 'lower_bound',
  },
  {
    title: (<FormattedMessage id='pages.loan_form.upper_bound'/>),
    width: 120,
    align: 'right',
    dataIndex: 'upper_bound',
  },  
  
  {
    title: (<FormattedMessage id='pages.loan_form.annual_interest_rate'/>),
    width: 120,
    align: 'right',
    dataIndex: 'annual_interest_rate',
  },
  {
    title: (<FormattedMessage id='pages.loan_form.number_of_installments'/>),
    width: 120,
    align: 'right',
    dataIndex: 'number_of_installments',
  },   
  
  {
    title: (<FormattedMessage id='pages.loan_form.other_cost_description'/>),
    width: 120,
    align: 'right',
    dataIndex: 'other_cost_description',
  },
  {
    title: (<FormattedMessage id='pages.loan_form.other_cost_type'/>),
    width: 120,
    align: 'right',
    dataIndex: 'other_cost_type',
  },  
  {
    title: (<FormattedMessage id='pages.loan_form.other_cost_amount'/>),
    width: 120,
    align: 'right',
    dataIndex: 'other_cost_amount',
  },  

  {
    title: (<FormattedMessage id='pages.util.start_date'/>),
    width: 120,
    align: 'right',
    dataIndex: 'loan_start_date',
  },
  {
    title: (<FormattedMessage id='pages.util.end_date'/>),
    width: 120,
    align: 'right',
    dataIndex: 'loan_end_date',
  },
];
*/