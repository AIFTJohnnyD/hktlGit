import React from 'react';
import { Modal } from 'antd';
import ProForm, {
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from '@ant-design/pro-form';
import type { TableListItem } from '../data';

import { Card, Row, Col, Result, Button, Descriptions, Divider, Alert, Statistic } from 'antd';
import styles from './style.less';

import { FormattedMessage } from 'umi';

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

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  return (
    <StepsForm
      stepsProps={{
        size: 'small',
      }}
      stepsFormRender={(dom, submitter) => {
        return (
          <Modal
            width={1200}
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
          name: props.values.name,
          br_no: props.values.br_no,
          phone_country_code: props.values.phone_country_code,
          phone: props.values.phone,
          address: props.values.address,
          email: props.values.email,
        }}
        title={<FormattedMessage id='pages.lender_form.company_info'/>}
        style={{
          minWidth: 1200,
          marginBottom: 16,
        }}        
      >
          <Card title="" className={styles.card} bordered={false}>
            <Row gutter={16}>
              <Col xl={{ span: 12, offset: 0 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <ProFormText
                  label={<FormattedMessage id='pages.lender_form.company_name'/>}
                  width="md"
                  name="name"
                  rules={[{ required: true, message: 'Please input the company name.' }]}
                />
              </Col>            
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 24 }} sm={24}>
                <ProFormText
                  label={<FormattedMessage id='pages.lender_form.br_no'/>}
                  width="md"
                  name="br_no"
                  rules={[{ required: true, message: 'Please input the business registration No.' }]}
                />
              </Col>
            </Row>			

            <Row gutter={16}>
              <Col xl={{ span: 12, offset: 0 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <ProForm.Group title={<FormattedMessage id='pages.lender_form.phone'/>} size={8}>
                  <ProFormSelect
                    allowClear={false}
                    name="phone_country_code"
                    rules={[{ required: true, message: 'Country code' }]}
                    valueEnum={{
                      hk: '+852',
                      mainland: '+86',
                    }}
                  />
                  <ProFormText
                    label=""
                    width="sm"
                    name="phone"
                    rules={[{ required: true, message: 'Please input the phone number.' }]}
                  />
                </ProForm.Group>
              </Col>

              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 24 }} sm={24}>
                <ProFormText
                  label={<FormattedMessage id='pages.lender_form.email'/>}
                  width="md"
                  name="email"
                  rules={[
                    { required: true, message: 'Please input the email.' },
                    { type: 'email', message: 'It should be the email format.' },
                  ]}
                />
              </Col>                
            </Row>

            <Row gutter={16}>
              <Col xl={{ span: 16, offset: 0 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <ProFormTextArea
                  label={<FormattedMessage id='pages.lender_form.address'/>}
                  width="lg"
                  name="address"
                  rules={[{ required: true, message: 'Please input the address line 1.' }]}
                />
              </Col>            
            </Row>			
        </Card>
      </StepsForm.StepForm>

      <StepsForm.StepForm
        initialValues={{
          person: props.values.person,
          person_title: props.values.person_title,
          person_email: props.values.person_email,
          person_office_phone_country_code: props.values.person_office_phone_country_code,
          person_office_phone: props.values.person_office_phone,
          person_mobile_phone_country_code: props.values.person_mobile_phone_country_code,
          person_mobile_phone: props.values.person_mobile_phone,
          person_address: props.values.person_address,
        }}
        title={<FormattedMessage id='pages.lender_form.person_info'/>}
        style={{
          minWidth: 1200,
          marginBottom: 16,
        }}        
      >

        <Card title="" className={styles.card} bordered={false}>
            <Row gutter={16}>
              <Col xl={{ span: 12, offset: 0 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <ProFormText
                  label={<FormattedMessage id='pages.lender_form.person_name'/>}
                  width="md"
                  name="person"
                  rules={[{ required: true, message: 'Please input the person name.' }]}
                />
              </Col>

              <Col xl={{ span: 12, offset: 0 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <ProFormText
                  label={<FormattedMessage id='pages.lender_form.person_title'/>}
                  width="md"
                  name="person_title"
                  rules={[{ required: true, message: 'Please input the person title.' }]}
                />
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xl={{ span: 12, offset: 0 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <ProForm.Group title={<FormattedMessage id='pages.lender_form.office_phone'/>} size={8}>
                  <ProFormSelect
                    allowClear={false}
                    name="person_office_phone_country_code"
                    rules={[{ required: true, message: 'Country code' }]}
                    valueEnum={{
                      hk: '+852',
                      mainland: '+86',
                    }}
                  />
                  <ProFormText
                    label=""
                    width="sm"
                    name="person_office_phone"
                    rules={[{ required: true, message: 'Please input the office phone number.' }]}
                  />
                </ProForm.Group>
              </Col>

              <Col xl={{ span: 12, offset: 0 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <ProForm.Group title={<FormattedMessage id='pages.lender_form.mobile_phone'/>} size={8}>
                  <ProFormSelect
                    allowClear={false}
                    name="person_mobile_phone_country_code"
                    rules={[{ required: true, message: 'Country code' }]}
                    valueEnum={{
                      hk: '+852',
                      mainland: '+86',
                    }}
                  />
                  <ProFormText
                    label=""
                    width="sm"
                    name="person_mobile_phone"
                    rules={[{ required: true, message: 'Please input the mobile phone number.' }]}
                  />
                </ProForm.Group>
              </Col>
            </Row>
    
            <Row gutter={16}>
              <Col xl={{ span: 16, offset: 0 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <ProFormText
                  label={<FormattedMessage id='pages.lender_form.person_email'/>}
                  width="md"
                  name="person_email"
                  rules={[
                    { required: true, message: 'Please input the email.' },
                    { type: 'email', message: 'It should be the email format.' },
                  ]}
                />
              </Col>            
            </Row>

            <Row gutter={16}>
              <Col xl={{ span: 16, offset: 0 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <ProFormTextArea
                  label={<FormattedMessage id='pages.lender_form.person_address'/>}
                  width="lg"
                  name="person_address"
                  rules={[{ required: true, message: 'Please input the address line.' }]}
                />
              </Col>            
            </Row>
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
            <Col xl={{ span: 12, offset: 0 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <ProFormSelect
                allowClear={false}
                label={<FormattedMessage id='pages.util.status'/>}
                width="md"
                name="status"
                rules={[{ required: true, message: 'Please input the status.' }]}
                valueEnum={{
                  CREATED: (<FormattedMessage id='pages.application.CREATED'/>),
                  APPROVED: (<FormattedMessage id='pages.application.APPROVED'/>),
                  UNAPPROVED: (<FormattedMessage id='pages.application.UNAPPROVED'/>), 
                  CLOSED: (<FormattedMessage id='pages.application.CLOSED'/>), 
                }}
              />            
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>                
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
