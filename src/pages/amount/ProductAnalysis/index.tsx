import type { FC } from 'react';
import { FormattedMessage, useRequest } from 'umi';
import { Suspense } from 'react';
import { Descriptions, Row } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import { PageContainer } from '@ant-design/pro-layout';
import SelectProduct from './components/SelectProduct';
import OpenToBuyRow from './components/OpenToBuyRow';
import IntroduceRow from './components/IntroduceRow';

import PriceRow from './components/PriceRow';
import ReviewRow from './components/ReviewRow';
import RevenueRatioRow from './components/RevenueRatioRow';
import SalesCard from './components/SalesCard';
import CategoryPercentile from './components/CategoryPercentile'

import GroupRow from './components/GroupRow';
import GroupRow_CV_Slope from './components/GroupRow_cv_slope';
import GroupSalesCard from './components/GroupSalesCard';

import SalesChartData from './components/SalesChartData';
import PageLoading from './components/PageLoading';
import type { AnalysisData } from './data.d';
import styles from './style.less';

import {parse} from 'querystring'
import { request } from 'umi';

type ProductAnalysisProps = {
  productAnalysis: AnalysisData;
  loading: boolean;
};

const ProductAnalysis: FC<ProductAnalysisProps> = () => {
  //khwu
  //http://localhost:8000/approval/product-analysis?product_id=B08BG3RXF6
  //const { loading, data } = useRequest(fakeChartData);
  let urlParams = parse(window.location.href.split('?')[1])
  const product_id = urlParams.product_id;
  const plan_id = urlParams.plan_id;
  const { data, error, loading } = useRequest(() => {
    return request('/api/kyp/get_kyp?product_id='+ product_id + "&plan_id=" + plan_id);
  });
  //console.log(data);
  if (data != null && data?.is_new_product == false) {
  	return (
    // <GridContent>
    //   <>
    //     <Suspense fallback={<PageLoading />}>
    //       <Descriptions title={<FormattedMessage id='pages.product_analysis.product_analysis'/>} />
    //     </Suspense>
    <PageContainer content="">
        <div className={styles.divline}></div>

         <Suspense fallback={<PageLoading />}>
         <Descriptions title={"商品选择"} />
          <SelectProduct
            loading={loading}
            list_product_kyp={data?.list_product_kyp || []}
          />
        </Suspense>                

        <Suspense fallback={<PageLoading />}>
          <Descriptions title={"商品竞争力分析"} />
          <CategoryPercentile loading={loading} 
                product_percentile={data?.product_percentile}/>
        </Suspense>
        
        <Suspense fallback={<PageLoading />}>
          <Descriptions title={"销售预期"} />
          <OpenToBuyRow loading={loading} 
                product={data?.product} 
                statistic={data?.statistic}
                openToBuy={data?.open_to_buy} />
        </Suspense>  

        {/* <Suspense fallback={<PageLoading />}>
          <Descriptions title={"类别: " + data?.group.name} />
        </Suspense> */}

        <Suspense fallback={<PageLoading />}>
          <Descriptions title={"类别: " + data?.group.name} />
          <GroupRow loading={loading} 
                hist_price={data?.group.price.hist || []} 
                hist_revenue={data?.group.revenue.hist || []} 
                hist_sales={data?.group.sales.hist || []} 
                hist_rank={data?.group.rank.hist || []} 
                listName = {['价格', '销售额', '销售数量', '排名'] || []}
                group={data?.group} />
        {/* </Suspense>

        <Suspense fallback={<PageLoading />}> */}
          <GroupRow_CV_Slope loading={loading} 
                hist_coefficient_of_variation={data?.group.coefficient_of_variation.hist || []} 
                hist_slope={data?.group.slope.hist || []} 
                listName = {['销售额波动率', '销售额增长率'] || []}
                group={data?.group} />
        </Suspense>

        <Suspense fallback={<PageLoading />}>
          <Descriptions title={"商品销售指标分布"} />
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

        <Row
          gutter={24}
          style={{
            marginTop: 24,
          }}
        >        
        </Row>
        

        {/* <Suspense fallback={<PageLoading />}>
          <Descriptions title={<FormattedMessage id='pages.product_analysis.product_information'/>} />
        </Suspense> */}

        <Suspense fallback={<PageLoading />}>
          <Descriptions title={<FormattedMessage id='pages.product_analysis.product_information'/>} />
          <IntroduceRow loading={loading} 
                product={data?.product} 
                statistic={data?.statistic} />
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

        <Suspense fallback={<PageLoading />}>
          <Descriptions title={"环比分析"} />
          <SalesCard
            revenue={data?.revenue || []} 
            sales={data?.sales || []} 

            review={data?.review || []} 
            visit={data?.visit || []} 
            
            loading={loading}
          />
        </Suspense>

        <Suspense fallback={<PageLoading />}>
          <SalesChartData
            loading={loading}
            sales_detail={data?.sales_detail || []}
          />
        </Suspense>
    </PageContainer>
    // </GridContent>
  );
  } else {
    return (
      <GridContent>
        <>
        <Suspense fallback={<PageLoading />}>
              <Descriptions title={<FormattedMessage id='pages.product_analysis.product_analysis'/>} />
            </Suspense>

            <Suspense fallback={<PageLoading />}>
              <SelectProduct
                loading={loading}
                list_product_kyp={data?.list_product_kyp || []}
              />
            </Suspense>                
        </>
      </GridContent>
    );
  }
};

export default ProductAnalysis;
