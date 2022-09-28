import moment from 'moment';
import type { Request, Response } from 'express';
import type { AnalysisData, DataItem, Product, StatisticData } from './data.d';

//IntroduceRow
const product:Product = {
  id: "1",
  name: 'Machika Enameled Steel Skillet, Non Stick Paella Pan, Perfect for Camping and Outdoor Cooking, Rust Proof Coating 12 inch (30 cm)',
  description: 'Machika Enameled Steel Skillet, Non Stick Paella Pan, Perfect for Camping and Outdoor Cooking, Rust Proof Coating 12 inch (30 cm)',

  platform: "AMAZON_US",
  platform_id: 'B08BG3RXF6',
  url: 'https://www.amazon.com/Machika-Enameled-Steel-Paella-inch/dp/B08BG3RXF6',
  img: 'https://images-na.ssl-images-amazon.com/images/I/71EKwqeMZ1L.__AC_SY300_SX300_QL70_FMwebp_.jpg',

  categories: ['Home & Kitchen', 'Kitchen & Dining', 'Cookware',
  'Pots & Pans', 'Paella Pans', ''],   
}

const statisticData:StatisticData = {
  sum_revenue: 123456,
  last_revenue: 123,
  currency: "USD",
  
  //sales_amount_three_month_ratio: 0.12,
  //sales_amount_one_month_ratio: 0.11,

  total_visit_number: 1230,
  monthly_visit_number: 30,
  
  sum_sales: 123,

  //TopSearch
  sponsored_keyword_search_number: 20,
  sponsored_keyword_search_daily_ratio: -0.1,

  organic_keyword_search_number: 10,
  organic_keyword_search_daily_ratio: 0.2,
}

const visitDataMonthly: DataItem[] = [];
const beginDay = new Date().getTime();

const fakeVisitY = [70, 50, 40, 20, 40, 70, 50, 60, 50, 9, 6, 30, 10, 50, 30, 6, 5];
for (let i = 0; i < fakeVisitY.length; i += 1) {
  visitDataMonthly.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeVisitY[i],
  });
}

const salesVolumeDataMonthly: DataItem[] = [];
//const beginDay = new Date().getTime();

const fakeSalesVolumeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5];
for (let i = 0; i < fakeSalesVolumeY.length; i += 1) {
  salesVolumeDataMonthly.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeSalesVolumeY[i],
  });
}

//SalesCard
const salesData = [];
for (let i = 0; i < 12; i += 1) {
  salesData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200,
  });
}

const visitData = [];
for (let i = 0; i < 12; i += 1) {
  visitData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200,
  });
}

/*
const similarProductSalesData = [];
for (let i = 0; i < 7; i += 1) {
  similarProductSalesData.push({
    title: `第 ${i+1} 个相似商品`,
    total: 1000 + 100 * i,
  });
}

const similarProductVisitData = [];
for (let i = 0; i < 7; i += 1) {
  similarProductVisitData.push({
    title: `第 ${i+1} 个相似商品`,
    total: 2000 + 100 * i,
  });
}
*/
const similarProductSalesData = [];
similarProductSalesData.push({
  title: "Lodge Manufacturing Company carbon steel skillet, Black/Orange, 12-Inch",
  total: 1000,
});
similarProductSalesData.push({
  title: "Cuisinart 722-24 Chef's Classic Stainless 10-Inch Open Skillet",
  total: 900,
});
similarProductSalesData.push({
  title: "Cuisinart 722-20 Chef's Classic Stainless 8-Inch Open Skillet",
  total: 500,
});

const similarProductVisitData = [];
similarProductVisitData.push({
  title: "Lodge Manufacturing Company carbon steel skillet, Black/Orange, 12-Inch",
  total: 10000,
});
similarProductVisitData.push({
  title: "Cuisinart 722-24 Chef's Classic Stainless 10-Inch Open Skillet",
  total: 9000,
});
similarProductVisitData.push({
  title: "Cuisinart 722-20 Chef's Classic Stainless 8-Inch Open Skillet",
  total: 5000,
});


