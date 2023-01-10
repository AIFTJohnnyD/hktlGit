import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { FormValueType } from './components/ApplyForm';
import ApplyForm from './components/ApplyForm';
import { product, applyProduct, removeApplication } from './service';
import type { TableListItem, TableListPagination } from './data';

import { FormattedMessage } from 'umi';

/**
 * 更新节点
 *
 * @param fields
 */

const handleApply = async (fields: FormValueType, currentRow?: TableListItem) => {
  const hide = message.loading('Applying');

  try {
    await applyProduct({
      ...currentRow,
      ...fields,
    });
    hide();
    message.success('Apply successfully!');
    return true;
  } catch (error) {
    hide();
    message.error('Apply failed. Please try again!');
    return false;
  }
};

/**
 * 删除节点
 *
 * @param selectedRows
 */

const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('Applying');
  if (!selectedRows) return true;

  try {
    await removeApplication({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('Apply successfully!');
    return true;
  } catch (error) {
    hide();
    message.error('Apply failed. Please try again!');
    return false;
  }
};

const TableList: React.FC = () => {

  /** 分布更新窗口的弹窗 */
  const [applyModalVisible, handleApplyModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  /** 国际化配置 */

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
    {
      title: (<FormattedMessage id='pages.util.name'/>),
      dataIndex: 'name',
      valueType: 'textarea',
      render: (dom, entity) => {
        return (
          <a href={"/product/product-analysis?plan_id=" + entity.key}>
            {dom}
          </a>
        );
      },      
    },
/*
    {
      title: (<FormattedMessage id='pages.loan_application.company_id'/>),
      dataIndex: 'borrower_id',
      valueType: 'textarea',
    },    
    {
      title: (<FormattedMessage id='pages.loan_application.company_name'/>),
      dataIndex: 'borrower_name',
      valueType: 'textarea',
    },
*/
    {
      title: (<FormattedMessage id='pages.loan_application.gross_merchandising_value'/>),
      dataIndex: 'gross_merchandising_value',
      valueType: 'textarea',
    },    

    {
      title: (<FormattedMessage id='pages.loan_application.gross_profit'/>),
      dataIndex: 'gross_profit',
      valueType: 'textarea',
    },
    {
      title: (<FormattedMessage id='pages.loan_application.marginal_rate_of_return'/>),
      dataIndex: 'marginal_rate_of_return',
      valueType: 'textarea',
    },
    {
      title: (<FormattedMessage id='pages.loan_application.average_rate_of_return'/>),
      dataIndex: 'average_rate_of_return',
      valueType: 'textarea',
    },
    
    {
      title: (<FormattedMessage id='pages.util.operation'/>),
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleApplyModalVisible(true);
            setCurrentRow(record);
          }}
        >
          <FormattedMessage id='pages.loan_application.apply'/>
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem, TableListPagination>
        headerTitle={<FormattedMessage id='pages.loan_application.otb_plan'/>}
        actionRef={actionRef}
        rowKey="key"
        //search={{
        //  labelWidth: 120,
        //}}
        search={false}
        toolBarRender={() => [
        ]}
        request={product}
        columns={columns}
        // rowSelection={{
        //   onChange: (_, selectedRows) => {
        //     setSelectedRows(selectedRows);
        //   },
        // }}
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
              handleApplyModalVisible(true);
              setSelectedRows([]);
            }}
          >
            <FormattedMessage id='pages.loan_application.apply'/>
          </Button>

          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage id='pages.loan_application.delete'/>
          </Button>
        </FooterToolbar>
      )}
      
      <ApplyForm
        onSubmit={async (value) => {
          const success = await handleApply(value, currentRow);

          if (success) {
            handleApplyModalVisible(false);
            setCurrentRow(undefined);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }

          return true;
        }}
        onCancel={() => {
          handleApplyModalVisible(false);
          setCurrentRow(undefined);
        }}
        applyModalVisible={applyModalVisible}
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
            title={currentRow?.name}
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
