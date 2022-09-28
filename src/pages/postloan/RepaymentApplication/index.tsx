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
import { loanApplicationPostloan, updateLoanApplication_postloan } from './service';
import type { TableListItem, TableListPagination } from './data';
import styles from './style.less';
import { FormattedMessage } from 'umi';

/**
 * 更新节点
 *
 * @param fields
 */

const handleUpdate = async (fields: FormValueType, currentRow?: TableListItem) => {
  const hide = message.loading('Updating');

  try {
    await updateLoanApplication_postloan({
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

const TableList: React.FC = () => {

  /** 分布更新窗口的弹窗 */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  /** 国际化配置 */

  function translate_status(status: string) {
    return <FormattedMessage id={'pages.application.' + status}/>;
  }  

  const columns: ProColumns<TableListItem>[] = [
    {
      title: (<FormattedMessage id='pages.util.id'/>),
      dataIndex: 'key',
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
    },

/*
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
          <a href={"/company/company-analysis?borrower_id=" + entity.borrower_id}>
            {dom}
          </a>
        );
      },      
    },    

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
    {
      title: (<FormattedMessage id='pages.util.name'/>),
      dataIndex: 'plan_name',
      valueType: 'textarea',
    },    
/*
    {
      title: (<FormattedMessage id='pages.loan_application.gross_merchandising_value'/>),
      dataIndex: 'plan_gross_merchandising_value',
      valueType: 'textarea',
    },    
*/
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
        return (
          <a
            key="config"
            onClick={() => {
              handleUpdateModalVisible(true);
              setCurrentRow(record);
            }}
          >
            <FormattedMessage id='pages.postloan.repayment_installment'/>
          </a>);
      }
    },
  ];

  return (
    <PageContainer>
      <div className={styles.divline}></div>
      <ProTable<TableListItem, TableListPagination>
        headerTitle={<FormattedMessage id='pages.loan_application_list.loan_application_list'/>}
        actionRef={actionRef}
        rowKey="key"
        //search={{
        //  labelWidth: 120,
        //}}
        search={false}
        toolBarRender={() => [
        ]}
        request={loanApplicationPostloan}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />

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
            onClick={() => {
              handleUpdateModalVisible(true);
              setSelectedRows([]);
            }}
          >
            <FormattedMessage id='pages.util.update'/>
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
        {currentRow?.key && (
          <ProDescriptions<TableListItem>
            column={2}
            title={currentRow?.borrower_name}
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
    </PageContainer>
  );
};

export default TableList;
