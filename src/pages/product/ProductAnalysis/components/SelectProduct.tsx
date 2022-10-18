import { Card, Col, Row, Tabs, Table, message } from 'antd';
import { RingProgress, Line } from '@ant-design/charts';
import type { OfflineDataType, DataItem } from '../data';
import NumberInfo from './NumberInfo';
import styles from '../style.less';

import React, { useRef, useState } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import { ProFormRadio, ProFormField } from '@ant-design/pro-form';

import type { ProFormInstance } from '@ant-design/pro-form';
import { ProFormDigit } from '@ant-design/pro-form';
import ProForm, { ProFormDependency } from '@ant-design/pro-form';
import { EditTwoTone, ProfileTwoTone } from '@ant-design/icons';

import { request, FormattedMessage } from 'umi';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

type OtbPlanType = {
  key: React.Key;
  asin: string;
  title: string;

  otb_sales: number;
  haircut: number;

  expected_sales: number;
  expected_sales_ratio: number;
    
  expected_gmv: number;
  expected_gp: number;
  profit_margin: number;

  marginal_rate_of_left_over: number;
  marginal_rate_of_lost_sales: number;
  marginal_rate_of_return: number;

  average_rate_of_return: number;

  otb_sales_amount: number;

  gp_variance: number;
};

const SelectProduct = ({
  loading,
  list_product_kyp,
}: {
  loading: boolean;
  list_product_kyp: DataItem[];
}) => {
  //console.log(list_product_kyp);

  let listOtbPlan_default: OtbPlanType[] = [];
  for (var i in list_product_kyp) {
    listOtbPlan_default.push({
      key: list_product_kyp[i].key,
      asin: list_product_kyp[i].product_id_in_platform,
      title: list_product_kyp[i].title,

      otb_sales: list_product_kyp[i].otb_sales,
      haircut: list_product_kyp[i].haircut,

      expected_sales: list_product_kyp[i].expected_sales,
      expected_sales_ratio: list_product_kyp[i].expected_sales_ratio,
    
      expected_gmv: list_product_kyp[i].expected_gmv,
      expected_gp: list_product_kyp[i].expected_gp,
      profit_margin: list_product_kyp[i].profit_margin,
      
      marginal_rate_of_left_over: list_product_kyp[i].marginal_rate_of_left_over,
      marginal_rate_of_lost_sales: list_product_kyp[i].marginal_rate_of_lost_sales,
      marginal_rate_of_return: list_product_kyp[i].marginal_rate_of_return,

      average_rate_of_return: list_product_kyp[i].average_rate_of_return,

      otb_sales_amount: list_product_kyp[i].otb_sales_amount,

      gp_variance: list_product_kyp[i].gp_variance,
    });
  }
  //console.log(defaultData);
  
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  //const [dataSource, setDataSource] = useState<OtbPlanType[]>([]);
  const [listOtbPlan, setListOtbPlan] = useState<OtbPlanType[]>([]);
  const [selectedRowsState, setSelectedRows] = useState<OtbPlanType[]>([]);

  const formRef = useRef<ProFormInstance<any>>();

  const columns: ProColumns<OtbPlanType>[] = [
    {
      title:  (<FormattedMessage id='pages.product_analysis.select.columns_title.asin'/>),
      key: 'asin',
      dataIndex: 'asin',
      readonly: true,
      width: '10%',
    },
    {
      title:  (<FormattedMessage id='pages.product_analysis.select.columns_title.title'/>),
      key: 'title',
      dataIndex: 'title',
      readonly: true,
      width: '35%',
    },
    {
      title:  (<FormattedMessage id='pages.product_analysis.select.columns_title.otb_sales'/>),
      key: 'otb_sales',
      dataIndex: 'otb_sales',
      width: '7%',
    },
    {
      title:  (<FormattedMessage id='pages.product_analysis.select.columns_title.haircut'/>),
      key: 'haircut',
      dataIndex: 'haircut',
      width: '7%',
    },

    {
      title:  (<FormattedMessage id='pages.product_analysis.select.columns_title.expected_sales'/>),
      key: 'expected_sales',
      dataIndex: 'expected_sales',
      readonly: true,
      width: '8%',
    },
    {
      title:  (<FormattedMessage id='pages.product_analysis.select.columns_title.expected_sales_ratio'/>),
      key: 'expected_sales_ratio',
      dataIndex: 'expected_sales_ratio',
      readonly: true,
      width: '9%',
    },

    {
      title:  (<FormattedMessage id='pages.product_analysis.select.columns_title.expected_gmv'/>),
      key: 'expected_gmv',
      dataIndex: 'expected_gmv',
      readonly: true,
      width: '5%',
    },
    {
      title: (<FormattedMessage id='pages.product_analysis.select.columns_title.expected_gp'/>),
      key: 'expected_gp',
      dataIndex: 'expected_gp',
      readonly: true,
      width: '5%',
    },
    {
      title: (<FormattedMessage id='pages.product_analysis.select.columns_title.profit_margin'/>),
      key: 'profit_margin',
      dataIndex: 'profit_margin',
      readonly: true,
      width: '5%',
    },

    {
      title: (<FormattedMessage id='pages.product_analysis.select.columns_title.marginal_rate_of_return'/>),
      key: 'marginal_rate_of_return',
      dataIndex: 'marginal_rate_of_return',
      readonly: true,
      width: '5%',
    },
    {
      title: (<FormattedMessage id='pages.product_analysis.select.columns_title.average_rate_of_return'/>),
      key: 'average_rate_of_return',
      dataIndex: 'average_rate_of_return',
      readonly: true,
      width: '5%',
    },

    {
      title: (<FormattedMessage id='pages.product_analysis.select.columns_title.option'/>),
      valueType: 'option',
      width: '10%',
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
            {<FormattedMessage id='pages.product_analysis.select.columns_title.option_edit'/>}
          </font>
        </a>,
/*
        <a
          key="delete"
          onClick={() => {
            setDataSource(dataSource.filter((item) => item.id !== record.id));
          }}
        >
          删除
        </a>,
*/
        <a
          href={"/product/product-analysis?product_id=" + record.asin}
        >
          <ProfileTwoTone />
          <font color="red">
            {/* 详情 */}
            {<FormattedMessage id='pages.product_analysis.select.columns_title.option_detail'/>}
          </font>
        </a>,
      ],
    },
  ];

  const [expected_total_GMV, set_expected_total_GMV] = useState(0);
  const [expected_total_GP, set_expected_total_GP] = useState(0);
  const [GP_GMV, set_GP_GMV] = useState(0);
  const [gmv_marginal_rate_of_return, set_gmv_marginal_rate_of_return] = useState(0);
  const [ROA, set_ROA] = useState(0);

  return (
  <Card loading={loading} className={styles.offlineCard} bordered={false} style={{ marginTop: 0, marginBottom: 32 }} >    
        <div style={{ padding: '0 24px' }}>
          <div style={{margin: 'auto', width: 800}}>
            <Table 
            columns={[
              {
                title: (<FormattedMessage id='pages.product_analysis.select.table_title.GMV'/>),
                key: 'GMV',
                dataIndex: 'GMV',
              },
              {
                title: (<FormattedMessage id='pages.product_analysis.select.table_title.GP'/>),
                key: 'GP',
                dataIndex: 'GP',
              },
              {
                title: (<FormattedMessage id='pages.product_analysis.select.table_title.GP_GMV'/>),
                key: 'GP_GMV',
                dataIndex: 'GP_GMV',
              },
              {
                title: (<FormattedMessage id='pages.product_analysis.select.table_title.MRR'/>),
                key: 'MRR',
                dataIndex: 'MRR',
              },
              {
                title: (<FormattedMessage id='pages.product_analysis.select.table_title.ROA'/>),
                key: 'ROA',
                dataIndex: 'ROA',
              },
            ]} 
            dataSource={[
              {
                key: 1,
                GMV: expected_total_GMV.toFixed(2).toString(),
                GP: expected_total_GP.toFixed(2).toString(),
                GP_GMV: GP_GMV.toFixed(2).toString(),
                MRR: gmv_marginal_rate_of_return.toFixed(2).toString(),
                ROA: ROA.toFixed(2).toString(),
              },
            ]} 
            size={"small"}
            pagination={false}
          />
        </div>

        <ProForm<{
          table: OtbPlanType[];
        }>
          formRef={formRef}
          initialValues={{
            table: listOtbPlan_default,
          }}
          layout="inline"
          onFinish={async (values) => {
            //console.log(selectedRowsState);
            request('/api/plan', {
              data: selectedRowsState,
              method: 'PUT',
            }).then(
              ()=>{
                message.success(<FormattedMessage id='pages.product_analysis.select.submit_success'/>);   //"提交成功!"
                waitTime(1000);
                //window.location.reload();   
                location.assign("/application/loan-application");
            });
          }}
          onReset={async (e) => {
            request('/api/kyp/get_kyp?cmd=clear').then(
              ()=>{
                  window.location.reload();
              });
          }}
        >

    <EditableProTable<OtbPlanType>
        rowKey="key"
        headerTitle=""
        controlled={true}
        columns={columns}
        request={async () => ({
          data: listOtbPlan_default,
          total: listOtbPlan_default?.length,
          success: true,
        })}
        value={listOtbPlan}
        onChange={setListOtbPlan}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (rowKey, newData, oldData) => {
            //console.log(rowKey, data, row);
            request('/api/kyp/get_kyp_single?product_id='+ newData.asin + '&otb_sales=' + newData.otb_sales + '&haircut=' + newData.haircut).then(
              ({data, error, loading}) => {
                let dataIndex: number = -1;
                for (let idx: number = 0; idx < listOtbPlan?.length; idx++) {
                  if (listOtbPlan[idx].key == rowKey) {
                    dataIndex = idx;
                    break;
                  }
                }

                if (dataIndex != -1) {
                  listOtbPlan[dataIndex].otb_sales = data.otb_sales; 
                  listOtbPlan[dataIndex].haircut = data.haircut; 

                  listOtbPlan[dataIndex].expected_sales = data.expected_sales; 
                  listOtbPlan[dataIndex].expected_sales_ratio = data.expected_sales_ratio; 

                  listOtbPlan[dataIndex].expected_gmv = data.expected_gmv; 
                  listOtbPlan[dataIndex].expected_gp = data.expected_gp;
                  listOtbPlan[dataIndex].profit_margin = data.profit_margin;

                  listOtbPlan[dataIndex].marginal_rate_of_left_over = data.marginal_rate_of_left_over; 
                  listOtbPlan[dataIndex].marginal_rate_of_lost_sales = data.marginal_rate_of_lost_sales; 
                  listOtbPlan[dataIndex].marginal_rate_of_return = data.marginal_rate_of_return; 
                  
                  listOtbPlan[dataIndex].average_rate_of_return = data.average_rate_of_return; 
                  
                  listOtbPlan[dataIndex].otb_sales_amount = data.otb_sales_amount; 

                  listOtbPlan[dataIndex].gp_variance = data.gp_variance; 

                  setListOtbPlan(listOtbPlan);
                }

              }
            )            
            //await waitTime(100);
          },
          onChange: setEditableRowKeys,
          deleteText: " ",
        }}
        recordCreatorProps={false}
        scroll={{y: 500}}
        //style={{height: 600}}  //wjx 加了这个提交按钮会在选择后被隐藏
        rowSelection={{
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);

            let total_GMV: number = 0;
            let total_GP: number = 0;
            let total_purchasing_cost: number = 0;
            for (let row of selectedRows){
              total_GMV = total_GMV + row.expected_gmv;
              total_GP = total_GP + row.expected_gp;
              total_purchasing_cost = total_purchasing_cost + row.otb_sales_amount;
            }

            set_expected_total_GMV(total_GMV);
            set_expected_total_GP(total_GP);
            if (total_GMV > 0) {
              set_GP_GMV(total_GP / total_GMV);            
            } else {
              set_GP_GMV(0);
            }

            let gmv_mrr: number = 0;
            if (total_GMV > 0) {
              for (let row of selectedRows){
                gmv_mrr = gmv_mrr + (row.expected_gmv / total_GMV) * row.marginal_rate_of_return
              }
            }
            set_gmv_marginal_rate_of_return(gmv_mrr);

            if (total_purchasing_cost > 0) {
              set_ROA(total_GP / total_purchasing_cost);
            } else {
              set_ROA(0);
            }

          },          
        }}
        pagination={{
          pageSize: 10,
        }}        
      />
      
      </ProForm>

    </div>
  </Card>
);}

