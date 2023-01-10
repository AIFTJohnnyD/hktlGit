import { Button, DatePicker, Space } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType, ColumnsState } from '@ant-design/pro-table';
import { company } from './service';
import type { TableListItem, TableListPagination } from './data';
import styles from './style.less';
import { request, FormattedMessage, useRequest, history } from 'umi';

import { EditTwoTone, ProfileTwoTone } from '@ant-design/icons';
import { EditableProTable } from '@ant-design/pro-table';

import {parse} from 'querystring'

import Nonperforming_Loan from "./components/nonperforming_loan"

const LoanProduct: React.FC = () => {

  const actionRef = useRef<ActionType>();

  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);

  const columns: ProColumns<TableListItem>[] = [
    {
      title: (<FormattedMessage id='pages.util.name'/>),
      dataIndex: 'name',
      readonly: true,
    },
/*
    {
      title: (<FormattedMessage id='pages.amount.loan_product.merchandise_group'/>),
      dataIndex: 'merchandise_group',
      readonly: true,
      width: '20%',
    },
*/    
    {
      title: (<FormattedMessage id='pages.amount.loan_product.amount_limit'/>),
      dataIndex: 'amount_limit',
    },
    {
      title: (<FormattedMessage id='pages.amount.loan_product.annual_interest_rate'/>),
      dataIndex: 'annual_interest_rate',
    },
    {
      title: (<FormattedMessage id='pages.amount.loan_product.probability_of_default'/>),
      dataIndex: 'probability_of_default',
    },

    {
      title: (<FormattedMessage id='pages.util.operation'/>),
      dataIndex: 'option',
      valueType: 'option',
      //width: '10%',
      align: 'center',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.key);
          }}
        >
          <EditTwoTone />
          <font color="red">
            {/* 编辑 */}
            <FormattedMessage id='pages.util.edit'/>
          </font>
        </a>,
      ],
    },    
  ];

  let urlParams = parse(window.location.href.split('?')[1])
  let plan = urlParams.plan;
  if(typeof(plan) == "undefined"){
    plan = "1";
  }

  const { data, error, loading } = useRequest(() => {
    return request('/api/loan_product/list_merchandise_group?plan=' + plan);
  });

  var [listGroup, setListGroup] = useState<TableListItem[]>([]);
  listGroup = data;

  var [nonperforming_loan, setNonperforming_loan] = useState<any>(null);  

  return (
    <PageContainer>
      
      <Space direction="vertical">
        <Space wrap>
          <Button> <a href={'/amount/loan-product?plan=1'}>标准信用额度及年利率</a> </Button>
          <Button> <a href={'/amount/loan-product?plan=2'}>信贷额度矩阵</a> </Button>
          <Button> <a href={'/amount/loan-product?plan=3'}>年利率矩阵</a> </Button>
        </Space>
                
        <EditableProTable<TableListItem>
          headerTitle={<FormattedMessage id='pages.amount.loan_product.title'/>}
          actionRef={actionRef}
          rowKey="key"
          search={false}
          toolBarRender={() => [
          ]}
          //request={company}
          request={async () => ({
            data: listGroup,
            total: listGroup?.length,
            success: true,
          })}        
          value={listGroup}
          onChange={setListGroup}

          columns={columns}

          editable={{
            type: 'multiple',
            editableKeys,
            onSave: async (rowKey, newData, oldData) => {
              console.log(rowKey, newData, oldData);

              let dataIndex: number = -1;
              for (let idx: number = 0; idx < listGroup?.length; idx++) {
                if (listGroup[idx].key == rowKey) {
                  dataIndex = idx;
                  break;
                }
              }

              if (dataIndex != -1) {
                listGroup[dataIndex].amount_limit = newData.amount_limit;
                listGroup[dataIndex].annual_interest_rate = newData.annual_interest_rate;

                listGroup[dataIndex].probability_of_default = newData.probability_of_default;

                setListGroup(listGroup);
              }              
            },
            onChange: setEditableRowKeys,
            deleteText: " ",
          }}

          recordCreatorProps={false}               
        />

        <Button
          onClick={async () => {
            setNonperforming_loan(null);

            await fetch('/api/loan_product/caculate_loan_product', {
              method: 'POST',
              headers: new Headers({ 'content-type': 'application/json' }),
              body: JSON.stringify(listGroup)
            }).then(res => res.json())
            .then(
              ({data, error, loading})=>{
                  console.log(data);
                  setNonperforming_loan(data?.nonperforming_loan)
              });          
          }}
        >
          <FormattedMessage id='pages.util.submit'/>
        </Button>

        {nonperforming_loan != null && (
          <Nonperforming_Loan
            nonperforming_loan={nonperforming_loan}
          >

          </Nonperforming_Loan>
        )}

      </Space>

    </PageContainer>
  );
};

export default LoanProduct;
