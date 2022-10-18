import React, { useRef, useState } from 'react';
import { Form, InputNumber, Modal, Upload, UploadFile } from 'antd';
import ProForm, {
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
  ProFormDatePicker,
  ProFormDigit,
  ProFormMoney,
  ProFormDependency,
  ProFormUploadButton,
} from '@ant-design/pro-form';
import type { TableListItem, RepaymentListItem } from '../data';

import { Card, Row, Col, Result, Button, Descriptions, Divider, Alert, Statistic, Table } from 'antd';
import styles from './style.less';

import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';

import { FormattedMessage } from 'umi';
import { useAccess } from 'umi';
import { UploadOutlined } from '@ant-design/icons';
import { before } from 'lodash';
import { RcFile } from 'antd/lib/upload';
import moment from 'moment';
import e from 'express';

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
function translate_boolean(strBool: string) {
  return <FormattedMessage id={'pages.util.' + strBool}/>;
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
    title: (<FormattedMessage id='pages.loan_application.repayment_installment_date'/>),
    dataIndex: 'created_datetime',
    valueType: 'textarea',
    render: (text, record, index) => {
      return moment(text).format("YYYY-MM-DD");
    }
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
    title: (<FormattedMessage id='pages.loan_application.repayment_proof'/>),
    dataIndex: 'name',
    valueType: 'option',
    render: (dom, obj) => {
      obj.file_url = "http://localhost:8000/api/borrower/download_file?file_id=br_hk__9"
      obj.file_name = "还款凭证.png"
      return (
        <>
          <a href={obj.file_url} download={obj.file_name}>
            {obj.file_name}
          </a>
          {/* <br/>
          <a href={obj.file_url} download={obj.file_name}>
            {obj.file_name}
          </a> */}
        </>
      );
    }, 
  },
];

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const form = useRef();

  function roundNumber(number: number) {
    return Math.round(number * 100) / 100
  }

  function formatNumber(number: number) {
    return "$"+roundNumber(number);
  }

  function isFullyRepaid() {
    const statusesFullyRepaid = ["EARLY_REPAYMENT", "FULL_REPAYMENT", "OVERDUE_REPAYMENT"];
    //const statusesNotFullyRepaid = ["DRAWDOWN", "PARTIAL REPAYMENT"];
    return statusesFullyRepaid.includes(props.values.status);
  }

  function isOverdue() {
    const statusesOverDue = ["OVERDUE", "OVERDUE_REPAYMENT"];
    return statusesOverDue.includes(props.values.status);
  }

  function match_outstanding() {
    form.current.setFieldsValue({
      repayment_amount: roundNumber(outstandingBalance)
    });
  }

  function beforeFileUpload(file: any) {
    setFileList([...fileList, file]);
    return false;
  }

  function submitForm(values: FormValueType) {
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('files', file as RcFile);
    });
    fetch('/api/loan_application/upload_file', {
      method: 'POST',
      body: formData,
    })
    .then(res => res.json())
    .then(() => {
      setFileList([]);
    })
    .catch((e) => {
      console.log(e);
    })
    .finally(() => {
    });
    return props.onSubmit(values);
  }

  const year = 360;
  const amountWithInterestRepayment = props.values.amount_approved + ((props.values.amount_approved * props.values.annual_interest_rate_approved * ((moment(props.values.end_date).diff(moment(props.values.start_date), 'days')) + 1)) / year);
  
  var outstandingBalance = props.values.today_balance;
  var totalAmountApproved = outstandingBalance;
  if (!isFullyRepaid()) {
    for (let i = 0; i < props.values.list_replayment?.length; i++) {
      let item = props.values.list_replayment[i];
      if (item.status == "ACCEPTED") {
        totalAmountApproved += item.amount;
      }
    }
  }  

  return (
    <StepsForm
      stepsProps={{
        size: 'small',
      }}
      formRef={form}
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
      //onFinish={props.onSubmit}
      onFinish={submitForm}
    >

      <StepsForm.StepForm
        title={<FormattedMessage id='pages.loan_application.repayment_plan'/>}
      >
        <Card title="" className={styles.card} bordered={false}>
          <Row gutter={[16,24]}>
            <Col span={12}>
                <b><FormattedMessage id='pages.util.status'/></b><br/>{translate_status(props.values.status)}
            </Col>
            <Col span={12}>
                <b>{<FormattedMessage id='pages.loan_application.repayment_id'/>}</b><br/>{props.values.key}
            </Col>
            <Col span={12}>
                <b>{<FormattedMessage id='pages.loan_application.application_amount'/>}</b><br/>{formatNumber(props.values.amount_approved)}
            </Col>
            <Col span={12}>
                <b>{<FormattedMessage id='pages.util.start_date'/>}</b><br/>{props.values.start_date_approved}
            </Col>
            <Col span={12}>
                <b>{<FormattedMessage id='pages.loan_application_list.loan_overdue'/>}</b><br/>{translate_boolean(props.values.loan_overdue)}
            </Col>
            <Col span={12}>
                <b>{<FormattedMessage id='pages.loan_application.repayment_date'/>}</b><br/>{props.values.end_date_approved}
            </Col>
            <Col span={12}>
              <b>{<FormattedMessage id='pages.loan_application.interest_today'/>}</b><br/>{ formatNumber(totalAmountApproved) }
            </Col>
            <Col span={12}>
              <b>{<FormattedMessage id='pages.loan_application.interest_on_repayment'/>}</b><br/>{formatNumber(amountWithInterestRepayment)}
            </Col>
            {(props.values.status == "DELINQUENT" || props.values.status == "OVERDUE_REPAYMENT") &&
              <Col span={24}>
                <b>{<FormattedMessage id='pages.loan_application.overdue_penalty'/>}</b><br/>{formatNumber(outstandingBalance)}
              </Col>
            }
            <Col span={24}>
                <b>{<FormattedMessage id='pages.loan_application.repayment_history'/>}</b>
                <Table 
                  columns={columns_repayment} 
                  dataSource={props.values.list_replayment} 
                  size={"small"}
                  pagination={false}
                />
            </Col>
            <Col span={24}>
              <b>{<FormattedMessage id='pages.loan_application.outstanding_balance'/>}</b><br/>{formatNumber(outstandingBalance)}
            </Col>
          </Row>
        </Card>
      </StepsForm.StepForm>
      <StepsForm.StepForm
        title={<FormattedMessage id='pages.postloan.repayment_amount'/>}
      >
        <Card title="" className={styles.card} bordered={false}>
          <Row gutter={[16,24]}>
            <Col span={24}>
              <ProFormMoney
                min={1}
                //initialValue={roundNumber(outstandingBalance)}
                name="repayment_amount"
                locale="en-US"
                label={<FormattedMessage id='pages.loan_application.repayment_repayment_amount'/>}
                rules={[{ required: true, message: <FormattedMessage id='pages.loan_application.please_enter_repayment_amount'/> }]}
                disabled = {isFullyRepaid()}
              />
              <Button type="primary" onClick={match_outstanding}>{<FormattedMessage id='pages.loan_application.match_outstanding_amount'/>}</Button>
            </Col>
            <Col span={24}>
              <ProFormUploadButton
                label={<FormattedMessage id='pages.loan_application.repayment_proof'/>}
                name="proof_files"
                title={<FormattedMessage id='pages.loan_application.upload_proof'/>}
                //action = "/api/loan_application/upload_file"
                // rules={[{ required: true, message: <FormattedMessage id='pages.loan_application.please_upload_payment_proof'/> }]}
                fieldProps = {{beforeUpload: beforeFileUpload}}
              />
            </Col>
          </Row>
        </Card>      
      </StepsForm.StepForm>

    </StepsForm>
  );
};

export default UpdateForm;
