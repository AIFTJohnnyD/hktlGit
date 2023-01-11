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
import { getList, updateItem, removeItem } from './service';
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
    await updateItem({
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
    await removeItem({
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

  const timeRequest = async () => [
    { label: '全部', value: 'all' },
    { label: '未解决', value: 'open' },
    { label: '已解决', value: 'closed' },
    { label: '解决中', value: 'processing' },
  ];
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
      title: (<FormattedMessage id='pages.borrower_list.borrower.name'/>),
      dataIndex: 'name_cn',
      valueType: 'textarea',
    },    
    {
      title: (<FormattedMessage id='pages.borrower_list.borrower.credit_code_cn'/>),
      dataIndex: 'credit_code_cn',
      valueType: 'textarea',
    },    
    {
      title: (<FormattedMessage id='pages.borrower_list.borrower.address_cn'/>),
      dataIndex: 'address_cn',
      valueType: 'textarea',
    },    

    {
      title: (<FormattedMessage id='pages.borrower_list.borrower.name_hk'/>),
      dataIndex: 'name_hk',
      valueType: 'textarea',
    },    
    {
      title: (<FormattedMessage id='pages.borrower_list.borrower.br_code_hk'/>),
      dataIndex: 'br_code_hk',
      valueType: 'textarea',
    },    
    {
      title: (<FormattedMessage id='pages.borrower_list.borrower.address_hk'/>),
      dataIndex: 'address_hk',
      valueType: 'textarea',
    },    

    {
      title: '额度审批时间',
      dataIndex: 'modified_datetime',
      valueType: 'date',
    },

    {
      title: (<FormattedMessage id='pages.util.status'/>),
      dataIndex: 'status',
      valueType: 'textarea',
    },
    
    {
      title: (<FormattedMessage id='pages.util.operation'/>),
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          /*
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
          */
          onClick={() => {
            window.open("/amount/borrower-approval?borrower_key=" + record?.key,'newwindow','height=800, width=1500, top=160, left=350, toolbar=no, menubar=no, status=no')
          }}         
        >
          <FormattedMessage id='pages.util.review'/>
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <div className={styles.divline}></div>
      <ProTable<TableListItem, TableListPagination>
        headerTitle={<FormattedMessage id='pages.borrower_list.borrower_list'/>}
        actionRef={actionRef}
        rowKey="key"
        //search={{
        //  labelWidth: 120,
        //}}
        search={false}
        toolBarRender={() => [
        ]}
        request={getList}
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
        {currentRow?.key && (
          <ProDescriptions<TableListItem>
            column={2}
            title={currentRow?.name_cn}
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
