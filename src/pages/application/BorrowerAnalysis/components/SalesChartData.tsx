import { Card, Col, Row, Tabs } from 'antd';
import { RingProgress, Line } from '@ant-design/charts';
import type { OfflineDataType, DataItem } from '../data';
import NumberInfo from './NumberInfo';
import styles from '../style.less';

const SalesChartData = ({
  loading,
  sales_detail,
}: {
  loading: boolean;
  sales_detail: DataItem[];
}) => {
  //console.log(sales_detail);
  
  return(
  <Card loading={loading} className={styles.offlineCard} bordered={false} style={{ marginTop: 32 }}>
    <div style={{ padding: '0 24px' }}>
      <Line
        autoFit
        height={400}
        data={sales_detail}
        xField="date"
        yField="value"
        seriesField="type"
        slider={{
          start: 0,
          end: 1,
        }}
        interactions={[
          {
            type: 'slider',
            cfg: {},
          },
        ]}
        legend={{
          position: 'top',
        }}
      />
    </div>
  </Card>
)};

export default SalesChartData;
