import { CloseCircleOutlined } from '@ant-design/icons';
import { Card, Col, Popover, Row, message } from 'antd';

import { FC, useEffect } from 'react';
import { useState } from 'react';
import ProForm, {
  ProFormUploadButton,
} from '@ant-design/pro-form';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { submitForm } from './service';
import styles from './style.less';
import { FormattedMessage, request, useRequest } from 'umi';
import { UploadChangeParam, UploadFile, UploadProps } from 'antd/lib/upload';


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
  //使用这么冗长的方法的原因是 在照片提交时侯名字无法被修改 不知为何
  let file_br_hk: UploadFile[] = [
  ];
  let file_ci_hk: UploadFile[] = [
  ];
  let file_nar1_hk: UploadFile[] = [
  ];
  let file_moa_hk: UploadFile[] = [
  ];
  let file_shareholder_cn: UploadFile[] = [
  ];
  let file_director_hk: UploadFile[] = [
  ];
  let file_address_proof_hk: UploadFile[] = [
  ];
  let file_director_credit_report_hk: UploadFile[] = [
  ];
  let file_financial_statements_hk: UploadFile[] = [
  ];
  let file_other_hk: UploadFile[] = [
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
    file_br_hk=data.file_br_hk
    console.log("filedatatypeof(data)!=undefined");
    console.log("filedatafileList",file_br_hk);
    file_ci_hk=data.file_ci_hk
    file_nar1_hk=data.file_nar1_hk
    file_moa_hk=data.file_moa_hk
    file_shareholder_cn=data.file_shareholder_cn
    file_director_hk=data.file_director_hk
    file_address_proof_hk=data.file_address_proof_hk
    file_director_credit_report_hk=data.file_director_credit_report_hk
    file_financial_statements_hk=data.file_financial_statements_hk
    file_other_hk=data.file_other_hk
    
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

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
   
    if (info.file.status == 'removed') {
      console.log("removedinfodata",info);
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      // 做成fileList的格式传回
    }
    if (info.file.status == 'uploading') {
     console.log("loading");
      window.location.reload();
    }
    if (info.file.status == 'error') {
      message.error('上传失败!请稍后再试')
    }
  };

  const onFinish = async (values: Record<string, any>) => {
    setError([]);
    console.log("valueserrorInfo",values);
    
    try {
      await submitForm(values);
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
      initialValues={{ }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      request={async () => {           
        const { data, error, loading } = await request('/api/borrower/get_borrower');
        return data;
      }}
    >
        <PageContainer content="">
        <Card title={<FormattedMessage id='pages.borrower_form.HKfile_upload'/>} className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormUploadButton  
                label={<FormattedMessage id='pages.borrower_form.HKfile_upload.file_br_hk'/>} 
                // name='file_br_hk'
                fileList={file_br_hk}
                fieldProps={{
                  name: "file_br_hk",
                  action:"/api/borrower/upload_file",
                  showUploadList: {
                    showDownloadIcon: false,
                    downloadIcon: '下载',
                    showRemoveIcon: true,
                    // removeIcon: <StarOutlined onClick={(e) => console.log(e, 'custom removeIcon event')} />,
                  },
                  onChange: (e) => {
                    handleChange(e)
                  },
                  onRemove(file) {
                    window.location.reload();
                    console.log("onRemoveDataFile",file);
                    request('/api/borrower/delete_file?file_id='+ file.uid);
                  },
                  onDownload(file) {
                    console.log("onDownloadDataFile",file);
                    request('/api/borrower/download_file?file_id='+ file.uid);
                  }
                }}
                />
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <ProFormUploadButton  
              label={<FormattedMessage id='pages.borrower_form.HKfile_upload.file_ci_hk'/>} 
              fileList={file_ci_hk}
              fieldProps={{
                name: "file_ci_hk",
                action:"/api/borrower/upload_file",
                showUploadList: {
                  showDownloadIcon: false,
                  downloadIcon: '下载',
                  showRemoveIcon: true,
                  // removeIcon: <StarOutlined onClick={(e) => console.log(e, 'custom removeIcon event')} />,
                },
                onChange: (e) => {
                  handleChange(e)
                },
                onRemove(file) {
                  window.location.reload();
                    console.log("onRemoveDataFile",file);
                  request('/api/borrower/delete_file?file_id='+ file.uid);
                },
                onDownload(file) {
                  console.log("onDownloadDataFile",file);
                  request('/api/borrower/download_file?file_id='+ file.uid);
                }
              }}
              />
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <ProFormUploadButton  
              label={<FormattedMessage id='pages.borrower_form.HKfile_upload.file_nar1_hk'/>} 
              fileList={file_nar1_hk}
              fieldProps={{
                name: "file_nar1_hk",
                action:"/api/borrower/upload_file",
                showUploadList: {
                  showDownloadIcon: false,
                  downloadIcon: '下载',
                  showRemoveIcon: true,
                  // removeIcon: <StarOutlined onClick={(e) => console.log(e, 'custom removeIcon event')} />,
                },
                onChange: (e) => {
                  handleChange(e)
                },
                onRemove(file) {
                  window.location.reload();
                    console.log("onRemoveDataFile",file);
                  request('/api/borrower/delete_file?file_id='+ file.uid);
                },
                onDownload(file) {
                  console.log("onDownloadDataFile",file);
                  request('/api/borrower/download_file?file_id='+ file.uid);
                }
              }}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormUploadButton  
              label={<FormattedMessage id='pages.borrower_form.HKfile_upload.file_moa_hk'/>} 
              fileList={file_moa_hk}
              fieldProps={{
                name: "file_moa_hk",
                action:"/api/borrower/upload_file",
                  showUploadList: {
                    showDownloadIcon: false,
                    downloadIcon: '下载',
                    showRemoveIcon: true,
                    // removeIcon: <StarOutlined onClick={(e) => console.log(e, 'custom removeIcon event')} />,
                  },
                  onChange: (e) => {
                    handleChange(e)
                  },
                  onRemove(file) {
                    window.location.reload();
                    console.log("onRemoveDataFile",file);
                    request('/api/borrower/delete_file?file_id='+ file.uid);
                  },
                  onDownload(file) {
                    console.log("onDownloadDataFile",file);
                    request('/api/borrower/download_file?file_id='+ file.uid);
                  }
                
              }}
              />
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <ProFormUploadButton  
              label={<FormattedMessage id='pages.borrower_form.HKfile_upload.file_shareholder_cn'/>}
              fileList={file_shareholder_cn}
              fieldProps={{
                name: "file_shareholder_cn",
                action:"/api/borrower/upload_file",
                  showUploadList: {
                    showDownloadIcon: false,
                    downloadIcon: '下载',
                    showRemoveIcon: true,
                    // removeIcon: <StarOutlined onClick={(e) => console.log(e, 'custom removeIcon event')} />,
                  },
                  onChange: (e) => {
                    handleChange(e)
                  },
                  onRemove(file) {
                    window.location.reload();
                    console.log("onRemoveDataFile",file);
                    request('/api/borrower/delete_file?file_id='+ file.uid);
                  },
                  onDownload(file) {
                    console.log("onDownloadDataFile",file);
                    request('/api/borrower/download_file?file_id='+ file.uid);
                  }
              }} />
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <ProFormUploadButton  
              label={<FormattedMessage id='pages.borrower_form.HKfile_upload.file_director_hk'/>} 
              fileList={file_director_hk}
              fieldProps={{
                name: "file_director_hk",
                action:"/api/borrower/upload_file",
                  showUploadList: {
                    showDownloadIcon: false,
                    downloadIcon: '下载',
                    showRemoveIcon: true,
                    // removeIcon: <StarOutlined onClick={(e) => console.log(e, 'custom removeIcon event')} />,
                  },
                  onChange: (e) => {
                    handleChange(e)
                  },
                  onRemove(file) {
                    window.location.reload();
                    console.log("onRemoveDataFile",file);
                    request('/api/borrower/delete_file?file_id='+ file.uid);
                  },
                  onDownload(file) {
                    console.log("onDownloadDataFile",file);
                    request('/api/borrower/download_file?file_id='+ file.uid);
                  }
                
              }} />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormUploadButton  
              label={<FormattedMessage id='pages.borrower_form.HKfile_upload.file_address_proof_hk'/>} 
              fileList={file_address_proof_hk}
              fieldProps={{
                name: "file_address_proof_hk",
                action:"/api/borrower/upload_file",
                  showUploadList: {
                    showDownloadIcon: false,
                    downloadIcon: '下载',
                    showRemoveIcon: true,
                    // removeIcon: <StarOutlined onClick={(e) => console.log(e, 'custom removeIcon event')} />,
                  },
                  onChange: (e) => {
                    handleChange(e)
                  },
                  onRemove(file) {
                    window.location.reload();
                    console.log("onRemoveDataFile",file);
                    request('/api/borrower/delete_file?file_id='+ file.uid);
                  },
                  onDownload(file) {
                    console.log("onDownloadDataFile",file);
                    request('/api/borrower/download_file?file_id='+ file.uid);
                  }
                
              }}
              />
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <ProFormUploadButton  
              label={<FormattedMessage id='pages.borrower_form.HKfile_upload.file_director_credit_report_hk'/>}
              fileList={file_director_credit_report_hk}
              fieldProps={{
                name: "file_director_credit_report_hk",
                action:"/api/borrower/upload_file",
                  showUploadList: {
                    showDownloadIcon: false,
                    downloadIcon: '下载',
                    showRemoveIcon: true,
                    // removeIcon: <StarOutlined onClick={(e) => console.log(e, 'custom removeIcon event')} />,
                  },
                  onChange: (e) => {
                    handleChange(e)
                  },
                  onRemove(file) {
                    window.location.reload();
                    console.log("onRemoveDataFile",file);
                    request('/api/borrower/delete_file?file_id='+ file.uid);
                  },
                  onDownload(file) {
                    console.log("onDownloadDataFile",file);
                    request('/api/borrower/download_file?file_id='+ file.uid);
                  }
                
              }} />
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <ProFormUploadButton  
              label={<FormattedMessage id='pages.borrower_form.HKfile_upload.file_financial_statements_hk'/>} 
              fileList={file_financial_statements_hk}
              fieldProps={{
                name: "file_financial_statements_hk",
                action:"/api/borrower/upload_file",
                  showUploadList: {
                    showDownloadIcon: false,
                    downloadIcon: '下载',
                    showRemoveIcon: true,
                    // removeIcon: <StarOutlined onClick={(e) => console.log(e, 'custom removeIcon event')} />,
                  },
                  onChange: (e) => {
                    handleChange(e)
                  },
                  onRemove(file) {
                    window.location.reload();
                    console.log("onRemoveDataFile",file);
                    request('/api/borrower/delete_file?file_id='+ file.uid);
                  },
                  onDownload(file) {
                    console.log("onDownloadDataFile",file);
                    request('/api/borrower/download_file?file_id='+ file.uid);
                  }
                
              }} />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormUploadButton  
              label={<FormattedMessage id='pages.borrower_form.HKfile_upload.file_other_hk'/>} 
              fileList={file_other_hk}
              fieldProps={{
                name: "file_other_hk",
                action:"/api/borrower/upload_file",
                showUploadList: {
                  showDownloadIcon: false,
                  downloadIcon: '下载',
                  showRemoveIcon: true,
                  // removeIcon: <StarOutlined onClick={(e) => console.log(e, 'custom removeIcon event')} />,
                },
                onChange: (e) => {
                  handleChange(e)
                },
                onRemove(file) {
                  window.location.reload();
                  console.log("onRemoveDataFile",file);
                  request('/api/borrower/delete_file?file_id='+ file.uid);
                },
                onDownload(file) {
                  console.log("onDownloadDataFile",file);
                  request('/api/borrower/download_file?file_id='+ file.uid);
                }
              }}
              />
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
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
