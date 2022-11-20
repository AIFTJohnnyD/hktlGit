import React, { useState } from 'react';
import ProCard from '@ant-design/pro-card';
import RcResizeObserver from 'rc-resize-observer';

import { Divider, Alert } from 'antd';
import styles from '../style.less';

import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

import { useRequest, history, FormattedMessage, request } from 'umi';

const { Dragger } = Upload;

//update loan.api_borrower set br_cn = NULL, br_hk = NULL, policy_cn = NULL, director_hk = NULL, director_cn = NULL where id = 1;

//const UploadDocument: React.FC = () => {
const UploadDocument = ({ loading, data }: { loading: boolean, data: any }) => {
  const [responsive, setResponsive] = useState(false);

  //const [fileList_br_hk, setFileList_br_hk] = useState([]);
  const props = {
    name: 'file',
    multiple: true,
    maxCount: 8,
    defaultFileList: [],
  
    action: '/api/borrower/upload_file',
  
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        info.file.uid = info.file.response.data.uid;
        info.file.url = info.file.response.data.url;

        message.success(`${info.file.name} file uploaded successfully.`);  
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      //console.log('Dropped files', e.dataTransfer.files);
    },
  
    onRemove(file) {
      request('/api/borrower/delete_file?file_id='+ file.uid);
    },

    onDownload(file) {
      request('/api/borrower/download_file?file_id='+ file.uid);
    }
    
  };
  
  var props_br_hk = {...props};
  props_br_hk.name = "br_hk";
  
  var props_br_cn = {...props};
  props_br_cn.name = "br_cn";
  
  var props_policy_cn = {...props};
  props_policy_cn.name = "policy_cn";
  
  var props_director_hk = {...props};
  props_director_hk.name = "director_hk";
  
  var props_director_cn = {...props};
  props_director_cn.name = "director_cn";

  if (data != null) {
    props_br_hk.defaultFileList = data.br_hk;
    props_br_cn.defaultFileList = data.br_cn;
    props_policy_cn.defaultFileList = data.policy_cn;

    props_director_hk.defaultFileList = data.director_hk;
    props_director_cn.defaultFileList = data.director_cn;
  }

  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <Alert
        message={<FormattedMessage id='pages.borrower_form.upload_doc.format'/>}
        type="info"
        showIcon
      />

      <Divider style={{ margin: '10px 0 10px' }} />

      <ProCard
        title={<FormattedMessage id='pages.borrower_form.upload_doc.proof'/>}
        extra=""
        split={responsive ? 'horizontal' : 'vertical'}
        bordered
        headerBordered
        loading={loading}
      >
        <ProCard title={<FormattedMessage id='pages.borrower_form.upload_doc.certificate'/>} colSpan="33%" style={{ height: 430 }}>
          <div style={{ height: 120 }}>
            <Dragger {...props_br_hk}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">{<FormattedMessage id='pages.borrower_form.upload_doc.upload_file'/>}</p>
            </Dragger>
          </div>
        </ProCard>
        <ProCard title={<FormattedMessage id='pages.borrower_form.upload_doc.file_br_cn'/>} colSpan="33%" style={{ height: 430 }}>
          <div style={{ height: 120 }}>
            <Dragger {...props_br_cn}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">{<FormattedMessage id='pages.borrower_form.upload_doc.upload_file'/>}</p>
            </Dragger>
          </div>
        </ProCard>
        <ProCard title={<FormattedMessage id='pages.borrower_form.upload_doc.Association'/>} colSpan="33%" style={{ height: 430 }}>
          <div style={{ height: 120 }}>
            <Dragger {...props_policy_cn}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">{<FormattedMessage id='pages.borrower_form.upload_doc.upload_file'/>}</p>
            </Dragger>
          </div>
        </ProCard>
      </ProCard>

      <Divider style={{ margin: '10px 0 10px' }} />

      <ProCard
        title={<FormattedMessage id='pages.borrower_form.upload_doc.identity'/>}
        extra=""
        split={responsive ? 'horizontal' : 'vertical'}
        bordered
        headerBordered
        loading={loading}
      >
        <ProCard title={<FormattedMessage id='pages.borrower_form.upload_doc.passport'/>} colSpan="50%" style={{ height: 430 }}>
          <div style={{ height: 120 }}>
            <Dragger {...props_director_hk}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">{<FormattedMessage id='pages.borrower_form.upload_doc.upload_file'/>}</p>
            </Dragger>
          </div>
        </ProCard>
        <ProCard title={<FormattedMessage id='pages.borrower_form.upload_doc.id_card'/>} colSpan="50%" style={{ height: 430 }}>
          <div style={{ height: 120 }}>
            <Dragger {...props_director_cn}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">{<FormattedMessage id='pages.borrower_form.upload_doc.upload_file'/>}</p>
            </Dragger>
          </div>
        </ProCard>
      </ProCard>

      <Divider style={{ margin: '10px 0 10px' }} />

      <div className={styles.desc}>
        <p>{<FormattedMessage id='pages.borrower_form.upload_doc.declaration1'/>}</p>
        <p>{<FormattedMessage id='pages.borrower_form.upload_doc.declaration2'/>}</p>
      </div>
    </RcResizeObserver>
  );
};

export default UploadDocument;
