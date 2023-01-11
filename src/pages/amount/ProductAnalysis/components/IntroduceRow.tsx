import { InfoCircleOutlined } from '@ant-design/icons';
import { TinyArea, TinyColumn, Progress } from '@ant-design/charts';
import { Col, Row, Tooltip, Image, Descriptions } from 'antd';
import numeral from 'numeral';
import { ChartCard, Field } from './Charts';
import type { DataItem, Product, Statistic } from '../data.d';
import Trend from './Trend';
import Yuan from '../utils/Yuan';
import styles from '../style.less';
import { FormattedMessage } from 'umi';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

const IntroduceRow = ({ loading, product, statistic }: 
  { loading: boolean; product:Product; statistic: Statistic }) => (
  <Row gutter={24}>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title={<FormattedMessage id='pages.product_analysis.introduce.name'/>}
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
        title={<FormattedMessage id='pages.product_analysis.introduce.type'/>}
        loading={loading}
        //total={() => "ASIN: " + productData?.platform_id}
        contentHeight={120}
      >
        <Field label={<FormattedMessage id='pages.product_analysis.introduce.type0'/>} value = {product?.categories[0]} />
        <Field label={<FormattedMessage id='pages.product_analysis.introduce.type1'/>} value = {product?.categories[1]} />
        <Field label={<FormattedMessage id='pages.product_analysis.introduce.type2'/>} value = {product?.categories[2]} />
        <Field label={<FormattedMessage id='pages.product_analysis.introduce.type3'/>} value = {product?.categories[3]} />
        <Field label={<FormattedMessage id='pages.product_analysis.introduce.type4'/>} value = {product?.categories[4]} />
      </ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title={<FormattedMessage id='pages.product_analysis.introduce.describe'/>}
        loading={loading}
        contentHeight={120}
      >
        <p>{product?.description}</p>
      </ChartCard>
    </Col>


    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title= {<FormattedMessage id='pages.product_analysis.introduce.pic'/>}
        loading={loading}
        contentHeight={120}
      >
        <Image height={90} src={product?.img} />
      </ChartCard>
    </Col>
    
  </Row>
);

export default IntroduceRow;
