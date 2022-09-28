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
import { product, updateProduct, removeProduct } from './service';
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
    await updateProduct({
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
    await removeProduct({
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

  function translate_status(status: string) {
    console.log(status);
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
    {
      title: (<FormattedMessage id='pages.product_form.platform'/>),
      dataIndex: 'platform',
      valueType: 'textarea',
      width: '5%',
    },    
    {
      title: (<FormattedMessage id='pages.product_form.product_id'/>),
      dataIndex: 'product_id_in_platform',
      valueType: 'textarea',
      width: '5%',
    },    
    {
      title: (<FormattedMessage id='pages.product_form.title'/>),
      dataIndex: 'title',
      valueType: 'textarea',
      width: '30%',
    },    

    {
      title: (<FormattedMessage id='pages.product_form.category_level_0'/>),
      dataIndex: 'category_0',
      valueType: 'textarea',
      width: '10%',
    },
    {
      title: (<FormattedMessage id='pages.product_form.category_level_1'/>),
      dataIndex: 'category_1',
      valueType: 'textarea',
      width: '10%',
    },
    {
      title: (<FormattedMessage id='pages.product_form.category_level_2'/>),
      dataIndex: 'category_2',
      valueType: 'textarea',
      width: '10%',
    },

    {
      title: (<FormattedMessage id='pages.product_form.list_price'/>),
      dataIndex: 'list_price',
      valueType: {type: 'money', locale: "en-US"}
    },
    {
      title: (<FormattedMessage id='pages.product_form.discount_price'/>),
      dataIndex: 'discount_price',
      valueType: {type: 'money', locale: "en-US"}
    },
    {
      title: (<FormattedMessage id='pages.product_form.currency'/>),
      dataIndex: 'currency',
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
        if (record.can_analytics == true) {
          return [
            <a
            href={"./product-analysis?product_id=" + record.product_id_in_platform}
            >
              <FormattedMessage id='pages.util.analysis'/>
            </a>,
            ]
        };
      },
    },

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
          <FormattedMessage id='pages.util.update'/>
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <div className={styles.divline}></div>
      <ProTable<TableListItem, TableListPagination>
        headerTitle={<FormattedMessage id='pages.product_list.product_list'/>}
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
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            Delete
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
        {currentRow?.product_id && (
          <ProDescriptions<TableListItem>
            column={2}
            title={currentRow?.product_id}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.product_id,
            }}
            columns={columns as ProDescriptionsItemProps<TableListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
