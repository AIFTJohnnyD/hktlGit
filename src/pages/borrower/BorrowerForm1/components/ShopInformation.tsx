import React, { useState } from 'react';
import ProCard from '@ant-design/pro-card';
import RcResizeObserver from 'rc-resize-observer';
import { FormattedMessage } from 'umi';
import { Divider, Alert, Row, Col, Button } from 'antd';
import { DownloadOutlined, ApiOutlined } from '@ant-design/icons';
import styles from '../style.less';

import { ProFormText, ProFormList, ProFormSelect, ProFormGroup } from '@ant-design/pro-form';

const ShopInformation: React.FC = () => {
  const [responsive, setResponsive] = useState(false);
  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <Alert
        message={<FormattedMessage id='pages.borrower_form.store_info.declaration'/>}
        type="info"
        showIcon
        style={{width:'1200px'}}
      />

      <Divider style={{ margin: '10px 0 10px' }} />

      <ProCard
        title={<FormattedMessage id='pages.borrower_form.store_info'/>}
        extra=""
        split={responsive ? 'horizontal' : 'vertical'}
        bordered
        headerBordered
        style={{ width: 1200 }}
      >
        <ProFormList
          name="shop"
          creatorButtonProps={{
            position: 'bottom',
            creatorButtonText: (<FormattedMessage id='pages.borrower_form.store_info.add_store'/>),
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
          <ProFormGroup key="formgroup_shop">
            <Row gutter={16}>
              <Col span={12}>
                <ProFormText
                  label={<FormattedMessage id='pages.borrower_form.store_info.Amazon_name'/>}
                  width="md"
                  name="name"
                  rules={[{ required: true, message: '' }]}
                />
              </Col>
              <Col span={12}>
                <ProFormText
                  label={<FormattedMessage id='pages.borrower_form.store_info.seller_id'/>}
                  width="md"
                  name="id"
                  rules={[{ required: true, message: '' }]}
                />                
              </Col>
            </Row>
{/*
            <Row gutter={16}>
              <Col span={12}>
                <ProFormText
                  label={<FormattedMessage id='pages.borrower_form.store_info.mws_code'/>}
                  width="md"
                  name="mws_code"
                  rules={[{ required: true, message: '' }]}
                />
              </Col>
              <Col span={12}>
                <ProFormText
                  label={<FormattedMessage id='pages.borrower_form.store_info.area'/>}
                  width="md"
                  name="country"
                  rules={[{ required: true, message: '' }]}
                />                
              </Col>
            </Row>
*/}
            <Row gutter={16}>
              <Col span={24}>
                <Button
                  size="large"
                  type="primary"
                  shape="round" 
                  block
                  icon={<ApiOutlined />}
                  onClick={() => {
                    window.open("https://sellercentral.amazon.com/apps/authorize/consent?application_id=amzn1.sp.solution.2364e294-9851-4572-a767-acd37af1187e&version=beta",'newwindow','height=800, width=1500, top=160, left=350, toolbar=no, menubar=no, status=no')
                  }}
                >
                  {<FormattedMessage id='pages.borrower_form.store_info.authorize'/>}
                </Button>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <ProFormText
                  label={<FormattedMessage id='pages.borrower_form.store_info.payment_platform'/>}
                  width="md"
                  name="pay_platform"
                  rules={[{ required: true, message: '' }]}
                /> 
              </Col>
              <Col span={12}>
                <ProFormText
                  label={<FormattedMessage id='pages.borrower_form.store_info.bank_num'/>}
                  width="md"
                  name="bank_account"
                  rules={[{ required: true, message: '' }]}
                />               
              </Col>
            </Row>

          </ProFormGroup>
        </ProFormList>
      </ProCard>
    </RcResizeObserver>
  );
};

export default ShopInformation;