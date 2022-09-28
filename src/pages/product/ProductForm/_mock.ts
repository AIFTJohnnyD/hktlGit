// eslint-disable-next-line import/no-extraneous-dependencies
import type { Request, Response } from 'express';

export default {
  'POST  /api/product': (_: Request, res: Response) => {
    res.send({ data: { message: 'Ok' } });
  },

  'POST  /api/product/get_product_info': (req: Request, res: Response) => {
    res.send(
      { data: {
        "platform": "AMAZON_US",
        "product_id_in_platform": "B0027E8EXC",
        "url": "https://www.amazon.com/EdgeStar-IB120SS-Built-Maker-Stainless/dp/B0027E8EXC",
        "title": "Amazon.com: EdgeStar IB120SS Built in Ice Maker, 12 lbs, Stainless Steel and Black : Appliances",
        "description": "Buy EdgeStar IB120SS Built in Ice Maker, 12 lbs, Stainless Steel and Black: Ice Makers - Amazon.com ✓ FREE DELIVERY possible on eligible purchases",
        "img": "https://m.media-amazon.com/images/I/711hYiu-6pL._AC_SX522_.jpg",
        "category": [
          "Appliances",
          "Refrigerators, Freezers & Ice Makers",
          "Ice Makers"
        ],
        "list_price": 379.0,
        "discount_price": null
      }}
    );
  },

};
