import { Card, message, Row, Col } from 'antd';
import ProForm, {
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormMoney,
  ProFormDatePicker,
  ProFormDigit,
} from '@ant-design/pro-form';
import { useRequest, FormattedMessage } from 'umi';
import type { FC } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { fakeSubmitForm } from './service';
import styles from './style.less';

const CompanyForm: FC<Record<string, any>> = () => {
  const { run } = useRequest(fakeSubmitForm, {
    manual: true,
    onSuccess: () => {
      message.success('Submitted Successfully');
    },
  });

  const onFinish = async (values: Record<string, any>) => {
    run(values);
  };

  return (
    <PageContainer content="">
      <div className={styles.divline}></div>
      
      <Card bordered={false}>
        <ProForm
          layout="vertical"
          onFinish={onFinish}
        >
          <Card title={<FormattedMessage id='pages.loan_form.basic_info'/>} className={styles.card} bordered={false}>
            <Row gutter={16}>
              <Col xl={6} lg={6} md={12} sm={24}>
                <ProFormText
                  label={<FormattedMessage id='pages.loan_form.loan_name'/>}
                  width="md"
                  name="name"
                  rules={[{ required: true, message: 'Please input the loan name.' }]}
                />
              </Col>

              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>
                <ProFormMoney
                  label={<FormattedMessage id='pages.loan_form.total_amount'/>}
                  width="md"
                  name="total_amount"
                  locale="en-US"
                  rules={[{ required: true, message: 'Please input the total amount.' }]}
                />
              </Col>

              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 24 }} sm={24}>
                <ProFormSelect
                  allowClear={false}
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
                  label={<FormattedMessage id='pages.util.start_date'/>}
                  width="md"
                  name="start_date"
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
                  label={<FormattedMessage id='pages.util.end_date'/>}
                  width="md"
                  name="end_date"
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

        <Card title={<FormattedMessage id='pages.loan_form.loan_type'/>} className={styles.card} bordered={false}>
            <Row gutter={16}>
              <Col xl={6} lg={6} md={12} sm={24}>
                <ProFormDigit
                  label={<FormattedMessage id='pages.loan_form.lower_bound'/>}
                  width="md"
                  name="lower_bound"
                  rules={[{ required: true, message: 'Please input the lower bound of the loan type.' }]}
                />
              </Col>

              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>
                <ProFormDigit
                  label={<FormattedMessage id='pages.loan_form.upper_bound'/>}
                  width="md"
                  name="upper_bound"
                  rules={[{ required: true, message: 'Please input the upper bound of the loan type.' }]}
                />
              </Col>

              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 24 }} sm={24}>
              </Col>
              
            </Row>


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
        </Card>


        <Card title={<FormattedMessage id='pages.loan_form.other_cost'/>} className={styles.card} bordered={false}>
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
                <ProFormSelect
                  allowClear={false}
                  label={<FormattedMessage id='pages.loan_form.other_cost_type'/>}
                  width="md"
                  name="other_cost_type"
                  rules={[{ required: true, message: 'Please input the other cost type.' }]}
                  valueEnum={{
                    FIXED_COST: 'FIXED COST',
                    MONTHLY_COST: 'MONTHLY COST',
                    ANNUAL_COST: 'ANNUAL COST',
                  }}
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


            <Row gutter={16}>
              <Col xl={{ span: 16, offset: 0 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <ProFormSelect
                  allowClear={false}
                  label={<FormattedMessage id='pages.util.status'/>}
                  width="lg"
                  name="status"
                  rules={[{ required: true, message: 'Please input the status.' }]}
                  valueEnum={{
                    ACTIVE: (<FormattedMessage id='pages.application.ACTIVE'/>),
                    INACTIVE: (<FormattedMessage id='pages.application.INACTIVE'/>),
                  }}
                />            
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
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default CompanyForm;
