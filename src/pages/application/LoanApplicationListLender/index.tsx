import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import { loanApplication_created, loanApplication_progress, loanApplication_approved, updateLoanApplication, removeLoanApplication } from './service';
import type { TableListItem, TableListPagination } from './data';

import { FormattedMessage } from 'umi';
import { useAccess } from 'umi';

import {parse} from 'querystring'

/**
 * 更新节点
 *
 * @param fields
 */

const handleUpdate = async (fields: FormValueType, currentRow?: TableListItem) => {
  const hide = message.loading('Updating');

  try {
    await updateLoanApplication({
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
    await removeLoanApplication({
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
  let urlParams = parse(window.location.href.split('?')[1])
  const borrower_id = urlParams.borrower_id;
  //console.log(borrower_id);

  /** 分布更新窗口的弹窗 */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);

  function translate_status(status: string) {
    return <FormattedMessage id={'pages.application.' + status}/>;
  }

  function translate_boolean(strBool: string) {
    return <FormattedMessage id={'pages.util.' + strBool}/>;
  }

  const columns_base: ProColumns<TableListItem>[] = [
    {
      title: (<FormattedMessage id='pages.util.id'/>),
      dataIndex: 'key',
      valueType: 'textarea',
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
    },

    {
      title: (<FormattedMessage id='pages.loan_application_list.company_id'/>),
      dataIndex: 'borrower_id',
      valueType: 'digit',
    },    
    {
      title: (<FormattedMessage id='pages.borrower_list.borrower.name_cn'/>),
      dataIndex: 'borrower_name',
      valueType: 'textarea',
      render: (dom, entity) => {
        return (
          <a href={"/application/borrower-analysis?borrower_id=" + entity.borrower_id}>
            {dom}
          </a>
        );
      },
    },
    {
      title: (<FormattedMessage id='pages.loan_application.otb_plan'/>),
      dataIndex: 'plan_name',
      valueType: 'textarea',
    },        
/*
    {
      title: (<FormattedMessage id='pages.loan_application_list.loan_id'/>),
      dataIndex: 'loan_id',
      valueType: 'digit',
    },    
    {
      title: (<FormattedMessage id='pages.loan_form.loan_name'/>),
      dataIndex: 'loan_name',
      valueType: 'textarea',
    },
*/        
  ];

  let columns: ProColumns<TableListItem>[] = columns_base.concat(
    [
      {
        title: (<FormattedMessage id='pages.loan_application.application_amount'/>),
        dataIndex: 'amount',
        valueType: {type: 'money', locale: "en-US"}
      },
      {
        title: (<FormattedMessage id='pages.util.currency'/>),
        dataIndex: 'currency',
        valueType: 'textarea',
      },
  
      {
        title: (<FormattedMessage id='pages.util.start_date'/>),
        dataIndex: 'start_date',
        valueType: 'textarea',
      },
      {
        title: (<FormattedMessage id='pages.util.end_date'/>),
        dataIndex: 'end_date',
        valueType: 'textarea',
      },    
      {
        title: (<FormattedMessage id='pages.loan_application_list.purpose'/>),
        dataIndex: 'purpose',
        valueType: 'textarea',
        render: (text, record, index) => {
          return (translate_status(record?.purpose))
        },
      },
      {
        title: (<FormattedMessage id='pages.util.status'/>),
        dataIndex: 'status',
        valueType: 'textarea',
        render: (text, record, index) => {
          return (translate_status(record?.status))
        },
      },    
  
      {
        title: (<FormattedMessage id='pages.util.operation'/>),
        dataIndex: 'option',
        valueType: 'option',
        render: (_, record) => {
          if (record?.status == "CREATED" || record?.status == "PENDING") {
            return (
            <a
              key="config"
              /*
              onClick={() => {
                handleUpdateModalVisible(true);
                setCurrentRow(record);
              }}
              */
              onClick={() => {
                window.open("/application/loan-application-approval?loan_application_id=" + record?.key,'newwindow','height=800, width=1500, top=160, left=350, toolbar=no, menubar=no, status=no')
              }}             
            >
              <FormattedMessage id='pages.util.approve'/>
            </a>);
          }
        },
      },  
    ]
  )

  let columns_approved: ProColumns<TableListItem>[] = columns_base.concat(
    [
      {
        title: (<FormattedMessage id='pages.loan_application_list.amount_approved'/>),
        dataIndex: 'amount_approved',
        valueType: {type: 'money', locale: "en-US"},
      },
      {
        title: (<FormattedMessage id='pages.loan_application_list.outstanding_balance'/>),
        dataIndex: 'today_balance',
        valueType: {type: 'money', locale: "en-US"},
      },
      {
        title: (<FormattedMessage id='pages.util.start_date'/>),
        dataIndex: 'start_date_approved',
        valueType: 'textarea',
      },
      {
        title: (<FormattedMessage id='pages.loan_application_list.day_approved'/>),
        dataIndex: 'day_approved',
        valueType: 'digit',
      },
      {
        title: (<FormattedMessage id='pages.loan_application_list.annual_interest_rate'/>),
        dataIndex: 'annual_interest_rate_approved',
        valueType: 'digit',
      },
      {
        title: (<FormattedMessage id='pages.loan_application_list.penalty_annual_interest_rate'/>),
        dataIndex: 'penalty_annual_interest_rate',
        valueType: 'digit',
      },

      {
        title: (<FormattedMessage id='pages.loan_application_list.loan_overdue'/>),
        dataIndex: 'loan_overdue',
        valueType: 'textarea',
        render: (text, record, index) => {
          return (translate_boolean(record?.loan_overdue))
        },  
      },
      // {
      //   title: (<FormattedMessage id='pages.loan_application_list.loan_overdue_amount'/>),
      //   dataIndex: 'loan_overdue_amount',
      //   valueType: 'textarea',
      // },
      
      {
        title: (<FormattedMessage id='pages.util.status'/>),
        dataIndex: 'status',
        valueType: 'textarea',
        render: (text, record, index) => {
          return (translate_status(record?.status))
        },
      },
      
      {
        title: (<FormattedMessage id='pages.loan_application_list.collateral_amount_original'/>),
        dataIndex: 'collateral_amount_original',
        valueType: {type: 'money', locale: "en-US"},
      },
      {
        title: (<FormattedMessage id='pages.loan_application_list.collateral_amount_current'/>),
        dataIndex: 'collateral_amount_current',
        valueType: {type: 'money', locale: "en-US"},
      },            
    ]
  );
  columns_approved = columns_approved.concat(
    [
      {
        title: (<FormattedMessage id='pages.util.operation'/>),
        dataIndex: 'option',
        valueType: 'option',
        /*
        render: (_, record) => [
          <a
            key="config"
            onClick={() => {
              handleUpdateModalVisible(true);
              setCurrentRow(record);
            }}
          >
            <FormattedMessage id='pages.util.review'/>
          </a>,
        ],
        */
        render: (_, record) => {
          if (record?.status == "ACCEPTED" || record?.status == "UNACCEPTED"
            || record?.status == "GOODS_RECEIVED" || record?.status == "GOODS_DELIVERY"
            || record?.status == "ACCOUNT_RECEIVABLE_CONTROL" || record?.status == "ACCOUNT_RECEIVABLE_RELEASE"
            || record?.status == "REPAID" || record?.status == "DELINQUENT" 
            || record?.status == "LIQUIDATED" || record?.status == "LOAN_SETTLEMENT"
            || record?.loan_overdue == "True"
            ) {
            return (
            <a
              key="config"
              /*
              onClick={() => {
                handleUpdateModalVisible(true);
                setCurrentRow(record);
              }}
              */
              onClick={() => {
                window.open("/application/loan-application-approval?loan_application_id=" + record?.key,'newwindow','height=800, width=1500, top=160, left=350, toolbar=no, menubar=no, status=no')
              }}
            >
              <FormattedMessage id='pages.util.approve'/>
            </a>);
          }
        },
      },        
    ]
  );

  return (
    <PageContainer>
      <ProTable<TableListItem, TableListPagination>
        headerTitle={<FormattedMessage id='pages.loan_application_list.loan_application_list_created'/>}
        actionRef={actionRef}
        rowKey="key"
        //search={{
        //  labelWidth: 120,
        //}}
        scroll={{ x: 1300 }}
        search={false}
        toolBarRender={() => [
        ]}
        request={loanApplication_created}
        params={{"borrower_id": borrower_id}}
        columns={columns}
      />

      <ProTable<TableListItem, TableListPagination>
        headerTitle={<FormattedMessage id='pages.loan_application_list.loan_application_list_progress'/>}
        actionRef={actionRef}
        rowKey="key"
        //search={{
        //  labelWidth: 120,
        //}}
        scroll={{ x: 1300 }}
        search={false}
        toolBarRender={() => [
        ]}
        request={loanApplication_progress}
        params={{"borrower_id": borrower_id}}
        columns={columns}
      />

      <ProTable<TableListItem, TableListPagination>
        headerTitle={<FormattedMessage id='pages.loan_application_list.loan_application_list_approved'/>}
        actionRef={actionRef}
        rowKey="key"
        //search={{
        //  labelWidth: 120,
        //}}
        scroll={{ x: 1300 }}
        search={false}
        toolBarRender={() => [
        ]}
        request={loanApplication_approved}
        params={{"borrower_id": borrower_id}}
        columns={columns_approved}
      />

      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value, currentRow);

          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);

            if (actionRef.current) {
              actionRef.current.reload();
            }

            window.location.reload();
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
{/*
      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.key && (
          <ProDescriptions<TableListItem>
            column={2}
            title={currentRow?.company_name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.key,
            }}
            columns={columns as ProDescriptionsItemProps<TableListItem>[]}
          />
        )}
      </Drawer>
*/}      
    </PageContainer>
  );
};

export default TableList;
