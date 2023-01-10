import { Card, message, Row, Col, Table } from 'antd';
import ProForm, {
  ProFormDateRangePicker,
  ProFormDependency,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { useRequest, history, FormattedMessage } from 'umi';
import type { FC } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { fakeSubmitForm, get_lender } from './service';
import styles from './style.less';

import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';

import { EditTwoTone, ProfileTwoTone } from '@ant-design/icons';

import React, { useRef, useState } from 'react';

type Indicator_Threshold = {
  parameter_name: string;
  threshold_green: number;
  threshold_amber: number;
  state: string;
}

const CompanyForm: FC<Record<string, any>> = () => {
  const { run } = useRequest(fakeSubmitForm, {
    manual: true,
    onSuccess: () => {
      message.success('Submitted Successfully');

      history.push({
        pathname: '/result/success',
      });      
    },
  });

  const onFinish = async (values: Record<string, any>) => {
    run(values);
  };

  const { data, error, loading } = useRequest(get_lender);
  //console.log(data)
/*
  const columns_otb_plan_index: ProColumns<Indicator_Threshold>[] = [
    {
      title: (<FormattedMessage id='pages.order_index.parameter_name'/>),
      dataIndex: 'parameter_name',
      valueType: 'textarea',
      readonly: true,
    },
    {
      title: (<FormattedMessage id='pages.order_index.threshold_green'/>),
      dataIndex: 'threshold_green',
      valueType: 'digit',
    },
    {
      title: (<FormattedMessage id='pages.order_index.threshold_amber'/>),
      dataIndex: 'threshold_amber',
      valueType: 'digit',
    },
    {
      title: '状态',
      key: 'state',
      dataIndex: 'state',
      valueType: 'select',
      valueEnum: {
        SELECTED: {
          text: '选上',
        },
        UNSELECTED: {
          text: '不选',
        },
      },
    },
    {
      title: '操作',
      valueType: 'option',
      width: '10%',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.parameter_name);
          }}
        >
          <EditTwoTone />
          <font color="red">
            编辑
          </font>
        </a>,
      ],
    },
  ];
  
  const columns_company_index: ProColumns<Indicator_Threshold>[] = [
    {
      title: (<FormattedMessage id='pages.company_index.parameter_name'/>),
      dataIndex: 'parameter_name',
      valueType: 'textarea',
      readonly: true,
    },
    {
      title: (<FormattedMessage id='pages.company_index.threshold_green'/>),
      dataIndex: 'threshold_green',
      valueType: 'digit',
    },
    {
      title: (<FormattedMessage id='pages.company_index.threshold_amber'/>),
      dataIndex: 'threshold_amber',
      valueType: 'digit',
    },  
    {
      title: '操作',
      valueType: 'option',
      width: '10%',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.parameter_name);
          }}
        >
          <EditTwoTone />
          <font color="red">
            编辑
          </font>
        </a>,
      ],
    },
  ];

  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [listOtbPlanIndex, setListOtbPlanIndex] = useState<Indicator_Threshold[]>([]);

//  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [listCompanyIndex, setListCompanyIndex] = useState<Indicator_Threshold[]>([]);
*/
  return (
    <PageContainer content="">
      <div className={styles.divline}></div>
      <ProForm
        layout="vertical"
        onFinish={onFinish}

        initialValues={data}
        params={data}
        request={(params) => {
          return Promise.resolve({
            data: params,
            success: true,
          })
        }}
      >
        <Card title={<FormattedMessage id='pages.lender_form.company_info'/>} className={styles.card} bordered={false}>
            <Row gutter={16}>
              <Col xl={6} lg={6} md={12} sm={24}>
                <ProFormText
                  label={<FormattedMessage id='pages.lender_form.company_name'/>}
                  width="md"
                  name="name"
                  rules={[{ required: true, message: 'Please input the company name.' }]}
                />
              </Col>
            

              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>
                <ProFormText
                  label={<FormattedMessage id='pages.lender_form.br_no'/>}
                  width="md"
                  name="br_no"
                  rules={[{ required: true, message: 'Please input the business registration No.' }]}
                />
              </Col>

              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 24 }} sm={24}>
                {/*
                <ProFormText
                  label={<FormattedMessage id='pages.company_form.seller_no'/>}
                  width="md"
                  name="seller_no"
                  rules={[{ required: false, message: 'Please input the seller No.' }]}
                />
                */}
              </Col>
            </Row>			

            <Row gutter={16}>
              <Col xl={{ span: 6, offset: 0 }} lg={{ span: 6 }} md={{ span: 24 }} sm={24}>
                <ProForm.Group title={<FormattedMessage id='pages.lender_form.phone'/>} size={8}>
                  <ProFormSelect
                    allowClear={false}
                    name="phone_country_code"
                    rules={[{ required: true, message: 'Country code' }]}
                    valueEnum={{
                      852: '+852',
                      86: '+86',
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
                  width="md"
                  name="address"
                  rules={[{ required: true, message: 'Please input the address line 1.' }]}
                />
              </Col>            
            </Row>			
        </Card>
        <p></p>          
        <Card title={<FormattedMessage id='pages.lender_form.person_info'/>} className={styles.card} bordered={false}>
            <Row gutter={16}>
              <Col xl={6} lg={6} md={12} sm={24}>
                <ProFormText
                  label={<FormattedMessage id='pages.lender_form.person_name'/>}
                  width="md"
                  name="person"
                  rules={[{ required: true, message: 'Please input the person name.' }]}
                />
              </Col>

              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>
                <ProFormText
                  label={<FormattedMessage id='pages.lender_form.person_title'/>}
                  width="md"
                  name="person_title"
                  rules={[{ required: true, message: 'Please input the person title.' }]}
                />
              </Col>

              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 24 }} sm={24}>

              </Col>                
            </Row>

            <Row gutter={16}>
              <Col xl={{ span: 6, offset: 0 }} lg={{ span: 6 }} md={{ span: 24 }} sm={24}>
                <ProForm.Group title={<FormattedMessage id='pages.lender_form.office_phone'/>} size={8}>
                  <ProFormSelect
                    allowClear={false}
                    name="person_office_phone_country_code"
                    rules={[{ required: true, message: 'Country code' }]}
                    valueEnum={{
                      852: '+852',
                      86: '+86',
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

              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 24 }} sm={24}>
                <ProForm.Group title={<FormattedMessage id='pages.lender_form.mobile_phone'/>} size={8}>
                  <ProFormSelect
                    allowClear={false}
                    name="person_mobile_phone_country_code"
                    rules={[{ required: true, message: 'Country code' }]}
                    valueEnum={{
                      852: '+852',
                      86: '+86',
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
              <Col xl={6} lg={6} md={12} sm={24}>
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
                  width="md"
                  name="person_address"
                  rules={[{ required: true, message: 'Please input the address line 1.' }]}
                />
              </Col>            
            </Row>
        </Card>
        <p></p>
{/*
        <Card title="订单指标" className={styles.card} bordered={false}>
          <EditableProTable<Indicator_Threshold>
            name="otb_plan_index"
            rowKey="parameter_name"
            headerTitle=""
            controlled={true}
            columns={columns_otb_plan_index}
            request={async () => ({
              data: data.otb_plan_index,
              total: 100,
              success: true,
            })}
            value={listOtbPlanIndex}
            onChange={setListOtbPlanIndex}
            editable={{
              type: 'multiple',
              editableKeys,
              onSave: async (rowKey, newData, oldData) => {
                //console.log(rowKey, data, row);
              },
              onChange: setEditableRowKeys,
              deleteText: " ",
            }}
            recordCreatorProps={false}
            scroll={{y: 300}}
          />          
        </Card>

        <Card title="贷款表现" className={styles.card} bordered={false}>
          <EditableProTable<Indicator_Threshold>
            name="company_index"
            rowKey="parameter_name"
            headerTitle=""
            controlled={true}
            columns={columns_company_index}
            request={async () => ({
              data: data.company_index,
              total: 100,
              success: true,
            })}
            value={listCompanyIndex}
            onChange={setListCompanyIndex}
            editable={{
              type: 'multiple',
              editableKeys,
              onSave: async (rowKey, newData, oldData) => {
                //console.log(rowKey, data, row);
              },
              onChange: setEditableRowKeys,
              deleteText: " ",
            }}
            recordCreatorProps={false}
            scroll={{y: 300}}
          />          
        </Card>
*/}
        <Card title={<FormattedMessage id='pages.util.review_info'/>} className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col xl={{ span: 16, offset: 0 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <ProFormTextArea
                label={<FormattedMessage id='pages.util.remark'/>}
                width="md"
                name="remark"
                rules={[{ required: false, message: 'Please input the remark.' }]}
              />            
            </Col>            
          </Row>
        </Card>
      </ProForm>

    </PageContainer>
  );
};

export default CompanyForm;
