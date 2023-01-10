import { Button, Space } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType, ColumnsState } from '@ant-design/pro-table';
import type { TableListItem } from './data';
import styles from './style.less';
import { request, FormattedMessage, useRequest } from 'umi';

import { EditTwoTone } from '@ant-design/icons';
import { EditableProTable } from '@ant-design/pro-table';

const TableList: React.FC = () => {

  const actionRef = useRef<ActionType>();

  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);

  //function translate_status(status: string) {
  //  return <FormattedMessage id={'pages.application.' + status}/>;
  //}

  function translate_amount_status(status: string) {
    return <FormattedMessage id={'pages.amount.borrower_list.amount_status.' + status}/>;
  }

  const columns: ProColumns<TableListItem>[] = [
    {
      title: (<FormattedMessage id='pages.util.id'/>),
      dataIndex: 'key',
      sorter: (a, b) => a.key - b.key,
      readonly: true,
      width: '5%',
    },
    {
      title: (<FormattedMessage id='pages.lender_form.company_name'/>),
      dataIndex: 'name_cn',
      valueType: 'textarea',
      readonly: true,
      width: '15%',
      render: (dom, entity) => {
        return (
          <a href={"/application/borrower-analysis?borrower_key=" + entity.key}>
            {dom}
          </a>
        );
      },
    },

    {
      title: (<FormattedMessage id='pages.amount.borrower_list.amount_limit'/>),
      dataIndex: 'amount_limit',
      valueType: {type: 'money', locale: "en-US"},
      fieldProps: {precision: 0},
      readonly: true,
      width: '8%',
    },

    {
      title: (<FormattedMessage id='pages.amount.borrower_list.half_month_cash_flow'/>),
      dataIndex: 'half_month_cash_flow',
      valueType: 'digit',
      fieldProps: {precision: 0},
      width: '8%',      
    },

    {
      title: (<FormattedMessage id='pages.amount.borrower_list.approved_amount'/>),
      dataIndex: 'approved_amount',
      valueType: 'digit',
      fieldProps: {precision: 0},
      width: '8%',
    },
    {
      title: (<FormattedMessage id='pages.amount.borrower_list.approved_number'/>),
      dataIndex: 'approved_number',
      valueType: 'digit',
      readonly: true,
      width: '4%',
    },

    {
      title: (<FormattedMessage id='pages.amount.borrower_list.delinquent_amount'/>),
      dataIndex: 'delinquent_amount',
      valueType: {type: 'money', locale: "en-US"},
      fieldProps: {precision: 0},
      readonly: true,
      width: '6%',
    },
    {
      title: (<FormattedMessage id='pages.amount.borrower_list.delinquent_number'/>),
      dataIndex: 'delinquent_number',
      valueType: 'digit',
      readonly: true,
      width: '4%',      
    },
    
    {
      title: (<FormattedMessage id='pages.amount.borrower_list.repay_amount'/>),
      dataIndex: 'repay_amount',
      valueType: {type: 'money', locale: "en-US"},
      fieldProps: {precision: 0},
      readonly: true,
      width: '6%',
    },
    {
      title: (<FormattedMessage id='pages.amount.borrower_list.repay_number'/>),
      dataIndex: 'repay_number',
      valueType: 'digit',
      readonly: true,
      width: '4%',      
    },

    {
      title: (<FormattedMessage id='pages.amount.borrower_list.available_amount'/>),
      dataIndex: 'available_amount',
      valueType: {type: 'money', locale: "en-US"},
      fieldProps: {precision: 0},
      readonly: true,
      width: '6%',      
    },
    /*
    {
      title: (<FormattedMessage id='pages.util.status'/>),
      dataIndex: 'status',
      valueType: 'textarea',
      render: (text, record, index) => {
        return (translate_status(record?.status))
      },      
    },
    */

    {
      title: (<FormattedMessage id='pages.amount.borrower_list.probability_of_default'/>),
      dataIndex: 'probability_of_default',
      valueType: 'digit',
      readonly: true,
      width: '4%',      
    },
    {
      title: (<FormattedMessage id='pages.amount.borrower_list.loss_given_default'/>),
      dataIndex: 'loss_given_default',
      valueType: 'digit',
      readonly: true,
      width: '6%',      
    },
    {
      title: (<FormattedMessage id='pages.amount.borrower_list.product_competitiveness'/>),
      dataIndex: 'product_competitiveness',
      valueType: 'digit',
      readonly: true,
      width: '4%',      
    },

    {
      title: (<FormattedMessage id='pages.amount.borrower_list.amount_status'/>),
      dataIndex: 'amount_status',
      valueType: 'textarea',
      render: (text, record, index) => {
        return (translate_amount_status(record?.amount_status))
      },
      readonly: true,
      width: '8%',              
    },    

    {
      title: (<FormattedMessage id='pages.amount.borrower_list.loan_settlement_amount'/>),
      dataIndex: 'loan_settlement_amount',
      valueType: {type: 'money', locale: "en-US"},
      readonly: true,
      width: '5%',  
    },
    {
      title: (<FormattedMessage id='pages.amount.borrower_list.loan_settlement_number'/>),
      dataIndex: 'loan_settlement_number',
      valueType: 'digit',
      readonly: true,
      width: '5%',  
    },

    {
      title: (<FormattedMessage id='pages.amount.borrower_list.liquidated_amount'/>),
      dataIndex: 'liquidated_amount',
      valueType: {type: 'money', locale: "en-US"},
      readonly: true,
      width: '5%',  
    },
    {
      title: (<FormattedMessage id='pages.amount.borrower_list.liquidated_number'/>),
      dataIndex: 'liquidated_number',
      valueType: 'digit',
      readonly: true,
      width: '5%',  
    },

    {
      title: (<FormattedMessage id='pages.amount.borrower_list.created_date'/>),
      dataIndex: 'created_date',
      valueType: 'textarea',
      readonly: true,
      width: '5%',  
    },  
    {
      title: (<FormattedMessage id='pages.amount.borrower_list.approved_date'/>),
      dataIndex: 'approved_date',
      valueType: 'textarea',
      readonly: true,
      width: '5%',  
    },  

    {
      title: (<FormattedMessage id='pages.util.operation'/>),
      dataIndex: 'option',
      valueType: 'option',
      width: '5%',
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

  const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>({
    loan_settlement_amount: {
      show: false
    },
    loan_settlement_number: {
      show: false
    },
    liquidated_amount: {
      show: false
    },
    liquidated_number: {
      show: false
    },
    created_date: {
      show: false
    },
    approved_date: {
      show: false
    },
  });


  const { data, error, loading } = useRequest(() => {
    return request('/api/amount/list');
  });

  var [listCompany, setListCompany] = useState<TableListItem[]>([]);
  listCompany = data;

  /*
  const onChangeMonth = (date, dateString) => {
    request('/api/amount/list?date=' + dateString).then(
      ({data, error, loading}) => {
        console.log(data);
        setListCompany(data);
      }
    );

    setListCompany(data);
  };
  */

  return (
    <PageContainer>
      <div className={styles.divline}></div>
      <EditableProTable<TableListItem>
        headerTitle={<FormattedMessage id='pages.lender_list.company_list'/>}
        actionRef={actionRef}
        rowKey="key"
        //search={{
        //  labelWidth: 120,
        //}}
        search={false}
        toolBarRender={() => [
        ]}
        //request={company}
        request={async () => ({
          data: listCompany,
          total: listCompany?.length,
          success: true,
        })}        
        value={listCompany}
        onChange={setListCompany}

        columns={columns}
        columnsState={{
          value: columnsStateMap,
          onChange: setColumnsStateMap,
        }}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (rowKey, newData, oldData) => {
            //console.log(rowKey, newData, oldData);
            request('/api/amount/get_company_single?borrower_key='+ newData.key + '&half_month_cash_flow=' + newData.half_month_cash_flow + '&approved_amount=' + newData.approved_amount).then(
              ({data, error, loading}) => {
                  let dataIndex: number = -1;
                  for (let idx: number = 0; idx < listCompany?.length; idx++) {
                    if (listCompany[idx].key == rowKey) {
                      dataIndex = idx;
                      break;
                    }
                  }

                  if (dataIndex != -1) {
                    listCompany[dataIndex].half_month_cash_flow = data.half_month_cash_flow;
                    listCompany[dataIndex].approved_amount = data.approved_amount;

                    listCompany[dataIndex].probability_of_default = data.probability_of_default;
                    listCompany[dataIndex].loss_given_default = data.loss_given_default;

                    setListCompany(listCompany);
                  }  
              }
            )            
          },
          onChange: setEditableRowKeys,
          deleteText: " ",
        }}
        recordCreatorProps={false}
        
        pagination={{
          pageSize: 20,
          //onChange: (page) => console.log(page),
        }}        
      />

      <Space direction="vertical">
        <Button
          onClick={async () => {
            request('/api/amount/get_company_single?cmd=clear').then(
              ()=>{
                  window.location.reload();
              });          
          }}
        >
          <FormattedMessage id='pages.util.reset'/>
        </Button>
{/*
        <DatePicker onChange={onChangeMonth} picker="month" />
*/}
      </Space>

    </PageContainer>
  );
};

export default TableList;
