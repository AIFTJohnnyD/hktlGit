import type { FC } from 'react';
import { useRequest } from 'umi';
import { Suspense, useState } from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import { Col, Descriptions, Dropdown, Menu, Row, Card } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import type { RadioChangeEvent } from 'antd/es/radio';
import type { RangePickerProps } from 'antd/es/date-picker/generatePicker';
import type moment from 'moment';

import OpenToBuyBank from './components/OpenToBuyBank';
import OpenToBuyRow from './components/OpenToBuyRow';
import IntroduceRow from './components/IntroduceRow';

import PriceRow from './components/PriceRow';
import ReviewRow from './components/ReviewRow';
import RevenueRatioRow from './components/RevenueRatioRow';
import SalesCard from './components/SalesCard';
//import CategoryPercentile from './components/CategoryPercentile'
import FinancialRatio from './components/FinancialRatio'

import GroupRow from './components/GroupRow';
import GroupRow_CV_Slope from './components/GroupRow_cv_slope';
import GroupSalesCard from './components/GroupSalesCard';

import TopSearch from './components/TopSearch';
import ProportionReview from './components/ProportionReview';
import SalesChartData from './components/SalesChartData';
import PD_LGD_Data from './components/PD_LGD_Data';

import { fakeChartData } from './service';
import PageLoading from './components/PageLoading';
import type { TimeType } from './components/SalesCard';
import { getTimeDistance } from './utils/utils';
import type { AnalysisData } from './data.d';
import styles from './style.less';

import {parse} from 'querystring'
import { request } from 'umi';

import { FormattedMessage } from 'umi';

type ProductAnalysisProps = {
  productAnalysis: AnalysisData;
  loading: boolean;
};

const ProductAnalysis: FC<ProductAnalysisProps> = () => {
  //khwu
  //http://localhost:8000/company/company-analysis?seller_id=A1057FBD44ECMO
  //const { loading, data } = useRequest(fakeChartData);
  let urlParams = parse(window.location.href.split('?')[1])
  const borrower_key = urlParams.borrower_key;
  //console.log(company_id);
  const { data, error, loading } = useRequest(() => {
    return request('/api/kyc/get_kyc?borrower_key='+ borrower_key);
  });
  //console.log(data);
  if (data?.message == "Error") {
    return (
      <GridContent>
        <Card 
          title={<FormattedMessage id='pages.borrower_analysis.no_information_title'/>}
          loading={loading}
        >
          <FormattedMessage id='pages.borrower_analysis.no_information_description'/>
        </Card>
      </GridContent>
    );
  } else {
    let company_name:string = data?.seller.company_name_chinese;
    if (company_name == null || company_name == ""){
      company_name = data?.seller.company_name;
    }

    return (
      <GridContent>
        <>      
          <Suspense fallback={<PageLoading />}>
            <Descriptions title={company_name} />
          </Suspense>

          {data?.list_otb_plan.length > 0 && <div>
            <div className={styles.divline}></div>

            <Suspense fallback={null}>
              <OpenToBuyBank
                loading={loading}
                otb_plan_bank={data?.otb_plan_bank}
              />
            </Suspense>                

            <Suspense fallback={<PageLoading />}>
              <FinancialRatio loading={loading} 
                    financial_ratio={data?.financial_ratio}/>
            </Suspense>
            
            <Suspense fallback={null}>
              <OpenToBuyRow
                loading={loading}
                list_otb_plan={data?.list_otb_plan || []}
              />
            </Suspense>
          </div>}

  {/*
          <Suspense fallback={<PageLoading />}>
            <OpenToBuyRow loading={loading} 
                  product={data?.product} 
                  statistic={data?.statistic}
                  openToBuy={data?.open_to_buy} />
          </Suspense>  
  */}

          <Suspense fallback={<PageLoading />}>
            <Descriptions title={"商家信息"} />
          </Suspense>

          <Suspense fallback={<PageLoading />}>
            <IntroduceRow loading={loading} 
                  seller={data?.seller} 
                  statistic={data?.statistic}
                  seller_score={data?.seller_score} />
          </Suspense>

          <Suspense fallback={<PageLoading />}>
            <PriceRow loading={loading} 
                  price={data?.price || []} 
                  revenue={data?.revenue || []} 
                  sales={data?.sales || []} 
                  rank={data?.rank || []} 
                  statistic={data?.statistic} />
          </Suspense>

          <Suspense fallback={<PageLoading />}>
            <ReviewRow loading={loading} 
                  rating={data?.rating || []} 
                  review={data?.review || []} 
                  review_rate={data?.review_rate || []} 
                  visit={data?.visit || []} 
                  statistic={data?.statistic} />
          </Suspense>

          <Suspense fallback={<PageLoading />}>
            <RevenueRatioRow loading={loading} 
                  revenue_month_on_month={data?.revenue_month_on_month || []} 
                  revenue_product_on_group={data?.revenue_product_on_group || []} 
                  statistic={data?.statistic} />
          </Suspense>

          <Suspense fallback={null}>
            <PD_LGD_Data
              loading={loading}
              probability_of_default={data?.probability_of_default || []}
              loss_given_default={data?.loss_given_default || []}
              revenue_pd={data?.revenue_pd || []}
            />
          </Suspense>

          <Suspense fallback={null}>
            <SalesCard
              revenue={data?.revenue || []} 
              sales={data?.sales || []} 

              review={data?.review || []} 
              visit={data?.visit || []} 
              
              loading={loading}
            />
          </Suspense>

          <Row
            gutter={24}
            style={{
              marginTop: 24,
            }}
          >        
          </Row>
  {/*        
          <Suspense fallback={<PageLoading />}>
            <CategoryPercentile loading={loading} 
                  product_percentile={data?.product_percentile}/>
          </Suspense>
  */}
          <Suspense fallback={null}>
            <SalesChartData
              loading={loading}
              sales_detail={data?.sales_detail || []}
            />
          </Suspense>

          <Row
            gutter={24}
            style={{
              marginTop: 24,
            }}
          >        
          </Row>
{/*
          <Suspense fallback={<PageLoading />}>
            <Descriptions title={"类别: " + data?.group.name} />
          </Suspense>

          <Suspense fallback={<PageLoading />}>
            <GroupRow loading={loading} 
                  hist_price={data?.group.price.hist || []} 
                  hist_revenue={data?.group.revenue.hist || []} 
                  hist_sales={data?.group.sales.hist || []} 
                  hist_rank={data?.group.rank.hist || []} 
                  listName = {['价格', '销售额', '销售数量', '排名'] || []}
                  group={data?.group} />
          </Suspense>

          <Suspense fallback={<PageLoading />}>
            <GroupRow_CV_Slope loading={loading} 
                  hist_coefficient_of_variation={data?.group.coefficient_of_variation.hist || []} 
                  hist_slope={data?.group.slope.hist || []} 
                  listName = {['销售额波动率', '销售额增长率'] || []}
                  group={data?.group} />
          </Suspense>

          <Suspense fallback={null}>
            <GroupSalesCard
              price={data?.group.price.hist || []} 
              revenue={data?.group.revenue.hist || []} 
              sales={data?.group.sales.hist || []}
              rank={data?.group.rank.hist || []} 
              
              coefficient_of_variation={data?.group.coefficient_of_variation.hist || []} 
              slope={data?.group.slope.hist || []} 

              loading={loading}
            />
          </Suspense>
*/}
        </>
      </GridContent>
    );
  }
};

export default ProductAnalysis;
