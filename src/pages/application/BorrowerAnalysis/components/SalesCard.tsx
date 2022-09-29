import { Card, Col, DatePicker, Row, Tabs } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker/generatePicker';
import type moment from 'moment';
import { Column } from '@ant-design/charts';
import { DualAxes } from '@ant-design/plots';
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
}) => {

  var total = 0;
  var i = 0
  var mval = [];
  var m3val = [];
  var m12Val;
  var max = 0;
  
  console.log(revenue);

  for(var a in revenue) { 
    total = total + revenue[a]['y'];
    mval[i] = revenue[a]['y'];
    if(max < mval[i]) max = mval[i];
    i= i+1;
  }  
  for(i=0; i<12; i++){
    if(i == 0)  m3val[i] = mval[i];
    else if(i == 1)  m3val[i] = (mval[0]+mval[1])/2;
    else m3val[i] = (mval[i-2] + mval[i-1] + mval[i])/3;
  }
  m12Val = total / 12;
  max = max * 1.05;

  i = 0;
  var revenue1 = [];
  for(var a in revenue) {  
    var circle = {x:'', my:0, type:''};
    circle.x = revenue[a]['x'];
    circle.my = m3val[i];
    circle.type = "3月平均";
    revenue1.push(circle);
    i = i+1;
  }

  for(var a in revenue) {  
    var circle = {x:'', my:0, type:''};
    circle.x = revenue[a]['x'];
    circle.my = m12Val;
    circle.type = "年平均";
    revenue1.push(circle);
  }

  //console.log(revenue1);

  return(
  <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
    <div className={styles.salesCard}>
      <Tabs
        size="large"
        tabBarStyle={{ marginBottom: 24 }}
      >
        <TabPane tab="销售金额" key="revenue">
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <div className={styles.salesBar}>
                <DualAxes
                  height={300}
                  autoFit
                  data={[revenue, revenue1]}
                  xField = "x"
                  yField = {['y', 'my']}
                  geometryOptions = {[
                    {
                      geometry: 'column',
                      columnWidthRatio: 0.4,
                    },
                    {
                      geometry: 'line',
                      seriesField: 'type',
                      lineStyle: {
                        lineWidth: 2,
                      },
                    },
                  ]}
                  xAxis={{
                    title: null,
                  }}
                  yAxis = {{
                    y: {
                      title: null,
                      min: 0,
                      max: max
                    },
                    //配合148行的meta实现隐藏右边轴
                    my: false
                  }}
                  //修改图例的名字
                  legend={{
                    itemValue: {
                      formatter: (text, item) => {
                        console.log(item);
                        if(item.value == "y"){
                          item.name = "销售金额";
                        }
                        else if (item.value == "3月平均"){
                          item.name = "3月平均";
                        }
                        else if (item.value == "年平均"){
                          item.name = "年平均";
                        }
                      }
                    }
                  }}
                  meta={{
                    // y: {
                    //   alias: '销售金额',
                    // },
                    y: {alias: '销售金额', 
                        sync: 'my' },
                    my: { sync: true },
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

        <TabPane tab="评论" key="review">
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

        <TabPane tab="访问" key="visit">
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
};


export default SalesCard;
