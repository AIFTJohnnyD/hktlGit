import { Card, Col, Row, message } from 'antd';
import { FC } from 'react';
import ProForm, { ProFormUploadButton } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { submitForm } from './service';
import styles from './style.less';
import { FormattedMessage, request  } from 'umi';
import { RcFile } from 'antd/lib/upload';

const AdvancedForm: FC<Record<string, any>> = () => {
  //根据文件类型修改thumbUrl 函数
  const thumbUrlMatchWithFileType = (file:RcFile)=>{
    if(file.name.substring(file.name.length-3)=='pdf'){
      return '/icons/pdf.png';
    }else if(file.name.substring(file.name.length-3)=='doc' || file.name.substring(file.name.length-4)=='docx'){
      return '/icons/doc.png';
    }else if(file.name.substring(file.name.length-4)=='xlsx'||file.name.substring(file.name.length-3)=='xls'){
      return '/icons/excel.png';
    }else if(file.name.substring(file.name.length-3)=='zip' || file.name.substring(file.name.length-3)=='rar' || file.name.substring(file.name.length-2)=='7z'){
      return '/icons/zip.png';
    }
    else if(file.name.substring(file.name.length-3)=='bmp'||file.name.substring(file.name.length-3)=='jpg'||file.name.substring(file.name.length-3)=='png'){
      return;
    }else {
      return '/icons/note.png';
    }
  }
  const onFinish = async (values: Record<string, any>) => {
    console.log("valueserrorInfo",values);
    try {
      await submitForm(values);
      message.success('提交成功');
    } catch {
      console.log("onFinisherrorInfo提交失败")
    }
  };

  return (
    <ProForm
      layout="vertical"
      hideRequiredMark
      initialValues={{ }}
      submitter={{
        resetButtonProps: {
          style: {            
            display: 'none',  // 隐藏重置按钮
          },
        },
        submitButtonProps: {
          style: {            
            display: 'none',  // 隐藏重置按钮
          },
        },
      }}
      onFinish={onFinish}
      request={async () => {           
        const { data, error, loading } = await request('/api/borrower/get_borrower');
        console.log('fileListdata',data.file_br_hk);
        return data;
      }}
    >
        <PageContainer content="">
          <Card title={<FormattedMessage id='pages.borrower_form.HKfile_upload'/>} 
          className={styles.card} 
          bordered={false}
          >
            <Card>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <ProFormUploadButton
                    label={<FormattedMessage id='pages.borrower_form.HKfile_upload.file_br_hk'/>} 
                    name="file_br_hk"
                    fieldProps={{
                      name: "file_br_hk",
                      action:"/api/borrower/upload_file",
                      showUploadList: {
                        showPreviewIcon:true,
                        showDownloadIcon: false,
                        downloadIcon: '下载',
                        showRemoveIcon: true,
                        // removeIcon: <StarOutlined onClick={(e) => console.log(e, 'custom removeIcon event')} />,
                      },
                      beforeUpload: (e) => {
                        e.thumbUrl = thumbUrlMatchWithFileType(e)
                      },
                      onChange: (e) => {
                        if (e.file.status == 'done') {
                          e.file.uid = e.file.response.data.uid;
                        }
                      },
                      onRemove(file) {
                        request('/api/borrower/delete_file?file_id='+ file.uid);
                      },
                      onDownload(file) {
                        request('/api/borrower/download_file?file_id='+ file.uid);
                      }
                    }}
                    />
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <ProFormUploadButton  
                  label={<FormattedMessage id='pages.borrower_form.HKfile_upload.file_ci_hk'/>} 
                  name= "file_ci_hk"
                  fieldProps={{
                    name: "file_ci_hk",
                    action:"/api/borrower/upload_file",
                    showUploadList: {
                      showDownloadIcon: false,
                      downloadIcon: '下载',
                      showRemoveIcon: true,
                      // removeIcon: <StarOutlined onClick={(e) => console.log(e, 'custom removeIcon event')} />,
                    },
                    beforeUpload: (e) => {
                      e.thumbUrl = thumbUrlMatchWithFileType(e)
                    },
                    onChange: (e) => {
                      if (e.file.status == 'done') {
                        e.file.uid = e.file.response.data.uid;
                      }
                    },
                    onRemove(file) {
                      request('/api/borrower/delete_file?file_id='+ file.uid);
                    },
                    onDownload(file) {
                      request('/api/borrower/download_file?file_id='+ file.uid);
                    }
                  }}
                  />
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <ProFormUploadButton  
                  label={<FormattedMessage id='pages.borrower_form.HKfile_upload.file_nar1_hk'/>} 
                  name= "file_nar1_hk"
                  fieldProps={{
                    name: "file_nar1_hk",
                    action:"/api/borrower/upload_file",
                    showUploadList: {
                      showDownloadIcon: false,
                      downloadIcon: '下载',
                      showRemoveIcon: true,
                      // removeIcon: <StarOutlined onClick={(e) => console.log(e, 'custom removeIcon event')} />,
                    },
                    beforeUpload: (e) => {
                      e.thumbUrl = thumbUrlMatchWithFileType(e)
                    },
                    onChange: (e) => {
                      if (e.file.status == 'done') {
                        e.file.uid = e.file.response.data.uid;
                      }
                    },
                    onRemove(file) {
                      request('/api/borrower/delete_file?file_id='+ file.uid);
                    },
                    onDownload(file) {
                      request('/api/borrower/download_file?file_id='+ file.uid);
                    }
                  }}
                  />
                </Col>
              </Row>
            </Card>
            <Card>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <ProFormUploadButton  
                  label={<FormattedMessage id='pages.borrower_form.HKfile_upload.file_moa_hk'/>} 
                  name="file_moa_hk"
                  fieldProps={{
                    name: "file_moa_hk",
                    action:"/api/borrower/upload_file",
                      showUploadList: {
                        showDownloadIcon: false,
                        downloadIcon: '下载',
                        showRemoveIcon: true,
                        // removeIcon: <StarOutlined onClick={(e) => console.log(e, 'custom removeIcon event')} />,
                      },
                      beforeUpload: (e) => {
                        e.thumbUrl = thumbUrlMatchWithFileType(e)
                      },
                      onChange: (e) => {
                        if (e.file.status == 'done') {
                          e.file.uid = e.file.response.data.uid;
                        }
                      },
                      onRemove(file) {
                        request('/api/borrower/delete_file?file_id='+ file.uid);
                      },
                      onDownload(file) {
                        request('/api/borrower/download_file?file_id='+ file.uid);
                      }
                    
                  }}
                  />
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <ProFormUploadButton  
                  label={<FormattedMessage id='pages.borrower_form.HKfile_upload.file_shareholder_cn'/>}
                  name="file_shareholder_cn"
                  fieldProps={{
                    name: "file_shareholder_cn",
                    action:"/api/borrower/upload_file",
                      showUploadList: {
                        showDownloadIcon: false,
                        downloadIcon: '下载',
                        showRemoveIcon: true,
                        // removeIcon: <StarOutlined onClick={(e) => console.log(e, 'custom removeIcon event')} />,
                      },
                      beforeUpload: (e) => {
                        e.thumbUrl = thumbUrlMatchWithFileType(e)
                      },
                      onChange: (e) => {
                        if (e.file.status == 'done') {
                          e.file.uid = e.file.response.data.uid;
                        }
                      },
                      onRemove(file) {
                        request('/api/borrower/delete_file?file_id='+ file.uid);
                      },
                      onDownload(file) {
                        request('/api/borrower/download_file?file_id='+ file.uid);
                      }
                  }} />
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <ProFormUploadButton  
                  label={<FormattedMessage id='pages.borrower_form.HKfile_upload.file_director_hk'/>} 
                  name="file_director_hk"
                  fieldProps={{
                    name: "file_director_hk",
                    action:"/api/borrower/upload_file",
                      showUploadList: {
                        showDownloadIcon: false,
                        downloadIcon: '下载',
                        showRemoveIcon: true,
                        // removeIcon: <StarOutlined onClick={(e) => console.log(e, 'custom removeIcon event')} />,
                      },
                      beforeUpload: (e) => {
                        e.thumbUrl = thumbUrlMatchWithFileType(e)
                      },
                      onChange: (e) => {
                        if (e.file.status == 'done') {
                          e.file.uid = e.file.response.data.uid;
                        }
                      },
                      onRemove(file) {
                        request('/api/borrower/delete_file?file_id='+ file.uid);
                      },
                      onDownload(file) {
                        request('/api/borrower/download_file?file_id='+ file.uid);
                      }
                    
                  }} />
                </Col>
              </Row>
            </Card>
            <Card>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <ProFormUploadButton  
                  label={<FormattedMessage id='pages.borrower_form.HKfile_upload.file_address_proof_hk'/>} 
                  name="file_address_proof_hk"
                  fieldProps={{
                    name: "file_address_proof_hk",
                    action:"/api/borrower/upload_file",
                      showUploadList: {
                        showDownloadIcon: false,
                        downloadIcon: '下载',
                        showRemoveIcon: true,
                        // removeIcon: <StarOutlined onClick={(e) => console.log(e, 'custom removeIcon event')} />,
                      },
                      beforeUpload: (e) => {
                        e.thumbUrl = thumbUrlMatchWithFileType(e)
                      },
                      onChange: (e) => {
                        if (e.file.status == 'done') {
                          e.file.uid = e.file.response.data.uid;
                        }
                      },
                      onRemove(file) {
                        request('/api/borrower/delete_file?file_id='+ file.uid);
                      },
                      onDownload(file) {
                        request('/api/borrower/download_file?file_id='+ file.uid);
                      }
                    
                  }}
                  />
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <ProFormUploadButton  
                  label={<FormattedMessage id='pages.borrower_form.HKfile_upload.file_director_credit_report_hk'/>}
                  name="file_director_credit_report_hk"
                  fieldProps={{
                    name: "file_director_credit_report_hk",
                    action:"/api/borrower/upload_file",
                      showUploadList: {
                        showDownloadIcon: false,
                        downloadIcon: '下载',
                        showRemoveIcon: true,
                        // removeIcon: <StarOutlined onClick={(e) => console.log(e, 'custom removeIcon event')} />,
                      },
                      beforeUpload: (e) => {
                        e.thumbUrl = thumbUrlMatchWithFileType(e)
                      },
                      onChange: (e) => {
                        if (e.file.status == 'done') {
                          e.file.uid = e.file.response.data.uid;
                        }
                      },
                      onRemove(file) {
                        
                        request('/api/borrower/delete_file?file_id='+ file.uid);
                      },
                      onDownload(file) {
                        request('/api/borrower/download_file?file_id='+ file.uid);
                      }
                    
                  }} />
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <ProFormUploadButton  
                  label={<FormattedMessage id='pages.borrower_form.HKfile_upload.file_financial_statements_hk'/>} 
                  name="file_financial_statements_hk"
                  fieldProps={{
                    name: "file_financial_statements_hk",
                    action:"/api/borrower/upload_file",
                      showUploadList: {
                        showDownloadIcon: false,
                        downloadIcon: '下载',
                        showRemoveIcon: true,
                        // removeIcon: <StarOutlined onClick={(e) => console.log(e, 'custom removeIcon event')} />,
                      },
                      beforeUpload: (e) => {
                        e.thumbUrl = thumbUrlMatchWithFileType(e)
                      },
                      onChange: (e) => {
                        if (e.file.status == 'done') {
                          e.file.uid = e.file.response.data.uid;
                        }
                      },
                      onRemove(file) {
                        
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
            </Card>
            <Card>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <ProFormUploadButton  
                  label={<FormattedMessage id='pages.borrower_form.HKfile_upload.file_other_hk'/>} 
                  name="file_other_hk"
                  fieldProps={{
                    name: "file_other_hk",
                    action:"/api/borrower/upload_file",
                    showUploadList: {
                      showDownloadIcon: false,
                      downloadIcon: '下载',
                      showRemoveIcon: true,
                      // removeIcon: <StarOutlined onClick={(e) => console.log(e, 'custom removeIcon event')} />,
                    },
                    beforeUpload: (e) => {
                      e.thumbUrl = thumbUrlMatchWithFileType(e)
                    },
                    onChange: (e) => {
                      if (e.file.status == 'done') {
                        e.file.uid = e.file.response.data.uid;
                      }
                    },
                    onRemove(file) {
                      request('/api/borrower/delete_file?file_id='+ file.uid);
                    },
                    onDownload(file) {
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
          </Card>
        </PageContainer>
    </ProForm>
  );
};

export default AdvancedForm;
