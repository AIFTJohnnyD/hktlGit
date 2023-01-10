import React, { useState } from 'react';
import ProCard from '@ant-design/pro-card';
import RcResizeObserver from 'rc-resize-observer';
import {FormattedMessage} from 'umi';
import { Divider, Alert, Row, Col } from 'antd';
import styles from '../style.less';

import { ProFormDatePicker, ProFormSelect, ProFormText, ProFormUploadButton } from '@ant-design/pro-form';

const BasicInformation: React.FC = () => {
  const [responsive, setResponsive] = useState(false);
  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <ProCard
        title={<FormattedMessage id='pages.borrower_form.base_info'/>}
        extra=""
        split={responsive ? 'horizontal' : 'vertical'}
        bordered
        headerBordered>
        <ProCard title={<FormattedMessage id='pages.borrower_form.base_info'/>} 
        >
          <Row justify="space-evenly">
            <Col xl={6} lg={6} md={12} sm={24}>
              <ProFormSelect
                label={<FormattedMessage id="pages.borrower_form.basic_information.company_country" />}
                    width="md"
                    name="company_country"
                    rules={[{ required: true, message: 'Please input the company_country.' }]}
                    valueEnum={{
                      中国大陆: '中国大陆',
                      中国香港: '中国香港',
                }}
                />
            </Col>
            <Col xl={6} lg={6} md={12} sm={24}>
              <ProFormSelect
                label={<FormattedMessage id="pages.borrower_form.basic_information.company_business" />}
                    width="md"
                    name="company_business"
                    rules={[{ required: true, message: 'Please input the company_business.' }]}
                    valueEnum={{
                      电商: '电商',
                      非电商: '非电商',
                }}
              />
            </Col>
            <Col xl={6} lg={6} md={12} sm={24}>
              <ProFormText
                label={<FormattedMessage id='pages.borrower_form.basic_information.mainland_company_name'/>}
                width="md"
                name="name_cn"
                rules={[{ required: true, message: '请输入公司名称' }]}
              />
            </Col>
            <Col xl={6} lg={6} md={12} sm={24}>
              <ProFormText
                  initialValue={"Amazon.com"}
                  label={<FormattedMessage id='pages.borrower_form.basic_information.mainland_store_link'/>}
                  width="md"
                  name="store_link"
                  rules={[{ required: true, message: '请输入店铺链接,无则为亚马逊Amazon.com' }]}
                />
            </Col>
          </Row>
          <Row justify="space-evenly">
            <Col xl={6} lg={6} md={12} sm={24}>
              <ProFormText
                label={<FormattedMessage id='pages.borrower_form.basic_information.mainland_company_contact_name'/>}
                width="md"
                name="company_contact_name"
                rules={[{ required: true, message: '请输入公司联系人名称' }]}
              />  
            </Col>    
            <Col xl={6} lg={6} md={12} sm={24}>      
                <ProFormText
                  label={<FormattedMessage id='pages.borrower_form.basic_information.mainland_company_contact_phone'/>}
                  width="md"
                  name="company_contact_phone"
                  rules={[{ required: true, message: '请输入公司联系人电话' }]}
                /> 
            </Col> 
            <Col xl={6} lg={6} md={12} sm={24}>
              <ProFormText
                  label={<FormattedMessage id='pages.borrower_form.basic_information.mainland_company_contact_email'/>}
                  width="md"
                  name="company_contact_email"
                  rules={[{ required: true, message: '请输入企业联系邮箱' }]}
              /> 
            </Col>
            <Col xl={6} lg={6} md={12} sm={24}>
              <ProFormText
                  label={<FormattedMessage id='pages.borrower_form.basic_information.mainland_company_address'/>}
                  width="md"
                  name="company_address"
                  rules={[{ required: true, message: '请输入办公地址' }]}
              />  
            </Col>
          </Row>
          <Row justify="space-evenly">
            <Col xl={6} lg={6} md={12} sm={24}>
              <ProFormText
                label={<FormattedMessage id='pages.borrower_form.basic_information.mainland_company_postalcode'/>}
                width="md"
                name="company_postalcode"
                rules={[{ required: true, message: '请输入邮政编码' }]}
              /> 
            </Col>    
            <Col xl={6} lg={6} md={12} sm={24}>      
              <ProFormUploadButton
                name="upload"
                label={<FormattedMessage id='pages.borrower_form.basic_information.file_br_cn'/>}
                max={2}
                fieldProps={{
                  name: 'file_br_cn',
                }}
                rules={[{ required: true, message: '请上传营业执照' }]}
                action="/upload.do"
              />
            </Col> 
            <Col xl={6} lg={6} md={12} sm={24}>
              <ProFormDatePicker
                label={<FormattedMessage id="pages.borrower_form.basic_information.mainland_compnay_establishment_date" />}
                width="md"
                name="mainland_compnay_establishment_date"
                rules={[
                  {
                    required: true,
                    message: 'Please select the establishment_date',
                  },
                ]}
              />
            </Col>
            <Col xl={6} lg={6} md={12} sm={24}>
              <ProFormText
                  label={<FormattedMessage id='pages.borrower_form.basic_information.mainland_unified_social_credit_code'/>}
                  width="md"
                  name="credit_code_cn"
                  rules={[{ required: true, message: '' }]}
              /> 
            </Col>
          </Row>
        </ProCard>
        {/* <ProCard title={<FormattedMessage id='pages.borrower_form.basic_information.HongKong_company'/>} colSpan="50%">
          <div style={{ height: 400 }}>
            <ProFormText
              label={<FormattedMessage id='pages.borrower_form.basic_information.HongKong_company_name'/>}
              width="md"
              name="name_hk"
              rules={[{ required: true, message: '' }]}
            />
            <ProFormDatePicker
              label={<FormattedMessage id="pages.borrower_form.basic_information.HongKong_compnay_establishment_date" />}
              width="md"
              name="HongKong_compnay_establishment_date"
              rules={[
                {
                  required: true,
                  message: 'Please select the establishment_date',
                },
              ]}
            />
            <ProFormText
              label={<FormattedMessage id='pages.borrower_form.basic_information.HongKong_unified_social_credit_code'/>}
              width="md"
              name="br_code_hk"
              rules={[{ required: true, message: '' }]}
            />
            <ProFormText
              label={<FormattedMessage id='pages.borrower_form.basic_information.HongKong_company_address'/>}
              width="md"
              name="address_hk"
              rules={[{ required: true, message: '' }]}
            />
          </div>
        </ProCard> */}
      </ProCard>
    </RcResizeObserver>
  );
};

export default BasicInformation;
