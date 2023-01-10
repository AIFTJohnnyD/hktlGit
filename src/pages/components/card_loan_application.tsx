import { Card, Col, Row, Tabs, Table, Columns, Spin } from 'antd';
import { ProTable, ProColumns } from '@ant-design/pro-table';
import moment from 'moment';
import { FormattedMessage } from 'umi';

type LoanApplicationItem = {
    key: string;
    today_balance: number;
    end_date: Date;
    status: string;
}

function translate_status(status: string) {
    return <FormattedMessage id={'pages.application.' + status}/>;
}

const Card_Load_Applicatoin = ({
    loading,
    card_name,
    list_loan_application,
}:{
    loading: any,
    card_name: string,
    list_loan_application: any,
}) => {
    const columns_loan: Columns<LoanApplicationItem>[] = [
        {
          title: (<FormattedMessage id='pages.util.id'/>),
          dataIndex: 'key',
          valueType: 'textarea',
        },
        {
          title: "未结清余额(含利息)",
          dataIndex: 'today_balance',
          valueType: 'digit',
        },
        {
          title: "最后还款日",
          dataIndex: 'end_date',
          valueType: 'textarea',
          render: (text, record, index) => {
            if(text == '...'){
              return '...';
            }else {
              return moment(text).format("YYYY-MM-DD");
            }
          }
        },
        {
          title: (<FormattedMessage id='pages.util.status'/>),
          dataIndex: 'status',
          valueType: 'textarea',
          render: (text, record, index) => {
            if(text == '...'){
              return '...';
            }else {
              return (translate_status(record?.status));
            }
          },  
        }
      ];

    return(
    <>
        <Card title={card_name} bordered={false}>
            {!loading && (
                <Table
                    columns={columns_loan}
                    dataSource={list_loan_application} 
                    size={"small"}
                    pagination={false}
                />
            )}
            {loading && <div style={{textAlign: 'center'}}><Spin size='large'/></div>}
        </Card>
    </>
)};
      
export default Card_Load_Applicatoin;