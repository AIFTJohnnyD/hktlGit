import type { FC } from 'react';
import { useRequest } from 'umi';
import { Suspense, useState } from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import { Col, Descriptions, Dropdown, Menu, Row, Card, Slider } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import type { RadioChangeEvent } from 'antd/es/radio';
import type { RangePickerProps } from 'antd/es/date-picker/generatePicker';
import type moment from 'moment';

import ProForm, {
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormMoney,
  ProFormDatePicker,
  ProFormDigit,
  ProFormSlider,
  ProFormInstance,
  ProFormDependency,
} from '@ant-design/pro-form';

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
import { fakeChartData } from './service';
import PageLoading from './components/PageLoading';
import type { TimeType } from './components/SalesCard';
import { getTimeDistance } from './utils/utils';
import type { AnalysisData } from './data.d';
import styles from './style.less';

import {parse} from 'querystring'
import { request, history } from 'umi';

import { FormattedMessage } from 'umi';
import { ptBRIntl } from '@ant-design/pro-table';

type ProductAnalysisProps = {
  productAnalysis: AnalysisData;
  loading: boolean;
};

const ProductAnalysis: FC<ProductAnalysisProps> = () => {
  //khwu
  //http://localhost:8000/company/company-analysis?seller_id=A1057FBD44ECMO
  //const { loading, data } = useRequest(fakeChartData);
  let urlParams = parse(window.location.href.split('?')[1])
  console.log(urlParams)
  const borrower_id = urlParams.borrower_id;
  let history = 0;
  
  if('history' in urlParams)
    history = Number(urlParams.history);

  console.log(borrower_id, history);
  let { data, error, loading } = useRequest(() => {
    //return request('/api/kyc/get_kyc?borrower_id='+ borrower_id);
    return request('/api/kyc/get_kyc?borrower_id='+ borrower_id+'&history='+ history);
  });

  // const SlideronChange = (newValue: number) => {
  //   data = useRequest(() => {
  //       return request('/api/kyc/get_kyc?borrower_id='+ borrower_id+'&history='+ newValue);
  //   });
  //   console.log(newValue);
  //   console.log(data);
  // };

  const onSliderChange = async (values: Record<string, any>) => {
    window.open("/application/loan-application-list-borrower", "_self");
    //history.push('/application/loan-application-list-borrower');
  };

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
        <div>      
          <Suspense fallback={<PageLoading />}>
            <Descriptions title={company_name} />
          </Suspense>
          <div className={styles.divline}></div>
          <p></p>

          <div style={{width:"1200px",height:"100px",margin:'20px'}}> 
          <h3>请选择月份</h3>
          <Slider
            min = {0}
            max = {12}
            defaultValue = {12 - history}
            onChange={async(newValue: number) => {
              const months = 12 - newValue
              window.open('/application/borrower-analysis?borrower_id='+ borrower_id+'&history='+ months, "_self");
              // let newdata = request('/api/kyc/get_kyc?borrower_id='+ borrower_id);
              // console.log(newdata);
              // console.log(newValue);
              // data.otb_plan_bank.profit_margin = newValue/12;
              // console.log(data.otb_plan_bank.profit_margin);
            }}
            marks={{
              0: 'Aug.2021',
              1: 'Sep.2021',
              2: 'Oct.2021',
              3: 'Nov.2021',
              4: 'Dec.2021',
              5: 'Jan.2022',
              6: 'Fub.2022',
              7: 'Mar.2022',
              8: 'Arp.2022',
              9: 'May.2022',
              10: 'Jun.2022',
              11: 'Jul.2022',
              12: 'Aug.2022',
            }}
          />
          </div>
       
          <p></p>
          <Suspense fallback={<PageLoading />}>
            <Descriptions title={"KYC"} />
          </Suspense>
          
          {data?.list_otb_plan.length > 0 && <div>       
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

        </div>
      </GridContent>
    );
  }
};

export default ProductAnalysis;
