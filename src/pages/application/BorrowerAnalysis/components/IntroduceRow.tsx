import { InfoCircleOutlined } from '@ant-design/icons';
import { TinyArea, TinyColumn, Progress, Liquid } from '@ant-design/charts';
import { Col, Row, Tooltip, Image, Descriptions } from 'antd';
import numeral from 'numeral';
import { ChartCard, Field } from './Charts';
import type { DataItem, Seller, Statistic, SellerScore } from '../data.d';
import Trend from './Trend';
import Yuan from '../utils/Yuan';
import styles from '../style.less';

import { Column } from '@ant-design/plots';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

const IntroduceRow = ({ loading, seller, statistic, seller_score }: 
  { loading: boolean; seller:Seller; statistic: Statistic; seller_score: SellerScore }) => (
  <Row gutter={24}>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title='商家名称'
        loading={loading}
        contentHeight={120}
      >
        <Field label="亚马逊号码：" value = {seller?.id} />
        <Field label="英文简称：" value = {seller?.company_name_abbreviation} />
        <Field label="英文全称：" value = {seller?.company_name} />
        <Field label="中文全称：" value = {seller?.company_name_chinese} />
        <Field label="地址：" value = {seller?.address} />
      </ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title='商家描述'
        loading={loading}
        contentHeight={120}
      >
        <p>{seller?.description}</p>
      </ChartCard>
    </Col>
    
{/*
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title= '商品销量'
        loading={loading}
        contentHeight={120}
      >
        <Column
          height={120}
          autoFit
          data={[ {x: '低', y: seller_score?.low},
                  {x: '相对低', y: seller_score?.relative_low},
                  {x: '中', y: seller_score?.median},
                  {x: '相对高', y: seller_score?.relative_top},
                  {x: '高', y: seller_score?.top},
                ]}
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
              alias: '销量',
            },
          }}
        />            
      </ChartCard>
    </Col>
*/}

{/* ??????????????????
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title= '评分'
        loading={loading}
        contentHeight={120}
      >
        <Liquid
          percent={seller_score?.score}
          height={120}
        />
      </ChartCard>
    </Col>
*/}    
  </Row>
);

export default IntroduceRow;
