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

const ReviewRow = ({ loading, rating = [], review = [], review_rate = [], visit = [], statistic }: 
  { loading: boolean; rating: DataItem[]; review: DataItem[]; review_rate: DataItem[]; visit: DataItem[]; statistic: Statistic }) => (
  <Row gutter={24}>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="评分"
        action={
          <Tooltip title="每月的评分">
            <InfoCircleOutlined />
          </Tooltip>
        }
        total={numeral(statistic?.avg_rating).format('0,0.0')}
        footer={<Field label="最后一个月评分" value={numeral(statistic?.last_rating).format('0,0.0')} />}
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
        title="评论"
        action={
          <Tooltip title="每月的评论">
            <InfoCircleOutlined />
          </Tooltip>
        }
        total={numeral(statistic?.sum_review).format('0,0')}
        footer={<Field label="最后一个月评论" value={numeral(statistic?.last_review).format('0,0')} />}
        contentHeight={46}
      >
        <TinyColumn height={46} autoFit data={review.map((item) => item.y)} />
      </ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="评论留存率"
        action={
          <Tooltip title="每月的评论留存率">
            <InfoCircleOutlined />
          </Tooltip>
        }
        total={() => numeral(statistic?.avg_review_rate).format('0,0') + "%"} 
        footer={<Field label="最后一个月评论留存率" value={numeral(statistic?.last_review_rate).format('0,0') + "%"} />}
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

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="年访问量"
        action={
          <Tooltip title="每月的访问量">
            <InfoCircleOutlined />
          </Tooltip>
        }
        total={numeral(statistic?.sum_visit).format('0,0')}
        footer={<Field label="最后一个月访问量" value={numeral(statistic?.last_visit).format('0,0')} />}
        contentHeight={46}
      >
        <TinyColumn height={46} autoFit data={visit.map((item) => item.y)} />
      </ChartCard>
    </Col>

  </Row>
);

export default ReviewRow;
