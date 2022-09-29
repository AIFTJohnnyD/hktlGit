import { Card, message, Row, Col, Table, Button, Descriptions, Checkbox} from 'antd';
import ProForm, {
  ProFormDateRangePicker,
  ProFormDependency,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormMoney,
  ProFormDatePicker,  
} from '@ant-design/pro-form';
import { useRequest, history, request, FormattedMessage, useAccess } from 'umi';
import type { FC } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { updateLoanApplication } from './service';
import styles from './style.less';

import type { ProColumns } from '@ant-design/pro-table';
import { parse } from 'querystring';
import { CheckCircleTwoTone, ExclamationCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';

import type { BorrowerAmount, TableListItem, Shareholder_Person, Shareholder_Company, Director_Person, Director_Company } from './data';
//引入状态控制
import { useState } from 'react';

const columns_views_doc: ProColumns<Shareholder_Person>[] = [
  {
    title: (<FormattedMessage id='pages.borrower_form.sha'  defaultMessage='文件类型'/>),
    dataIndex: '',
    valueType: 'textarea',
    render: (dom, obj) => {
      if(obj.uid.indexOf('br_hk') != -1){
        return (          
          '商业登记证(香港公司)'
        );
      }
      else if(obj.uid.indexOf('br_cn') != -1){
        return (          
          '企业法人营业执照(中国公司)'
        );
      } 
      else if(obj.uid.indexOf('policy_cn') != -1){
        return (          
          '公司章程(中国公司)'
        ); 
      } 
      else if(obj.uid.indexOf('director_hk') != -1){
        return (          
          '股东和董事身份证或护照(香港公司)'
        ); 
      } 
      else if(obj.uid.indexOf('director_cn') != -1){
        return (          
          '法人、自然人股东和董事身份证正反面(中国公司)'
        ); 
      } 
      else{
        return (          
          '其它未分类文件'
        );
      }
    },
  },       
  {
    title: (<FormattedMessage id='pages.borrower_form.sha'  defaultMessage='文件名称'/>),
    dataIndex: 'name',
    valueType: 'option',
    render: (dom, obj) => {
      return (
        <a href={obj.url}>
          {dom}
        </a>
      );
    },
  } 
];

const columns_shareholder_person: ProColumns<Shareholder_Person>[] = [
  {
    title: (<FormattedMessage id='pages.borrower_form.shareholder.person.name'/>),
    dataIndex: 'shareholder_person_name',
    valueType: 'textarea',
  },       
  {
    title: (<FormattedMessage id='pages.borrower_form.shareholder.person.name_english'/>),
    dataIndex: 'shareholder_person_name_english',
    valueType: 'textarea',
  },       

  {
    title: (<FormattedMessage id='pages.borrower_form.shareholder.person.nationality'/>),
    dataIndex: 'shareholder_person_nationality',
    valueType: 'textarea',
  },       
  {
    title: (<FormattedMessage id='pages.borrower_form.shareholder.person.position'/>),
    dataIndex: 'shareholder_person_position',
    valueType: 'textarea',
  },       

  {
    title: (<FormattedMessage id='pages.borrower_form.shareholder.person.phone'/>),
    dataIndex: 'shareholder_person_phone',
    valueType: 'textarea',
  },       
  {
    title: (<FormattedMessage id='pages.borrower_form.shareholder.person.email'/>),
    dataIndex: 'shareholder_person_email',
    valueType: 'textarea',
  },       

  {
    title: (<FormattedMessage id='pages.borrower_form.shareholder.person.rate'/>),
    dataIndex: 'shareholder_person_rate',
    valueType: 'textarea',
  },       
  {
    title: (<FormattedMessage id='pages.borrower_form.shareholder.person.address'/>),
    dataIndex: 'shareholder_person_address',
    valueType: 'textarea',
  },       
];

const columns_shareholder_company: ProColumns<Shareholder_Company>[] = [
  {
    title: (<FormattedMessage id='pages.borrower_form.shareholder.company.name'/>),
    dataIndex: 'shareholder_company_name',
    valueType: 'textarea',
  },       
  {
    title: (<FormattedMessage id='pages.borrower_form.shareholder.company.business_register_code'/>),
    dataIndex: 'shareholder_company_business_register_code',
    valueType: 'textarea',
  },       

  {
    title: (<FormattedMessage id='pages.borrower_form.shareholder.company.register_address'/>),
    dataIndex: 'shareholder_company_register_address',
    valueType: 'textarea',
  },       
  {
    title: (<FormattedMessage id='pages.borrower_form.shareholder.company.country'/>),
    dataIndex: 'shareholder_company_country',
    valueType: 'textarea',
  },       

  {
    title: (<FormattedMessage id='pages.borrower_form.shareholder.company.rate'/>),
    dataIndex: 'shareholder_company_rate',
    valueType: 'textarea',
  },       
  {
    title: (<FormattedMessage id='pages.borrower_form.shareholder.company.address'/>),
    dataIndex: 'shareholder_company_address',
    valueType: 'textarea',
  },       
];

const columns_director_person: ProColumns<Director_Person>[] = [
  {
    title: (<FormattedMessage id='pages.borrower_form.director.person.name'/>),
    dataIndex: 'director_person_name',
    valueType: 'textarea',
  },       
  {
    title: (<FormattedMessage id='pages.borrower_form.director.person.name_english'/>),
    dataIndex: 'director_person_name_english',
    valueType: 'textarea',
  },       

  {
    title: (<FormattedMessage id='pages.borrower_form.director.person.nationality'/>),
    dataIndex: 'director_person_nationality',
    valueType: 'textarea',
  },       
  {
    title: (<FormattedMessage id='pages.borrower_form.director.person.position'/>),
    dataIndex: 'director_person_position',
    valueType: 'textarea',
  },       

  {
    title: (<FormattedMessage id='pages.borrower_form.director.person.phone'/>),
    dataIndex: 'director_person_phone',
    valueType: 'textarea',
  },       
  {
    title: (<FormattedMessage id='pages.borrower_form.director.person.email'/>),
    dataIndex: 'director_person_email',
    valueType: 'textarea',
  },       

  {
    title: (<FormattedMessage id='pages.borrower_form.director.person.address'/>),
    dataIndex: 'director_person_address',
    valueType: 'textarea',
  },       
];

const columns_director_company: ProColumns<Director_Company>[] = [
  {
    title: (<FormattedMessage id='pages.borrower_form.director.company.name'/>),
    dataIndex: 'director_company_name',
    valueType: 'textarea',
  },  
  {
    title: (<FormattedMessage id='pages.borrower_form.director.company.business_register_code'/>),
    dataIndex: 'director_company_business_register_code',
    valueType: 'textarea',
  },  
  {
    title: (<FormattedMessage id='pages.borrower_form.director.company.address'/>),
    dataIndex: 'director_company_address',
    valueType: 'textarea',
  },  
];

var dictStatus: any = {
  CREATED: <FormattedMessage id='pages.application.CREATED'/>,

  APPROVED: <FormattedMessage id='pages.application.APPROVED'/>,
  UNAPPROVED: <FormattedMessage id='pages.application.UNAPPROVED'/>,

  CLOSED: <FormattedMessage id='pages.application.CLOSED'/>,
};

var dictFinanceType: any = {
  ACCOUNT_RECEIVABLE_FINANCE: <FormattedMessage id='pages.borrower_list.borrower.account_receivable_finance'/>,
  INVENTORY_FINANCE: <FormattedMessage id='pages.borrower_list.borrower.inventory_finance'/>,
};

var dictStatusAmount: any = {
  NORMAL: (<FormattedMessage id='pages.amount.borrower_list.amount_status.NORMAL'/>),

  ABNORMAL_LOAN_OVERDUE: (<FormattedMessage id='pages.amount.borrower_list.amount_status.ABNORMAL_LOAN_OVERDUE'/>),
  ABNORMAL_PD_LGD_DECREASE: (<FormattedMessage id='pages.amount.borrower_list.amount_status.ABNORMAL_PD_LGD_DECREASE'/>),
  ABNORMAL_SHOP_CLOSE: (<FormattedMessage id='pages.amount.borrower_list.amount_status.ABNORMAL_SHOP_CLOSE'/>),
  ABNORMAL_ACOUNT_CHANGE: (<FormattedMessage id='pages.amount.borrower_list.amount_status.ABNORMAL_ACOUNT_CHANGE'/>),
  ABNORMAL_DIRECTOR_CHANGE: (<FormattedMessage id='pages.amount.borrower_list.amount_status.ABNORMAL_DIRECTOR_CHANGE'/>),
};

const ApprovalForm: FC<Record<string, any>> = () => {
  //控制提交按钮的disabled属性
  const [disabled, setDisabled] = useState(true);
  const onCheckboxChange = () => {
    console.log('checked = ');
    setDisabled(!disabled);}

  const { run } = useRequest(updateLoanApplication, {
    manual: true,
    onSuccess: () => {
      message.success('Submitted Successfully');

      history.push({
        pathname: '/result/success',
      });      
    },
  });
   
  const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

  const onFinish = async (values: Record<string, any>) => {
    let urlParams = parse(window.location.href.split('?')[1]);
    const borrower_id = urlParams.borrower_id;
    values["key"] = borrower_id;

    console.log(values)
    run(values);
    await waitTime(1500);
    window.close();    
  };
  
  const onExit = () => {
    window.opener = null;
    window.open('', '_self');
    window.close();
  };

  let urlParams = parse(window.location.href.split('?')[1]);
  const borrower_id = urlParams.borrower_id;
  console.log(borrower_id);

  const { data, error, loading } = useRequest(() => {
    return request(
      '/api/borrower/get_borrower_from_id?borrower_id=' + borrower_id,
    );
  });
  console.log(data)

  const access = useAccess();

  return (
    <ProForm
      layout="vertical"
      onFinish={onFinish}

      initialValues={data}
      params={data}
      request={(params) => {
        return Promise.resolve({
          data: params,
          success: true,
        })
      }}
      
      submitter={{
        render: (props, doms) => {
          return [
            <button type="button" key="rest" onClick={() => props.form?.resetFields()}>
              重置
            </button>,
            <button disabled ={disabled}
              type="button" key="submit" onClick={() => props.form?.submit?.()}>
              提交
            </button>,
            // <Button htmlType="button" onClick={onExit} key="exit">
            //   退出
            // </Button>,
            // ...doms,
          ];
        },
      }}            
    >

      <Card
        title={<FormattedMessage id='pages.loan_form.basic_info'/>}
        className="styles.card"
        bordered={false}
        size= "small"
        headStyle = {{color:'#2f54eb', fontSize: 16, fontWeight:'bold'}}
        //style={{ marginLeft: 50 }}
        >
        <div style={{margin: 'auto', width: 1200}}>
            <Descriptions style={{ marginBottom: 24 }} title={"内地公司基本信息"} column={3}>
              <Descriptions.Item label={<FormattedMessage id='pages.borrower_list.borrower.name_cn'/>}>{data?.name_cn}</Descriptions.Item>
              <Descriptions.Item label={<FormattedMessage id='pages.borrower_list.borrower.credit_code_cn'/>}>{data?.credit_code_cn}</Descriptions.Item>
              <Descriptions.Item label={<FormattedMessage id='pages.borrower_list.borrower.address_cn'/>}>{data?.address_cn}</Descriptions.Item>
            </Descriptions>

            <Descriptions style={{ marginBottom: 24 }} title={"香港公司基本信息"} column={3}>
              <Descriptions.Item label={<FormattedMessage id='pages.borrower_list.borrower.name_hk'/>}>{data?.name_hk}</Descriptions.Item>
              <Descriptions.Item label={<FormattedMessage id='pages.borrower_list.borrower.br_code_hk'/>}>{data?.br_code_hk}</Descriptions.Item>
              <Descriptions.Item label={<FormattedMessage id='pages.borrower_list.borrower.address_hk'/>}>{data?.address_hk}</Descriptions.Item>
            </Descriptions>
        </div>
      </Card>

      <p></p>

      <Card
        title={<FormattedMessage id='pages.borrower_list.shareholder_director_information_cn'/>}
        className="styles.card"
        bordered={false}
        size= "small"
        headStyle = {{color:'#2f54eb', fontSize: 16, fontWeight:'bold'}}
        //style={{ marginLeft: 50 }}
      >
        <Card title="" className={styles.card} bordered={false}>
          <div style={{margin: 'auto', width: 1200}}>
            <Table 
              title={() => <FormattedMessage id='pages.borrower_list.shareholder_person'/>}
              columns={columns_shareholder_person} 
              dataSource={data?.shareholder_person_cn} 
              size={"small"}
              pagination={false}
            />
          </div>
        </Card>

        <Card title="" className={styles.card} bordered={false}>
          <div style={{margin: 'auto', width: 1200}}>
            <Table 
              title={() => <FormattedMessage id='pages.borrower_list.shareholder_company'/>}
              columns={columns_shareholder_company} 
              dataSource={data?.shareholder_company_cn} 
              size={"small"}
              pagination={false}
            />
          </div>
        </Card>

        <Card title="" className={styles.card} bordered={false}>
          <div style={{margin: 'auto', width: 1200}}>
            <Table 
              title={() => <FormattedMessage id='pages.borrower_list.director_person'/>}
              columns={columns_director_person} 
              dataSource={data?.director_person_cn} 
              size={"small"}
              pagination={false}
            />
          </div>
        </Card>

        <Card title="" className={styles.card} bordered={false}>
          <div style={{margin: 'auto', width: 1200}}>
            <Table 
              title={() => <FormattedMessage id='pages.borrower_list.director_company'/>}
              columns={columns_director_company} 
              dataSource={data?.director_company_cn} 
              size={"small"}
              pagination={false}
            />
          </div>
        </Card>
      </Card>

      <p></p>

      <Card
        title={<FormattedMessage id='pages.borrower_list.shareholder_director_information_hk'/>}
        className="styles.card"
        bordered={false}
        size= "small"
        headStyle = {{color:'#2f54eb', fontSize: 16, fontWeight:'bold'}}
      >
        <Card title="" className={styles.card} bordered={false}>
          <div style={{margin: 'auto', width: 1200}}>
            <Table 
              title={() => <FormattedMessage id='pages.borrower_list.shareholder_person'/>}
              columns={columns_shareholder_person} 
              dataSource={data?.shareholder_person_hk} 
              size={"small"}
              pagination={false}
            />
          </div>
        </Card>

        <Card title="" className={styles.card} bordered={false}>
          <div style={{margin: 'auto', width: 1200}}>
            <Table 
              title={() => <FormattedMessage id='pages.borrower_list.shareholder_company'/>}
              columns={columns_shareholder_company} 
              dataSource={data?.shareholder_company_hk} 
              size={"small"}
              pagination={false}
            />
          </div>
        </Card>

        <Card title="" className={styles.card} bordered={false}>
          <div style={{margin: 'auto', width: 1200}}>
            <Table 
              title={() => <FormattedMessage id='pages.borrower_list.director_person'/>}
              columns={columns_director_person} 
              dataSource={data?.director_person_hk} 
              size={"small"}
              pagination={false}
            />
          </div>
        </Card>

        <Card title="" className={styles.card} bordered={false}>
          <div style={{margin: 'auto', width: 1200}}>
            <Table 
              title={() => <FormattedMessage id='pages.borrower_list.director_company'/>}
              columns={columns_director_company} 
              dataSource={data?.director_company_hk} 
              size={"small"}
              pagination={false}
            />
          </div>
        </Card>
      </Card>

      <Card
        title={<FormattedMessage id='pages.borrower_list.document_upload'/>}
        className="styles.card"
        bordered={false}
        size= "small"
        headStyle = {{color:'#2f54eb', fontSize: 16, fontWeight:'bold'}}
      >
        <Card title="" className={styles.card} bordered={false}>
          <div style={{margin: 'auto', width: 1200}}>
            <Table 
              title={() => <FormattedMessage id='pages.borrower_list.document_upload.company_hk'/>}
              columns={columns_views_doc} 
              dataSource={data?.br_hk.concat(data?.director_hk)} 
              size={"small"}
              pagination={false}
            />
          </div>
        </Card>
        <Card title="" className={styles.card} bordered={false}>
          <div style={{margin: 'auto', width: 1200}}>
            <Table 
              title={() => <FormattedMessage id='pages.borrower_list.document_upload.company_cn'/>}
              columns={columns_views_doc} 
              dataSource={data?.br_cn.concat(data?.director_cn).concat(data?.policy_cn)} 
              size={"small"}
              pagination={false}
            />
          </div>
        </Card>                 
      </Card>
      
      <Card
        title={<FormattedMessage id='pages.borrower_form.account_receivable.amount_setting'/>}
        className="styles.card"
        bordered={false}
        size= "small"
        headStyle = {{color:'#2f54eb', fontSize: 16, fontWeight:'bold'}}
      >
        <Card title="" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col xl={6} lg={6} md={12} sm={24}>
              <ProFormSelect
                label={<FormattedMessage id='pages.borrower_form.account_receivable.amount_monthly_ratio'/>}
                width="md"
                name="amount_monthly_ratio"
                rules={[{ required: true, message: 'Please input the status.' }]}
                valueEnum={{
                  "1.0": "1.0", 
                  "1.5": "1.5", 
                  "2.0": "2.0"}}
              />
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>
              <ProFormDependency name={['amount_monthly_ratio', 'monthly_revenue']}>
                  {({ amount_monthly_ratio, monthly_revenue }) => {
                      return (          
                        <ProFormDigit
                          label={<FormattedMessage id='pages.borrower_form.account_receivable.amount_limit'/>}
                          width="md"
                          name=""
                          //rules={[{ required: true, message: '' }]}
                          value={amount_monthly_ratio * monthly_revenue}
                        />
                      );
                  }}
              </ProFormDependency>              
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 24 }} sm={24}>
              <ProFormSelect
                label={<FormattedMessage id='pages.util.currency'/>}
                width="md"
                name="currency"
                rules={[{ required: true, message: '' }]}
                valueEnum={{
                  USD: 'USD',
                  HKD: 'HKD',
                  CNY: 'CNY',
                }}
              />
            </Col>            
          </Row>

          <Row gutter={16}>
            <Col xl={6} lg={6} md={12} sm={24}>
              <ProFormSelect
                label={<FormattedMessage id='pages.borrower_form.account_receivable.duration'/>}
                width="md"
                name="duration"
                rules={[{ required: true, message: '' }]}
                valueEnum={{7: 7, 14: 14, 30: 30, 45: 45, 60: 60, 90: 90, 180: 180}}
              />
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>
              <ProFormSelect
                label={<FormattedMessage id='pages.borrower_form.account_receivable.annual_interest_rate'/>}
                width="md"
                name="annual_interest_rate"
                rules={[{ required: true, message: '' }]}
                valueEnum={{
                  "0.075": "7.5%",
                  "0.08": "8.0%", "0.085": "8.5%",
                  "0.09": "9.0%", "0.095": "9.5%",
                  "0.1": "10.0%", "0.105": "10.5%",
                  "0.11": "11.0%", "0.115": "11.5%",
                  "0.12": "12.0%", "0.125": "12.5%",
                  "0.13": "13.0%", "0.135": "13.5%",
                  "0.14": "14.0%", "0.145": "14.5%",
                  "0.15": "15.0%", "0.155": "15.5%",
                  "0.16": "16.0%",
                }}
              />
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 24 }} sm={24}>
              <ProFormSelect
                label={<FormattedMessage id='pages.borrower_form.account_receivable.penalty_annual_interest_rate'/>}
                width="md"
                name="penalty_annual_interest_rate"
                rules={[{ required: true, message: '' }]}
                valueEnum={{
                  "0.18": "18.0%", "0.185": "18.5%",
                  "0.19": "19.0%", "0.195": "19.5%",
                  "0.2": "20.0%",  "0.205": "20.5%",
                  "0.21": "21.0%", "0.215": "21.5%",
                  "0.22": "22.0%", "0.225": "22.5%",
                  "0.23": "23.0%", "0.235": "23.5%",
                  "0.24": "24.0%",
                }}
              />              
            </Col>            
          </Row>

          <Row gutter={16}>
            <Col xl={6} lg={6} md={12} sm={24}>
              <ProFormSelect
                label={<FormattedMessage id='pages.util.status'/>}
                width="md"
                name="status_lender"
                rules={[{ required: true, message: 'Please input the status.' }]}
                valueEnum={dictStatusAmount}
              />
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>
              <ProFormSelect
                label={<FormattedMessage id='pages.borrower_list.borrower.finance_type'/>}
                width="md"
                name="finance_type"
                rules={[{ required: true, message: '' }]}
                valueEnum={dictFinanceType}
              />
            </Col>

            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 24 }} sm={24}>
            </Col>
            
          </Row>

          <Row gutter={16}>
            <Col xl={6} lg={6} md={12} sm={24}>
              <ProFormTextArea
                label={<FormattedMessage id='pages.util.remark'/>}
                width="lg"
                name="remark_lender"
                rules={[{ required: false, message: '' }]}
              /> 
            </Col>            
          </Row> 
          {/* 用于添加新的button和box */}
          <Row gutter={16}>
            <Col xl={6} lg={6} md={12} sm={24}>
            
              <Button type="default" 
                  // href="http://localhost:8000/application/borrower-analysis?borrower_id=1"
                  onClick={() => {
                    window.open("/application/borrower-analysis?borrower_id=1","KYCKYPWindow", "popup")
                    // window.open("/application/borrower-analysis?borrower_id=1",'newwindow','height=800, width=1500, top=160, left=350, toolbar=no, menubar=no, status=no')
                  }}>
                  点击后查看KYCKYP然后才可以提交
              </Button>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 12 }} sm={24}>
              <Checkbox  
                // hecked={checked} disabled={disabled} 
                onChange={onCheckboxChange}
                >
                确认已经阅读KYCKYP
              </Checkbox>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 6 }} md={{ span: 24 }} sm={24}>
            </Col>
            
          </Row>       
        </Card>      

      </Card>      
    </ProForm>
  );
};

export default ApprovalForm;
