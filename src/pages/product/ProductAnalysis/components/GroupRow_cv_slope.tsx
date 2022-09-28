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

const GroupRow_CV_Slope = ({ loading, hist_coefficient_of_variation = [], hist_slope = [], 
                    listName = [], group }: 
  { loading: boolean; hist_coefficient_of_variation: DataItem[]; hist_slope: DataItem[];  
    listName: DataItem[]; group: any }) => (
  <Row gutter={24}>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title={listName[0]}
        action={
          <Tooltip title="">
            <Field label="波动率" value={numeral(group?.coefficient_of_variation.coefficient_of_variation).format('0,0.00')} />
          </Tooltip>
        }
        total={() => "平均: " + numeral(group?.coefficient_of_variation.mean).format('0,0.00')}
        footer={<Field label="偏度 / 峰度: " value={numeral(group?.coefficient_of_variation.skewness).format('0,0.00') + " / " + numeral(group?.coefficient_of_variation.kurtosis).format('0,0.00')} />}
        contentHeight={46}
      >
        <TinyColumn height={46} autoFit data={hist_coefficient_of_variation.map((item) => item.y)} />
      </ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title={listName[1]}
        action={
          <Tooltip title="">
            <Field label="波动率" value={numeral(group?.slope.coefficient_of_variation).format('0,0.00')} />
          </Tooltip>
        }
        total={() => "平均: " + numeral(group?.slope.mean).format('0,0.00')}
        footer={<Field label="偏度 / 峰度: " value={numeral(group?.slope.skewness).format('0,0.00') + " / " + numeral(group?.slope.kurtosis).format('0,0.00')} />}
        contentHeight={46}
      >
        <TinyColumn height={46} autoFit data={hist_slope.map((item) => item.y)} />
      </ChartCard>
    </Col>

  </Row>
);

export default GroupRow_CV_Slope;
