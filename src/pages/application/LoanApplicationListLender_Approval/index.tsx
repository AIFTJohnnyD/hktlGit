import { Card, message, Row, Col, Table, Button, InputNumber } from 'antd';
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
  ProFormInstance,  
} from '@ant-design/pro-form';
import { useRequest, history, request, FormattedMessage, useAccess } from 'umi';
import { FC, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { updateLoanApplication } from './service';
import styles from './style.less';
import { ProColumns, ProTable } from '@ant-design/pro-table';
import { parse } from 'querystring';
import { CheckCircleTwoTone, ExclamationCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';

import { company } from './service';

import type { ProductListItem, TableListItem } from './data';

function translate_index_name(index_name: string) {
  return <FormattedMessage id={'pages.application.index_name.' + index_name}/>;
}

const columns: ProColumns<ProductListItem>[] = [
  {
    title: (<FormattedMessage id='pages.order_details.product_id'/>),
    dataIndex: 'key',
  },

  {
    title: (<FormattedMessage id='pages.order_details.product_asin'/>),
    dataIndex: 'asin',
    valueType: 'textarea',
  },       
  {
    title: (<FormattedMessage id='pages.order_details.product_name'/>),
    dataIndex: 'name',
    valueType: 'textarea',
  },    
  {
    title: (<FormattedMessage id='pages.order_details.product_price'/>),
    dataIndex: 'price',
    valueType: 'digit',
  },
  {
    title: (<FormattedMessage id='pages.order_details.product_num'/>),
    dataIndex: 'sales_num',
    valueType: 'digit',
  },    
  {
    title: (<FormattedMessage id='pages.order_details.product_amount'/>),
    dataIndex: 'amount',
    valueType: 'digit',
  },
  {
    title: (<FormattedMessage id='pages.order_details.product_cost'/>),
    dataIndex: 'cost',
    valueType: 'digit',
  },
  {
    title: (<FormattedMessage id='pages.order_details.product_stock'/>),
    dataIndex: 'stock',
    valueType: 'digit',
  }
];

const columns_index: ProColumns<ProductListItem>[] = [
  {
    title: (<FormattedMessage id='pages.application.index_table.parameter_name'/>),
    dataIndex: 'parameter_name',
    valueType: 'textarea',
    render: (text, record, index) => {
      return (translate_index_name(record?.parameter_name))
    },    
  },
  {
    title: (<FormattedMessage id='pages.application.index_table.parameter_value'/>),
    dataIndex: 'parameter_value',
    valueType: 'digit',
  },
  {
    title: (<FormattedMessage id='pages.application.index_table.threshold_green'/>),
    dataIndex: 'threshold_green',
    valueType: 'digit',
  },
  {
    title: (<FormattedMessage id='pages.application.index_table.threshold_amber'/>),
    dataIndex: 'threshold_amber',
    valueType: 'digit',
  },
  {
    title: (<FormattedMessage id='pages.application.index_table.color_flag'/>),
    dataIndex: 'color_flag',
    valueType: 'textarea',
    render: (text, record, index) => {
      //console.log(text, record);
      switch (record?.color_flag) {
        case "GREEN":
          return (<CheckCircleTwoTone twoToneColor="#52c41a" />);
        case "AMBER":
          return (<ExclamationCircleTwoTone twoToneColor="#fa8c16" />);
        case "RED":
          return (<CloseCircleTwoTone twoToneColor="#f5222d" />);
  
        default:
          return (<p></p>);
      }
    },
  },
];

const columns_sales_through: ProColumns<ProductListItem>[] = [
  {
    title: (<FormattedMessage id='pages.order_details.product_id'/>),
    dataIndex: 'key',
  },

  {
    title: (<FormattedMessage id='pages.order_details.product_asin'/>),
    dataIndex: 'asin',
    valueType: 'textarea',
  },       
  {
    title: (<FormattedMessage id='pages.order_details.product_name'/>),
    dataIndex: 'name',
    valueType: 'textarea',
  },    
  {
    title: (<FormattedMessage id='pages.order_details.product_price'/>),
    dataIndex: 'price',
    valueType: 'digit',
  },
  {
    title: (<FormattedMessage id='pages.order_details.product_num'/>),
    dataIndex: 'sales_num',
    valueType: 'digit',
  },    

  {
    title: "5折最短销售时间",
    dataIndex: '5_sales_through_month_shortest',
    valueType: 'digit',
  },
  {
    title: "5折最长销售时间",
    dataIndex: '5_sales_through_month_longest',
    valueType: 'digit',
  },

  {
    title: "5折3倍价格最短回本时间",
    dataIndex: '5_pay_back_month_3x_price_shortest',
    valueType: 'digit',
  },
  {
    title: "5折3倍价格最长回本时间",
    dataIndex: '5_pay_back_month_3x_price_longest',
    valueType: 'digit',
  },

  {
    title: "5折5倍价格最短回本时间",
    dataIndex: '5_pay_back_month_5x_price_shortest',
    valueType: 'digit',
  },
  {
    title: "5折5倍价格最长回本时间",
    dataIndex: '5_pay_back_month_5x_price_longest',
    valueType: 'digit',
  },

  {
    title: "7折最短销售时间",
    dataIndex: '7_sales_through_month_shortest',
    valueType: 'digit',
  },
  {
    title: "7折最长销售时间",
    dataIndex: '7_sales_through_month_longest',
    valueType: 'digit',
  },

  {
    title: "7折3倍价格最短回本时间",
    dataIndex: '7_pay_back_month_3x_price_shortest',
    valueType: 'digit',
  },
  {
    title: "7折3倍价格最长回本时间",
    dataIndex: '7_pay_back_month_3x_price_longest',
    valueType: 'digit',
  },

  {
    title: "7折5倍价格最短回本时间",
    dataIndex: '7_pay_back_month_5x_price_shortest',
    valueType: 'digit',
  },
  {
    title: "7折5倍价格最长回本时间",
    dataIndex: '7_pay_back_month_5x_price_longest',
    valueType: 'digit',
  },

];

const ApprovalForm: FC<Record<string, any>> = () => {
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
  const loan_application_id = urlParams.loan_application_id;
  console.log(loan_application_id);

  const { data, error, loading } = useRequest(() => {
    return request(
      '/api/loan_application/get_loan_application_from_id?application_id=' + loan_application_id,
    );
  });
  console.log(data)

  const result_LGD = useRequest(() => {
    return request(
      '/api/amount/list',
    );
  });

  console.log(result_LGD.data)

  let dataSource_company2 = {}
  let dataSource_company = result_LGD.data;
  let approved_amount = 1211;
  const formRef = useRef<ProFormInstance>();

  if(typeof dataSource_company == "object"){
    dataSource_company = dataSource_company[0]
    approved_amount = dataSource_company.approved_amount
    formRef?.current?.setFieldsValue({
      approved_amount: dataSource_company.approved_amount,
      approved_number: dataSource_company.approved_number,
      delinquent_amount: dataSource_company.approved_amount,
      delinquent_number: dataSource_company.delinquent_number,
      repay_amount: dataSource_company.repay_amount,
      repay_number: dataSource_company.repay_number,
      available_amount: dataSource_company.available_amount,
      probability_of_default: dataSource_company.probability_of_default,
      loss_given_default: dataSource_company.loss_given_default,
    });
  }

  const access = useAccess();

  var dictStatus:any = {};

  var bApproved:boolean = false;

  var disableStatusSelect: boolean = false;

  switch (data?.status) {
    case 'CREATED':
      dictStatus = {
        CREATED: <FormattedMessage id='pages.application.CREATED'/>,

        PENDING: <FormattedMessage id='pages.application.PENDING'/>,
    
        APPROVED: <FormattedMessage id='pages.application.APPROVED'/>,
        UNAPPROVED: <FormattedMessage id='pages.application.UNAPPROVED'/>,

        CLOSED: <FormattedMessage id='pages.application.CLOSED'/>,
      };    
      break;

    case 'CANCELLED':
      dictStatus = {
        CANCELLED: <FormattedMessage id='pages.application.CANCELLED'/>,
      };    
      break;
  
    case 'UNAPPROVED':
    case 'PENDING':
      dictStatus = {
        PENDING: <FormattedMessage id='pages.application.PENDING'/>,
    
        APPROVED: <FormattedMessage id='pages.application.APPROVED'/>,
        UNAPPROVED: <FormattedMessage id='pages.application.UNAPPROVED'/>,

        CLOSED: <FormattedMessage id='pages.application.CLOSED'/>,
      };    
      break;

    case 'APPROVED':
      dictStatus = {
        APPROVED: <FormattedMessage id='pages.application.APPROVED'/>,

        CLOSED: <FormattedMessage id='pages.application.CLOSED'/>,
      };
      
      bApproved = true;

      break;

    case 'ACCEPTED':
      dictStatus = {
        ACCEPTED: <FormattedMessage id='pages.application.ACCEPTED'/>,
        // 需要控制应收账款后才放款
        DRAWDOWN: <FormattedMessage id='pages.application.DRAWDOWN'/>,   
      };

      if (access.canAdmin == true) {
        dictStatus['GOODS_RECEIVED'] = <FormattedMessage id='pages.application.GOODS_RECEIVED'/>;
        dictStatus['ACCOUNT_RECEIVABLE_CONTROL'] = <FormattedMessage id='pages.application.ACCOUNT_RECEIVABLE_CONTROL'/>;
      }
      
      bApproved = true;

      break;

    case 'GOODS_RECEIVED':
      dictStatus = {
        GOODS_RECEIVED: <FormattedMessage id='pages.application.GOODS_RECEIVED'/>,

        DRAWDOWN: <FormattedMessage id='pages.application.DRAWDOWN'/>,
      };
      
      bApproved = true;

      break;
      
    case 'ACCOUNT_RECEIVABLE_CONTROL':
      dictStatus = {
        ACCOUNT_RECEIVABLE_CONTROL: <FormattedMessage id='pages.application.ACCOUNT_RECEIVABLE_CONTROL'/>,

        DRAWDOWN: <FormattedMessage id='pages.application.DRAWDOWN'/>,
      };
      
      bApproved = true;

      break;

    case 'DRAWDOWN':
      dictStatus = {
        DRAWDOWN: <FormattedMessage id='pages.application.DRAWDOWN'/>,
        
        //REPAID: <FormattedMessage id='pages.application.REPAID'/>,
        DELINQUENT: <FormattedMessage id='pages.application.DELINQUENT'/>,
      };
      disableStatusSelect = true;
      bApproved = true;

      break;

    case 'REPAID':
    case 'DELINQUENT':
      dictStatus = {
        REPAID: <FormattedMessage id='pages.application.REPAID'/>,
        DELINQUENT: <FormattedMessage id='pages.application.DELINQUENT'/>,

        LIQUIDATED: <FormattedMessage id='pages.application.LIQUIDATED'/>,
        LOAN_SETTLEMENT: <FormattedMessage id='pages.application.LOAN_SETTLEMENT'/>,
    
        CLOSED: <FormattedMessage id='pages.application.CLOSED'/>,
      };
      
      bApproved = true;

      break;

    case 'LIQUIDATED':
    case 'LOAN_SETTLEMENT':
      dictStatus = {
        LIQUIDATED: <FormattedMessage id='pages.application.LIQUIDATED'/>,
        LOAN_SETTLEMENT: <FormattedMessage id='pages.application.LOAN_SETTLEMENT'/>,    
      };
      
      if (access.canAdmin == true) {
        dictStatus['GOODS_DELIVERY'] = <FormattedMessage id='pages.application.GOODS_DELIVERY'/>;
        dictStatus['ACCOUNT_RECEIVABLE_RELEASE'] = <FormattedMessage id='pages.application.ACCOUNT_RECEIVABLE_RELEASE'/>;
      }

      bApproved = true;

      break;

    case 'GOODS_DELIVERY':
      dictStatus = {
        GOODS_DELIVERY: <FormattedMessage id='pages.application.GOODS_DELIVERY'/>,
    
        CLOSED: <FormattedMessage id='pages.application.CLOSED'/>,
      };
      
      bApproved = true;

      break;

    case 'ACCOUNT_RECEIVABLE_RELEASE':
      dictStatus = {
        ACCOUNT_RECEIVABLE_RELEASE: <FormattedMessage id='pages.application.ACCOUNT_RECEIVABLE_RELEASE'/>,    
    
        CLOSED: <FormattedMessage id='pages.application.CLOSED'/>,
      };
      
      bApproved = true;

      break;
    case 'PARTIAL_REPAYMENT':
      dictStatus = {
        PARTIAL_REPAYMENT: <FormattedMessage id='pages.application.PARTIAL_REPAYMENT'/>
      }
      disableStatusSelect = true;
      break;
    case 'EARLY_REPAYMENT':
      dictStatus = {
        EARLY_REPAYMENT: <FormattedMessage id='pages.application.EARLY_REPAYMENT'/>  
      }
      break;
    case 'FULL_REPAYMENT': 
      dictStatus = {
        FULL_REPAYMENT: <FormattedMessage id='pages.application.FULL_REPAYMENT'/>
      }
      disableStatusSelect = true;
      break;
    case 'DELINQUENT':
      dictStatus = {
        DELINQUENT: <FormattedMessage id='pages.application.DELINQUENT'/>
      }
      disableStatusSelect = true;
      break;
    case 'OVERDUE_REPAYMENT':
      dictStatus = {
        OVERDUE_REPAYMENT: <FormattedMessage id='pages.application.OVERDUE_REPAYMENT'/>
      }
      disableStatusSelect = true;
      break;
    default:
      break;
  }

  if((data?.finance_type) === "ACCOUNT_RECEIVABLE_FINANCE"){   //应收账款贷款审批
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
              <Button htmlType="button" onClick={onExit} key="exit">
                退出
              </Button>,
              ...doms,
            ];
          },
        }}            
      >

        <Card
          title="贷款申请信息"
          className="styles.card"
          bordered={false}
          size= "small"
          headStyle = {{color:'#2f54eb', fontSize: 16, fontWeight:'bold'}}
          //style={{ width: 500 }}
        >
          <Row gutter={16}>
            <Col span={6} push={1}>
              <ProFormText
                name="key"
                label={<FormattedMessage id="pages.loan_application_list.loan_application_id" />}
                width="md"
                disabled
              // placeholder = {props.values.key?.toString()}
              />
            </Col>
            <Col span={6} push={1}>
              <ProFormText
                name="borrower_id"
                label={<FormattedMessage id="pages.loan_application_list.company_id" />}
                width="md"
                disabled
              // placeholder = {props.values.borrower_id?.toString()}
              />
            </Col>
            <Col span={6} push={1}>
              <ProFormText
                name="borrower_name"
                label={<FormattedMessage id="pages.borrower_list.borrower.name_cn" />}
                width="md"
                disabled
              // placeholder = {props.values.borrower_name}
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={6} push={1}>
              <ProFormMoney
                name="amount"
                label={<FormattedMessage id="pages.loan_application.application_amount" />}
                width="md"
                locale="en-US"
                disabled
              // placeholder = {props.values.amount?.toFixed(2)}
              />
            </Col>
            <Col span={6} push={1}>
              <ProFormSelect
                name="currency"
                label={<FormattedMessage id="pages.util.currency" />}
                width="md"
                rules={[{ required: true, message: 'Please input the currency.' }]}
                valueEnum={{
                  USD: 'USD',
                  HKD: 'HKD',
                  CNY: 'CNY',
                }}
                disabled
              // placeholder = {props.values.currency}
              />
            </Col>
            <Col span={6} push={1}>
              <ProFormText
                name="day_approved"
                label={<FormattedMessage id="pages.loan_application_list.days" />}
                width="md"
                disabled
              // placeholder = {props.values.purpose}
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={6} push={1}>
              <ProFormText
                name="created_date"
                label={<FormattedMessage id="pages.loan_application_list.created_date" />}
                width="md"
                disabled
              // placeholder = {props.values.created_date}
              />
            </Col>
            <Col span={6} push={1}>
              <ProFormDatePicker
                name="start_date"
                width="md"
                label={<FormattedMessage id="pages.util.start_date" />}
                disabled
              // placeholder = {props.values.start_date}
              />
            </Col>
            <Col span={6} push={1}>
              <ProFormDatePicker
                name="end_date"
                width="md"
                label={<FormattedMessage id="pages.util.end_date" />}
                disabled
              // placeholder = {props.values.end_date}
              />
            </Col>
          </Row>
        </Card>
        <p></p>          
        
        <ProForm
	        layout="vertical"
	        formRef={formRef}
	        // value={dataSource_company}
	        initialValues={dataSource_company2}
	        name = "dataSource_company2"
	        // params={dataSource_company}
	        // request={(params) => {
	        //   return Promise.resolve({
	        //     data: params,
	        //     success: true,
	        //   })
	        // }}
	        // request={company}
	        // onFinish={onFinish}
        >
          <Card
            title="GD_LGD"
            className="styles.card"
            bordered={false}
            size= "small"
            headStyle = {{color:'#2f54eb', fontSize: 16, fontWeight:'bold'}}
            //style={{ width: 500 }}
          >
            <Row gutter={16}>
              <Col span={6} push={1}>
                <ProFormText
                  initialValue={approved_amount}
                  name="approved_amount"
                  label={<FormattedMessage id='pages.amount.borrower_list.approved_amount'/>}
                  width="md"
                  disabled
                />
              </Col>
              <Col span={6} push={1}>
                <ProFormText
                  name="approved_number"
                  label={<FormattedMessage id="pages.amount.borrower_list.approved_number" />}
                  width="md"
                  disabled
                // placeholder = {props.values.borrower_id?.toString()}
                />
              </Col>
              <Col span={6} push={1}>
                <ProFormText
                  name="delinquent_amount"
                  label={<FormattedMessage id="pages.amount.borrower_list.delinquent_amount" />}
                  width="md"
                  disabled
                // placeholder = {props.values.borrower_name}
                />
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={6} push={1}>
                <ProFormText
                  name="delinquent_number"
                  label={<FormattedMessage id="pages.amount.borrower_list.delinquent_number" />}
                  width="md"
                  rules={[
                    {
                      required: true,
                      message: 'Please input the amount.',
                    },
                  ]}
                  disabled
                // placeholder = {props.values.amount?.toFixed(2)}
                />
              </Col>
              <Col span={6} push={1}>
                <ProFormText
                  name="repay_amount"
                  label={<FormattedMessage id="pages.amount.borrower_list.repay_amount" />}
                  width="md"
                  rules={[{ required: true, message: 'Please input the currency.' }]}
                  disabled
                // placeholder = {props.values.currency}
                />
              </Col>
              <Col span={6} push={1}>
                <ProFormText
                  name="repay_number"
                  label={<FormattedMessage id="pages.amount.borrower_list.repay_number" />}
                  width="md"
                  disabled
                // placeholder = {props.values.purpose}
                />
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={6} push={1}>
                <ProFormText
                  name="available_amount"
                  label={<FormattedMessage id="pages.amount.borrower_list.available_amount" />}
                  width="md"
                  disabled
                // placeholder = {props.values.created_date}
                />
              </Col>
              <Col span={6} push={1}>
                <ProFormText
                  name="probability_of_default"
                  width="md"
                  label={<FormattedMessage id="pages.amount.borrower_list.probability_of_default" />}
                  disabled
                />
              </Col>
              <Col span={6} push={1}>
                <ProFormText
                  name="loss_given_default"
                  width="md"
                  label={<FormattedMessage id="pages.amount.borrower_list.loss_given_default" />}
                  disabled
                />
              </Col>
            </Row>
          </Card>
          <p></p> 
        </ProForm>


        
        {/* <Card
          title="财务指标"
          className={styles.card}
          bordered={false}
          size="small"
          headStyle = {{color:'#2f54eb', fontSize: 16, fontWeight:'bold'}}
        >
          <Card title="" className={styles.card} bordered={false}>
            <div style={{ margin: 'auto', width: 1300 }}>
              <Table
                columns={columns_index}
                dataSource={data?.list_financial_index}
                size={'small'}
                pagination={false}
              />
            </div>
          </Card>
        </Card>
        <p></p>           */}
        <Card
          title="贷款表现指标"
          className={styles.card}
          bordered={false}
          size="small"
          headStyle = {{color:'#2f54eb', fontSize: 16, fontWeight:'bold'}}
        >
          <Card title="" className={styles.card} bordered={false}>
            <div style={{ margin: 'auto', width: 1300 }}>
              <Table
                columns={columns_index}
                dataSource={data?.list_company_index}
                size={'small'}
                pagination={false}
              />
            </div>
          </Card>
        </Card>
        <p></p>          
        <Card 
          title="审批" 
          className={styles.card} 
          bordered={false}
          size="small"
          headStyle = {{color:'#2f54eb', fontSize: 16, fontWeight:'bold'}}
        >
          <Row gutter={16}>
            <Col span={6} push={1}>
              <ProFormMoney
                name="amount_approved"
                label={<FormattedMessage id="pages.loan_application_list.amount_approved" />}
                width="md"
                locale="en-US"
                rules={[
                  {
                    required: true,
                    message: 'Please input the amount.',
                  },
                ]}
                disabled={bApproved}
              //placeholder = {props.values.amount_approved}
              />
            </Col>
            <Col span={6} push={1}>
              <ProFormSelect
                name="currency"
                label={<FormattedMessage id="pages.util.currency" />}
                width="md"
                rules={[{ required: true, message: 'Please input the currency.' }]}
                valueEnum={{
                  USD: 'USD',
                  HKD: 'HKD',
                  CNY: 'CNY',
                }}
                disabled={bApproved}
              //placeholder = {props.values.currency}
              />
            </Col>
            <Col span={6} push={1}>
              <ProFormText
                name="annual_interest_rate_approved"
                label={
                  <FormattedMessage id="pages.loan_application_list.annual_interest_rate_approved" />
                }
                width="md"
                rules={[
                  {
                    required: true,
                    message: '',
                  },
                ]}
                disabled={bApproved}
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={6} push={1}>
              <ProFormDatePicker
                name="start_date_approved"
                width="md"
                label={<FormattedMessage id="pages.util.start_date" />}
                rules={[
                  {
                    required: true,
                    message: 'Please select the start date',
                  },
                ]}
                disabled={bApproved}
              //placeholder = {props.values.start_date_approved}
              />
            </Col>
            <Col span={6} push={1}>
              <ProFormDatePicker
                name="end_date_approved"
                width="md"
                label={<FormattedMessage id="pages.util.end_date" />}
                rules={[
                  {
                    required: true,
                    message: 'Please select the end date',
                  },
                ]}
                disabled={bApproved}
              //placeholder = {props.values.end_date_approved}
              />
            </Col>
            <Col span={6} push={1}>
              <ProFormText
                name="penalty_annual_interest_rate"
                label={
                  <FormattedMessage id="pages.loan_application_list.penalty_annual_interest_rate" />
                }
                width="md"
                rules={[
                  {
                    required: true,
                    message: '',
                  },
                ]}
                disabled={bApproved}
              />
              {/* <ProFormText
                name="number_of_installments_approved"
                label={
                  <FormattedMessage id="pages.loan_application_list.number_of_installments_approved" />
                }
                width="md"
                rules={[
                  {
                    required: true,
                    message: '',
                  },
                ]}
                disabled={bApproved}
              /> */}
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={6} push={1}>
              <ProFormSelect
                label={<FormattedMessage id="pages.util.status" />}
                width="md"
                name="status"
                rules={[{ required: true, message: '' }]}
                valueEnum={dictStatus}
              />
            </Col>
            <Col span={6} push={1}>
              <ProFormTextArea
                label={<FormattedMessage id="pages.util.remark" />}
                width="md"
                name="remark"
                rules={[{ required: false, message: '' }]}
              />
            </Col>
          </Row>
        </Card>
        <p></p>         
      </ProForm>
    );
  }
  else {   //采购计划货物抵押贷款审批
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
              <Button htmlType="button" onClick={onExit} key="exit">
                退出
              </Button>,
              ...doms,
            ];
          },
        }}            
      >

        <Card
          title="贷款申请信息"
          className="styles.card"
          bordered={false}
          size= "small"
          headStyle = {{color:'#2f54eb', fontSize: 16, fontWeight:'bold'}}
          //style={{ width: 500 }}
        >
          <Row gutter={16}>
            <Col span={6} push={1}>
              <ProFormText
                name="key"
                label={<FormattedMessage id="pages.loan_application_list.loan_application_id" />}
                width="md"
                disabled
              // placeholder = {props.values.key?.toString()}
              />
            </Col>
            <Col span={6} push={1}>
              <ProFormText
                name="borrower_id"
                label={<FormattedMessage id="pages.loan_application_list.company_id" />}
                width="md"
                disabled
              // placeholder = {props.values.borrower_id?.toString()}
              />
            </Col>
            <Col span={6} push={1}>
              <ProFormText
                name="borrower_name"
                label={<FormattedMessage id="pages.borrower_list.borrower.name_cn" />}
                width="md"
                disabled
              // placeholder = {props.values.borrower_name}
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={6} push={1}>
              <ProFormMoney
                name="amount"
                label={<FormattedMessage id="pages.loan_application.application_amount" />}
                width="md"
                locale="en-US"
                rules={[
                  {
                    required: true,
                    message: 'Please input the amount.',
                  },
                ]}
                disabled
              // placeholder = {props.values.amount?.toFixed(2)}
              />
            </Col>
            <Col span={6} push={1}>
              <ProFormSelect
                name="currency"
                label={<FormattedMessage id="pages.util.currency" />}
                width="md"
                rules={[{ required: true, message: 'Please input the currency.' }]}
                valueEnum={{
                  USD: 'USD',
                  HKD: 'HKD',
                  CNY: 'CNY',
                }}
                disabled
              // placeholder = {props.values.currency}
              />
            </Col>
            <Col span={6} push={1}>
              <ProFormText
                name="purpose"
                label={<FormattedMessage id="pages.loan_application_list.purpose" />}
                width="md"
                disabled
              // placeholder = {props.values.purpose}
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={6} push={1}>
              <ProFormText
                name="created_date"
                label={<FormattedMessage id="pages.loan_application_list.created_date" />}
                width="md"
                disabled
              // placeholder = {props.values.created_date}
              />
            </Col>
            <Col span={6} push={1}>
              <ProFormDatePicker
                name="start_date"
                width="md"
                label={<FormattedMessage id="pages.util.start_date" />}
                rules={[
                  {
                    required: true,
                    message: 'Please select the start date',
                  },
                ]}
                disabled
              // placeholder = {props.values.start_date}
              />
            </Col>
            <Col span={6} push={1}>
              <ProFormDatePicker
                name="end_date"
                width="md"
                label={<FormattedMessage id="pages.util.end_date" />}
                rules={[
                  {
                    required: true,
                    message: 'Please select the end date',
                  },
                ]}
                disabled
              // placeholder = {props.values.end_date}
              />
            </Col>
          </Row>
        </Card>
        <p></p>          
        
        <Card
          title="订单明细"
          className={styles.card}
          bordered={false}
          size="small"
          headStyle = {{color:'#2f54eb', fontSize: 16, fontWeight:'bold'}}
        >
          <Card title="" className={styles.card} bordered={false}>
            <div style={{ margin: 'auto', width: 1300 }}>
              <Table
                columns={columns}
                dataSource={data?.list_product}
                size={'small'}
                pagination={false}
              />
            </div>
          </Card>
        </Card>
        <p></p>          
        <Card
          title="采购计划进销存指标"
          className={styles.card}
          bordered={false}
          size="small"
          headStyle = {{color:'#2f54eb', fontSize: 16, fontWeight:'bold'}}
        >
          <Card title="" className={styles.card} bordered={false}>
            <div style={{ margin: 'auto', width: 1300 }}>
              <Table
                columns={columns_index}
                dataSource={data?.list_otb_plan_index}
                size={'small'}
                pagination={false}
              />
            </div>
          </Card>
        </Card>
        <p></p>  
        <Card
          title="销售及回本指标"
          className={styles.card}
          bordered={false}
          size="small"
          headStyle = {{color:'#2f54eb', fontSize: 16, fontWeight:'bold'}}
        >
          <Card title="" className={styles.card} bordered={false}>
            <div style={{ margin: 'auto', width: 1300 }}>
              <Table
                columns={columns_sales_through}
                dataSource={data?.list_price_elasticity}
                size={'small'}
                pagination={false}
              />
              <p>*时间单位为 月</p>
            </div>
          </Card>
        </Card>
        <p></p>  
        <Card
          title="财务指标"
          className={styles.card}
          bordered={false}
          size="small"
          headStyle = {{color:'#2f54eb', fontSize: 16, fontWeight:'bold'}}
        >
          <Card title="" className={styles.card} bordered={false}>
            <div style={{ margin: 'auto', width: 1300 }}>
              <Table
                columns={columns_index}
                dataSource={data?.list_financial_index}
                size={'small'}
                pagination={false}
              />
            </div>
          </Card>
        </Card>
        <p></p>          
        <Card
          title="贷款表现指标"
          className={styles.card}
          bordered={false}
          size="small"
          headStyle = {{color:'#2f54eb', fontSize: 16, fontWeight:'bold'}}
        >
          <Card title="" className={styles.card} bordered={false}>
            <div style={{ margin: 'auto', width: 1300 }}>
              <Table
                columns={columns_index}
                dataSource={data?.list_company_index}
                size={'small'}
                pagination={false}
              />
            </div>
          </Card>
        </Card>
        <p></p>          
        <Card 
          title="审批" 
          className={styles.card} 
          bordered={false}
          size="small"
          headStyle = {{color:'#2f54eb', fontSize: 16, fontWeight:'bold'}}
        >
          <Row gutter={16}>
            <Col span={6} push={1}>
              <ProFormMoney
                name="amount_approved"
                label={<FormattedMessage id="pages.loan_application_list.amount_approved" />}
                width="md"
                locale="en-US"
                rules={[
                  {
                    required: true,
                    message: 'Please input the amount.',
                  },
                ]}
                disabled={bApproved}
              //placeholder = {props.values.amount_approved}
              />
            </Col>
            <Col span={6} push={1}>
              <ProFormSelect
                name="currency"
                label={<FormattedMessage id="pages.util.currency" />}
                width="md"
                rules={[{ required: true, message: 'Please input the currency.' }]}
                valueEnum={{
                  USD: 'USD',
                  HKD: 'HKD',
                  CNY: 'CNY',
                }}
                disabled={bApproved}
              //placeholder = {props.values.currency}
              />
            </Col>
            <Col span={6} push={1}>
              <ProFormText
                name="annual_interest_rate_approved"
                label={
                  <FormattedMessage id="pages.loan_application_list.annual_interest_rate_approved" />
                }
                width="md"
                rules={[
                  {
                    required: true,
                    message: '',
                  },
                ]}
                disabled={bApproved}
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={6} push={1}>
              <ProFormDatePicker
                name="start_date_approved"
                width="md"
                label={<FormattedMessage id="pages.util.start_date" />}
                rules={[
                  {
                    required: true,
                    message: 'Please select the start date',
                  },
                ]}
                disabled={bApproved}
              //placeholder = {props.values.start_date_approved}
              />
            </Col>
            <Col span={6} push={1}>
              <ProFormDatePicker
                name="end_date_approved"
                width="md"
                label={<FormattedMessage id="pages.util.end_date" />}
                rules={[
                  {
                    required: true,
                    message: 'Please select the end date',
                  },
                ]}
                disabled={bApproved}
              //placeholder = {props.values.end_date_approved}
              />
            </Col>
            <Col span={6} push={1}>
              <ProFormText
                name="penalty_annual_interest_rate"
                label={
                  <FormattedMessage id="pages.loan_application_list.penalty_annual_interest_rate" />
                }
                width="md"
                rules={[
                  {
                    required: true,
                    message: '',
                  },
                ]}
                disabled={bApproved}
              />
              {/* <ProFormText
                name="number_of_installments_approved"
                label={
                  <FormattedMessage id="pages.loan_application_list.number_of_installments_approved" />
                }
                width="md"
                rules={[
                  {
                    required: true,
                    message: '',
                  },
                ]}
                disabled={bApproved}
              /> */}
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={6} push={1}>
              <ProFormSelect
                label={<FormattedMessage id="pages.util.status" />}
                width="md"
                name="status"
                rules={[{ required: true, message: '' }]}
                valueEnum={dictStatus}
              />
            </Col>
            <Col span={6} push={1}>
              <ProFormTextArea
                label={<FormattedMessage id="pages.util.remark" />}
                width="md"
                name="remark"
                rules={[{ required: false, message: '' }]}
              />
            </Col>
          </Row>
        </Card>
        <p></p>         
      </ProForm>
    );
  }
};

export default ApprovalForm;
