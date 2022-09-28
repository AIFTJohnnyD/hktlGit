import React, { useState } from 'react';
import ProCard from '@ant-design/pro-card';
import RcResizeObserver from 'rc-resize-observer';
import {FormattedMessage} from 'umi';
import { Divider, Alert } from 'antd';
import styles from '../style.less';

import { ProFormText, ProFormList, ProFormSelect, ProFormGroup } from '@ant-design/pro-form';
import { Row, Col, Select, Input, Form, Tabs } from 'antd';

import ShareHolderDirector from './ShareHolderDirector';

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;

const { TabPane } = Tabs;

const CompanyInformation: React.FC = () => {
  const [responsive, setResponsive] = useState(false);
  const [prefix, setPrefix]: [string, any] = useState('+86');

  const changePrefix = (value: string) => {
    setPrefix(value);
  };

  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <ProCard
        title={<FormattedMessage id='pages.borrower_form.shareholder_info.mainland_legal_person'/>}
        extra=""
        split={responsive ? 'horizontal' : 'vertical'}
        bordered
        headerBordered
      >
        <Row gutter={16}>
          <Col span={12}>
            <ProFormText
              label={<FormattedMessage id='pages.borrower_form.shareholder_info.mainland_legal_person_name'/>}
              width="md"
              name="lear_name"
              rules={[{ required: true, message: (<FormattedMessage id='please_input_mainland_legal_person_name'/>) }]}
            />
          </Col>
          <Col span={12}>
            <ProFormText
              label={<FormattedMessage id='pages.borrower_form.shareholder_info.nationality'/>}
              width="md"
              name="lear_nationality"
              rules={[{ required: true, message: (<FormattedMessage id='pages.borrower_form.shareholder_info.please_input_nationality'/>) }]}
            />            
          </Col>
        </Row>

        <Row gutter={16} align="bottom">
          <Col span={12}>
            <p><font color="red">*</font> {<FormattedMessage id='pages.borrower_form.shareholder_info.please_input_phone'/>} </p>
            <InputGroup compact>
              <FormItem
                name="lear_country_code"
                noStyle
              >              
              <Select value={prefix} onChange={changePrefix} style={{ width: '100px' }}>
                <Option value="+86">+86</Option>
                <Option value="+852">+852</Option>
              </Select>
              </FormItem>
              <FormItem
                style={{ width: '228px' }}
                name="lear_mobile"
                rules={[
                  {
                    required: true,
                    message: (<FormattedMessage id='pages.borrower_form.shareholder_info.please_input_phone'/>),
                  },
                  {
                    pattern: /^\d{8}$|^\d{11}$/,
                    message: (<FormattedMessage id='pages.borrower_form.shareholder_info.wrong_phone'/>),
                  },
                ]}
              >
                <Input size="middle" placeholder={<FormattedMessage id='pages.borrower_form.shareholder_info.phone'/>} />
              </FormItem>
            </InputGroup>
          </Col>
          <Col span={12}>
            <ProFormText
              label={<FormattedMessage id='pages.borrower_form.shareholder_info.email'/>}
              width="md"
              name="lear_email"
              rules={[
                {required: true, message: (<FormattedMessage id='pages.borrower_form.shareholder_info.please_input_email'/>)},
                {type: 'email', message: (<FormattedMessage id='pages.borrower_form.shareholder_info.wrong_email'/>)},
              ]}
            />            
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={22}>
            <ProFormText
              label={<FormattedMessage id='pages.borrower_form.shareholder_info.address'/>}
              width="xl"
              name="lear_address"
              rules={[{ required: true, message: (<FormattedMessage id='pages.borrower_form.shareholder_info.please_input_address'/>) }]}
            />
          </Col>
        </Row>
      </ProCard>

      <Divider style={{ margin: '10px 0 10px' }} />

      <ShareHolderDirector country="内地" country_code="cn" />
      <ShareHolderDirector country="香港" country_code="hk"/>
    </RcResizeObserver>
  );
};

export default CompanyInformation;
