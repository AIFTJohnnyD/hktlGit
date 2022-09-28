import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType, ColumnsState } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import { company, updateCompany, removeLender } from './service';
import type { TableListItem, TableListPagination } from './data';
import styles from './style.less';
import { request, FormattedMessage } from 'umi';

import { EditTwoTone, ProfileTwoTone } from '@ant-design/icons';
import { EditableProTable } from '@ant-design/pro-table';

const handleUpdate = async (fields: FormValueType, currentRow?: TableListItem) => {
  const hide = message.loading('Updating');

  try {
    await updateCompany({
      ...currentRow,
      ...fields,
    });
    hide();
    message.success('Update successfully!');
    return true;
  } catch (error) {
    hide();
    message.error('Update failed. Please try again!');
    return false;
  }
};

/**
 * 删除节点
 *
 * @param selectedRows
 */

const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('Deleting');
  if (!selectedRows) return true;

  try {
    await removeLender({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('Delete successfully!');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed. Please try again!');
    return false;
  }
};

const TableList: React.FC = () => {

  /** 分布更新窗口的弹窗 */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  /** 国际化配置 */

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
      /*
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
      */
      sorter: (a, b) => a.key - b.key,
      readonly: true,
      width: '4%',
    },
    {
      title: (<FormattedMessage id='pages.lender_form.company_name'/>),
      dataIndex: 'name_cn',
      valueType: 'textarea',
      readonly: true,
      width: '15%',
      render: (dom, entity) => {
        return (
          <a href={"/application/borrower-analysis?borrower_id=" + entity.id}>
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
/*
    {
      title: (<FormattedMessage id='pages.util.operation'/>),
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          <ProfileTwoTone />
          <font color="red">
            <FormattedMessage id='pages.util.approve'/>
          </font>
        </a>,
      ],
    },
*/    
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

  return (
    <PageContainer>
      <div className={styles.divline}></div>
      <EditableProTable<TableListItem, TableListPagination>
        headerTitle={<FormattedMessage id='pages.lender_list.company_list'/>}
        actionRef={actionRef}
        rowKey="key"
        //search={{
        //  labelWidth: 120,
        //}}
        search={false}
        toolBarRender={() => [
        ]}
        request={company}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
        columnsState={{
          value: columnsStateMap,
          onChange: setColumnsStateMap,
        }}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (rowKey, newData, oldData) => {
            //console.log(rowKey, newData, oldData);
            request('/api/amount/get_company_single?borrower_id='+ newData.id + '&half_month_cash_flow=' + newData.half_month_cash_flow + '&approved_amount=' + newData.approved_amount).then(
              ({data, error, loading}) => {
                  //newData.probability_of_default = data.probability_of_default;
                  //newData.loss_given_default = data.loss_given_default;

                  window.location.reload();
              }
            )            
          },
          onChange: setEditableRowKeys,
          deleteText: " ",
        }}
        recordCreatorProps={false}                 
      />

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


      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              Selected{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              items 
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage id='pages.util.delete'/>
          </Button>
        </FooterToolbar>
      )}
      
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value, currentRow);

          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }

          return true;
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<TableListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<TableListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
