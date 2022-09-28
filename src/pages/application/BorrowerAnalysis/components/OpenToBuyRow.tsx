import { Card, Col, Row, Tabs, Table, message, Popover, Button } from 'antd';
//import { RingProgress, Line } from '@ant-design/charts';
import type { OfflineDataType, DataItem } from '../data';
import NumberInfo from './NumberInfo';
import styles from '../style.less';

import React, { useRef, useState } from 'react';
import type { ProColumns, ColumnsState } from '@ant-design/pro-table';
//import { EditableProTable } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';

import { Scatter, Line } from '@ant-design/plots';
import request from 'umi-request';

type DataSourceType = {
  key: React.Key;
  name: string;

  application_amount: number;
  list_product: any;

  gross_merchandising_value: number;
  gross_profit: number;

  gmv_expected_sales_ratio: number;
  gmv_lost_sales_ratio: number;
  gmv_left_over_ratio: number;

  cost_expected_sales_ratio: number;
  cost_lost_sales_ratio: number;
  cost_left_over_ratio: number;

  marginal_rate_of_return: number;
  average_rate_of_return: number;
  
  profit_margin: number;

  //bank
  quick_ratio: number;
  current_ratio: number;
  cash_ratio: number;

  inventory_turnover: number;
  working_capital_turnover: number;
  debt_to_EBITDA_margin: number;
  interest_coverage_ratio: number;

  loan_id: number;
};

