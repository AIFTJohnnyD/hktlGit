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
import { request, useRequest, history, FormattedMessage } from 'umi';
import type { FC } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { fakeSubmitForm, get_lender } from './service';
import styles from './style.less';

import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import ProCard from '@ant-design/pro-card';

import { EditTwoTone, ProfileTwoTone } from '@ant-design/icons';

import React, { useRef, useState } from 'react';

type Indicator_Threshold = {
  parameter_name: string;
  threshold_green: number;
  threshold_amber: number;
  state: string;
}

function translate_index_name(index_name: string) {
  return <FormattedMessage id={'pages.application.index_name.' + index_name}/>;
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

  const columns_index: ProColumns<Indicator_Threshold>[] = [
    {
      title: (<FormattedMessage id='pages.application.index_table.parameter_name'/>),
      dataIndex: 'parameter_name',
      valueType: 'textarea',
      readonly: true,
      render: (text, record, index) => {
        return (translate_index_name(record?.parameter_name))
      },       
    },
    {
      title: (<FormattedMessage id='pages.application.index_table.threshold_green'/>),
      dataIndex: 'threshold_green',
      valueType: 'digit',
      fieldProps: {precision: 2},
    },
    {
      title: (<FormattedMessage id='pages.application.index_table.threshold_amber'/>),
      dataIndex: 'threshold_amber',
      valueType: 'digit',
      fieldProps: {precision: 2},
    },
    {
      title: (<FormattedMessage id='pages.application.index_table.state'/>),  //'状态',
      key: 'state',
      dataIndex: 'state',
      valueType: 'select',
      valueEnum: {
        SELECTED: {
          text: (<FormattedMessage id='pages.application.index_table.chosen'/>),  //'选上',
        },
        UNSELECTED: {
          text: (<FormattedMessage id='pages.application.index_table.unchosen'/>),  //'不选',
        },
      },
    },
    {
      title: (<FormattedMessage id='pages.application.index_table.operate'/>),  //'操作',
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
          <FormattedMessage id='pages.application.index_table.edit'/>
          </font>
        </a>,
      ],
    },
  ];  

  const [responsive, setResponsive] = useState(false);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);

  const [listOtbPlanIndex, setListOtbPlanIndex] = useState<Indicator_Threshold[]>([]);
  const [listOtbPlanRate, setListOtbPlanRate] = useState<Indicator_Threshold[]>([]);

  const [listMortgageLiquidityIndex, setListMortgageLiquidityIndex] = useState<Indicator_Threshold[]>([]);
  const [listMortgageLiquidityRate, setListMortgageLiquidityRate] = useState<Indicator_Threshold[]>([]);

  const [listFinancialIndex, setListFinancialIndex] = useState<Indicator_Threshold[]>([]);
  const [listFinancialRate, setListFinancialRate] = useState<Indicator_Threshold[]>([]);

  const [listCompanyIndex, setListCompanyIndex] = useState<Indicator_Threshold[]>([]);

  return (
    <PageContainer content="">
      <div className={styles.divline}></div>
      {/* <Card bordered={false}> */}
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
          onReset={async (e) => {
            request('/api/lender/reset_index').then(
              ()=>{
                  window.location.reload();
              });
          }}          
        >
        <Card bordered={false}>
        <ProCard
          title={<FormattedMessage id='pages.application.otbplan_index.table_name'/>}
          extra=""
          split={responsive ? 'horizontal' : 'vertical'}
          bordered
          headerBordered
        >
            <EditableProTable<Indicator_Threshold>
              name="otb_plan_index"
              rowKey="parameter_name"
              headerTitle=""
              controlled={true}
              columns={columns_index}
              request={async () => ({
                data: data.otb_plan_index,
                total: data.otb_plan_index?.length,
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
              scroll={{y: 400}}
            />          
        </ProCard>
        </Card>
        <p></p>

{/*
          <ProCard title="市场产品评价" colSpan="50%">
            <EditableProTable<Indicator_Threshold>
              name="otb_plan_rate"
              rowKey="parameter_name"
              headerTitle=""
              controlled={true}
              columns={columns_index}
              request={async () => ({
                data: data.otb_plan_rate,
                total: 100,
                success: true,
              })}
              value={listOtbPlanRate}
              onChange={setListOtbPlanRate}
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
          </ProCard>
*/}          
        
        <Card bordered={false}>
        <ProCard
          title={<FormattedMessage id='pages.application.mortgage_liquidity_index.table_name'/>}
          extra=""
          split={responsive ? 'horizontal' : 'vertical'}
          bordered
          headerBordered
        >
            <EditableProTable<Indicator_Threshold>
              name="mortgage_liquidity_index"
              rowKey="parameter_name"
              headerTitle=""
              controlled={true}
              columns={columns_index}
              request={async () => ({
                data: data.mortgage_liquidity_index,
                total: data.mortgage_liquidity_index?.length,
                success: true,
              })}
              value={listMortgageLiquidityIndex}
              onChange={setListMortgageLiquidityIndex}
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
        </ProCard>
        </Card>
        <p></p>

{/*
          <ProCard title="市场抵押品评价" colSpan="50%">
            <EditableProTable<Indicator_Threshold>
              name="mortgage_liquidity_rate"
              rowKey="parameter_name"
              headerTitle=""
              controlled={true}
              columns={columns_index}
              request={async () => ({
                data: data.mortgage_liquidity_rate,
                total: 100,
                success: true,
              })}
              value={listMortgageLiquidityRate}
              onChange={setListMortgageLiquidityRate}
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
          </ProCard>
*/}          

        <Card bordered={false}>        
        <ProCard
          title={<FormattedMessage id='pages.application.financial_index.table_name'/>}
          extra=""
          split={responsive ? 'horizontal' : 'vertical'}
          bordered
          headerBordered
        >
            <EditableProTable<Indicator_Threshold>
              name="financial_index"
              rowKey="parameter_name"
              headerTitle=""
              controlled={true}
              columns={columns_index}
              request={async () => ({
                data: data.financial_index,
                total: data.financial_index?.length,
                success: true,
              })}
              value={listFinancialIndex}
              onChange={setListFinancialIndex}
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
              scroll={{y: 400}}
            />       
        </ProCard>
        </Card>        
        <p></p>

{/*          
          <ProCard title="市场财务评价" colSpan="50%">
            <EditableProTable<Indicator_Threshold>
                name="fiancial_rate"
                rowKey="parameter_name"
                headerTitle=""
                controlled={true}
                columns={columns_index}
                request={async () => ({
                  data: data.financial_rate,
                  total: 100,
                  success: true,
                })}
                value={listFinancialRate}
                onChange={setListFinancialRate}
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
          </ProCard>
*/}          

        <Card bordered={false}>         
        <ProCard
          title={<FormattedMessage id='pages.application.company_index.table_name'/>}
          extra=""
          split={responsive ? 'horizontal' : 'vertical'}
          bordered
          headerBordered
        >
              <EditableProTable<Indicator_Threshold>
                name="company_index"
                rowKey="parameter_name"
                headerTitle=""
                controlled={true}
                columns={columns_index}
                request={async () => ({
                  data: data.company_index,
                  total: data.company_index?.length,
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

          </ProCard>
          </Card>          
        </ProForm>
     {/* </Card> */}
    </PageContainer>
  );
};

export default CompanyForm;
