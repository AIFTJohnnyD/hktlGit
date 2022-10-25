import React, { useState } from 'react';
import ProCard from '@ant-design/pro-card';
import RcResizeObserver from 'rc-resize-observer';

import { Divider, Alert } from 'antd';
import styles from '../style.less';

import { ProFormText, ProFormList, ProFormSelect, ProFormGroup, ProFormDigit } from '@ant-design/pro-form';
import { Row, Col, Select, Input, Form, Tabs } from 'antd';
import { FormattedMessage } from 'umi';

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;

const { TabPane } = Tabs;


//函数组件
const ShareHolderDirector = (
  { 
    country, 
    country_code, 
  }: 
  { 
    country: string; 
    country_code: string; 
  }
) => {
  const [responsive, setResponsive] = useState(false);
  const [prefix, setPrefix]: [string, any] = useState('+86');

  const changePrefix = (value: string) => {
    setPrefix(value);
  };

  const changeLocals = (value: string) =>{
      return <FormattedMessage id = {value} />
  }

  //内地公司统一社会信用代码/香港公司商业登记号码
  let label_business_register = changeLocals("pages.borrower_form.basic_information.HongKong_unified_social_credit_code");
  if (country == '内地') {
     label_business_register = changeLocals("pages.borrower_form.basic_information.mainland_unified_social_credit_code");
  }
  //公司股东资料
  let label_shareholder_info = changeLocals("pages.borrower_form.shareholder_info.HongKong_shareholder_info");
  if (country == '内地') {
     label_shareholder_info = changeLocals("pages.borrower_form.shareholder_info.mainland_shareholder_info");
  }
  //公司董事资料
  let label_director_info = changeLocals("pages.borrower_form.shareholder_info.HongKong_company_director_info");
  if (country == '内地') {
     label_director_info = changeLocals("pages.borrower_form.shareholder_info.mainland_company_director_info");
  }

  let shareholder_person: string = "shareholder_person_" + country_code;
  let shareholder_company: string = "shareholder_company_" + country_code;

  let director_person: string = "director_person_" + country_code;
  let director_company: string = "director_company_" + country_code;

  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <ProCard
       //title = country + '公司股东资料'
        title = {label_shareholder_info}
        extra=""
        split={responsive ? 'horizontal' : 'vertical'}
        bordered
        headerBordered
        style={{ width: 1200 }}
      >
        <Tabs tabBarStyle={{ marginBottom: 24 }}>
          <TabPane tab={<FormattedMessage id="pages.borrower_form.shareholder_info.individual"/>} key="shareholder_person">
            <ProFormList
              name={shareholder_person}
              creatorButtonProps={{
                position: 'bottom',
                creatorButtonText: (<FormattedMessage id='pages.borrower_form.shareholder_info.add_individual_shareholder'/>),
              }}
              itemRender={({ listDom, action }, { record }) => {
                return (
                  <ProCard
                    bordered
                    extra={action}
                    title={record?.name}
                    style={{
                      marginBottom: 8,
                    }}
                  >
                    {listDom}
                  </ProCard>
                );
              }}              
            >
              <ProFormGroup key="formgroup_shareholder_person">
                <Row gutter={16}>
                  <Col span={12}>
                    <ProFormText
                      label={<FormattedMessage id="pages.borrower_form.shareholder_info.formgroup_shareholder_person_name"/>}
                      width="md"
                      name="shareholder_person_name"
                      rules={[{ required: true, message: '' }]}
                    />
                  </Col>
                  <Col span={12}>
                    <ProFormText
                      label={<FormattedMessage id='pages.borrower_form.shareholder_info.formgroup_shareholder_person_Eng_name'/>}
                      width="md"
                      name="shareholder_person_name_english"
                      rules={[{ required: true, message: '' }]}
                    />
                  </Col>
                </Row>                

                <Row gutter={16}>
                  <Col span={12}>
                    <ProFormText
                      label={<FormattedMessage id='pages.borrower_form.shareholder_info.nationality'/>}
                      width="md"
                      name="shareholder_person_nationality"
                      rules={[{ required: true, message: '' }]}
                    />
                  </Col>
                  <Col span={12}>
                    <ProFormText
                      label={<FormattedMessage id='pages.borrower_form.shareholder_info.shareholder_position'/>}
                      width="md"
                      name="shareholder_person_position"
                      rules={[{ required: true, message: '' }]}
                    />                    
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <ProFormText
                      label={<FormattedMessage id='pages.borrower_form.shareholder_info.phone'/>}
                      width="md"
                      name="shareholder_person_phone"
                      rules={[{ required: true, message: '' }]}
                    />                    
                  </Col>
                  <Col span={12}>
                    <ProFormText
                      label={<FormattedMessage id='pages.borrower_form.shareholder_info.email'/>}
                      width="md"
                      name="shareholder_person_email"
                      rules={[
                        { required: true, message: '' },
                        {type: 'email', message: (<FormattedMessage id='pages.borrower_form.shareholder_info.wrong_email'/>)},
                      ]}
                    />                    
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <ProFormDigit
                      label={<FormattedMessage id='pages.borrower_form.shareholder_info.shareholder_equity_ratio'/>}
                      width="md"
                      name="shareholder_person_rate"
                      rules={[{ required: true, message: '' }]}
                    />
                  </Col>
                  <Col span={12}>
                    <ProFormText
                      label={<FormattedMessage id='pages.borrower_form.shareholder_info.address'/>}
                      width="md"
                      name="shareholder_person_address"
                      rules={[{ required: true, message: '' }]}
                    />                    
                  </Col>
                </Row>
              </ProFormGroup>
            </ProFormList>
          </TabPane>

          <TabPane tab={<FormattedMessage id='pages.borrower_form.shareholder_info.Company'/>} key="shareholder_company">
            <ProFormList
              name={shareholder_company}
              creatorButtonProps={{
                position: 'bottom',
                creatorButtonText: (<FormattedMessage id='pages.borrower_form.shareholder_info.add_Company_shareholder'/>),
              }}
              itemRender={({ listDom, action }, { record }) => {
                return (
                  <ProCard
                    bordered
                    extra={action}
                    title={record?.name}
                    style={{
                      marginBottom: 8,
                    }}
                  >
                    {listDom}
                  </ProCard>
                );
              }}              
            >
              <ProFormGroup key="formgroup_shareholder_company">
                <Row gutter={16}>
                  <Col span={12}>
                    <ProFormText
                      label={<FormattedMessage id='pages.borrower_form.shareholder_info.formgroup_Company_person_name'/>}
                      width="md"
                      name="shareholder_company_name"
                      rules={[{ required: true, message: '' }]}
                    />
                  </Col>
                  <Col span={12}>
                    <ProFormText
                      label={label_business_register}
                      width="md"
                      name="shareholder_company_business_register_code"
                      rules={[{ required: true, message: '' }]}
                    />                    
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <ProFormText
                      label={<FormattedMessage id='pages.borrower_form.shareholder_info.company_register_address'/>}
                      width="md"
                      name="shareholder_company_register_address"
                      rules={[{ required: true, message: '' }]}
                    />                    
                  </Col>
                  <Col span={12}>
                    <ProFormText
                      label={<FormattedMessage id='pages.borrower_form.shareholder_info.company_country'/>}
                      width="md"
                      name="shareholder_company_country"
                      rules={[{ required: true, message: '' }]}
                    />                    
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <ProFormDigit
                      label={<FormattedMessage id='pages.borrower_form.shareholder_info.shareholder_company_equity_ratio'/>}
                      width="md"
                      name="shareholder_company_rate"
                      rules={[{ required: true, message: '' }]}
                    />
                  </Col>
                  <Col span={12}>
                    <ProFormText
                      label={<FormattedMessage id='pages.borrower_form.shareholder_info.company_address'/>}
                      width="md"
                      name="shareholder_company_address"
                      rules={[{ required: true, message: '' }]}
                    />                    
                  </Col>
                </Row> 
              </ProFormGroup>
            </ProFormList>
          </TabPane>
        </Tabs>
      </ProCard>

      <ProCard
        //title={country + '公司董事资料}
        title={label_director_info}
        extra=""
        split={responsive ? 'horizontal' : 'vertical'}
        bordered
        headerBordered
        style={{ width: 1200 }}
      >
        <Tabs tabBarStyle={{ marginBottom: 24 }}>
          <TabPane tab={<FormattedMessage id='pages.borrower_form.shareholder_info.company_director_individual'/>} key="director_person">
            <ProFormList
              name={director_person}
              creatorButtonProps={{
                position: 'bottom',
                creatorButtonText: (<FormattedMessage id='pages.borrower_form.shareholder_info.add_individual_director'/>),
              }}
              itemRender={({ listDom, action }, { record }) => {
                return (
                  <ProCard
                    bordered
                    extra={action}
                    title={record?.name}
                    style={{
                      marginBottom: 8,
                    }}
                  >
                    {listDom}
                  </ProCard>
                );
              }}              
            >
              <ProFormGroup key="formgroup_director_person">
                <Row gutter={16}>
                  <Col span={12}>
                    <ProFormText
                      label={<FormattedMessage id='pages.borrower_form.shareholder_info.individual_director_name'/>}
                      width="md"
                      name="director_person_name"
                      rules={[{ required: true, message: '' }]}
                    />
                  </Col>
                  <Col span={12}>
                    <ProFormText
                      label={<FormattedMessage id='pages.borrower_form.shareholder_info.individual_director_Eng_name'/>}
                      width="md"
                      name="director_person_name_english"
                      rules={[{ required: true, message: '' }]}
                    />                    
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <ProFormText
                      label={<FormattedMessage id='pages.borrower_form.shareholder_info.individual_director_nationality'/>}
                      width="md"
                      name="director_person_nationality"
                      rules={[{ required: true, message: '' }]}
                    />
                  </Col>
                  <Col span={12}>
                    <ProFormText
                      label={<FormattedMessage id='pages.borrower_form.shareholder_info.individual_director_position'/>}
                      width="md"
                      name="director_person_position"
                      rules={[{ required: true, message: '' }]}
                    />                    
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <ProFormText
                      label={<FormattedMessage id='pages.borrower_form.shareholder_info.individual_director_phone'/>}
                      width="md"
                      name="director_person_phone"
                      rules={[{ required: true, message: '' }]}
                    />
                  </Col>
                  <Col span={12}>
                    <ProFormText
                      label={<FormattedMessage id='pages.borrower_form.shareholder_info.individual_director_email'/>}
                      width="md"
                      name="director_person_email"
                      rules={[
                        { required: true, message: '' },
                        {type: 'email', message: (<FormattedMessage id='pages.borrower_form.shareholder_info.individual_director_email_invalid!'/>)},
                      ]}
                    />                    
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={24}>
                    <ProFormText
                      label={<FormattedMessage id='pages.borrower_form.shareholder_info.individual_director_address'/>}
                      width="xl"
                      name="director_person_address"
                      rules={[{ required: true, message: '' }]}
                    />
                  </Col>
                </Row>
              </ProFormGroup>
            </ProFormList>
          </TabPane>

          <TabPane tab={<FormattedMessage id='pages.borrower_form.shareholder_info.director_Company'/>} key="director_company">
            <ProFormList
              name={director_company}
              creatorButtonProps={{
                position: 'bottom',
                creatorButtonText: (<FormattedMessage id='pages.borrower_form.shareholder_info.add_director_Company_shareholder'/>),
              }}
              itemRender={({ listDom, action }, { record }) => {
                return (
                  <ProCard
                    bordered
                    extra={action}
                    title={record?.name}
                    style={{
                      marginBottom: 8,
                    }}
                  >
                    {listDom}
                  </ProCard>
                );
              }}              
            >
              <ProFormGroup key="formgroup_director_company">
                <Row gutter={16}>
                  <Col span={12}>
                    <ProFormText
                      label={<FormattedMessage id='pages.borrower_form.shareholder_info.formgroup_director_Company_person_name'/>}
                      width="md"
                      name="director_company_name"
                      rules={[{ required: true, message: '' }]}
                    />
                  </Col>
                  <Col span={12}>
                    <ProFormText
                      label={label_business_register}
                      width="md"
                      name="director_company_business_register_code"
                      rules={[{ required: true, message: '' }]}
                    />                    
                  </Col>
                </Row>
{/*
                <Row gutter={16}>
                  <Col span={12}>
                    <ProFormText
                      label={<FormattedMessage id='pages.borrower_form.shareholder_info.director_company_register_address"
                      width="md"
                      name="director_company_register_address"
                      rules={[{ required: true, message: '' }]}
                    />
                  </Col>
                  <Col span={12}>
                    <ProFormText
                      label="pages.borrower_form.shareholder_info.director_company_country"
                      width="md"
                      name="director_company_country"
                      rules={[{ required: true, message: '' }]}
                    />                    
                  </Col>
                </Row>
*/}
                <Row gutter={16}>
                  <Col span={24}>
                    <ProFormText
                      label={<FormattedMessage id='pages.borrower_form.shareholder_info.director_address'/>}
                      width="xl"
                      name="director_company_address"
                      rules={[{ required: true, message: '' }]}
                    />
                  </Col>
                </Row>
              </ProFormGroup>
            </ProFormList>
          </TabPane>
        </Tabs>
      </ProCard>
    </RcResizeObserver>
  );
};

export default ShareHolderDirector;
