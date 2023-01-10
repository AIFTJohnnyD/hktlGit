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
    render: (dom, record, obj) => {
      // console.log(record?.attached_files)
      var attached_files = record?.attached_files;
      const listItems = attached_files.map((file_name:string) => (
        <>
        <a href={'/api/loan_application/download_proof_file?file_name=' + file_name} download={file_name.split('_')[2]}>
          {file_name.split('_')[2]}
        </a><br/>
        </>
      ));      
      return (
        <>
          {listItems}
        </>
      );
    }, 
  },
];

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const form = useRef();

  function roundNumber(number: number) {
    return Math.round(number * 100) / 100
  }

  function formatMoney(number: number) {
    return "$"+roundNumber(number).toLocaleString();
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

  function getNextInstallment(list) {
    var next = 0;
    list.forEach((index, val) => {
      if (val.installment > next) {
        next = val.installment;
      }
    })
    return next + 1;
  }

  function submitForm(values: FormValueType) {
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('files', file as RcFile);
    });
    formData.append('application_key', props.values.key);
    formData.append('repayment_installment', getNextInstallment(props.values.list_replayment));
    fetch('/api/loan_application/upload_proof_file', {
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
              setCurrentStep(0);
              props.onCancel();
            }}
          >
            {dom}
          </Modal>
        );
      }}
      //onFinish={props.onSubmit}
      onFinish={submitForm}
      current={currentStep}
      submitter={{
        render: (props) => {
          if (props.step === 0) {
            return (
              <Button 
                type="primary" 
                key="next" 
                onClick={() => props.onSubmit?.()}
              >
                {<FormattedMessage id='pages.util.next_step'/>}
              </Button>
            );
          }
          return [
            <Button
              key="previous"
              onClick={() => setCurrentStep((currentStep) => currentStep - 1)}
            >
              {<FormattedMessage id='pages.util.previous_step'/>}
            </Button>,
            <Button
              type="primary"
              key="submit"
              onClick={() => props.onSubmit?.()}
            >
              {<FormattedMessage id='pages.util.finish'/>}
            </Button>
          ];
        }
      }}
    >

      <StepsForm.StepForm
        title={<FormattedMessage id='pages.loan_application.repayment_plan'/>}
        onFinish={async () => {
          setCurrentStep((currentStep) => currentStep + 1);
          return true;
        }}
      >
        <Card title="" className={styles.card} bordered={false}>
          <Row gutter={[16,12]}>
            <Col span={12}>
              <b>{<FormattedMessage id='pages.util.status'/>}&nbsp;:</b>
              <br/><p style={{color:'blue', marginLeft:30}}> {translate_status(props.values.status)}</p>
            </Col>
            <Col span={12}>
              <b>{<FormattedMessage id='pages.loan_application.repayment_id'/>}&nbsp;:</b>
              <br/><p style={{color:'blue', marginLeft:30}}> {props.values.key}</p>
            </Col>
            <Col span={12}>
              <b>{<FormattedMessage id='pages.loan_application.repayment_application_amout'/>}&nbsp;:</b>
              <br/><p style={{color:'blue', marginLeft:30}}> {formatMoney(props.values.amount_approved)}</p>
            </Col>
            <Col span={12}>
              <b>{<FormattedMessage id='pages.util.start_date'/>}&nbsp;:</b>
              <br/><p style={{color:'blue', marginLeft:30}}> {props.values.start_date_approved}</p>
              {/* <br/> <b>{<FormattedMessage id='pages.loan_application_list.penalty_annual_interest_rate'/>}&nbsp;:</b> {props.values.penalty_annual_interest_rate} */}
            </Col>
            <Col span={12}>
              <b>{<FormattedMessage id='pages.loan_application_list.loan_overdue'/>}&nbsp;:</b>
              <br/><p style={{color:'blue', marginLeft:30}}> {translate_boolean(props.values.loan_overdue)}
              {props.values.loan_overdue == "True" && <b style={{color:'red'}}>&nbsp;&nbsp;&nbsp;{<FormattedMessage id='pages.loan_application_list.penalty_annual_interest_rate'/>}&nbsp;:&nbsp;{props.values.penalty_annual_interest_rate*100}%</b>}
              </p>
            </Col>
            <Col span={12}>
              <b>{<FormattedMessage id='pages.loan_application.repayment_date'/>}&nbsp;:</b>
              <br/><p style={{color:'blue', marginLeft:30}}> {props.values.end_date_approved}</p>
            </Col>
            <Col span={12}>
              <b>{<FormattedMessage id='pages.loan_application.interest_today'/>}&nbsp;:</b>
              <br/> <p style={{color:'blue', marginLeft:30}}> { formatMoney(totalAmountApproved) }</p>
            </Col>
            <Col span={12}>
              <b>{<FormattedMessage id='pages.loan_application.interest_on_repayment'/>}&nbsp;:</b>
              <br/><p style={{color:'blue', marginLeft:30}}> {formatMoney(amountWithInterestRepayment)}</p>
            </Col>
            <Col span={12}>
              <b>{<FormattedMessage id='pages.loan_application.outstanding_balance'/>}&nbsp;:</b>
              <br/><p style={{color:'blue', marginLeft:30}}> {formatMoney(outstandingBalance)}</p>
            </Col>
            <Col span={12}>
              <b>{<FormattedMessage id='pages.loan_application_list.annual_interest_rate_approved'/>}&nbsp;:</b>
              <br/><p style={{color:'blue', marginLeft:30}}> {props.values.annual_interest_rate_approved * 100}%</p>
            </Col>
            {/* {(props.values.status == "DELINQUENT" || props.values.status == "OVERDUE_REPAYMENT") &&
              <Col span={12}>
                <b>{<FormattedMessage id='pages.loan_application.overdue_penalty'/>}&nbsp;:</b>
                <br/><p style={{color:'blue', marginLeft:30}}> {formatMoney(outstandingBalance)}</p>
              </Col>
            } */}
            <Col span={24}>
                <b>{<FormattedMessage id='pages.loan_application.repayment_history'/>}&nbsp;:</b>
                <Table 
                  columns={columns_repayment} 
                  dataSource={props.values.list_replayment} 
                  size={"small"}
                  pagination={false}
                />
            </Col>
            
          </Row>
        </Card>
      </StepsForm.StepForm>
      <StepsForm.StepForm
        title={<FormattedMessage id='pages.postloan.repayment_amount'/>}
        onFinish={async () => {
          setCurrentStep(0);
        }}
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
                //action = "/api/loan_application/upload_proof_file"
                //rules={[{ required: true, message: <FormattedMessage id='pages.loan_application.please_upload_payment_proof'/> }]}
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
