import { Card, Col, Row, Tabs } from 'antd';
import { RingProgress, DualAxes } from '@ant-design/charts';
import type { OfflineDataType, DataItem } from '../data';
import NumberInfo from './NumberInfo';
import styles from '../style.less';

const PD_LGD_Data = ({
  loading,
  probability_of_default, loss_given_default, revenue_pd
}: {
  loading: boolean;
  probability_of_default: DataItem[];
  loss_given_default: DataItem[];
  revenue_pd: DataItem[];
}) => {
  return (
    <>
  <Card loading={loading} className={styles.offlineCard} bordered={false} style={{ marginTop: 32 }} title="违约概率">
    <div style={{ padding: '0 24px' }}>
      <DualAxes
        autoFit
        height={400}
        data={[revenue_pd, probability_of_default]}
        xField={"date"}
        yField={["value", "probability"]}
        geometryOptions={[
          {
            geometry: 'line',
            seriesField: 'type',
            lineStyle: {
              lineWidth: 3,
              lineDash: [5, 5],
            },
            smooth: true,
          },
          {
            geometry: 'line',
            seriesField: 'p_type',
            //point: {},
            smooth: true,
          },          
        ]}
        animation={{
          appear:{
            duration:10000,
          }
        }}
      />
  </div>
  </Card>

  <Card loading={loading} className={styles.offlineCard} bordered={false} style={{ marginTop: 32 }} title="违约损失率">
  <div style={{ padding: '0 24px' }}>      
      <DualAxes
        autoFit
        height={400}
        data={[revenue_pd, loss_given_default]}
        xField={"date"}
        yField={["value", "probability"]}
        geometryOptions={[
          {
            geometry: 'line',
            seriesField: 'type',
            lineStyle: {
              lineWidth: 3,
              lineDash: [5, 5],
            },
            smooth: true,
          },
          {
            geometry: 'line',
            seriesField: 'p_type',
            //point: {},
            smooth: true,
          },          
        ]}
        animation={{
          appear:{
            duration:10000,
          }
        }}
      />
    </div>
  </Card>
  </>
)};

export default PD_LGD_Data;
