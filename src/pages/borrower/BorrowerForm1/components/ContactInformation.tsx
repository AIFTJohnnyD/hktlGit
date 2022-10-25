import React, { useState } from 'react';
import ProCard from '@ant-design/pro-card';
import RcResizeObserver from 'rc-resize-observer';
import {FormattedMessage} from 'umi';
import { Divider, Alert, Row, Col } from 'antd';
import styles from '../style.less';

import { ProFormText, ProFormList, ProFormSelect, ProFormGroup } from '@ant-design/pro-form';

const ContactInformation: React.FC = () => {
  const [responsive, setResponsive] = useState(false);
  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <ProCard
        title={<FormattedMessage id='pages.borrower_form.contact_info'/>}
        extra=""
        split={responsive ? 'horizontal' : 'vertical'}
        bordered
        headerBordered
        style={{ width: 1200 }}
      >
        <ProFormList
          name="contact"
          creatorButtonProps={{
            position: 'bottom',
            creatorButtonText: (<FormattedMessage id='pages.borrower_form.contact_info.add_contact'/>),
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
          <ProFormGroup key="formgroup_contact">
            <Row gutter={16}>
              <Col span={12}>
                <ProFormText
                  label={<FormattedMessage id='pages.borrower_form.contact_info.name'/>}
                  width="md"
                  name="name"
                  rules={[{ required: true, message: '' }]}
                />
              </Col>
              <Col span={12}>
                <ProFormText
                  label={<FormattedMessage id='pages.borrower_form.contact_info.position'/>}
                  width="md"
                  name="position"
                  rules={[{ required: true, message: '' }]}
                />                
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <ProFormText
                  label={<FormattedMessage id='pages.borrower_form.contact_info.photo'/>}
                  width="md"
                  name="phone"
                  rules={[{ required: true, message: '' }]}
                />
              </Col>
              <Col span={12}>
                <ProFormText
                  label={<FormattedMessage id='pages.borrower_form.contact_info.email'/>}
                  width="md"
                  name="email"
                  rules={[
                    { required: true, message: '' },
                    {type: 'email', message: (<FormattedMessage id='pages.borrower_form.contact_info.wrong_email'/>)},
                  ]}
                />                
              </Col>
            </Row>
          </ProFormGroup>
        </ProFormList>
      </ProCard>
    </RcResizeObserver>
  );
};

export default ContactInformation;