export default SelectProduct;

{/*          
          <ProFormDependency name={['table']}>
            {({ table }) => {
              const info = (table as OtbPlanType[]).reduce(
                (pre, item) => {
                  return {
                    expected_total_GMV: pre.expected_total_GMV + item?.expected_gmv,
                    expected_total_GP: pre.expected_total_GP + item?.expected_gp,                    
                    total_purchasing_cost: pre.total_purchasing_cost + item?.otb_sales_amount,
                  };
                },
                { expected_total_GMV: 0, expected_total_GP: 0, total_purchasing_cost:0},
              );

              const info_detail = (table as OtbPlanType[]).reduce(
                (pre, item) => {
                  return {
                    gmv_marginal_rate_of_left_over: pre.gmv_marginal_rate_of_left_over 
                      + (item.expected_gmv / info.expected_total_GMV) * item.marginal_rate_of_left_over,
                    gmv_marginal_rate_of_lost_sales: pre.gmv_marginal_rate_of_lost_sales                    
                      + (item.expected_gmv / info.expected_total_GMV) * item.marginal_rate_of_lost_sales,
                    gmv_marginal_rate_of_return: pre.gmv_marginal_rate_of_return
                      + (item.expected_gmv / info.expected_total_GMV) * item.marginal_rate_of_return,

                    cost_marginal_rate_of_left_over: pre.cost_marginal_rate_of_left_over 
                      + (item.otb_sales_amount / info.total_purchasing_cost) * item.marginal_rate_of_left_over,
                    cost_marginal_rate_of_lost_sales: pre.cost_marginal_rate_of_lost_sales 
                    + (item.otb_sales_amount / info.total_purchasing_cost) * item.marginal_rate_of_lost_sales,
                    cost_marginal_rate_of_return: pre.cost_marginal_rate_of_return 
                    + (item.otb_sales_amount / info.total_purchasing_cost) * item.marginal_rate_of_return,                    
                  };
                },
                { gmv_marginal_rate_of_left_over: 0, gmv_marginal_rate_of_lost_sales: 0, gmv_marginal_rate_of_return: 0,
                  cost_marginal_rate_of_left_over: 0, cost_marginal_rate_of_lost_sales: 0, cost_marginal_rate_of_return: 0},
              );

              return (
                <div style={{margin: 'auto'}}>
                  <Table 
                  columns={[
                    {
                      title: '预期总销售价值 (GMV)',
                      key: 'GMV',
                      dataIndex: 'GMV',
                    },
                    {
                      title: '预期总毛利 (GP)',
                      key: 'GP',
                      dataIndex: 'GP',
                    },
                    {
                      title: '毛利率 (GP/GMV)',
                      key: 'GP_GMV',
                      dataIndex: 'GP_GMV',
                    },
                    {
                      title: '边际总收益率 (MRR)',
                      key: 'MRR',
                      dataIndex: 'MRR',
                    },
                    {
                      title: '资产收益率 (ROA)',
                      key: 'ROA',
                      dataIndex: 'ROA',
                    },
                  ]} 
                  dataSource={[
                    {
                      'GMV': info.expected_total_GMV.toFixed(2).toString(),
                      'GP': info.expected_total_GP.toFixed(2).toString(),
                      'GP_GMV': (info.expected_total_GP / info.expected_total_GMV).toFixed(2).toString(),
                      'MRR': info_detail.gmv_marginal_rate_of_return.toFixed(2).toString(),
                      'ROA': (info.expected_total_GP / info.total_purchasing_cost).toFixed(2).toString(),
                    },
                  ]} 
                  size={"small"}
                  pagination={false}
                />
              </div>
              );
            }}
          </ProFormDependency>
*/}
     
