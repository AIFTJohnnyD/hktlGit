import { Card, message, Row, Col, Button, Upload } from 'antd';
import ProForm, {
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormMoney,
  ProFormDatePicker,
  ProFormDigit,
  ProFormUploadButton
} from '@ant-design/pro-form';
import { useRequest } from 'umi';
import type { FC } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { fakeSubmitForm, get_product_info } from './service';
import styles from './style.less';

import { FormattedMessage } from 'umi';

import React, { useRef } from 'react';
import type { ProFormInstance } from '@ant-design/pro-form';

import { UploadOutlined } from '@ant-design/icons';

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

  const formRef = useRef<ProFormInstance>();
  const getProductInfo = () => {
    //message.info(${formRef?.current?.getFieldValue('url')});

    get_product_info({'url': formRef?.current?.getFieldValue('url')}).then(({data, error, loading}) => {
      console.log(data)
      formRef?.current?.setFieldsValue({
        platform: data.platform,
        product_id_in_platform: data.product_id_in_platform,

        title: data.title,
        description: data.description,

        img: data.img,

        category_0: data.category_0,
        category_1: data.category_1,
        category_2: data.category_2,
        category_3: data.category_3,
        category_4: data.category_4,
        category_5: data.category_5,

        list_price: data.list_price,
        discount_price: data.discount_price,        
        currency: data.currency,
      });    
    });    
  };
  
  const propsUpload = {
    name: 'file',
    action: '/api/product/upload_file',
    //headers: {
    //  authorization: 'authorization-text',
    //},
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);

        console.log(info.file.response);
        let res = eval(info.file.response);
        let data = JSON.parse(res['data']);
        console.log(data);

        formRef?.current?.setFieldsValue({
          platform: data.platform,
          product_id_in_platform: data.product_id_in_platform,
  
          title: data.title,
          description: data.description,

          img: data.img,
  
          category_0: data.category_0,
          category_1: data.category_1,
          category_2: data.category_2,
          category_3: data.category_3,
          category_4: data.category_4,
          category_5: data.category_5,
  
          list_price: data.list_price,
          discount_price: data.discount_price,        
          currency: data.currency,

          minimal_demand: data.minimal_demand,
          likely_demand: data.likely_demand,
          maximum_demand: data.maximum_demand,
        });   

      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <PageContainer content="">
      <div className={styles.divline}></div>
      <Card bordered={false}>
        <ProForm
          layout="vertical"
          onFinish={onFinish}
          formRef={formRef}
        >

          <Card title={<FormattedMessage id='pages.product_form.auto_fill_in'/>} className={styles.card} bordered={false}>
            <Row gutter={16} >
              <Col xl={16} lg={16} md={16} sm={24}>
                <ProFormText
                  label={<FormattedMessage id='pages.product_form.url'/>}
                  width="xl"
                  name="url"
                  rules={[{ required: true, message: 'Please input the url.' }]}
                />
                <Button htmlType="button" onClick={getProductInfo} key="read">
                  <FormattedMessage id='pages.product_form.read_from_webpage'/>
                </Button>

                <Upload {...propsUpload}>
                  <Button icon={<UploadOutlined />}><FormattedMessage id='pages.product_form.upload_file'/></Button>
                </Upload>

              </Col>

              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>
              </Col>

              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 8 }} md={{ span: 24 }} sm={24}>
              </Col>

            </Row>
          </Card>

          <Card title={<FormattedMessage id='pages.product_form.basic_info'/>} className={styles.card} bordered={false}>
            <Row gutter={16}>
              <Col xl={6} lg={6} md={12} sm={24}>
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

              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>
                <ProFormText
                  label={<FormattedMessage id='pages.product_form.product_id'/>}
                  width="md"
                  name="product_id_in_platform"
                  rules={[{ required: true, message: 'Please input the product ID in the E-Commerce Platform.' }]}
                />
              </Col>

              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 8 }} md={{ span: 24 }} sm={24}>
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

            <Row gutter={16} >
              <Col xl={{ span: 16, offset: 0 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <ProFormText
                  label={<FormattedMessage id='pages.product_form.img'/>}
                  width="xl"
                  name="img"
                  rules={[{ required: true, message: 'Please input the image url.' }]}
                />
              </Col>
            </Row>            
          </Card>

          <Card title={<FormattedMessage id='pages.product_form.categories'/>} className={styles.card} bordered={false}>
            <Row gutter={16}>
              <Col xl={6} lg={6} md={12} sm={24}>
                <ProFormText
                  label={<FormattedMessage id='pages.product_form.category_level_0'/>}
                  width="md"
                  name="category_0"
                  rules={[{ required: true, message: 'Please input the category level-0.' }]}
                />
              </Col>

              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>
                <ProFormText
                  label={<FormattedMessage id='pages.product_form.category_level_1'/>}
                  width="md"
                  name="category_1"
                  rules={[{ required: true, message: 'Please input the category level-1.' }]}
                />
              </Col>

              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 24 }} sm={24}>
                <ProFormText
                  label={<FormattedMessage id='pages.product_form.category_level_2'/>}
                  width="md"
                  name="category_2"
                  rules={[{ required: true, message: 'Please input the category level-2.' }]}
                />
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xl={6} lg={6} md={12} sm={24}>
                <ProFormText
                  label={<FormattedMessage id='pages.product_form.category_level_3'/>}
                  width="md"
                  name="category_3"
                  rules={[{ required: false, message: 'Please input the category level-3.' }]}
                />
              </Col>

              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>
                <ProFormText
                  label={<FormattedMessage id='pages.product_form.category_level_4'/>}
                  width="md"
                  name="category_4"
                  rules={[{ required: false, message: 'Please input the category level-4.' }]}
                />
              </Col>

              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 24 }} sm={24}>
                <ProFormText
                  label={<FormattedMessage id='pages.product_form.category_level_5'/>}
                  width="md"
                  name="category_5"
                  rules={[{ required: false, message: 'Please input the category level-5.' }]}
                />
              </Col>
            </Row>
          </Card>

        <Card title={<FormattedMessage id='pages.product_form.price'/>} className={styles.card} bordered={false}>
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

        <Card title={<FormattedMessage id='pages.product_form.expected_monthly_demand'/>} className={styles.card} bordered={false}>
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

        <Card title={<FormattedMessage id='pages.util.review_info'/>} className={styles.card} bordered={false}>
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

        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default CompanyForm;