//TopSearch
const searchData = [];
searchData.push({
  index: 1,
  keyword: "Steel Skillet",
  count: Math.floor(Math.random() * 1000),
  range: Math.floor(Math.random() * 100),
  status: Math.floor((Math.random() * 10) % 2),
});
searchData.push({
  index: 2,
  keyword: "Open Skillet",
  count: Math.floor(Math.random() * 1000),
  range: Math.floor(Math.random() * 100),
  status: Math.floor((Math.random() * 10) % 2),
});
searchData.push({
  index: 3,
  keyword: "Machika Enameled",
  count: Math.floor(Math.random() * 1000),
  range: Math.floor(Math.random() * 100),
  status: Math.floor((Math.random() * 10) % 2),
});
searchData.push({
  index: 4,
  keyword: "Chef's Classic Stainless",
  count: Math.floor(Math.random() * 1000),
  range: Math.floor(Math.random() * 100),
  status: Math.floor((Math.random() * 10) % 2),
});
searchData.push({
  index: 5,
  keyword: "carbon steel skillet",
  count: Math.floor(Math.random() * 1000),
  range: Math.floor(Math.random() * 100),
  status: Math.floor((Math.random() * 10) % 2),
});

for (let i = 5; i < 50; i += 1) {
  searchData.push({
    index: i + 1,
    keyword: `搜索关键词-${i}`,
    count: Math.floor(Math.random() * 1000),
    range: Math.floor(Math.random() * 100),
    status: Math.floor((Math.random() * 10) % 2),
  });
}

const sponsorKeywordSearchData = [];
const fakeSponsorKeywordSearchDataY = [10, 20, 30, 80, 30, 70, 20];
for (let i = 0; i < fakeSponsorKeywordSearchDataY.length; i += 1) {
  sponsorKeywordSearchData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeSponsorKeywordSearchDataY[i],
  });
}

const organicKeywordSearchData = [];
const fakeOrganicKeywordSearchDataY = [1, 6, 4, 8, 3, 7, 2];
for (let i = 0; i < fakeOrganicKeywordSearchDataY.length; i += 1) {
  organicKeywordSearchData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeOrganicKeywordSearchDataY[i],
  });
}


const salesTypeData = [
  {
    x: '5星好评',
    y: 4544,
  },
  {
    x: '4星好评',
    y: 4544,
  },
  {
    x: '3星好评',
    y: 3321,
  },
  {
    x: '2星评价',
    y: 3113,
  },
  {
    x: '1星评价',
    y: 2341,
  },
];

const salesTypeDataOnline = [
  {
    x: '5星好评',
    y: 244,
  },
  {
    x: '4星好评',
    y: 321,
  },
  {
    x: '3星好评',
    y: 311,
  },
  {
    x: '2星评价',
    y: 41,
  },
  {
    x: '1星评价',
    y: 121,
  },
];

const salesTypeDataOffline = [
  {
    x: '5星好评',
    y: 99,
  },
  {
    x: '4星好评',
    y: 188,
  },
  {
    x: '3星好评',
    y: 344,
  },
  {
    x: '2星评价',
    y: 255,
  },
  {
    x: '1星评价',
    y: 65,
  },
];

const offlineData = [];
for (let i = 0; i < 10; i += 1) {
  offlineData.push({
    name: `${i + 1}月`,
    profit_rate: Math.ceil(Math.random() * 9) / 10,
  });
}
const offlineChartData = [];
for (let i = 0; i < 20; i += 1) {
  const date = moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD');

  let sales_value:number = Math.floor(Math.random() * 100) + 10;

  offlineChartData.push({
    date,
    type: '销售总额',
    value: sales_value,
  });
  offlineChartData.push({
    date,
    type: '成本',
    value: Math.round(sales_value / 3.0 * 100) / 100,
  });
  offlineChartData.push({
    date,
    type: '运费',
    value: Math.round(sales_value / 4.0 * 100) / 100,
  });
  offlineChartData.push({
    date,
    type: '利润',
    value: Math.round(sales_value * 5 / 12.0 * 100) / 100,
  });
}

const getFakeChartData: AnalysisData = {
  //IntroduceRow
  product,
  statisticData,

  visitDataMonthly,
  salesVolumeDataMonthly,

  //SalesCard  
  salesData,
  visitData,

  similarProductSalesData,
  similarProductVisitData,

  //TopSearch    
  searchData,

  sponsorKeywordSearchData,
  organicKeywordSearchData,

  //ProportionReview  
  salesTypeData,
  salesTypeDataOnline,
  salesTypeDataOffline,

  //SalesChartData 
  offlineChartData,
};

const fakeChartData = (_: Request, res: Response) => {
  return res.json({
    data: getFakeChartData,
  });
};

const get_kyp = (_: Request, res: Response) => {
  return res.json({
    data: getFakeChartData,
  });
};

export default {
  'GET  /api/fake_analysis_chart_data': fakeChartData,
};

