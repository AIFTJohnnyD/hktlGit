import React, { useState } from 'react';
import ProCard from '@ant-design/pro-card';
import RcResizeObserver from 'rc-resize-observer';
import {FormattedMessage} from 'umi';
import { Divider, Alert } from 'antd';
import styles from '../style.less';

import { ProFormText } from '@ant-design/pro-form';

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
        title={<FormattedMessage id='pages.borrower_form.basic_information.business_proof'/>}
        extra=""
        split={responsive ? 'horizontal' : 'vertical'}
        bordered
        headerBordered
      >
        <ProCard title={<FormattedMessage id='pages.borrower_form.basic_information.mainland_company'/>} colSpan="50%">
          <div style={{ height: 400 }}>
            <ProFormText
              label={<FormattedMessage id='pages.borrower_form.basic_information.mainland_company_name'/>}
              width="md"
              name="name_cn"
              rules={[{ required: true, message: '' }]}
            />
            <ProFormText
              label={<FormattedMessage id='pages.borrower_form.basic_information.mainland_unified_social_credit_code'/>}
              width="md"
              name="credit_code_cn"
              rules={[{ required: true, message: '' }]}
            />
            <ProFormText
              label={<FormattedMessage id='pages.borrower_form.basic_information.mainland_company_address'/>}
              width="md"
              name="address_cn"
              rules={[{ required: true, message: '' }]}
            />
          </div>
        </ProCard>
        <ProCard title={<FormattedMessage id='pages.borrower_form.basic_information.HongKong_company'/>} colSpan="50%">
          <div style={{ height: 400 }}>
            <ProFormText
              label={<FormattedMessage id='pages.borrower_form.basic_information.HongKong_company_name'/>}
              width="md"
              name="name_hk"
              rules={[{ required: true, message: '' }]}
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
        </ProCard>
      </ProCard>
    </RcResizeObserver>
  );
};

export default BasicInformation;