{/*                
                <div style={{margin: 'auto'}}>
                  <table>
                    <tr>
                      <th style={{border: "1px solid black"}}>预期总销售价值 (GMV)</th>
                      <th style={{border: "1px solid black"}}>预期总毛利 (GP)</th>
                      <th style={{border: "1px solid black"}}>利润率 (GP/GMV)</th>
                      <th style={{border: "1px solid black"}}>边际总收益率 (MRR)</th>
                      <th style={{border: "1px solid black"}}>资产收益率 (ROA)</th>
                    </tr>
                    <tr>
                      <td style={{border: "1px dotted black"}}><font color="red"> {info.expected_total_GMV.toFixed(2)} </font></td>
                      <td style={{border: "1px dotted black"}}><font color="red"> {info.expected_total_GP.toFixed(2)} </font></td>
                      <td style={{border: "1px dotted black"}}><font color="red"> {(info.expected_total_GP / info.expected_total_GMV).toFixed(2)} </font></td>
                      <td style={{border: "1px dotted black"}}><font color="red"> {info_detail.gmv_marginal_rate_of_return.toFixed(2)} </font></td>
                      <td style={{border: "1px dotted black"}}><font color="red"> {(info.expected_total_GP / info.total_purchasing_cost).toFixed(2)} </font></td>
                    </tr>
                  </table>                  
                  
                <h3>预期总销售价值 (GMV): <font color="red"> {info.expected_total_GMV.toFixed(2)} </font> 
                    &nbsp; &nbsp; 预期总毛利 (GP): <font color="red"> {info.expected_total_GP.toFixed(2)} </font>
                    &nbsp; &nbsp; 边际总收益率 (MRR): <font color="red"> {info_detail.gmv_marginal_rate_of_return.toFixed(2)} </font>
                    &nbsp; &nbsp; 资产收益率 (ROA): <font color="red"> {(info.expected_total_GP / info.total_purchasing_cost).toFixed(2)} </font></h3>

                <p>边际总剩余率 (总销售): {info_detail.gmv_marginal_rate_of_left_over.toFixed(2)} 
                    &nbsp; &nbsp; 边际总损失率 (总销售): {info_detail.gmv_marginal_rate_of_lost_sales.toFixed(2)}  
                    &nbsp; &nbsp; 边际总收益率 (总销售): {info_detail.gmv_marginal_rate_of_return.toFixed(2)}</p>
                <p>边际总剩余率 (成本)): {info_detail.gmv_marginal_rate_of_left_over.toFixed(2)} 
                    &nbsp; &nbsp; 边际总损失率 (成本): {info_detail.gmv_marginal_rate_of_lost_sales.toFixed(2)}  
                    &nbsp; &nbsp; 边际总收益率 (成本): {info_detail.gmv_marginal_rate_of_return.toFixed(2)}</p>
                  
                </div>
*/}                
