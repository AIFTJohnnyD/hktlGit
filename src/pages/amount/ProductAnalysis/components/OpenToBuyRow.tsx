import { InfoCircleOutlined } from '@ant-design/icons';
import { TinyArea, TinyColumn, Progress, Liquid } from '@ant-design/charts';
import { Col, Row, Tooltip, Image, Descriptions, Button, Table } from 'antd';
import numeral from 'numeral';
import { ChartCard, Field } from './Charts';
import type { DataItem, Product, Statistic, OpenToBuy } from '../data';
import Trend from './Trend';
import Yuan from '../utils/Yuan';
import styles from '../style.less';

import ProForm, {
  ProFormText,
  ProFormDigit,
  ProFormUploadButton
} from '@ant-design/pro-form';
import { FormattedMessage } from 'umi';

import { Column } from '@ant-design/plots';
import { Content } from 'antd/lib/layout/layout';

//import React, { useRef } from 'react';
//import type { ProFormInstance } from '@ant-design/pro-form';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

const OpenToBuyRow = ({ loading, product, statistic, openToBuy }: 
  { loading: boolean; product: Product; statistic: Statistic; openToBuy: OpenToBuy }) => (
  <Row gutter={24}>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title={<FormattedMessage id='pages.product_analysis.select.columns_title.title'/>}  //'商品名称'
        loading={loading}
        contentHeight={120}
      >
        <p>{product?.platform + ": " + product?.platform_id}</p>
        <p>{product?.name}</p>
      </ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title= {<FormattedMessage id='pages.product_analysis.open2buy.gmv_gp'/>}  //'预期总销售价值 (GMV) / 预期毛利 (GP)'
        action={
          <Tooltip title={"GMV: " + numeral(openToBuy?.expected_gmv).format('0,0.00') + " / " 
                        + "GP: " + numeral(openToBuy?.expected_gp).format('0,0.00')}>
            <InfoCircleOutlined />
          </Tooltip>
        }        
        loading={loading}
        contentHeight={120}
      >
        <Column
          height={120}
          autoFit
          data={[{x: 'GMV', y: openToBuy?.expected_gmv},
                  {x: 'GP', y: openToBuy?.expected_gp}]}
          xField="x"
          yField="y"
          xAxis={{
            title: null,
          }}
          yAxis={{
            title: null,
          }}
          meta={{
            y: {
              alias: '金额',
            },
          }}
        />            
      </ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title= {<FormattedMessage id='pages.product_analysis.open2buy.mrr_roa'/>}  //' 边际收益率 (MRR) / 资产收益率 (ROA)'
        action={
          <Tooltip title={"MRR: " + numeral(openToBuy?.marginal_rate_of_return * 100).format('0,0') + "% / " 
                        + "ROA: " + numeral(openToBuy?.average_rate_of_return * 100).format('0,0') + "%"}>
            <InfoCircleOutlined />
          </Tooltip>
        }        
        loading={loading}
        contentHeight={120}
      >
        <Row>
          <Col span={12}>
            <Liquid
              percent={openToBuy?.marginal_rate_of_return}
              height={120}
            />
          </Col>
          <Col span={12}>
            <Liquid
              percent={openToBuy?.average_rate_of_return}
              height={120}
            />
          </Col>
        </Row>        
      </ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title=''
        loading={loading}
        //total={() => "ASIN: " + productData?.platform_id}
        contentHeight={120}
      >
        <Table 
          columns={[
            {
              title: (<FormattedMessage id='pages.product_analysis.open2buy.name'/>),  //'名称',
              key: 'name',
              dataIndex: 'name',
            },
            {
              title: (<FormattedMessage id='pages.product_analysis.open2buy.num'/>), //'数量',
              key: 'num',
              dataIndex: 'num',
            },
            {
              title:  (<FormattedMessage id='pages.product_analysis.open2buy.ratio'/>), //'比率 (%)',
              key: 'ratio',
              dataIndex: 'ratio',
            },
          ]} 
          dataSource={[
            {
              key: '1',
              name:  (<FormattedMessage id='pages.product_analysis.open2buy.expected_sales'/>), //'预期销量',
              num: openToBuy?.expected_sales.toString(),
              ratio: Math.round(openToBuy?.expected_sales_ratio * 100).toString(),
            },
            {
              key: '2',
              name:  (<FormattedMessage id='pages.product_analysis.open2buy.expected_lost'/>), //'预期流失',
              num: openToBuy?.lost_sales.toString(),
              ratio: Math.round(openToBuy?.lost_sales_ratio * 100).toString(),
            },
            {
              key: '3',
              name:  (<FormattedMessage id='pages.product_analysis.open2buy.expected_remain'/>), //'预期剩余',
              num: openToBuy?.left_over.toString(),
              ratio: Math.round(openToBuy?.left_over_ratio * 100).toString(),
            },
          ]} 
          size={"small"}
          pagination={false}
        />
      </ChartCard>
    </Col>
  </Row>
);

export default OpenToBuyRow;
