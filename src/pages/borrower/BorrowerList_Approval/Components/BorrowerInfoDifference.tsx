import { ProColumns } from "@ant-design/pro-table";
import { Card, message, Row, Col, Table, Button, Descriptions, Spin, Space} from "antd";
import { useEffect, useState, useRef } from "react";
import { FormattedMessage } from "umi";
import styles from './../style.less';
import { ProFormInstance } from '@ant-design/pro-form';
import { Progress } from 'antd';

export type BorrowerInfoDifferenceProps = {
  borrower_key: any;
  show_documents: boolean;
};

const BorrowerInfoDifference: React.FC<BorrowerInfoDifferenceProps> = (props) => {

  const [data_current, setData_current] = useState({});
  const [contact_hk_current, setContact_hk_current] = useState({});
  const [contact_cn_current, setContact_cn_current] = useState({});
  const [data_other, setData_other] = useState({});
  const [contact_hk_other, setContact_hk_other] = useState({});
  const [contact_cn_other, setContact_cn_other] = useState({});
  const [loading_api, setLoading_api] = useState(true);
  const [data_shareholder_person_hk, setData_shareholder_person_hk] = useState([]);
  const [data_director_person_hk, setData_director_person_hk] = useState([]);
  const [data_shareholder_person_cn, setData_shareholder_person_cn] = useState([]);
  const [data_director_person_cn, setData_director_person_cn] = useState([]);
  const [data_attachment_hk, setData_attachment_hk] = useState([]);
  const [data_attachment_cn, setData_attachment_cn] = useState([]);

  const [get_details, setGet_details] = useState<boolean>(false);


  const DetermineTableType = (current: Array<any>, other: Array<any>) => {
    if (current === undefined || other === undefined) {
      return [null, null, null];
    } else if (current.length == other.length) {
      return [1, current.length, 0]; //2 => 2
    } else if (current.length > other.length) {
      return [2, other.length, current.length - other.length] ; //2 => 1
    } else {
      return [3, current.length, other.length - current.length]; //2 => 3
    }
  }
  
  const GetDifferenceTable = (current: Array<any>, other: Array<any>) => {
    var [type, loop_count, difference] = DetermineTableType(current, other);
    var records_array: any[] = [];
    if (type == 1) {
      for (let i = 0; i < loop_count; i++) {
        var record_object = {};
        Object.keys(current[i]).forEach(function(key) {
            record_object[key] = {'current': current[i][key], 'other' : other[i][key]}
        });
        record_object["record_status"] = "modified";
        records_array.push(record_object);
      }
    } 
    else if (type == 2) {
      for (let i = 0; i < loop_count; i++) {
        var record_object = {};
        Object.keys(other[i]).forEach(function(key) {
            record_object[key] = {'current': current[i][key], 'other' : other[i][key]}
        });
        record_object["record_status"] = "modified";
        records_array.push(record_object);
      }
      for (let i = loop_count; i < current.length; i++) {
        var record_object = {};
        Object.keys(current[i]).forEach(function(key) {
            record_object[key] = {'current': current[i][key], 'other' : null}
        });
        record_object["record_status"] = "deleted";
        records_array.push(record_object);
      }
    } 
    else if (type == 3) {
      for (let i = 0; i < loop_count; i++) {
        var record_object = {};
        Object.keys(current[i]).forEach(function(key) {
            record_object[key] = {'current': current[i][key], 'other' : other[i][key]}
        });
        record_object["record_status"] = "modified";
        records_array.push(record_object);
      }
      for (let i = loop_count; i < other.length; i++) {
        var record_object = {};
        Object.keys(other[i]).forEach(function(key) {
            record_object[key] = {'current': null, 'other' : other[i][key]}
        });
        record_object["record_status"] = "added";
        records_array.push(record_object);
      }
    }
    return records_array;
  }
    
  useEffect(async () => {
      var temp_current = {};
      var temp_other = {};

      //console.log(props)
      //console.log(props.borrower_key)

      if ((typeof(props.borrower_key) == 'number' || typeof(props.borrower_key) == 'string') && (typeof(props.show_documents) == 'boolean')) {
          await fetch('/api/borrower/get_borrower_from_id?borrower_key=' + props.borrower_key, {
          method: 'GET'
          })
          .then(res => res.json())
          .then (data => {
              setData_current(data.data);
              temp_current = data.data;
              setContact_hk_current(data.data.contact_hk[0])
              setContact_cn_current(data.data.contact_cn[0])
          })
          .catch(function (error) {
              console.log(error);
          });
      
          await fetch('/api/borrower/get_borrower_from_qichacha?borrower_key=' + props.borrower_key, {
          method: 'GET'
          })
              .then(res => res.json())
              .then (data => {
              setData_other(data.data);
              temp_other = data.data;
              setContact_hk_other(data.data.contact_hk[0])
              setContact_cn_other(data.data.contact_cn[0])
          })
          .catch(function (error) {
          console.log(error);
          });
      
          var sh_hk = GetDifferenceTable(temp_current['shareholder_person_hk'], temp_other['shareholder_person_hk']);
          setData_shareholder_person_hk(sh_hk);
      
          var d_hk = GetDifferenceTable(temp_current['director_person_hk'], temp_other['director_person_hk']);
          setData_director_person_hk(d_hk);
      
          var sh_cn = GetDifferenceTable(temp_current['shareholder_person_cn'], temp_other['shareholder_person_cn'])
          setData_shareholder_person_cn(sh_cn);
      
          var d_cn = GetDifferenceTable(temp_current['director_person_cn'], temp_other['director_person_cn']);
          setData_director_person_cn(d_cn);

          if (props.show_documents) {
              const attachment_keys_hk = ['file_br_hk', 'file_director_hk', 'file_ci_hk', 'file_nar1_hk', 'file_moa_hk', 'file_shareholder_hk', 'file_address_proof_hk', 'file_director_credit_report_hk', 'file_financial_statements_hk', 'file_other_hk'];
          
              const attachment_keys_cn = ['file_br_cn', 'file_policy_cn', 'file_director_cn', 'file_shareholder_cn', 'file_director_credit_report_cn', 'file_company_credit_report_cn', 'file_financial_statements_cn', 'file_other_cn'];
          
              var attachment_records = [];
              attachment_keys_hk.forEach((key) => {
                // console.log(key)
                if (temp_current[key].length != 0 || temp_other[key] != 0) {
                    var difference_table = GetDifferenceTable(temp_current[key], temp_other[key]);
                    var attachment_record = {'uid': key, 'files': difference_table};
                    attachment_records.push(attachment_record);
                }
              });
              setData_attachment_hk(attachment_records);
              attachment_records = [];
              attachment_keys_cn.forEach((key) => {
              if (temp_current[key].length != 0 || temp_other[key] != 0) {
                  var difference_table = GetDifferenceTable(temp_current[key], temp_other[key]);
                  var attachment_record = {'uid': key, 'files': difference_table};
                  attachment_records.push(attachment_record);
              }
              });
              setData_attachment_cn(attachment_records);
          }
          setLoading_api(false);
      }
  }, [])
  
  const FormatChanges = (string1: string, string2: string) => {
      return (<><s>{string1}</s>&nbsp;<b>{string2}</b></>);
  }
  
  const FormatChangesDeleted = (string: string) => {
      return (<><span style={{color:'grey'}}>{string}</span></>);
  }
  
  const FormatChangesAdded = (string: string) => {
      return (<><span style={{color:'blue'}}>{string}</span></>);
  }
  
  const FormatAttachmentLink = (obj: any) => {
      if (obj['record_status'] == 'modified') {
          if ((obj['name']['current'] != obj['name']['other']) || (obj['url']['current'] != obj['url']['other'])) {
          return (<><s><a href={obj['url']['current']}>{obj['name']['current']}</a></s>&nbsp;<a href={obj['url']['other']}>{obj['name']['other']}</a><br/></>)
          } else {
          return (<><a href={obj['url']['current']}>{obj['name']['current']}</a><br/></>)
          }
      } else if (obj['record_status'] == 'deleted') {
          return (<><a style = {{color: 'grey'}} href={obj['url']['current']}>{obj['name']['current']}</a></>);
      } else if (obj['record_status'] == 'added') {
          return (<><a style = {{color: 'blue'}} href={obj['url']['other']}>{obj['name']['other']}</a></>);
      }
      return (<><a href={obj['url']['current']}>{obj['name']['current']}</a><br/></>)
  }
  
  const FormatAttachmentLinks = (list: Array<any>) => {
      return list.map(FormatAttachmentLink);
  }
  
  const CompareData = (key: string) => {
      if (data_current[key] == data_other[key]) {
        return data_current[key];
      } else {
        return FormatChanges(data_current[key], data_other[key]);
      }
  }
  
  const CompareDataContact = (useStateObj1: any, useStateObj2: any, key: string) => {
      if (useStateObj1[key] == useStateObj2[key]) {
        return useStateObj1[key];
      } else {
        return FormatChanges(useStateObj1[key], useStateObj2[key]);
      }
  }
  
  const CompareDataStrings = (string1: string, string2: string, status: string) => {
      if (string1 == string2) {
        return string1;
      } else {
        if (status == 'modified') {
          return FormatChanges(string1, string2);
        } else if (status == 'deleted') {
          return FormatChangesDeleted(string1);
        } else if (status == 'added') {
          return FormatChangesAdded(string2)
        }
      }
  }

  const columns_shareholder_person: ProColumns[] = [
    {
      title: (<FormattedMessage id='pages.borrower_form.shareholder.person.name'/>),
      dataIndex: 'shareholder_person_name',
      valueType: 'textarea',
      render: (text, record, index) => {
        if (text === undefined) {
          return null;
        } else {
          return CompareDataStrings(text['current'], text['other'], record['record_status']);
        }
      }
    },
    {
      title: (<FormattedMessage id='pages.borrower_form.shareholder.person.name_english'/>),
      dataIndex: 'shareholder_person_name_english',
      valueType: 'textarea',
      render: (text, record, index) => {
        if (text === undefined) {
          return null;
        } else {
          return CompareDataStrings(text['current'], text['other'], record['record_status']);
        }
      }
    },       
        {
      title: (<FormattedMessage id='pages.borrower_form.shareholder.person.nationality'/>),
      dataIndex: 'shareholder_person_nationality',
      valueType: 'textarea',
      render: (text, record, index) => {
        if (text === undefined) {
          return null;
        } else {
          return CompareDataStrings(text['current'], text['other'], record['record_status']);
        }
      }
    },       
    {
      title: (<FormattedMessage id='pages.borrower_form.shareholder.person.position'/>),
      dataIndex: 'shareholder_person_position',
      valueType: 'textarea',
      render: (text, record, index) => {
        if (text === undefined) {
          return null;
        } else {
          return CompareDataStrings(text['current'], text['other'], record['record_status']);
        }
      }
    },       
        {
      title: (<FormattedMessage id='pages.borrower_form.shareholder.person.phone'/>),
      dataIndex: 'shareholder_person_phone',
      valueType: 'textarea',
      render: (text, record, index) => {
        if (text === undefined) {
          return null;
        } else {
          return CompareDataStrings(text['current'], text['other'], record['record_status']);
        }
      }
    },
    {
      title: (<FormattedMessage id='pages.borrower_form.shareholder.person.email'/>),
      dataIndex: 'shareholder_person_email',
      valueType: 'textarea',
      render: (text, record, index) => {
        if (text === undefined) {
          return null;
        } else {
          return CompareDataStrings(text['current'], text['other'], record['record_status']);
        }
      }
    },       
        {
      title: (<FormattedMessage id='pages.borrower_form.shareholder.person.rate'/>),
      dataIndex: 'shareholder_person_rate',
      valueType: 'textarea',
      render: (text, record, index) => {
        if (text === undefined) {
          return null;
        } else {
          return CompareDataStrings(text['current'], text['other'], record['record_status']);
        }
      }
    },       
    {
      title: (<FormattedMessage id='pages.borrower_form.shareholder.person.address'/>),
      dataIndex: 'shareholder_person_address',
      valueType: 'textarea',
      render: (text, record, index) => {
        if (text === undefined) {
          return null;
        } else {
          return CompareDataStrings(text['current'], text['other'], record['record_status']);
        }
      }
    },
    {
      title: '操作',
      dataIndex: 'APIButton',
      valueType: 'radioButton',
      key: 'APIButton',
      // width: '20%',
      render: () => {
         return (
          <Space>
            <Button type="primary" 
              onClick={() => {
                window.open("/borrower/borrower_shareholder_info?id=1",'newwindow1','height=800, width=1000, top=160, left=500, toolbar=no, menubar=no, status=no')
              }}
              disabled={!get_details}
              >详情            
            </Button>
         </Space>
        )
      }
    },     
  ];
  
  const columns_director_person: ProColumns[] = [
    {
      title: (<FormattedMessage id='pages.borrower_form.director.person.name'/>),
      dataIndex: 'director_person_name',
      valueType: 'textarea',
      render: (text, record, index) => {
        if (text === undefined) {
          return null;
        } else {
          return CompareDataStrings(text['current'], text['other'], record['record_status']);
        }
      }
    },       
    {
      title: (<FormattedMessage id='pages.borrower_form.director.person.name_english'/>),
      dataIndex: 'director_person_name_english',
      valueType: 'textarea',
      render: (text, record, index) => {
        if (text === undefined) {
          return null;
        } else {
          return CompareDataStrings(text['current'], text['other'], record['record_status']);
        }
      }
    },       
        {
      title: (<FormattedMessage id='pages.borrower_form.director.person.nationality'/>),
      dataIndex: 'director_person_nationality',
      valueType: 'textarea',
      render: (text, record, index) => {
        if (text === undefined) {
          return null;
        } else {
          return CompareDataStrings(text['current'], text['other'], record['record_status']);
        }
      }
    },       
    {
      title: (<FormattedMessage id='pages.borrower_form.director.person.position'/>),
      dataIndex: 'director_person_position',
      valueType: 'textarea',
      render: (text, record, index) => {
        if (text === undefined) {
          return null;
        } else {
          return CompareDataStrings(text['current'], text['other'], record['record_status']);
        }
      }
    },       
        {
      title: (<FormattedMessage id='pages.borrower_form.director.person.phone'/>),
      dataIndex: 'director_person_phone',
      valueType: 'textarea',
      render: (text, record, index) => {
        if (text === undefined) {
          return null;
        } else {
          return CompareDataStrings(text['current'], text['other'], record['record_status']);
        }
      }
    },       
    {
      title: (<FormattedMessage id='pages.borrower_form.director.person.email'/>),
      dataIndex: 'director_person_email',
      valueType: 'textarea',
      render: (text, record, index) => {
        if (text === undefined) {
          return null;
        } else {
          return CompareDataStrings(text['current'], text['other'], record['record_status']);
        }
      }
    },
    {
      title: (<FormattedMessage id='pages.borrower_form.director.person.address'/>),
      dataIndex: 'director_person_address',
      valueType: 'textarea',
      render: (text, record, index) => {
        if (text === undefined) {
          return null;
        } else {
          return CompareDataStrings(text['current'], text['other'], record['record_status']);
        }
      }
    },       
  ];
  
  const columns_views_doc: ProColumns[] = [
    {
      title: (<FormattedMessage id='pages.borrower_form.sha'  defaultMessage='文件类型'/>),
      dataIndex: '',
      width: '55%',
      valueType: 'textarea',
      render: (dom, obj) => {
        if(obj.uid.indexOf('file_br_hk') != -1){
          return (          
            '商业登记证(BR)'
          );
        }
        else if(obj.uid.indexOf('file_ci_hk') != -1){
          return (          
            '公司注册证书(CI)'
          );
        } 
        else if(obj.uid.indexOf('file_nar1_hk') != -1){
          return (          
            '周年申报表(NAR1)'
          ); 
        } 
        else if(obj.uid.indexOf('file_moa_hk') != -1){
          return (          
            '公司章程(MOA)'
          ); 
        } 
        else if(obj.uid.indexOf('file_shareholder_hk') != -1){
          return (          
            '公司股东身份证明文件'
          ); 
        }
        else if(obj.uid.indexOf('file_director_hk') != -1){
          return (          
            '董事身份证明文件'
          ); 
        } 
        else if(obj.uid.indexOf('file_address_proof_hk') != -1){
          return (          
            '公司股东/实控人地址证明'
          ); 
        } 
        else if(obj.uid.indexOf('file_director_credit_report_hk') != -1){
          return (          
            '公司股东/实控人信贷报告'
          ); 
        } 
        else if(obj.uid.indexOf('file_financial_statements_hk') != -1){
          return (          
            '财务报表'
          ); 
        } 
        else if(obj.uid.indexOf('file_br_cn') != -1){
          return (          
            '营业执照'
          ); 
        } 
        else if(obj.uid.indexOf('file_policy_cn') != -1){
          return (          
            '公司章程(MOA)'
          ); 
        } 
        else if(obj.uid.indexOf('file_director_cn') != -1){
          return (          
            '法人身份证'
          ); 
        } 
        else if(obj.uid.indexOf('file_shareholder_cn') != -1){
          return (          
            '股东/实控人身份证明'
          ); 
        } 
        else if(obj.uid.indexOf('file_director_credit_report_cn') != -1){
          return (          
            '法人及股东/实控人信贷报告'
          ); 
        } 
        else if(obj.uid.indexOf('file_company_credit_report_cn') != -1){
          return (          
            '企业信用报告'
          ); 
        } 
        else if(obj.uid.indexOf('file_financial_statements_cn') != -1){
          return (          
            '财务报表'
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
      width: '45%',
      valueType: 'option',
      render: (dom, obj) => {
        return (
          FormatAttachmentLinks(obj.files)
        );
      },
    }
  ];

  const increase = () => {
    setPercent((prevPercent) => {
      const newPercent = prevPercent + 1;
      if (newPercent > 100) {
        return 100;
      }
      return newPercent;
    });
  };

  const setUpdateDate = () => {
    setGet_details(true)
    message.success('获取股东详细信息完成');
  };
  const [percent, setPercent] = useState<number>(0);

  function btn_sync_borrower(){
    fetch('/api/borrower/get_shareholder_preson_message', {
      method: 'GET'
    })
    try {
      var i = 0;
      while (i < 100)
      {
        i += 1;
        setTimeout(increase, i*50);
      }
      setTimeout(setUpdateDate,5000);
    } 
    catch {
      console.log("onFinisherrorInfo提交失败")
    }
  }
  const formRef = useRef<ProFormInstance>();

  return (
    <>
    {/* <Card
        className="styles.card"
        bordered={false}
        size= "small"
        headStyle = {{color:'#2f54eb', fontSize: 16, fontWeight:'bold'}}
        >
        <Button size='small' type="primary" onClick={btn_sync_borrower}>提交</Button>  
        <Progress 
          percent={percent} 
          strokeWidth={5} />
        <ProFormText 
          fieldProps={{
            bordered:false,
            allowClear:false
          }}
          width="md" 
          name="update_date" 
          label="最后更新时间：" 
          placeholder="" />
    </Card> */}




    <Card
      title={
        <Row> 
          <FormattedMessage id='pages.loan_form.basic_info'/>  
          <div style={{width:300}}> </div>
          <div style={{width:300}}> <Progress percent={percent} strokeWidth={8} /> </div> 
          <div style={{width:100}}> </div>
          <Button type="primary" onClick={btn_sync_borrower}>获取股东详细信息</Button>
        </Row>
      }
      extra={
            <p style = {{color: 'blue', fontSize: 14}}> 上次更新时间: {data_current['modified_datetime']}</p>
      }
      className="styles.card"
      bordered={false}
      size= "small"
      headStyle = {{color:'#2f54eb', fontSize: 16, fontWeight:'bold'}}
      //style={{ marginLeft: 50 }}
    >
      {!loading_api &&
        <div style={{margin: 'auto', width: 1500}}> 
          <Descriptions style={{ marginBottom: 24 }} title={"香港公司基本信息"} column={4}>
          <Descriptions.Item label={<FormattedMessage id='pages.borrower_list.borrower.name'/>}>{CompareData('name_hk')}</Descriptions.Item>
          <Descriptions.Item label={<FormattedMessage id='pages.borrower_list.borrower.br_code_hk'/>}>{CompareData('br_code_hk')}</Descriptions.Item>
          <Descriptions.Item label={<FormattedMessage id='pages.borrower_list.borrower.address'/>}>{CompareData('address_hk')}</Descriptions.Item>
          <Descriptions.Item label={<FormattedMessage id='pages.borrower_list.borrower.link'/>}>{CompareData('company_link_hk')}</Descriptions.Item>
          <Descriptions.Item label={<FormattedMessage id='pages.borrower_list.borrower.contact.name'/>}>{CompareDataContact(contact_hk_current, contact_hk_other, 'name')}</Descriptions.Item>
          <Descriptions.Item label={<FormattedMessage id='pages.borrower_list.borrower.contact.phone'/>}>{CompareDataContact(contact_hk_current, contact_hk_other, 'phone')}</Descriptions.Item>
          <Descriptions.Item label={<FormattedMessage id='pages.borrower_list.borrower.contact.email'/>}>{CompareDataContact(contact_hk_current, contact_hk_other, 'email')}</Descriptions.Item>
          <Descriptions.Item label={<FormattedMessage id='pages.borrower_list.borrower.contact.position'/>}>{CompareDataContact(contact_hk_current, contact_hk_other, 'position')}</Descriptions.Item>
          </Descriptions>

          <Descriptions style={{ marginBottom: 24 }} title={"关联公司基本信息"} column={4}>
          <Descriptions.Item label={<FormattedMessage id='pages.borrower_list.borrower.name'/>}>{CompareData('name_cn')}</Descriptions.Item>
          <Descriptions.Item label={<FormattedMessage id='pages.borrower_list.borrower.credit_code_cn'/>}>{CompareData('credit_code_cn')}</Descriptions.Item>
          <Descriptions.Item label={<FormattedMessage id='pages.borrower_list.borrower.address'/>}>{CompareData('address_cn')}</Descriptions.Item>
          <Descriptions.Item label={<FormattedMessage id='pages.borrower_list.borrower.link'/>}>{CompareData('company_link_cn')}</Descriptions.Item>
          <Descriptions.Item label={<FormattedMessage id='pages.borrower_list.borrower.contact.name'/>}>{CompareDataContact(contact_cn_current, contact_cn_other, 'name')}</Descriptions.Item>
          <Descriptions.Item label={<FormattedMessage id='pages.borrower_list.borrower.contact.phone'/>}>{CompareDataContact(contact_cn_current, contact_cn_other, 'phone')}</Descriptions.Item>
          <Descriptions.Item label={<FormattedMessage id='pages.borrower_list.borrower.contact.email'/>}>{CompareDataContact(contact_cn_current, contact_cn_other, 'email')}</Descriptions.Item>
          <Descriptions.Item label={<FormattedMessage id='pages.borrower_list.borrower.contact.position'/>}>{CompareDataContact(contact_cn_current, contact_cn_other, 'position')}</Descriptions.Item>
          </Descriptions>
        </div>
      }
      {loading_api && <div style={{textAlign: 'center'}}><Spin size='large'/></div>}
    </Card>
    <p></p>
    <Card
      title={<FormattedMessage id='pages.borrower_list.shareholder_director_information_hk'/>}
      className="styles.card"
      bordered={false}
      size= "small"
      headStyle = {{color:'#2f54eb', fontSize: 16, fontWeight:'bold'}}
    >
      {!loading_api &&
        <>
        <Card title="" className={styles.card} bordered={false}>
          <div style={{margin: 'auto', width: 1200}}>
            <Table 
              title={() => <FormattedMessage id='pages.borrower_list.shareholder_person'/>}
              columns={columns_shareholder_person} 
              dataSource={data_shareholder_person_hk} 
              size={"small"}
              pagination={false}
            />          
          </div>
        </Card>
        {/* <Card title="" className={styles.card} bordered={false}>
        <div style={{margin: 'auto', width: 1200}}>
            <Table 
            title={() => <FormattedMessage id='pages.borrower_list.shareholder_company'/>}
            columns={columns_shareholder_company} 
            dataSource={data?.shareholder_company_hk} 
            size={"small"}
            pagination={false}
            />
        </div>
        </Card> */}
        <Card title="" className={styles.card} bordered={false}>
            <div style={{margin: 'auto', width: 1200}}>
                <Table 
                title={() => <FormattedMessage id='pages.borrower_list.director_person'/>}
                columns={columns_director_person} 
                dataSource={data_director_person_hk} 
                size={"small"}
                pagination={false}
                />
            </div>
        </Card>
        {/* <Card title="" className={styles.card} bordered={false}>
        <div style={{margin: 'auto', width: 1200}}>
            <Table 
            title={() => <FormattedMessage id='pages.borrower_list.director_company'/>}
            columns={columns_director_company} 
            dataSource={data?.director_company_hk} 
            size={"small"}
            pagination={false}
            />
        </div>
        </Card> */}
        </>
      }
      {loading_api && <div style={{textAlign: 'center'}}><Spin size='large'/></div>}
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
      {!loading_api &&
        <>
        <Card title="" className={styles.card} bordered={false}>
          <div style={{margin: 'auto', width: 1200}}>
          <Table 
            title={() => <FormattedMessage id='pages.borrower_list.shareholder_person'/>}
            columns={columns_shareholder_person} 
            dataSource={data_shareholder_person_cn} 
            size={"small"}
            pagination={false}
          />
          </div>
        </Card>
        {/* <Card title="" className={styles.card} bordered={false}>
          <div style={{margin: 'auto', width: 1200}}>
          <Table 
            title={() => <FormattedMessage id='pages.borrower_list.shareholder_company'/>}
            columns={columns_shareholder_company} 
            dataSource={data?.shareholder_company_cn} 
            size={"small"}
            pagination={false}
          />
          </div>
        </Card> */}
        <Card title="" className={styles.card} bordered={false}>
          <div style={{margin: 'auto', width: 1200}}>
          <Table 
            title={() => <FormattedMessage id='pages.borrower_list.director_person'/>}
            columns={columns_director_person} 
            dataSource={data_director_person_cn} 
            size={"small"}
            pagination={false}
          />
          </div>
        </Card>
        {/* <Card title="" className={styles.card} bordered={false}>
          <div style={{margin: 'auto', width: 1200}}>
          <Table 
            title={() => <FormattedMessage id='pages.borrower_list.director_company'/>}
            columns={columns_director_company} 
            dataSource={data?.director_company_cn} 
            size={"small"}
            pagination={false}
          />          </div>
        </Card> */}
        </>
      }
      {loading_api && <div style={{textAlign: 'center'}}><Spin size='large'/></div>}
    </Card>
    <p></p>

    {props.show_documents &&
      <>
      <Card
        title={<FormattedMessage id='pages.borrower_list.document_upload'/>}
        className="styles.card"
        bordered={false}
        size= "small"
        headStyle = {{color:'#2f54eb', fontSize: 16, fontWeight:'bold'}}
      >
        {!loading_api &&
        <>
        <Card title="" className={styles.card} bordered={false}>
          <div style={{margin: 'auto', width: 1200}}>
          <Table 
            title={() => <FormattedMessage id='pages.borrower_list.document_upload.company_hk'/>}
            columns={columns_views_doc} 
            dataSource={data_attachment_hk} 
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
            dataSource={data_attachment_cn} 
            size={"small"}
            pagination={false}
          />
          </div>
        </Card>
        </>
        }
        {loading_api && <div style={{textAlign: 'center'}}><Spin size='large'/></div>}                 
      </Card>
      </>
    }
    </>
  );
}

export default BorrowerInfoDifference