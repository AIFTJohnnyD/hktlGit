import { Card, message, Row, Col, Descriptions } from 'antd';
import ProForm, {
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormMoney,
  ProFormDatePicker,
  ProFormDigit,
  ProFormDependency,
} from '@ant-design/pro-form';
import { useRequest, FormattedMessage } from 'umi';
import type { FC } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { fakeSubmitForm } from './service';
import styles from './style.less';

import { history, request } from 'umi';
import moment from 'moment';

const CompanyForm: FC<Record<string, any>> = () => {
  const { run } = useRequest(fakeSubmitForm, {
    manual: true,
    onSuccess: () => {
      message.success('Submitted Successfully');
    },
  });

  const onFinish = async (values: Record<string, any>) => {
    run(values);
    history.push('/application/loan-application-list-borrower');
  };

  const { data, error, loading } = useRequest(() => {
    return request(
      '/api/borrower/get_borrower_from_id',
    );
  });

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

        <ProForm
          layout="vertical"
          onFinish={onFinish}
        >
          <Card 
            title={<FormattedMessage id='pages.borrower_form.account_receivable.application_info'/>} 
            className={styles.card} 
            bordered={false}
            size= "small"
            headStyle = {{color:'#2f54eb', fontSize: 16, fontWeight:'bold'}}            
            >
            <Row gutter={16}>
              <Col xl={6} lg={6} md={12} sm={24}>
                <ProFormText
                  label={<FormattedMessage id="pages.util.name_ddddd" defaultMessage='融资产品名称'/>}
                  width="md"
                  name="name"
                  initialValue={"应收账款融资"}
                  disabled
                  // rules={[{ required: true, message: 'Please input the application name.' }]}
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
                  label={<FormattedMessage id="pages.loan_form.application_amount" />}
                width="md"
                name="application_amount"
                locale="en-US"
                rules={[{ required: true, message: 'Please input the total amount.' },
                        { validator: checkMoney }]}
              />
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>
              <ProFormSelect
                allowClear={false}
                label={<FormattedMessage id='pages.util.currency'/>}
                width="md"
                name="application_currency"
                rules={[{ required: true, message: 'Please input the currency.' }]}
                valueEnum={{
                  USD: 'USD',
                  HKD: 'HKD',
                }}
              />
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 24 }} sm={24}>
            </Col>
          </Row>


          <Row gutter={16}>
            <Col xl={6} lg={6} md={12} sm={24}>
                <ProFormDatePicker
                  label={<FormattedMessage id='pages.util.start_date'/>}
                  width="md"
                  name="application_start_date"
                  rules={[
                    {
                      required: true,
                      message: 'Please select the start date',
                    },
                  ]}
                  //initialValue={moment().format('YYYY-MM-DD')}
                />                
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>
              <ProFormSelect
                allowClear={false}
                label={<FormattedMessage id='pages.util.loan_term'/>}
                width="md"
                name="application_loan_term"
                rules={[{ required: true, message: 'Please input the loan term.' }]}
                valueEnum={{
                  7:7,
                  14:14,
                  30:30,
                  45:45,
                  60:60,
                  90: 90,
                  120: 120,
                }}
                initialValue={30}
              />
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 24 }} sm={24}>
              <ProFormDependency name={['application_start_date', 'application_loan_term']}>
              {({application_start_date, application_loan_term}) => {
                let date = new Date(application_start_date);
                date.setDate(date.getDate() + Number(application_loan_term) - 1);
                if (application_start_date != null) {
                  return (
                    <ProFormText
                      label={<FormattedMessage id='pages.util.end_date'/>}
                      width="md"
                      name="application_end_date"
                      rules={[{ required: false, message: '' }]}
                      value={moment(date).format('YYYY-MM-DD')}
                      disabled
                    />
                  );
                }
              }}
              </ProFormDependency>                
            </Col>
          </Row>
        </Card>

        <Card title={<FormattedMessage id='pages.util.other'/>} className={styles.card} bordered={false}>
            <Row gutter={16}>
              <Col xl={{ span: 16, offset: 0 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <ProFormTextArea
                    label={<FormattedMessage id='pages.loan_form.application_purpose'/>}
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