const OpenToBuyRow = ({
  loading,
  list_otb_plan,
}: {
  loading: boolean;
  list_otb_plan: DataItem[];
}) => {
  //console.log(list_otb_plan);

  let defaultData: DataSourceType[] = [];
  let data_var:any = [];
  let data_cvar:any = [];
  let data_gmv_arr:any = [];
  for (var i in list_otb_plan) {
    defaultData.push({
      key: list_otb_plan[i]['key'],
      name: list_otb_plan[i]['name'],

      application_amount: list_otb_plan[i]['application_amount'],      
      list_product: list_otb_plan[i]['list_product'],

      gross_merchandising_value: list_otb_plan[i]['gross_merchandising_value'],
      gross_profit: list_otb_plan[i]['gross_profit'],

      gmv_expected_sales_ratio: list_otb_plan[i]['gmv_expected_sales_ratio'],
      gmv_lost_sales_ratio: list_otb_plan[i]['gmv_lost_sales_ratio'],
      gmv_left_over_ratio: list_otb_plan[i]['gmv_left_over_ratio'],
    
      cost_expected_sales_ratio: list_otb_plan[i]['cost_expected_sales_ratio'],
      cost_lost_sales_ratio: list_otb_plan[i]['cost_lost_sales_ratio'],
      cost_left_over_ratio: list_otb_plan[i]['cost_left_over_ratio'],

      marginal_rate_of_return: list_otb_plan[i]['marginal_rate_of_return'],
      average_rate_of_return: list_otb_plan[i]['average_rate_of_return'],

      profit_margin: list_otb_plan[i]['profit_margin'],

      quick_ratio: list_otb_plan[i]['quick_ratio'],
      current_ratio: list_otb_plan[i]['current_ratio'],
      cash_ratio: list_otb_plan[i]['cash_ratio'],

      inventory_turnover: list_otb_plan[i]['inventory_turnover'],
      working_capital_turnover: list_otb_plan[i]['working_capital_turnover'],
      debt_to_EBITDA_margin: list_otb_plan[i]['debt_to_EBITDA_margin'],
      interest_coverage_ratio: list_otb_plan[i]['interest_coverage_ratio'],

      loan_id: list_otb_plan[i]['loan_id'],
    });

    for (var index_risk in list_otb_plan[i]['value_at_risk']) {
      data_var.push({
          'ID': list_otb_plan[i]['key'].toString(),
          'Tail Probability': list_otb_plan[i]['value_at_risk'][index_risk]['x'].toString(),
          'Value at Risk (VAR)': list_otb_plan[i]['value_at_risk'][index_risk]['y'],
        });  
    };

    for (var index_risk in list_otb_plan[i]['conditional_value_at_risk']) {
      data_cvar.push(
        {
          'ID': list_otb_plan[i]['key'].toString(),
          'Tail Probability': list_otb_plan[i]['conditional_value_at_risk'][index_risk]['x'].toString(),
          'Conditional VAR (CVAR)': list_otb_plan[i]['conditional_value_at_risk'][index_risk]['y'],
        }
      );  
    };

    data_gmv_arr.push(
      {
        'key': list_otb_plan[i]['key'],
        '预期总销售价值 (GMV)': list_otb_plan[i]['gross_merchandising_value'],
        '资产收益率 (ROA)': list_otb_plan[i]['average_rate_of_return'],
      }
    );
  }
  
  const columns_list_product = [
    {
      title: 'ASIN',
      dataIndex: 'ASIN',
      key: 'ASIN',
    },
    {
      title: '数量',
      dataIndex: 'otb_sales',
      key: 'otb_sales',
      sorter: (a: { otb_sales: number }, b: { otb_sales: number }) => a.otb_sales - b.otb_sales,
    },
    {
      title: '折扣',
      dataIndex: 'haircut',
      key: 'haircut',
      sorter: (a: { haircut: number }, b: { haircut: number }) => a.haircut - b.haircut,
    },

    {
      title: '平均价格',
      dataIndex: 'avg_price',
      key: 'avg_price',
      valueType: {type: 'money', locale: "en-US"},
      sorter: (a: { avg_price: number }, b: { avg_price: number }) => a.avg_price - b.avg_price,
    },

    {
      title: '预期销售',
      dataIndex: 'expected_sales',
      key: 'expected_sales',
      sorter: (a: { expected_sales: number }, b: { expected_sales: number }) => a.expected_sales - b.expected_sales,
    },
    {
      title: '预期流失',
      dataIndex: 'lost_sales',
      key: 'lost_sales',
      sorter: (a: { lost_sales: number }, b: { lost_sales: number }) => a.lost_sales - b.lost_sales,
    },
    {
      title: '预期剩余',
      dataIndex: 'left_over',
      key: 'left_over',
      sorter: (a: { left_over: number }, b: { left_over: number }) => a.left_over - b.left_over,
    },

    {
      title: '预期总销售价值 (GMV)',
      dataIndex: 'gross_merchandising_value',
      key: 'gross_merchandising_value',
      valueType: {type: 'money', locale: "en-US"},
      sorter: (a: { gross_merchandising_value: number }, b: { gross_merchandising_value: number }) => a.gross_merchandising_value - b.gross_merchandising_value,
    },
    {
      title: '预期总毛利 (GP)',
      dataIndex: 'gross_profit',
      key: 'gross_profit',
      valueType: {type: 'money', locale: "en-US"},
      sorter: (a: { gross_profit: number }, b: { gross_profit: number }) => a.gross_profit - b.gross_profit,
    },

    {
      title: '边际总收益率 (MRR)',
      key: 'marginal_rate_of_return',
      dataIndex: 'marginal_rate_of_return',      
      sorter: (a: { marginal_rate_of_return: number }, b: { marginal_rate_of_return: number }) => a.marginal_rate_of_return - b.marginal_rate_of_return,
    },
    {
      title: '资产收益率 (ROA)',
      key: 'average_rate_of_return',
      dataIndex: 'average_rate_of_return',      
      sorter: (a: { average_rate_of_return: number }, b: { average_rate_of_return: number }) => a.average_rate_of_return - b.average_rate_of_return,
    },

    {
      title: '默认利率',
      dataIndex: 'interest_rate',
      key: 'interest_rate',
    },
  ];

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: 'ID',
      dataIndex: 'key',
      width: '3%',
    },
    {
      title: '采购计划名称',
      dataIndex: 'name',
      width: '20%',
      render: (text, record, index) => {
        const content = (
          <Table dataSource={record.list_product} columns={columns_list_product} pagination={false} />
        );

        return (
          <Popover content={content} title={record.name}>
            <Button className={styles.buttenWrap} type="primary" block={true}>{record.name}</Button>
          </Popover>          
        )
      },      
    },

    {
      title: '借贷金额',
      key: 'application_amount',
      dataIndex: 'application_amount',
      valueType: {type: 'money', locale: "en-US"},
      sorter: (a: { application_amount: number }, b: { application_amount: number }) => a.application_amount - b.application_amount,
    },

    {
      title: '预期总销售价值 (GMV)',
      key: 'gross_merchandising_value',
      dataIndex: 'gross_merchandising_value',
      valueType: {type: 'money', locale: "en-US"},
      sorter: (a: { gross_merchandising_value: number }, b: { gross_merchandising_value: number }) => a.gross_merchandising_value - b.gross_merchandising_value,
    },
    {
      title: '预期总毛利 (GP)',
      key: 'gross_profit',
      dataIndex: 'gross_profit',
      valueType: {type: 'money', locale: "en-US"},
      sorter: (a: { gross_profit: number }, b: { gross_profit: number }) => a.gross_profit - b.gross_profit,
    },
    {
      title: '毛利率 (GP/GMV)',
      key: 'profit_margin',
      dataIndex: 'profit_margin',
      sorter: (a: { profit_margin: number }, b: { profit_margin: number }) => a.profit_margin - b.profit_margin,
    },

    {
      title: '预期销售比例 (GMV)',
      key: 'gmv_expected_sales_ratio',
      dataIndex: 'gmv_expected_sales_ratio',
      sorter: (a: { gmv_expected_sales_ratio: number }, b: { gmv_expected_sales_ratio: number }) => a.gmv_expected_sales_ratio - b.gmv_expected_sales_ratio,
    },
    {
      title: '预期流失率 (GMV)',
      key: 'gmv_lost_sales_ratio',
      dataIndex: 'gmv_lost_sales_ratio',
      sorter: (a: { gmv_lost_sales_ratio: number }, b: { gmv_lost_sales_ratio: number }) => a.gmv_lost_sales_ratio - b.gmv_lost_sales_ratio,
    },
    {
      title: '预期剩余率 (GMV)',
      key: 'gmv_left_over_ratio',
      dataIndex: 'gmv_left_over_ratio',
      sorter: (a: { gmv_left_over_ratio: number }, b: { gmv_left_over_ratio: number }) => a.gmv_left_over_ratio - b.gmv_left_over_ratio,
    },

    {
      title: '预期销售比例 (Cost)',
      key: 'cost_expected_sales_ratio',
      dataIndex: 'cost_expected_sales_ratio',
      sorter: (a: { cost_expected_sales_ratio: number }, b: { cost_expected_sales_ratio: number }) => a.cost_expected_sales_ratio - b.cost_expected_sales_ratio,
    },
    {
      title: '预期流失率 (Cost)',
      key: 'cost_lost_sales_ratio',
      dataIndex: 'cost_lost_sales_ratio',
      sorter: (a: { cost_lost_sales_ratio: number }, b: { cost_lost_sales_ratio: number }) => a.cost_lost_sales_ratio - b.cost_lost_sales_ratio,
    },
    {
      title: '预期剩余率 (Cost)',
      key: 'cost_left_over_ratio',
      dataIndex: 'cost_left_over_ratio',
      sorter: (a: { cost_left_over_ratio: number }, b: { cost_left_over_ratio: number }) => a.cost_left_over_ratio - b.cost_left_over_ratio,
    },

    {
      title: '边际总收益率 (MRR)',
      key: 'marginal_rate_of_return',
      dataIndex: 'marginal_rate_of_return',      
      sorter: (a: { marginal_rate_of_return: number }, b: { marginal_rate_of_return: number }) => a.marginal_rate_of_return - b.marginal_rate_of_return,
    },
    {
      title: '资产收益率 (ROA)',
      key: 'average_rate_of_return',
      dataIndex: 'average_rate_of_return',      
      sorter: (a: { average_rate_of_return: number }, b: { average_rate_of_return: number }) => a.average_rate_of_return - b.average_rate_of_return,
    },

    //bank
    {
      title: '速动比率',
      key: 'quick_ratio',
      dataIndex: 'quick_ratio',      
      sorter: (a: { quick_ratio: number }, b: { quick_ratio: number }) => a.quick_ratio - b.quick_ratio,
    },
    {
      title: '流动比率',
      key: 'current_ratio',
      dataIndex: 'current_ratio',      
      sorter: (a: { current_ratio: number }, b: { current_ratio: number }) => a.current_ratio - b.current_ratio,
    },
    {
      title: '现金比率',
      key: 'cash_ratio',
      dataIndex: 'cash_ratio',      
      sorter: (a: { cash_ratio: number }, b: { cash_ratio: number }) => a.cash_ratio - b.cash_ratio,
    },

    {
      title: '存货周转率',
      key: 'inventory_turnover',
      dataIndex: 'inventory_turnover',      
      sorter: (a: { inventory_turnover: number }, b: { inventory_turnover: number }) => a.inventory_turnover - b.inventory_turnover,
    },
    {
      title: '营运资金周转率',
      key: 'working_capital_turnover',
      dataIndex: 'working_capital_turnover',      
      sorter: (a: { working_capital_turnover: number }, b: { working_capital_turnover: number }) => a.working_capital_turnover - b.working_capital_turnover,
    },
    {
      title: '债务与税息折旧及摊销前利润比',
      key: 'debt_to_EBITDA_margin',
      dataIndex: 'debt_to_EBITDA_margin',      
      sorter: (a: { debt_to_EBITDA_margin: number }, b: { debt_to_EBITDA_margin: number }) => a.debt_to_EBITDA_margin - b.debt_to_EBITDA_margin,
    },
    {
      title: '利息覆盖率',
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
    <div>
      <Row gutter={24} align = {"middle"}>
        <Col span={24}>
          <Card loading={loading} className={styles.offlineCard} bordered={false} style={{ marginTop: 32, marginBottom: 32 }} >
            <ProTable<DataSourceType>
                rowKey="key"
                headerTitle="采购计划"
                columns={columns}                
                /*
                request={async () => ({
                  data: defaultData,
                  success: true,
                })}
                */
                
                request={async (params, sort, filter) => {
                  var dataSource = defaultData;

                  for (let parName in params) {
                    switch (parName) {
                      case "key":  {
                        dataSource = dataSource.filter((data) => data.key.toString().includes(params.key.toString() || ''));
                        break;                      
                      }
                      case "name":  {
                        dataSource = dataSource.filter((data) => data.name.includes(params.name || ''));
                        break;                      
                      }
                      
                      case "application_amount":

                      case "gross_merchandising_value":
                      case "gross_profit":

                      case "gmv_expected_sales_ratio":
                      case "gmv_lost_sales_ratio":
                      case "gmv_left_over_ratio":
                      
                      case "cost_expected_sales_ratio":
                      case "cost_lost_sales_ratio":
                      case "cost_left_over_ratio":

                      case "marginal_rate_of_return":
                      case "average_rate_of_return":

                      case "profit_margin": 

                      case "quick_ratio": 
                      case "current_ratio": 
                      case "cash_ratio": 

                      case "inventory_turnover": 
                      case "working_capital_turnover": 
                      case "debt_to_EBITDA_margin": 
                      case "interest_coverage_ratio": 
                      {
                        console.log((params as any)[parName]);
                        let expression = (params as any)[parName].trim();

                        if (expression.length > 1 && expression[1] != "=") {
                          let num = Number(expression.substring(1));
                          switch (expression[0]) {
                            case ">": {
                              dataSource = dataSource.filter((data) => (data as any)[parName] > num);
                              break;
                            }
                            case "<": {
                              dataSource = dataSource.filter((data) => (data as any)[parName] < num);
                              break;
                            }
                            case "=": {
                              dataSource = dataSource.filter((data) => (data as any)[parName] == num);
                              break;
                            }
                          }
                        } else if (expression.length > 2 && expression[1] == "=") {
                          let num = Number(expression.substring(2));
                          switch (expression[0]) {
                            case ">": {
                              dataSource = dataSource.filter((data) => (data as any)[parName] >= num);
                              break;
                            }
                            case "<": {
                              dataSource = dataSource.filter((data) => (data as any)[parName] <= num);
                              break;
                            }
                            case "=": {
                              dataSource = dataSource.filter((data) => (data as any)[parName] == num);
                              break;
                            }
                          }
                        }
                      }                      
                    }
                  }

                  return {
                    data: dataSource,
                    success: true,
                  };
                }}
                               
                search={{
                  labelWidth: 'auto',
                }}
                columnsState={{
                  value: columnsStateMap,
                  onChange: setColumnsStateMap,
                }}                                
                scroll={{y: 300}}
              />
          </Card>
        </Col>
      </Row>
        
      <Row gutter={24} align = {"middle"}>
        <Col span={8}>
          <Card loading={loading} className={styles.offlineCard} bordered={false} style={{ marginBottom: 32 }}>
            <Line
              xField = 'Tail Probability'
              yField = 'Value at Risk (VAR)'
              seriesField = 'ID'
              data = {data_var}

              xAxis = {{title: {text: 'Tail Probability'}}}
              yAxis = {{title: {text: 'Value at Risk (VAR)'}}}

              height = {200}

              legend = {{
                position: 'top',
              }}
              smooth = {true}
              animation = {{
                appear: {
                  animation: 'path-in',
                  duration: 5000,
                }
              }}              
            />
          </Card>
        </Col>            

        <Col span={8}>
          <Card loading={loading} className={styles.offlineCard} bordered={false} style={{ marginBottom: 32 }}>
            <Line
              xField = 'Tail Probability'
              yField = 'Conditional VAR (CVAR)'
              seriesField = 'ID'
              data = {data_cvar}

              xAxis = {{title: {text: 'Tail Probability'}}}
              yAxis = {{title: {text: 'Conditional VAR (CVAR)'}}}

              height = {200}

              legend = {{
                position: 'top',
              }}
              smooth = {true}
              animation = {{
                appear: {
                  animation: 'path-in',
                  duration: 5000,
                }
              }}              
            />
          </Card>
        </Col>            

        <Col span={8}>
          <Card loading={loading} className={styles.offlineCard} bordered={false} style={{ marginBottom: 32 }}>
            <Scatter
              xField = '预期总销售价值 (GMV)'
              yField = '资产收益率 (ROA)'
              data = {data_gmv_arr}
              size = {5}
              shape = {'circle'}
              label = {{
                formatter: (item) => {
                  return item.key;
                },
                offsetY: 24,
                style: {
                  fontSize: 12,
                  fill: 'rgba(0,0,0,0.85)',
                },
              }}

              xAxis = {{title: {text: '预期总销售价值 (GMV)'}}}
              yAxis = {{title: {text: '资产收益率 (ROA)'}}}

              height = {200}
            />
          </Card>
        </Col>            
      </Row>
    </div>
);}

export default OpenToBuyRow;
