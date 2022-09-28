// eslint-disable-next-line import/no-extraneous-dependencies
import type { Request, Response } from 'express';

export default {
  'POST  /api/company/company': (_: Request, res: Response) => {
    res.send({ data: { message: 'Ok' } });
  },

  'GET  /api/company/company': (_: Request, res: Response) => {
    res.send({ data: { 
      name: 'Laboratory for AI-Powered Financial Technologies Limited',  
      br_no: '2927232',
      phone_country_code: '+852',
      phone: '34625600',
      address: 'Units 1101-1102 & 1121-1123, Building 19W Science Park West Avenue, Hong Kong Science Park, Shatin, Hong Kong',
      email: 'info@hkaift.com',
    
      person: 'Chen Dawen',
      person_title: 'Engineer',
      person_office_phone_country_code: '+852',
      person_office_phone: '34625600',
      person_mobile_phone_country_code: '+852',
      person_mobile_phone: '34625600',
      person_address: 'Units 1101-1102 & 1121-1123, Building 19W Science Park West Avenue, Hong Kong Science Park, Shatin, Hong Kong',
      person_email: 'info@hkaift.com',
    
      role: 'lender',

      //status: 'ACTIVE',
      remark: '',
    } });
  },
};

