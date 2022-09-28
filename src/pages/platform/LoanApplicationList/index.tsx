import { Button, Drawer, Table, Popover } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType, ColumnsState } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import { loanApplicationList } from './service';
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

  const columns_list_product = [
    {
      title: 'ASIN',
      dataIndex: 'ASIN',
      key: 'ASIN',
    },
    { 
      //title: '数量',
      title: (<FormattedMessage id='pages.product_analysis.select.columns_title.otb_sales'/>),
      dataIndex: 'otb_sales',
      key: 'otb_sales',
    },
    {
      //title: '折扣',
      title:(<FormattedMessage id='pages.product_analysis.select.columns_title.haircut'/>),
      dataIndex: 'haircut',
      key: 'haircut',
    },

    {
      //title: '平均价格',
      title:(<FormattedMessage id='pages.product_analysis.select.columns_title.average_price'/>),
      dataIndex: 'avg_price',
      key: 'avg_price',
    },

    {
      //title: '预期销售',
      title:(<FormattedMessage id='pages.product_analysis.select.columns_title.expected_sales'/>),
      dataIndex: 'expected_sales',
      key: 'expected_sales',
    },
    {
      //title: '预期流失',
      title:(<FormattedMessage id='pages.product_analysis.select.columns_title.expected_loss'/>),
      dataIndex: 'lost_sales',
      key: 'lost_sales',
    },
    {
      //title: '预期剩余',
      title:(<FormattedMessage id='pages.product_analysis.select.columns_title.expected_left_over'/>),
      dataIndex: 'left_over',
      key: 'left_over',
    },

    {
      //title: 'GMV',
      title:(<FormattedMessage id='pages.product_analysis.select.table_title.GMV'/>),
      dataIndex: 'gross_merchandising_value',
      key: 'gross_merchandising_value',
    },
    {
      //title: 'GP',
      title:(<FormattedMessage id='pages.product_analysis.select.table_title.GP'/>),
      dataIndex: 'gross_profit',
      key: 'gross_profit',
    },

    {
      //title: '默认利率',
      title:(<FormattedMessage id='pages.product_analysis.select.table_title.rate'/>),
      dataIndex: 'interest_rate',
      key: 'interest_rate',
    },
  ];

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
      //title: '采购计划名称',
      title:(<FormattedMessage id='pages.util.name'/>),
      dataIndex: 'name',
      width: '20%',
      render: (text, record, index) => {
        const content = (
          <Table dataSource={record.list_product} columns={columns_list_product} pagination={false} />
        );

        return (
          <Popover content={content} title={record.name}>
            <Button type="primary" block={true}>{record.name}</Button>
          </Popover>          
        )
      },      
    },
    
    {
      title: (<FormattedMessage id='pages.util.status'/>),
      dataIndex: 'status',
      valueType: 'textarea',
      render: (text, record, index) => {
        return (translate_status(record?.status))
      },
      hideInSearch: true,      
    },

    {
      //title: '申请借贷金额',
      title:(<FormattedMessage id='pages.loan_application.application_amount'/>),
      key: 'amount',
      dataIndex: 'amount',
      sorter: (a: { amount: number }, b: { amount: number }) => a.amount - b.amount,
    },
    {
      //title: '批准借贷金额',
      title:(<FormattedMessage id='pages.loan_application.approved_application_amount'/>),
      key: 'amount_approved',
      dataIndex: 'amount_approved',
      sorter: (a: { amount_approved: number }, b: { amount_approved: number }) => a.amount_approved - b.amount_approved,
    },
    {
      //title: '货币',
      title:(<FormattedMessage id='pages.loan_application.currency'/>),
      key: 'currency',
      dataIndex: 'currency',
    },

    {
      //title: '预期总销售价值 (GMV)',
      title:(<FormattedMessage id='pages.loan_application.gross_merchandising_value'/>),
      key: 'gross_merchandising_value',
      dataIndex: 'gross_merchandising_value',
      sorter: (a: { gross_merchandising_value: number }, b: { gross_merchandising_value: number }) => a.gross_merchandising_value - b.gross_merchandising_value,
    },
    {
      //title: '预期总毛利 (GP)',
      title:(<FormattedMessage id='pages.loan_application.gross_profit'/>),
      key: 'gross_profit',
      dataIndex: 'gross_profit',
      sorter: (a: { gross_profit: number }, b: { gross_profit: number }) => a.gross_profit - b.gross_profit,
    },
    {
      //title: '毛利率 (GP/GMV)',
      title:(<FormattedMessage id='pages.application.index_name.profit_margin'/>),
      key: 'profit_margin',
      dataIndex: 'profit_margin',
      sorter: (a: { profit_margin: number }, b: { profit_margin: number }) => a.profit_margin - b.profit_margin,
    },

    {
      //title: '预期销售比例 (GMV)', 
      title:(<FormattedMessage id='pages.application.index_name.gmv_expected_sales_ratio'/>),
      key: 'gmv_expected_sales_ratio',
      dataIndex: 'gmv_expected_sales_ratio',
      sorter: (a: { gmv_expected_sales_ratio: number }, b: { gmv_expected_sales_ratio: number }) => a.gmv_expected_sales_ratio - b.gmv_expected_sales_ratio,
    },
    {
      //title: '预期流失率 (GMV)',
      title:(<FormattedMessage id='pages.application.index_name.gmv_lost_sales_ratio'/>),
      key: 'gmv_lost_sales_ratio',
      dataIndex: 'gmv_lost_sales_ratio',
      sorter: (a: { gmv_lost_sales_ratio: number }, b: { gmv_lost_sales_ratio: number }) => a.gmv_lost_sales_ratio - b.gmv_lost_sales_ratio,
    },
    {
      //title: '预期剩余率 (GMV)',
      title:(<FormattedMessage id='pages.application.index_name.gmv_left_over_ratio'/>),
      key: 'gmv_left_over_ratio',
      dataIndex: 'gmv_left_over_ratio',
      sorter: (a: { gmv_left_over_ratio: number }, b: { gmv_left_over_ratio: number }) => a.gmv_left_over_ratio - b.gmv_left_over_ratio,
    },

    {
      //title: '预期销售比例 (Cost)', 
      title:(<FormattedMessage id='pages.application.index_name.cost_expected_sales_ratio'/>),
      key: 'cost_expected_sales_ratio',
      dataIndex: 'cost_expected_sales_ratio',
      sorter: (a: { cost_expected_sales_ratio: number }, b: { cost_expected_sales_ratio: number }) => a.cost_expected_sales_ratio - b.cost_expected_sales_ratio,
    },
    {
      //title: '预期流失率 (Cost)',
      title:(<FormattedMessage id='pages.application.index_name.cost_lost_sales_ratio'/>),
      key: 'cost_lost_sales_ratio',
      dataIndex: 'cost_lost_sales_ratio',
      sorter: (a: { cost_lost_sales_ratio: number }, b: { cost_lost_sales_ratio: number }) => a.cost_lost_sales_ratio - b.cost_lost_sales_ratio,
    },
    {
      //title: '预期剩余率 (Cost)',
      title:(<FormattedMessage id='pages.application.index_name.cost_left_over_ratio'/>),
      key: 'cost_left_over_ratio',
      dataIndex: 'cost_left_over_ratio',
      sorter: (a: { cost_left_over_ratio: number }, b: { cost_left_over_ratio: number }) => a.cost_left_over_ratio - b.cost_left_over_ratio,
    },

    {
      //title: '边际总收益率 (MRR)',
      title:(<FormattedMessage id='pages.product_analysis.select.table_title.MRR'/>),
      key: 'marginal_rate_of_return',
      dataIndex: 'marginal_rate_of_return',      
      sorter: (a: { marginal_rate_of_return: number }, b: { marginal_rate_of_return: number }) => a.marginal_rate_of_return - b.marginal_rate_of_return,
    },
    {
      //title: '资产收益率 (ROA)',
      title:(<FormattedMessage id='pages.product_analysis.select.table_title.ROA'/>),
      key: 'average_rate_of_return',
      dataIndex: 'average_rate_of_return',      
      sorter: (a: { average_rate_of_return: number }, b: { average_rate_of_return: number }) => a.average_rate_of_return - b.average_rate_of_return,
    },

    //bank
    {
      //title: '速动比率',
      title:(<FormattedMessage id='pages.application.index_name.quick_ratio'/>),
      key: 'quick_ratio',
      dataIndex: 'quick_ratio',      
      sorter: (a: { quick_ratio: number }, b: { quick_ratio: number }) => a.quick_ratio - b.quick_ratio,
    },
    {
      //title: '流动比率',
      title:(<FormattedMessage id='pages.application.index_name.current_ratio'/>),
      key: 'current_ratio',
      dataIndex: 'current_ratio',      
      sorter: (a: { current_ratio: number }, b: { current_ratio: number }) => a.current_ratio - b.current_ratio,
    },
    {
      //title: '现金比率',
      title:(<FormattedMessage id='ages.application.index_name.cash_ratio'/>),
      key: 'cash_ratio',
      dataIndex: 'cash_ratio',      
      sorter: (a: { cash_ratio: number }, b: { cash_ratio: number }) => a.cash_ratio - b.cash_ratio,
    },

    {
      //title: '存货周转率', 
      title:(<FormattedMessage id='pages.application.index_name.inventory_turnover'/>),
      key: 'inventory_turnover',
      dataIndex: 'inventory_turnover',      
      sorter: (a: { inventory_turnover: number }, b: { inventory_turnover: number }) => a.inventory_turnover - b.inventory_turnover,
    },
    {
      //title: '营运资金周转率',
      title:(<FormattedMessage id='pages.application.index_name.working_capital_turnover'/>),
      key: 'working_capital_turnover',
      dataIndex: 'working_capital_turnover',      
      sorter: (a: { working_capital_turnover: number }, b: { working_capital_turnover: number }) => a.working_capital_turnover - b.working_capital_turnover,
    },
    {
      //title: '债务与税息折旧及摊销前利润比',
      title:(<FormattedMessage id='pages.application.index_name.debt_to_EBITDA_margin'/>),
      key: 'debt_to_EBITDA_margin',
      dataIndex: 'debt_to_EBITDA_margin',      
      sorter: (a: { debt_to_EBITDA_margin: number }, b: { debt_to_EBITDA_margin: number }) => a.debt_to_EBITDA_margin - b.debt_to_EBITDA_margin,
    },
    {
      //title: '利息覆盖率',
      title:(<FormattedMessage id='pages.application.index_name.interest_coverage_ratio'/>),
      key: 'interest_coverage_ratio',
      dataIndex: 'interest_coverage_ratio',      
      sorter: (a: { interest_coverage_ratio: number }, b: { interest_coverage_ratio: number }) => a.interest_coverage_ratio - b.interest_coverage_ratio,
    },    
  ];

  const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>({
    quick_ratio: {
      show: false
    },
    current_ratio: {
      show: false
    },
    cash_ratio: {
      show: false
    },

    inventory_turnover: {
      show: false
    },
    working_capital_turnover: {
      show: false
    },
    debt_to_EBITDA_margin: {
      show: false
    },
    interest_coverage_ratio: {
      show: false
    },
  });

  return (
    <PageContainer>
      <div className={styles.divline}></div>
      <ProTable<TableListItem, TableListPagination>
        headerTitle={<FormattedMessage id='pages.loan_application_list.loan_application_list'/>}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        request={loanApplicationList}
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
            title={currentRow?.name}
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
