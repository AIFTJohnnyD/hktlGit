import { Card, Col, DatePicker, Row, Tabs } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker/generatePicker';
import type moment from 'moment';
import { Column } from '@ant-design/charts';

import numeral from 'numeral';
import type { DataItem } from '../data.d';
import styles from '../style.less';

type RangePickerValue = RangePickerProps<moment.Moment>['value'];
export type TimeType = 'today' | 'week' | 'month' | 'year';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const GroupSalesCard = ({
  price,
  revenue,
  sales,
  rank,

  coefficient_of_variation,
  slope,

  loading,
}: {
  price: DataItem[];
  revenue: DataItem[];
  sales: DataItem[];
  rank: DataItem[];

  coefficient_of_variation: DataItem[];
  slope: DataItem[];

  loading: boolean;
}) => (
  <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }} title="亚马逊类别数据详情">
    <div className={styles.salesCard}>
      <Tabs
        size="large"
        tabBarStyle={{ marginBottom: 24 }}
      >
        <TabPane tab="价格" key="price">
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <div className={styles.salesBar}>
                <Column
                  height={300}
                  autoFit
                  data={price}
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
                      alias: '价格',
                    },
                  }}
                />
              </div>
            </Col>
        </TabPane>

        <TabPane tab="销售金额" key="revenue">
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <div className={styles.salesBar}>
                <Column
                  height={300}
                  autoFit
                  data={revenue}
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
                      alias: '销售金额',
                    },
                  }}
                />
              </div>
            </Col>
        </TabPane>

        <TabPane tab="销售数量" key="sales">
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <div className={styles.salesBar}>
                <Column
                  height={300}
                  autoFit
                  data={sales}
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
                      alias: '销售数量',
                    },
                  }}
                />
              </div>
            </Col>
        </TabPane>

        <TabPane tab="排名" key="rank">
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <div className={styles.salesBar}>
                <Column
                  height={300}
                  autoFit
                  data={rank}
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
                      alias: '排名',
                    },
                  }}
                />
              </div>
            </Col>
        </TabPane>

        <TabPane tab="销售额波动率" key="coefficient_of_variation">
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <div className={styles.salesBar}>
                <Column
                  height={300}
                  autoFit
                  data={coefficient_of_variation}
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
                      alias: '变异系数',
                    },
                  }}
                />
              </div>
            </Col>
        </TabPane>

        <TabPane tab="销售额增长率" key="slope">
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <div className={styles.salesBar}>
                <Column
                  height={300}
                  autoFit
                  data={slope}
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
                      alias: '斜率',
                    },
                  }}
                />
              </div>
            </Col>
        </TabPane>

      </Tabs>
    </div>
  </Card>
);

export default GroupSalesCard;
