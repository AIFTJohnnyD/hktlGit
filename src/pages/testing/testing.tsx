import { Button, Drawer, Table, Popover } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType, ColumnsState } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import { borrowerList } from './service';
import type { TableListItem, TableListPagination } from './data';
import styles from './style.less';
import { useRequest, FormattedMessage, request, useAccess } from 'umi';

const TableList: React.FC = () => {
  // const [showDetail, setShowDetail] = useState<boolean>(false);
  // const actionRef = useRef<ActionType>();
  // const [currentRow, setCurrentRow] = useState<TableListItem>();

  // function translate_status(status: string) {
  //   return <FormattedMessage id={'pages.application.' + status}/>;
  // }
  
  const { data, error, loading } = useRequest(() => {
    //window.open("/application/borrower-analysis?borrower_id=1",'KYCwindow','height=800, width=1500, top=160, left=350, toolbar=no, menubar=no, status=no');

    return request(
      // '/api/borrower/get_borrower_from_id',
      // '/api/currentUser',
      //'/api/get_chatroom_user'
      '/api/test_jsonresp'
    );
  });
  console.log(data)
  console.log(ownner)
  const access = useAccess();
  console.log(access)

  return (
    <PageContainer>
      <div className={styles.divline}></div>

    </PageContainer>
  );
};

export default TableList;
