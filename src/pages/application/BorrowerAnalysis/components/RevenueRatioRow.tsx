import { InfoCircleOutlined } from '@ant-design/icons';
import { TinyArea, TinyColumn, Progress } from '@ant-design/charts';
import { Col, Row, Tooltip, Image } from 'antd';
import numeral from 'numeral';
import { ChartCard, Field } from './Charts';
import type { DataItem, Product, Statistic } from '../data.d';
import Trend from './Trend';
import Yuan from '../utils/Yuan';
import styles from '../style.less';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

const RevenueRatioRow = ({ loading, revenue_month_on_month: rating = [], revenue_product_on_group: review_rate = [], statistic }: 
  { loading: boolean; revenue_month_on_month: DataItem[]; revenue_product_on_group: DataItem[]; statistic: Statistic }) => (
  <Row gutter={24}>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="销售总额同比"
        action={
          <Tooltip title="每月的销售总额同比 ((当前月 - 上个月) / 上个月)">
            <InfoCircleOutlined />
          </Tooltip>
        }
        total={numeral(statistic?.avg_revenue_month_on_month).format('0,0.0')}
        footer={<Field label="最后一个月同比" value={numeral(statistic?.last_revenue_month_on_month).format('0,0.0')} />}
        contentHeight={46}
      >
        <TinyArea
          height={46}
          autoFit
          smooth
          areaStyle={{
            fill: 'l(270) 0:rgb(151 95 228 / 10%) 0.5:rgb(151 95 228 / 60%) 1:rgb(151 95 228)',
          }}
          line={{
            color: '#975FE4',
          }}
          data={rating.map((item) => item.y)}
        />
      </ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="销售总额环比"
        action={
          <Tooltip title="每月的销售总额环比 (商品 / 类别)">
            <InfoCircleOutlined />
          </Tooltip>
        }
        total={() => numeral(statistic?.avg_revenue_product_on_group * 100).format('0,0.000') + "%"} 
        footer={<Field label="最后一个月环比" value={numeral(statistic?.last_revenue_product_on_group * 100).format('0,0.000') + "%"} />}
        contentHeight={46}
      >
        <TinyArea
          height={46}
          autoFit
          smooth
          areaStyle={{
            fill: 'l(270) 0:rgb(151 95 228 / 10%) 0.5:rgb(151 95 228 / 60%) 1:rgb(151 95 228)',
          }}
          line={{
            color: '#975FE4',
          }}
          data={review_rate.map((item) => item.y)}
        />
      </ChartCard>
    </Col>

  </Row>
);

export default RevenueRatioRow;
