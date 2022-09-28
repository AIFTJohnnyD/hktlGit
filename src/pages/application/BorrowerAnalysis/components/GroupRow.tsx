import { InfoCircleOutlined } from '@ant-design/icons';
import { TinyArea, TinyColumn, Progress } from '@ant-design/charts';
import { Col, Row, Tooltip, Image } from 'antd';
import numeral from 'numeral';
import { ChartCard, Field } from './Charts';
import type { DataItem, Product, Statistic } from '../data';
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

const GroupRow = ({ loading, hist_price = [], hist_revenue = [], hist_sales = [], hist_rank = [], 
                    listName = [], group }: 
  { loading: boolean; hist_price: DataItem[]; hist_revenue: DataItem[]; hist_sales: DataItem[]; hist_rank: DataItem[]; 
    listName: DataItem[]; group: any }) => (
  <Row gutter={24}>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title={listName[0]}
        action={
          <Tooltip title="">
            <Field label="波动率" value={numeral(group?.price.coefficient_of_variation).format('0,0.00')} />
          </Tooltip>
        }
        total={() => "平均: " + "$" + numeral(group?.price.mean).format('0,0.00')}
        footer={<Field label="偏度 / 峰度: " value={numeral(group?.price.skewness).format('0,0.00') + " / " + numeral(group?.price.kurtosis).format('0,0.00')} />}
        contentHeight={46}
      >
        <TinyColumn height={46} autoFit data={hist_price.map((item) => item.y)} />
      </ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title={listName[1]}
        action={
          <Tooltip title="">
            <Field label="波动率" value={numeral(group?.revenue.coefficient_of_variation).format('0,0.00')} />
          </Tooltip>
        }
        total={() => "平均: " + "$" + numeral(group?.revenue.mean).format('0,0.00')}
        footer={<Field label="偏度 / 峰度: " value={numeral(group?.revenue.skewness).format('0,0.00') + " / " + numeral(group?.revenue.kurtosis).format('0,0.00')} />}
        contentHeight={46}
      >
        <TinyColumn height={46} autoFit data={hist_revenue.map((item) => item.y)} />
      </ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title={listName[2]}
        action={
          <Tooltip title="">
            <Field label="波动率" value={numeral(group?.sales.coefficient_of_variation).format('0,0.00')} />
          </Tooltip>
        }
        total={() => "平均: " + numeral(group?.sales.mean).format('0,0.00')}
        footer={<Field label="偏度 / 峰度: " value={numeral(group?.sales.skewness).format('0,0.00') + " / " + numeral(group?.sales.kurtosis).format('0,0.00')} />}
        contentHeight={46}
      >
        <TinyColumn height={46} autoFit data={hist_sales.map((item) => item.y)} />
      </ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title={listName[3]}
        action={
          <Tooltip title="">
            <Field label="波动率" value={numeral(group?.rank.coefficient_of_variation).format('0,0.00')} />
          </Tooltip>
        }
        total={() => "平均: " + numeral(group?.rank.mean).format('0,0')}
        footer={<Field label="偏度 / 峰度: " value={numeral(group?.rank.skewness).format('0,0.00') + " / " + numeral(group?.rank.kurtosis).format('0,0.00')} />}
        contentHeight={46}
      >
        <TinyColumn height={46} autoFit data={hist_rank.map((item) => item.y)} />
      </ChartCard>
    </Col>
  </Row>
);

export default GroupRow;
