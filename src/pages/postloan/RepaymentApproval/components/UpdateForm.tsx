import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, Modal, Radio, RadioChangeEvent, Space } from 'antd';
import ProForm, {
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
  ProFormDatePicker,
  ProFormDigit,
  ProFormMoney,
  ProFormDependency,
  ProFormField,
  ProFormInstance,
} from '@ant-design/pro-form';
import type { TableListItem, RepaymentListItem } from '../data';

import { Card, Row, Col, Result, Tag, Button, Descriptions, Divider, Alert, Statistic, Table } from 'antd';
import styles from './style.less';

import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';

import { FormattedMessage, useModel } from 'umi';
import { useAccess } from 'umi';
import moment from 'moment';

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
    }
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

  const initialState = useModel('@@initialState');
  const formRef = useRef<ProFormInstance>();
  var pendingForApproval: any[] = [];
  var installmentsApproved: any[] = [];
  var installmentsRejected: any[] = [];

  for (let i = 0; i < props.values.list_replayment?.length; i++) {
    let item = props.values.list_replayment[i];
    // if (item.status !="ACCEPTED") {
    if (item.status =="SUBMITTED") {  
      pendingForApproval.push(item);
      installmentsApproved.push(item.installment.toString());
    }
  }

  const onChangeAcceptRejectRadio = (e: RadioChangeEvent) => {
    installmentsApproved = [];
    installmentsRejected = [];
    for (let i = 0; i < pendingForApproval.length; i++) {
      if (e.target.value == "Accept") {
        installmentsApproved.push(JSON.parse(JSON.stringify(pendingForApproval[i])).installment.toString());
      } else {
        installmentsRejected.push(JSON.parse(JSON.stringify(pendingForApproval[i])).installment.toString());
      }
    }
    formRef.current?.setFieldValue("installments_approved", installmentsApproved);
    formRef.current?.setFieldValue("installments_rejected", installmentsRejected);
  };

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
    const statusesOverDue = ["DELINQUENT", "OVERDUE_REPAYMENT"];
    return statusesOverDue.includes(props.values.status);
  }

  const [currentStep, setCurrentStep] = useState(0);

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

  const openBorrowerInfo = () => {
    //console.log(props.values)
    window.open('/postloan/repayment-approval-borrower-info?borrower_key='+props.values.borrower_key, 'newwindow','height=800, width=1500, top=160, left=350, toolbar=no, menubar=no, status=no');
  }

  useEffect(() => {
    formRef.current?.setFieldValue("installments_approved", installmentsApproved);
  }, []);

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
            destroyOnClose={true}
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
      onFinish={props.onSubmit}
      formRef={formRef}
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
              //??? disabled={!initialState.initialState?.currentUser?.permissions?.includes(1)}
            >
              {<FormattedMessage id='pages.util.finish'/>}
            </Button>
          ];
        }
      }}
    >

      {/* <StepsForm.StepForm
        title={<FormattedMessage id='pages.postloan.repayment_application'/>}
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
      </StepsForm.StepForm> */}

      <StepsForm.StepForm
        title={<FormattedMessage id='pages.loan_application.repayment_plan'/>}
        onFinish={async () => {
          setCurrentStep((currentStep) => currentStep + 1);
          return true;
        }}
      >
        <Card title="" className={styles.card} bordered={false}>
          <Row gutter={[16,24]}>
            <Col span = {24}>
              <Button type="primary" onClick={openBorrowerInfo}>电商信息</Button>
            </Col>
            <Col span={12}>
                <b><FormattedMessage id='pages.util.status'/></b><br/>{translate_status(props.values.status)}
            </Col>
            <Col span={12}>
                <b>{<FormattedMessage id='pages.loan_application.repayment_id'/>}</b><br/>{props.values.borrower_key}
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
        initialValues={{
          remark: props.values.remark,
        }}
        title={<FormattedMessage id='pages.postloan.repayment_confirm_approved'/>}          
        onFinish={async () => {
           setCurrentStep(0);
        }}
      >            
        <Card title={<FormattedMessage id='pages.util.approved'/>} className={styles.card} bordered={false}>
          <Row gutter={[16,24]}>
            <Col span={24}>
              <b>{<FormattedMessage id='pages.loan_application.outstanding_balance'/>}</b><br/>{formatNumber(outstandingBalance)}
            </Col>
            <Col span={24}>
                <b>{<FormattedMessage id='pages.loan_application.pending_for_approval'/>}</b>
                <Table 
                  columns={columns_repayment} 
                  dataSource={pendingForApproval} 
                  size={"small"}
                  pagination={false}
                />
                <Form.Item name="installments_approved" noStyle initialValue={installmentsApproved}>
                  <Input type="hidden"></Input>
                </Form.Item>
                <Form.Item name="installments_rejected" noStyle initialValue={installmentsRejected}>
                  <Input type="hidden"></Input>
                </Form.Item>
            </Col>
            <Col span={24}>
              <b>{<FormattedMessage id='pages.loan_application.repayment.acceptreject'/>}</b><br/>
              <Radio.Group onChange={onChangeAcceptRejectRadio} defaultValue="Accept">
                <Space direction="vertical">
                  <Radio value={"Accept"}>{<FormattedMessage id='pages.loan_application.repayment.accept'/>}</Radio>
                  <Radio value={"Reject"}>{<FormattedMessage id='pages.loan_application.repayment.reject'/>}</Radio>
                </Space>
              </Radio.Group>
            </Col>
          </Row>			
        </Card>      

      </StepsForm.StepForm>
    </StepsForm>
  );
};

export default UpdateForm;

