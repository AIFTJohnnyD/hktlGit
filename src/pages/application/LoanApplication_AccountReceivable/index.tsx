import { Card, message, Row, Col, Descriptions } from 'antd';
import ProForm, {
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormMoney,
  ProFormDatePicker,
  ProFormDigit,
  ProFormInstance,
  ProFormDependency,
} from '@ant-design/pro-form';
import { useRequest, FormattedMessage, request, useAccess } from 'umi';
import type { FC } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { fakeSubmitForm, loanApplication } from './service';
import styles from './style.less';
import {parse} from 'querystring'



import { history } from 'umi';
import { useRef } from "react";
import moment from 'moment';
const dateFormat = 'YYYY-MM-DD';
var loan_term = 6




const CompanyForm: FC<Record<string, any>> = () => {

  const formRef = useRef<ProFormInstance>();
  const platformIdChange = (value: any) =>{
    console.log(value);
    if(value =="7"){
      loan_term = 6
    }else if(value =="14"){
      loan_term = 13
    }else if(value =="30"){
      loan_term = 29
    }else if(value =="45"){
      loan_term = 44
    }else if(value =="60"){
        loan_term = 59
    }else{loan_term = 89}

    formRef?.current?.setFieldsValue({
      // name: "张三",
      application_end_date: moment().add(loan_term,'d').format(dateFormat)
    });
    // console.log("formRef++++++++++",formRef?.current?.getFieldFormatValue("application_loan_term"));
  }


  const { run } = useRequest(fakeSubmitForm, {
    manual: true,
    onSuccess: () => {
      message.success('Submitted Successfully');
    },
  });

  const onFinish = async (values: Record<string, any>) => {
    run(values);
    // 跳转到指定路由
    //window.open("/application/loan-application-list-borrower", "_self");
    history.push('/application/loan-application-list-borrower');
  };

  var { data, error, loading } = useRequest(() => {
    return request(
      '/api/borrower/get_borrower_from_id',
    );
  });
  
  const access = useAccess();

  var checkMoney = (rule, value, callback) => {
    if (!value) {
      return callback(new Error('金额不能为空'));
    }
    setTimeout(() => {
      if (!Number.isInteger(value)) {
        callback(new Error('请输入数字值'));
      } else {
        if (value <= 0) {
          callback(new Error('金额必须大于0'));
        } else if(value > data?.available_amount){
          callback(new Error('不能大于可贷款金额'));
        }else {
          callback();
        }
      }
    }, 100);
  };


  return (
    <PageContainer content="">
      <Card bordered={false}>
        <ProForm
          formRef={formRef}
          layout="vertical"
          onFinish={onFinish}
        >
          <Card
            title={<FormattedMessage id='pages.util.review_info'/>}
            className="styles.card"
            bordered={false}
            size= "small"
            headStyle = {{color:'#2f54eb', fontSize: 16, fontWeight:'bold'}}
            //style={{ marginLeft: 50 }}
            >
            <div style={{margin: 'auto', width: 1200}}>
                <Descriptions style={{ marginBottom: 24 }} title={""} column={4}>
                  <Descriptions.Item label={<FormattedMessage id='pages.borrower_form.account_receivable.amount_limit'/>}>{data?.amount_limit}</Descriptions.Item>
                  <Descriptions.Item label={<FormattedMessage id='pages.borrower_form.account_receivable.amount_remain'/>}>{data?.available_amount}</Descriptions.Item>
                  <Descriptions.Item label={<FormattedMessage id='pages.util.currency'/>}>{data?.currency}</Descriptions.Item>
                  <Descriptions.Item> </Descriptions.Item>
                  <Descriptions.Item label={<FormattedMessage id='pages.borrower_form.account_receivable.duration'/>}>{data?.duration}</Descriptions.Item>
                  <Descriptions.Item label={<FormattedMessage id='pages.borrower_form.account_receivable.annual_interest_rate'/>}>{data?.annual_interest_rate*100}%</Descriptions.Item>
                  <Descriptions.Item label={<FormattedMessage id='pages.borrower_form.account_receivable.penalty_annual_interest_rate'/>}>{data?.penalty_annual_interest_rate*100}%</Descriptions.Item>
                </Descriptions>
            </div>
          </Card>
          {/* <Card title={<FormattedMessage id='pages.util.basic_info'/>} className={styles.card} bordered={false}> */}
          <Card
            title={<FormattedMessage id='pages.util.basic_info'/>}
            className="styles.card"
            bordered={false}
            size= "small"
            headStyle = {{color:'#2f54eb', fontSize: 16, fontWeight:'bold'}}
            >
            <Row gutter={16}>
              <Col xl={6} lg={6} md={12} sm={24}>
                <ProFormText
                  label={<FormattedMessage id='pages.loan_application_list.purpose'/>}
                  width="md"
                  name="name"
                  rules={[{ required: true, message: 'Please input the application name.' }]}
                />
              </Col>

              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>
              </Col>

              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 24 }} sm={24}>
              </Col>
              
            </Row>

            <Row gutter={16}>
              <Col xl={6} lg={6} md={12} sm={24}>
                <ProFormMoney
                  label={<FormattedMessage id='pages.loan_form.total_amount'/>}
                  width="md"
                  name="application_amount"
                  fieldProps={{ moneySymbol: false, }}
                  locale="en-US"
                  rules={
                    [{ required: true, message: 'Please input the total amount.' },
                     { validator: checkMoney,  }
                    ]
                  }
                />
              </Col>

              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>
                <ProFormSelect
                  initialValue={data?.currency}
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

              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 24 }} sm={24}>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xl={6} lg={6} md={12} sm={24}>
              
              <ProFormSelect
                //国际化信息
                fieldProps={{
                  onChange: (e) => {
                    console.log("platformIdChange(e)")
                    platformIdChange(e);
                  },
                }}
                label={<FormattedMessage id='pages.util.loan_term'/>}
                width="md"
                name="application_loan_term"
                // name="application_currency"
                rules={[{ required: true, message: 'Please input the loan term.' }]}
                valueEnum={{
                  7:7,
                  14:14,
                  30:30,
                  45:45,
                }}
              />
              </Col>

              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 24 }} sm={24}>
                  <ProFormDatePicker
                    initialValue={moment().format(dateFormat)} 
                    disabled
                    // moment(timestamp).format('YYYY-MM-DD HH:mm:ss')
                    label={<FormattedMessage id='pages.util.start_date'/>}
                    width="md"
                    name="application_start_date"
                    rules={[
                      {
                        required: true,
                        message: 'Please select the start date',
                      },
                    ]}
                  />                
              </Col>

              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>
                <ProFormDependency name={['application_loan_term']}>
                    {({application_loan_term}) => {
                        return (          
                          <ProFormDatePicker
                          // initialValue = {moment().format(dateFormat)}
                              disabled
                              initialValue={moment().add(loan_term,'d').format(dateFormat)}
                              label={<FormattedMessage id='pages.util.end_date'/>}
                              width="md"
                              name="application_end_date"
                              rules={[
                                {
                                  required: true,
                                  message: 'end_date',
                                },
                              ]}
                        />  
                        );
                    }}
                </ProFormDependency> 
                          
              </Col>
          
            </Row>
        </Card>

        <Card title={<FormattedMessage id='pages.util.other'/>} className={styles.card} bordered={false}>
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
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default CompanyForm;
