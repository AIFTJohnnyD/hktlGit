import { CloseCircleOutlined } from '@ant-design/icons';
import { Card, Col, Popover, Row, message, UploadFile } from 'antd';
import { FC, useEffect } from 'react';
import { useState } from 'react';
import ProForm, {
  ProFormUploadButton,
} from '@ant-design/pro-form';
import type { ProColumnType } from '@ant-design/pro-table';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { submitForm } from './service';
import styles from './style.less';
import { FormattedMessage, request, useRequest } from 'umi';

type InternalNamePath = (string | number)[];

const fieldLabels = {
  name: '仓库名',
  url: '仓库域名',
  owner: '仓库管理员',
  approver: '审批人',
  dateRange: '生效日期',
  type: '仓库类型',
  name2: '任务名',
  url2: '任务描述',
  owner2: '执行人',
  approver2: '责任人',
  dateRange2: '生效日期',
  type2: '任务类型',
};

interface ErrorField {
  name: InternalNamePath;
  errors: string[];
}

const AdvancedForm: FC<Record<string, any>> = () => {
  let file_br_cn: UploadFile[] = [
  ];
  let file_policy_cn: UploadFile[] = [
  ];
  let file_director_cn: UploadFile[] = [
  ];

  let file_shareholder_cn: UploadFile[] = [
  ];
  let file_director_credit_report_cn: UploadFile[] = [
  ];
  let file_company_credit_report_cn: UploadFile[] = [
  ];

  let file_financial_statements_cn: UploadFile[] = [
  ];
  let file_other_cn: UploadFile[] = [
  ];
  const [error, setError] = useState<ErrorField[]>([]);
  useEffect(() => {
    console.log("useEffect");
  }, []);
  const { data, error1, loading } = useRequest(() => {
    return request('/api/borrower/get_borrower');
  });
  console.log("filedata",typeof(data));
  console.log("filedata",data);
  if(typeof(data)!="undefined"){
    //显示从index为12开始的数组
    
    console.log("filedatatypeof(data)!=undefined");
    console.log("filedatafileList");
    file_br_cn=data.file_br_cn.splice(0,2)
    file_policy_cn=data.file_policy_cn.splice(0,2)
    file_director_cn=data.file_director_cn.splice(0,2)

    file_shareholder_cn=data.file_shareholder_cn.splice(0,2)
    file_director_credit_report_cn=data.file_director_credit_report_cn.splice(0,2)
    file_company_credit_report_cn=data.file_company_credit_report_cn.splice(0,2)

    file_financial_statements_cn=data.file_financial_statements_cn.splice(0,2)
    file_other_cn=data.file_other_cn.splice(0,2)
  }
  const getErrorInfo = (errors: ErrorField[]) => {
    console.log("getErrorInfo",errors);
    
    const errorCount = errors.filter((item) => item.errors.length > 0).length;
    if (!errors || errorCount === 0) {
      return null;
    }
    const scrollToField = (fieldKey: string) => {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    };
    const errorList = errors.map((err) => {
      if (!err || err.errors.length === 0) {
        return null;
      }
      const key = err.name[0] as string;
      return (
        <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
          <CloseCircleOutlined className={styles.errorIcon} />
          <div className={styles.errorMessage}>{err.errors[0]}</div>
          <div className={styles.errorField}>{fieldLabels[key]}</div>
        </li>
      );
    });
    return (
      <span className={styles.errorIcon}>
        <Popover
          title="表单校验信息"
          content={errorList}
          overlayClassName={styles.errorPopover}
          trigger="click"
          getPopupContainer={(trigger: HTMLElement) => {
            if (trigger && trigger.parentNode) {
              return trigger.parentNode as HTMLElement;
            }
            return trigger;
          }}
        >
          <CloseCircleOutlined />
        </Popover>
        {errorCount}
      </span>
    );
  };

  const onFinish = async (values: Record<string, any>) => {
    setError([]);
    console.log("valueserrorInfo",values);
    
    try {
      await submitForm("full",values);
      message.success('提交成功');
    } catch {
      console.log("onFinisherrorInfo提交失败")
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    setError(errorInfo.errorFields);
    console.log("onFinishFailed中的errorInfo",errorInfo);
    
  };

  return (
    <ProForm
      layout="vertical"
      hideRequiredMark
      submitter={{
        render: (props, dom) => {
          return (
            <FooterToolbar>
              {getErrorInfo(error)}
              {dom}
            </FooterToolbar>
          );
        },
      }}
      initialValues={{   }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <PageContainer content="">
        <Card title={<FormattedMessage id='pages.borrower_form.Mainlandfile_upload'/>} className={styles.card} bordered={false}>
          {/* <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormUploadButton  label={<FormattedMessage id='pages.borrower_form.Mainlandfile_upload.file_br_cn'/>} name="file_br_cn" action="upload.do" />
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <ProFormUploadButton  label={<FormattedMessage id='pages.borrower_form.Mainlandfile_upload.file_policy_cn'/>} name="file_policy_cn" action="upload.do" />
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <ProFormUploadButton  label={<FormattedMessage id='pages.borrower_form.Mainlandfile_upload.file_director_cn'/>} name="file_director_cn" action="upload.do" />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormUploadButton  label={<FormattedMessage id='pages.borrower_form.Mainlandfile_upload.file_shareholder_cn'/>} name="file_shareholder_cn" action="upload.do" />
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <ProFormUploadButton  label={<FormattedMessage id='pages.borrower_form.Mainlandfile_upload.file_director_credit_report_hk'/>} name="file_director_credit_report_hk" action="upload.do" />
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <ProFormUploadButton  label={<FormattedMessage id='pages.borrower_form.Mainlandfile_upload.file_company_credit_report_cn'/>} name="file_company_credit_report_cn" action="upload.do" />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormUploadButton  label={<FormattedMessage id='pages.borrower_form.Mainlandfile_upload.file_financial_statements_cn'/>} name="file_financial_statements_cn" action="upload.do" />
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <ProFormUploadButton  label={<FormattedMessage id='pages.borrower_form.Mainlandfile_upload.file_other_cn'/>} name="file_other_cn" action="upload.do" />
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
            </Col>
          </Row> */}

{/* /////////////////////////////// */}
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormUploadButton  
              label={<FormattedMessage id='pages.borrower_form.Mainlandfile_upload.file_br_cn'/>} 
              fileList={file_br_cn}
              fieldProps={{
                name: "file_br_cn",
                action:"/api/borrower/upload_file",
                onChange: (e) => {
                  // handleChange(e)
                },
              }}
               />
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <ProFormUploadButton  
              label={<FormattedMessage id='pages.borrower_form.Mainlandfile_upload.file_policy_cn'/>} 
              fileList={file_policy_cn}
              fieldProps={{
                name: "file_policy_cn",
                action:"/api/borrower/upload_file",
                onChange: (e) => {
                  // handleChange(e)
                },
              }}
              />
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <ProFormUploadButton  
              label={<FormattedMessage id='pages.borrower_form.Mainlandfile_upload.file_director_cn'/>} 
              fileList={file_director_cn}
              fieldProps={{
                name: "file_director_cn",
                action:"/api/borrower/upload_file",
                onChange: (e) => {
                  // handleChange(e)
                },
              }}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormUploadButton  
              label={<FormattedMessage id='pages.borrower_form.Mainlandfile_upload.file_shareholder_cn'/>} 
              fileList={file_shareholder_cn}
              fieldProps={{
                name: "file_shareholder_cn",
                action:"/api/borrower/upload_file",
                onChange: (e) => {
                  // handleChange(e)
                },
              }}
              />
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <ProFormUploadButton  
              label={<FormattedMessage id='pages.borrower_form.Mainlandfile_upload.file_director_credit_report_cn'/>}
              fileList={file_director_credit_report_cn}
              fieldProps={{
                name: "file_director_credit_report_cn",
                action:"/api/borrower/upload_file",
                onChange: (e) => {
                  // handleChange(e)
                },
              }} />
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <ProFormUploadButton  
              label={<FormattedMessage id='pages.borrower_form.Mainlandfile_upload.file_company_credit_report_cn'/>} 
              fileList={file_company_credit_report_cn}
              fieldProps={{
                name: "file_company_credit_report_cn",
                action:"/api/borrower/upload_file",
                onChange: (e) => {
                  // handleChange(e)
                },
              }} />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormUploadButton  
              label={<FormattedMessage id='pages.borrower_form.Mainlandfile_upload.file_financial_statements_cn'/>} 
              fileList={file_financial_statements_cn}
              fieldProps={{
                name: "file_financial_statements_cn",
                action:"/api/borrower/upload_file",
                onChange: (e) => {
                  // handleChange(e)
                },
              }}
              />
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <ProFormUploadButton  
              label={<FormattedMessage id='pages.borrower_form.Mainlandfile_upload.file_other_cn'/>}
              fileList={file_other_cn}
              fieldProps={{
                name: "file_other_cn",
                action:"/api/borrower/upload_file",
                onChange: (e) => {
                  // handleChange(e)
                },
              }} />
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
            </Col>
          </Row>
        </Card>
  
      </PageContainer>
    </ProForm>
  );
};

export default AdvancedForm;
