// eslint-disable-next-line import/no-extraneous-dependencies
import type { Request, Response } from 'express';
import { parse } from 'url';
import type { TableListItem, TableListParams } from './data.d';

// mock tableListDataSource
const genList = (current: number, pageSize: number) => {
  const tableListDataSource: TableListItem[] = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i;
    tableListDataSource.push({
      key: index,

      product_id: index,

      platform: 'Amazon US',
      product_id_in_platform: 'B00FLYWNYQ',
      
      url: 'https://www.amazon.com/Instant-Pot-Multi-Use-Programmable-Pressure/dp/B00FLYWNYQ',
    
      title: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker, Slow Cooker, Rice Cooker, Steamer, Sauté, Yogurt Maker, Warmer & Sterilizer, 6 Quart, Stainless Steel/Black',  
      description: '7-IN-1 FUNCTIONALITY: Pressure cook, slow cook, rice cooker, yogurt maker, steamer, sauté pan and food warmer. \
      QUICK ONE-TOUCH COOKING: 13 customizable Smart Programs for pressure cooking ribs, soups, beans, rice, poultry, yogurt, desserts and more. \
      COOK FAST OR SLOW: Pressure cook delicious one-pot meals up to 70% faster than traditional cooking methods or slow cook your favorite traditional recipes – just like grandma used to make. \
      QUICK AND EASY CLEAN UP: Finger-print resistant, stainless-steel sides and dishwasher-safe lid, inner pot, and accessories. \
      PROVEN SAFETY FEATURES: Includes over 10 safety features, plus overheat protection and safe-locking lid. \
      GREAT FOR GROWING FAMILIES: Cook for up to 6 people – perfect for growing families, or meal prepping and batch cooking for singles. \
      VERSATILE INNER COOKING POT: We use food-grade stainless-steel, a tri-ply bottom for more even cooking and perfect for sautéing. \
      DISCOVER AMAZING RECIPES: Download our free Instant Pot app (iOS and Android) so you can discover new favorites and prepare delicious meals.',
    
      category_0: 'Home & Kitchen',
      category_1: 'Kitchen & Dining',
      category_2: 'Small Appliances',
      category_3: 'Electric Pressure Cookers',
      category_4: ' ',
      category_5: ' ',
    
      list_price: 89.00,
      discount_price: 89.00,
      currency: 'USD',
    
      growth_percentage: 0.3,
      profit_margin: 0.5,
      product_life_cycle: 'GROWTH', //INTRODUCTION, GROWTH, MATURITY, AND DECLINE
    
      quantity_in_list_price: 100,
      quantity_in_discount_price: 0,
  
      status: 'ACTIVE',
      remark: '',     
    });
  }
  tableListDataSource.reverse();
  return tableListDataSource;
};

let tableListDataSource = genList(1, 100);

function getProduct(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  const params = parse(realUrl, true).query as unknown as TableListParams;

  let dataSource = [...tableListDataSource].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );
  if (params.sorter) {
    const sorter = JSON.parse(params.sorter as any);
    dataSource = dataSource.sort((prev, next) => {
      let sortNumber = 0;
      Object.keys(sorter).forEach((key) => {
        if (sorter[key] === 'descend') {
          if (prev[key] - next[key] > 0) {
            sortNumber += -1;
          } else {
            sortNumber += 1;
          }
          return;
        }
        if (prev[key] - next[key] > 0) {
          sortNumber += 1;
        } else {
          sortNumber += -1;
        }
      });
      return sortNumber;
    });
  }

  if (params.filter) {
    const filter = JSON.parse(params.filter as any) as Record<string, string[]>;
    if (Object.keys(filter).length > 0) {
      dataSource = dataSource.filter((item) => {
        return Object.keys(filter).some((key) => {
          if (!filter[key]) {
            return true;
          }
          if (filter[key].includes(`${item[key]}`)) {
            return true;
          }
          return false;
        });
      });
    }
  }

  if (params.product_id) {
    dataSource = dataSource.filter((data) => data.product_id == params.product_id );
  }

  if (params.platform) {
    dataSource = dataSource.filter((data) => data.platform.includes(params.platform || ''));
  }

  if (params.product_id_in_platform) {
    dataSource = dataSource.filter((data) => data.product_id_in_platform.includes(params.product_id_in_platform || ''));
  }

  if (params.title) {
    dataSource = dataSource.filter((data) => data.title.includes(params.title || ''));
  }

  let finalPageSize = 10;
  if (params.pageSize) {
    finalPageSize = parseInt(`${params.pageSize}`, 10);
  }

  const result = {
    data: dataSource,
    total: tableListDataSource.length,
    success: true,
    pageSize: finalPageSize,
    current: parseInt(`${params.currentPage}`, 10) || 1,
  };

  return res.json(result);
}

function postProduct(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const body = (b && b.body) || req.body;
  const { key, product_id, platform, product_id_in_platform,
    url, title, description,  
    category_0, category_1, category_2, category_3, category_4, category_5,
    list_price, discount_price, currency,
    growth_percentage, profit_margin, product_life_cycle,
    quantity_in_list_price, quantity_in_discount_price,
    status, remark} = body;

  switch (req.method) {
    /* eslint no-case-declarations:0 */
    case 'DELETE':
      tableListDataSource = tableListDataSource.filter((item) => key.indexOf(item.key) === -1);
      break;

    case 'PUT':
      (() => {
        let newProduct = {};
        tableListDataSource = tableListDataSource.map((item) => {
          if (item.key === key) {
            newProduct = { ...item, product_id, platform, product_id_in_platform,
              url, title, description,  
              category_0, category_1, category_2, category_3, category_4, category_5,
              list_price, discount_price, currency,
              growth_percentage, profit_margin, product_life_cycle,
              quantity_in_list_price, quantity_in_discount_price,
              status, remark };
            return { ...item, product_id, platform, product_id_in_platform,
              url, title, description,  
              category_0, category_1, category_2, category_3, category_4, category_5,
              list_price, discount_price, currency,
              growth_percentage, profit_margin, product_life_cycle,
              quantity_in_list_price, quantity_in_discount_price,
              status, remark };
          }
          return item;
        });
        return res.json(newProduct);
      })();
      return;
    
    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };

  res.json(result);
}

export default {
  'GET /api/product': getProduct,
  'DELETE /api/product': postProduct,
  'PUT /api/product': postProduct,
};
