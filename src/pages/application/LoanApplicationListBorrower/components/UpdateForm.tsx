import React from 'react';
import type { TableListItem } from '../data';
import { ModalForm } from '@ant-design/pro-form';
import { Row, Col, Button } from 'antd';
import { FormattedMessage, useAccess } from 'umi';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<TableListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values?: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
};

function roundNumber(number: number) {
  return Math.round(number * 100) / 100
}

function formatMoney(number: number) {
  return "$"+roundNumber(number).toLocaleString();
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const access = useAccess();
  console.log(props.values);
  var buttonList:any = {};

  switch (props.values.status) {
    case 'CREATED':
    case 'PENDING':
      buttonList = [
        <Button type="default" key="rest" onClick={() => {props.onCancel()}}>
            返回
        </Button>,
        <Button type="default" danger key="rest" onClick={() =>{props.values.status="CANCELLED"; props.onSubmit()}}>
            撤消
        </Button>,
      ];
      break;

    case 'APPROVED':
      buttonList = [
        <Button type="default" key="rest" onClick={() => {props.onCancel()}}>
          返回
        </Button>,
        <Button type="primary" key="submit" onClick={() =>{props.values.status="ACCEPTED"; props.onSubmit()}}>
          接受
        </Button>,
        <Button type="default" danger key="submit" onClick={() =>{props.values.status="UNACCEPTED"; props.onSubmit()}}>
          拒绝
        </Button>,
      ];
      break;

    default:
      break;      
  };
  
  return (
       <ModalForm<{
          name: string;
          company: string;
          }>
          title="批准表单"
          initialValues={props.values}
          visible={props.updateModalVisible}
          autoFocusFirstInput
          modalProps={{
            destroyOnClose: true,
            onCancel: () => {console.log('onCancel'), props.onCancel();}
          }}
          submitTimeout={2000}
          // request={async () => {           
          //   null
          // }}
          submitter={{
            resetButtonProps: {
              style: {
                display: 'none',
              },
            },
            submitButtonProps: {},
        
            render: () => {
              //console.log(props);
              return buttonList;
            },
          }}
          onFinish={async (values) => {
            return true;
          }}
        >

          <Row gutter={[16,12]}>
            <Col span={12}>
              <b>{<FormattedMessage id='pages.loan_application.repayment_id'/>}&nbsp;:</b>
              <br/><p style={{marginLeft:30}}> {props.values.key}</p>
            </Col>
            <Col span={12}>
              <b>{<FormattedMessage id='pages.lender_list.company_name'/>}&nbsp;:</b>
              <br/><p style={{marginLeft:30}}> {props.values.borrower_name}</p>
            </Col>
            <Col span={12}>
              <b>{<FormattedMessage id='pages.loan_application.application_name' defaultMessage="融资名称"/>}&nbsp;:</b>
              <br/><p style={{marginLeft:30}}> {props.values.plan_name}</p>
            </Col>
            <Col span={12}>
              <b>{<FormattedMessage id='pages.borrower_list.borrower.finance_type' defaultMessage="融资类型"/>}&nbsp;:</b>
              <br/><p style={{marginLeft:30}}> {props.values.finance_type}</p>
            </Col>
            <Col span={12}>
              <b>{<FormattedMessage id='pages.loan_application_list.loan_overduettt' defaultMessage="申请金额"/>}&nbsp;:</b>
              <br/><p style={{marginLeft:30}}> {formatMoney(props.values.amount)} </p>
            </Col>
            <Col span={12}>
              <b>{<FormattedMessage id='pages.loan_application.repayment_datetttt' defaultMessage="批准金额"/>}&nbsp;:</b>
              <br/><p style={{color:'blue', marginLeft:30}}> {formatMoney(props.values.amount_approved)}</p>
            </Col>
            <Col span={12}>
              <b>{<FormattedMessage id='pages.loan_application.interest_todayttt' defaultMessage="批准利率"/>}&nbsp;:</b>
              <br/> <p style={{color:'blue', marginLeft:30}}> {props.values.annual_interest_rate_approved * 100}%</p>
            </Col>
            <Col span={12}>
              <b>{<FormattedMessage id='pages.loan_application.interest_on_repaymenttttt' defaultMessage="逾期利率"/>}&nbsp;:</b>
              <br/><p style={{color:'blue', marginLeft:30}}> {props.values.penalty_annual_interest_rate * 100}%</p>
            </Col>
            <Col span={8}>
              <b>{<FormattedMessage id='pages.loan_application.outstanding_balancetttt' defaultMessage="贷款时长"/>}&nbsp;:</b>
              <br/><p style={{marginLeft:30}}> {props.values.day_approved} 天</p>
            </Col>
            <Col span={8}>
              <b>{<FormattedMessage id='pages.loan_application_list.annual_interest_rate_approvedttt' defaultMessage="开始日期"/>}&nbsp;:</b>
              <br/><p style={{marginLeft:30}}> {props.values.start_date_approved}</p>
            </Col>
            <Col span={8}>
              <b>{<FormattedMessage id='pages.loan_application_list.annual_interest_rate_approvedttt' defaultMessage="结束日期"/>}&nbsp;:</b>
              <br/><p style={{marginLeft:30}}> {props.values.end_date_approved}</p>
            </Col>
          </Row>
       </ModalForm>
  );
};

export default UpdateForm;
