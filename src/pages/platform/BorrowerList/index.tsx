import { Button, Drawer, Table, Popover } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType, ColumnsState } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import { borrowerList } from './service';
import type { TableListItem, TableListPagination } from './data';
import styles from './style.less';
import { FormattedMessage } from 'umi';

const TableList: React.FC = () => {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<TableListItem>();

  function translate_status(status: string) {
    return <FormattedMessage id={'pages.application.' + status}/>;
  }  

  const columns: ProColumns<TableListItem>[] = [
    {
      title: (<FormattedMessage id='pages.util.id'/>),
      dataIndex: 'id',
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
      title: (<FormattedMessage id='pages.borrower_list.borrower.name_cn'/>),
      dataIndex: 'name_cn',
      key: 'name_cn',

      render: (dom, entity) => {
        return (
          <a href={"/application/borrower-analysis?borrower_id=" + entity.id}>
            {dom}
          </a>
        );
      },
    },
    {
      title: (<FormattedMessage id='pages.borrower_list.borrower.credit_code_cn'/>),
      dataIndex: 'credit_code_cn',
      key: 'credit_code_cn',
    },

    {
      title: (<FormattedMessage id='pages.borrower_list.borrower.name_hk'/>),
      dataIndex: 'name_hk',
      key: 'name_hk',
    },
    {
      title: (<FormattedMessage id='pages.borrower_list.borrower.br_code_hk'/>),
      dataIndex: 'br_code_hk',
      key: 'br_code_hk',
    },

    {
      title: (<FormattedMessage id='pages.platform.borrower.past_one_month_cashflow'/>),
      key: 'past_one_month_cashflow',
      dataIndex: 'past_one_month_cashflow',
      sorter: (a: { past_one_month_cashflow: number }, b: { past_one_month_cashflow: number }) => a.past_one_month_cashflow - b.past_one_month_cashflow,
    },
    {
      title: (<FormattedMessage id='pages.platform.borrower.past_three_month_cashflow'/>),
      key: 'past_three_month_cashflow',
      dataIndex: 'past_three_month_cashflow',
      sorter: (a: { past_three_month_cashflow: number }, b: { past_three_month_cashflow: number }) => a.past_three_month_cashflow - b.past_three_month_cashflow,
    },
    {
      title: (<FormattedMessage id='pages.platform.borrower.history_apply_times'/>),
      key: 'history_apply_times',
      dataIndex: 'history_apply_times',
      sorter: (a: { history_apply_times: number }, b: { history_apply_times: number }) => a.history_apply_times - b.history_apply_times,
    },
    {
      title: (<FormattedMessage id='pages.platform.borrower.history_apply_approval_times'/>),
      key: 'history_apply_approval_times',
      dataIndex: 'history_apply_approval_times',
      sorter: (a: { history_apply_approval_times: number }, b: { history_apply_approval_times: number }) => a.history_apply_approval_times - b.history_apply_approval_times,
    },

    {
      title: (<FormattedMessage id='pages.application.index_name.history_default_times'/>),
      key: 'history_default_times',
      dataIndex: 'history_default_times',
      sorter: (a: { history_default_times: number }, b: { history_default_times: number }) => a.history_default_times - b.history_default_times,
    },
    {
      title: (<FormattedMessage id='pages.application.index_name.history_default_ratio'/>),
      key: 'history_default_ratio',
      dataIndex: 'history_default_ratio',
      sorter: (a: { history_default_ratio: number }, b: { history_default_ratio: number }) => a.history_default_ratio - b.history_default_ratio,
    },
    {
      title: (<FormattedMessage id='pages.application.index_name.history_default_money_ratio'/>),
      key: 'history_default_money_ratio',
      dataIndex: 'history_default_money_ratio',
      sorter: (a: { history_default_money_ratio: number }, b: { history_default_money_ratio: number }) => a.history_default_money_ratio - b.history_default_money_ratio,
    },
  ];

  const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>({
    /*
    quick_ratio: {
      show: false
    },
    */
  });

  return (
    <PageContainer>
      <div className={styles.divline}></div>
      <ProTable<TableListItem, TableListPagination>
        headerTitle={<FormattedMessage id='pages.borrower_list.borrower_list'/>}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 'auto',
        }}
        request={borrowerList}
        columns={columns}
        columnsState={{
          value: columnsStateMap,
          onChange: setColumnsStateMap,
        }}                                
        scroll={{y: 800}}        
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
        {currentRow?.id && (
          <ProDescriptions<TableListItem>
            column={2}
            title={currentRow?.name_cn}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<TableListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
