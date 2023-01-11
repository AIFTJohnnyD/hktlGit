import { Card, Col, DatePicker, Row, Tabs } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker/generatePicker';
import type moment from 'moment';
import { Column } from '@ant-design/charts';
import { FormattedMessage } from 'umi';

import numeral from 'numeral';
import type { DataItem } from '../data.d';
import styles from '../style.less';

type RangePickerValue = RangePickerProps<moment.Moment>['value'];
export type TimeType = 'today' | 'week' | 'month' | 'year';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const SalesCard = ({
  //price,
  revenue,
  sales,
  //rank,

  //rating,
  review,
  //review_rate,
  visit,

  loading,
}: {
  //price: DataItem[];
  revenue: DataItem[];
  sales: DataItem[];
  //rank: DataItem[];

  //rating: DataItem[];
  review: DataItem[];
  //review_rate: DataItem[];
  visit: DataItem[];

  loading: boolean;
}) => (
  <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
    <div className={styles.salesCard}>
      <Tabs
        size="large"
        tabBarStyle={{ marginBottom: 24 }}
      >
        <TabPane tab={<FormattedMessage id='pages.product_analysis.group_sales_card.revenue'/>} key="revenue">
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

        <TabPane tab={<FormattedMessage id='pages.product_analysis.group_sales_card.sales'/>} key="sales">
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

        <TabPane tab={<FormattedMessage id='pages.product_analysis.review_row.commentary'/>} key="review">
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <div className={styles.salesBar}>
                <Column
                  height={300}
                  autoFit
                  data={review}
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
                      alias: '评论数量',
                    },
                  }}
                />
              </div>
            </Col>
        </TabPane>

        <TabPane tab={<FormattedMessage id='pages.product_analysis.sales_card.views'/>} key="visit">
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <div className={styles.salesBar}>
                <Column
                  height={300}
                  autoFit
                  data={visit}
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
                      alias: '访问数量',
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

export default SalesCard;
