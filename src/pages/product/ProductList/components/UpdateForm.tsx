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
  onSubmit: (values: FormValueType) => Promise<void>;
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
        initialValues={{
          product_id: props.values.product_id,

          platform: props.values.platform,
          product_id_in_platform: props.values.product_id_in_platform,

          url: props.values.url,

          title: props.values.title,
          description: props.values.description,
        }}
        title={<FormattedMessage id='pages.util.basic_info'/>}
      >

          <Card title="" className={styles.card} bordered={false}>
            <Row gutter={16}>
              <Col span={12}>
                <ProFormSelect
                  label={<FormattedMessage id='pages.product_form.platform'/>}
                  width="md"
                  name="platform"
                  rules={[{ required: true, message: 'Please input the e-commerce platform.' }]}
                  valueEnum={{
                    AMAZON_US: 'Amazon US',
                    AMAZON_UK: 'Amazon UK',
                    EBAY: 'EBay',
                  }}
                />
              </Col>
              <Col span={12}>
                <ProFormText
                  label={<FormattedMessage id='pages.product_form.product_id'/>}
                  width="md"
                  name="product_id_in_platform"
                  rules={[{ required: true, message: 'Please input the product ID in the E-Commerce Platform.' }]}
                />              
              </Col>
            </Row>

            <Row gutter={16} >
              <Col xl={{ span: 16, offset: 0 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <ProFormText
                  label={<FormattedMessage id='pages.product_form.url'/>}
                  width="xl"
                  name="url"
                  rules={[{ required: true, message: 'Please input the url.' }]}
                />
              </Col>
            </Row>

            <Row gutter={16} >
              <Col xl={{ span: 16, offset: 0 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <ProFormTextArea
                  label={<FormattedMessage id='pages.product_form.title'/>}
                  width="xl"
                  name="title"
                  rules={[{ required: true, message: 'Please input the title.' }]}
                />
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xl={{ span: 16, offset: 0 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <ProFormTextArea
                  label={<FormattedMessage id='pages.product_form.description'/>}
                  width="xl"
                  name="description"
                  rules={[{ required: false, message: 'Please input the description.' }]}
                /> 
              </Col>
            </Row>
          </Card>
          

      </StepsForm.StepForm>

      <StepsForm.StepForm
        initialValues={{
          category_0: props.values.category_0,
          category_1: props.values.category_1,
          category_2: props.values.category_2,
          category_3: props.values.category_3,
          category_4: props.values.category_4,
          category_5: props.values.category_5,          
        }}
        title={<FormattedMessage id='pages.product_form.categories'/>}
      >
          <Card title="" className={styles.card} bordered={false}>
            <Row gutter={16}>
              <Col xl={6} lg={6} md={12} sm={24}>
                <ProFormSelect
                  label={<FormattedMessage id='pages.product_form.category_level_0'/>}
                  width="md"
                  name="category_0"
                  rules={[{ required: true, message: 'Please input the category level-0.' }]}
                  valueEnum={{
                    AUTOMOTIVE: 'Automotive',
                    BABY: 'Baby',
                    HOME_KITCHEN: 'Home & Kitchen',
                  }}
                />
              </Col>

              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>
                <ProFormSelect
                  label={<FormattedMessage id='pages.product_form.category_level_1'/>}
                  width="md"
                  name="category_1"
                  rules={[{ required: true, message: 'Please input the category level-1.' }]}
                  valueEnum={{
                    KIDS_HOME_STORE: "Kids' Home Store",
                    KITCHEN_DINING: 'Kitchen & Dining',
                  }}
                />
              </Col>

              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 24 }} sm={24}>
                <ProFormSelect
                  label={<FormattedMessage id='pages.product_form.category_level_2'/>}
                  width="md"
                  name="category_2"
                  rules={[{ required: true, message: 'Please input the category level-2.' }]}
                  valueEnum={{
                    FOOD_SERVICE_EQUIPMENT_SUPPLIES: "Food Service Equipment & Supplies",
                    KITCHEN_DINING: 'Small Appliances',
                  }}
                />
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xl={6} lg={6} md={12} sm={24}>
                <ProFormSelect
                  label={<FormattedMessage id='pages.product_form.category_level_3'/>}
                  width="md"
                  name="category_3"
                  rules={[{ required: false, message: 'Please input the category level-3.' }]}
                  valueEnum={{
                    SPECIALTY_APPLIANCES: "Specialty Appliances",
                    ELECTRIC_PRESSURE_COOKERS: 'Electric Pressure Cookers',
                  }}
                />
              </Col>

              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>
                <ProFormSelect
                  label={<FormattedMessage id='pages.product_form.category_level_4'/>}
                  width="md"
                  name="category_4"
                  rules={[{ required: false, message: 'Please input the category level-4.' }]}
                  valueEnum={{
                  }}
                />
              </Col>

              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 24 }} sm={24}>
                <ProFormSelect
                  label={<FormattedMessage id='pages.product_form.category_level_5'/>}
                  width="md"
                  name="category_5"
                  rules={[{ required: false, message: 'Please input the category level-5.' }]}
                  valueEnum={{
                  }}
                />
              </Col>
            </Row>
          </Card>        
      </StepsForm.StepForm>

      <StepsForm.StepForm
        initialValues={{
          list_price: props.values.list_price,
          discount_price: props.values.discount_price,
          currency: props.values.currency,
        }}
        title={<FormattedMessage id='pages.product_form.price'/>}
      >
        <Card title="" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col xl={6} lg={6} md={12} sm={24}>
              <ProFormMoney
                label={<FormattedMessage id='pages.product_form.list_price'/>}
                width="md"
                name="list_price"
                locale="en-US"
                rules={[{ required: true, message: 'Please input the list price.' }]}
              />
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>
              <ProFormMoney
                label={<FormattedMessage id='pages.product_form.discount_price'/>}
                width="md"
                name="discount_price"
                locale="en-US"
                rules={[{ required: true, message: 'Please input the discount price.' }]}
              />
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 24 }} sm={24}>
              <ProFormSelect
                label={<FormattedMessage id='pages.product_form.currency'/>}
                width="md"
                name="currency"
                rules={[{ required: true, message: 'Please input the currency.' }]}
                valueEnum={{
                  USD: 'USD',
                  GBP: 'GBP',
                }}
              />
            </Col>            
          </Row>
        </Card>        
      </StepsForm.StepForm>
      
      <StepsForm.StepForm
        initialValues={{
          minimal_demand: props.values.minimal_demand,
          likely_demand: props.values.likely_demand,
          maximum_demand: props.values.maximum_demand,
        }}
        title={<FormattedMessage id='pages.product_form.expected_monthly_demand'/>}
      >
        <Card title="" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col xl={6} lg={6} md={12} sm={24}>
              <ProFormDigit
                label={<FormattedMessage id='pages.product_form.minimal_demand'/>}
                width="md"
                name="minimal_demand"
                rules={[{ required: true, message: '' }]}
              />
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>
              <ProFormDigit
                label={<FormattedMessage id='pages.product_form.likely_demand'/>}
                width="md"
                name="likely_demand"
                rules={[{ required: true, message: '' }]}
              />
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 24 }} sm={24}>
              <ProFormDigit
                label={<FormattedMessage id='pages.product_form.maximum_demand'/>}
                width="md"
                name="maximum_demand"
                rules={[{ required: true, message: '' }]}
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
            <Col xl={{ span: 16, offset: 0 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <ProFormSelect
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

      </StepsForm.StepForm>      
    </StepsForm>
  );
};

export default UpdateForm;
