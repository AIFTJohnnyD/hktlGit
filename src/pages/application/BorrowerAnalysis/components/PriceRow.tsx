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

const PriceRow = ({ loading, price = [], revenue = [], sales = [], rank = [], statistic }: 
  { loading: boolean; price: DataItem[]; revenue: DataItem[]; sales: DataItem[]; rank: DataItem[]; statistic: Statistic }) => (
  <Row gutter={24}>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="价格"
        action={
          <Tooltip title="每月的价格">
            <InfoCircleOutlined />
          </Tooltip>
        }
        total={() => "$ " + numeral(statistic.avg_price).format('0,0.00')}
        footer={<Field label="最后一个月价格" value={"$ " + numeral(statistic?.last_price).format('0,0.00')} />}
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
          data={price.map((item) => item.y)}
        />
      </ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="年销售额"
        action={
          <Tooltip title="每月的销售额">
            <InfoCircleOutlined />
          </Tooltip>
        }
        total={() => "$ " + numeral(statistic?.sum_revenue).format('0,0')}
        footer={<Field label="最后一个月销售额" value={"$ " + numeral(statistic?.last_revenue).format('0,0')} />}
        contentHeight={46}
      >
        <TinyColumn height={46} autoFit data={revenue.map((item) => item.y)} />
      </ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="年销售数量"
        action={
          <Tooltip title="每月的销售数量">
            <InfoCircleOutlined />
          </Tooltip>
        }
        total={numeral(statistic?.sum_sales).format('0,0')}
        footer={<Field label="最后一个月销售数量" value={numeral(statistic?.last_sales).format('0,0')} />}
        contentHeight={46}
      >
        <TinyColumn height={46} autoFit data={sales.map((item) => item.y)} />
      </ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="排名"
        action={
          <Tooltip title="每月的排名">
            <InfoCircleOutlined />
          </Tooltip>
        }
        total={numeral(statistic?.avg_rank).format('0,0')}
        footer={<Field label="最后一个月排名" value={numeral(statistic?.last_rank).format('0,0')} />}
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
          data={rank.map((item) => item.y)}
        />
      </ChartCard>
    </Col>
  </Row>
);

export default PriceRow;
