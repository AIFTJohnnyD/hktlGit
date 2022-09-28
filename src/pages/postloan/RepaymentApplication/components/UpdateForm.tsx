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

function translate_status(status: string) {
  return <FormattedMessage id={'pages.application.' + status}/>;
}  

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

  {
    title: (<FormattedMessage id='pages.util.status'/>),
    dataIndex: 'status',
    valueType: 'textarea',
    render: (text, record, index) => {
      return (translate_status(record?.status))
    },    
  },         
  {
    title: (<FormattedMessage id='pages.util.remark'/>),
    dataIndex: 'remark',
    valueType: 'textarea',
  },           
];

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  var dictInstallment:any = {};

  for (let i = 0; i < props.values.list_replayment?.length; i++) {
    let item = props.values.list_replayment[i];
    if (item.status != "ACCEPTED") {
      dictInstallment[item.installment] = item.installment;
    }
  }

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
        title={<FormattedMessage id='pages.loan_application.repayment_plan'/>}
      >
        <Card title="" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col span={24}>
              <div style={{margin: 'auto', width: 900}}>
                <Table 
                  columns={columns_repayment} 
                  dataSource={props.values.list_replayment} 
                  size={"middle"}
                  pagination={false}
                />
              </div>
            </Col>
          </Row>
        </Card>
      </StepsForm.StepForm>

      <StepsForm.StepForm
        initialValues={{
          remark: props.values.remark,
        }}
        title={<FormattedMessage id='pages.postloan.repayment_amount'/>}
      >            
        <Card title="" className={styles.card} bordered={false}>

        <Row gutter={16}>
          <Col xl={{ span: 16, offset: 0 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
            <ProFormDependency name={['installments']}>
                {({ installments }) => {                      
                    let totalAmount = 0;
                    for (let i = 0; i < installments?.length; i++) {
                      totalAmount = totalAmount + props.values.list_replayment[installments[i] - 1].amount;
                    }

                    if (totalAmount == 0) {
                      totalAmount = null;
                    }

                    return (
                      <div>
                        <p>{<FormattedMessage id='pages.postloan.repayment_amount'/>} : {totalAmount}</p>
                      </div>
                    );
                }}
            </ProFormDependency>    
          </Col>            
        </Row>			

          <Row gutter={16}>
            <Col xl={{ span: 16, offset: 0 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <ProFormSelect
                label={<FormattedMessage id='pages.loan_application.repayment_installment_id'/>}
                width="md"
                name="installments"
                rules={[{ required: true, message: '' }]}
                valueEnum={dictInstallment}
                mode="multiple"
              />
            </Col>
          </Row>

        </Card>      
      </StepsForm.StepForm>
    </StepsForm>
  );
};

export default UpdateForm;
