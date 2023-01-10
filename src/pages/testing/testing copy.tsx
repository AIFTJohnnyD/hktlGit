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
      //'/api/get_chatroom_user'   /api/application/get_random_id
      '/api/test_jsonresp'
    );
  });
  console.log(data)
  // console.log(ownner)
  const access = useAccess();
  console.log(access)

  function get_application_id() {
    const { data, error, loading } = useRequest(() => {
      return request('/api/application/get_random_id', {
        method: 'POST',
        data: {"receivable": 2},
      });
    });

    console.log(data)

    return data
  }

  return (
    <PageContainer>
      <div className={styles.divline}>{}</div>

      <h1> {get_application_id()} </h1>
    </PageContainer>
  );
};

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { DualAxes } from '@ant-design/plots';

const DemoDualAxes = () => {
  const uvBillData = [
    {
      time: '2019-03',
      value: 350,
      type: 'uv',
    },
    {
      time: '2019-04',
      value: 900,
      type: 'uv',
    },
    {
      time: '2019-05',
      value: 300,
      type: 'uv',
    },
    {
      time: '2019-06',
      value: 450,
      type: 'uv',
    },
    {
      time: '2019-07',
      value: 470,
      type: 'uv',
    },
    {
      time: '2019-03',
      value: 220,
      type: 'bill',
    },
    {
      time: '2019-04',
      value: 300,
      type: 'bill',
    },
    {
      time: '2019-05',
      value: 250,
      type: 'bill',
    },
    {
      time: '2019-06',
      value: 220,
      type: 'bill',
    },
    {
      time: '2019-07',
      value: 362,
      type: 'bill',
    },
    {
      time: '2019-08',
      value: 362,
      type: 'bill',
    },
    {
      time: '2019-09',
      value: 362,
      type: 'bill',
    },
    {
      time: '2019-10',
      value: 362,
      type: 'bill',
    },
  ];
  const transformData = [
    {
      time: '2019-03',
      count: 800,
      name: 'a',
    },
    {
      time: '2019-04',
      count: 600,
      name: 'a',
    },
    {
      time: '2019-05',
      count: 400,
      name: 'a',
    },
    {
      time: '2019-06',
      count: 380,
      name: 'a',
    },
    {
      time: '2019-07',
      count: 220,
      name: 'a',
    },
    {
      time: '2019-03',
      count: 750,
      name: 'b',
    },
    {
      time: '2019-04',
      count: 650,
      name: 'b',
    },
    {
      time: '2019-05',
      count: 450,
      name: 'b',
    },
    {
      time: '2019-06',
      count: 400,
      name: 'b',
    },
    {
      time: '2019-07',
      count: 320,
      name: 'b',
    },
    {
      time: '2019-03',
      count: 900,
      name: 'c',
    },
    {
      time: '2019-04',
      count: 600,
      name: 'c',
    },
    {
      time: '2019-05',
      count: 450,
      name: 'c',
    },
    {
      time: '2019-06',
      count: 300,
      name: 'c',
    },
    {
      time: '2019-07',
      count: 200,
      name: 'c',
    },
  ];
  const config = {
    data: [uvBillData, transformData],
    xField: 'time',
    yField: ['value', 'count'],
    animation: {
      appear: {
        animation: 'path-in',
        duration: 5000000,
      },
    },
    geometryOptions: [
      {
        geometry: 'line',
        seriesField: 'type',
        lineStyle: {
          lineWidth: 3,
          lineDash: [5, 5],
        },
        smooth: true,
        animation: {
          appear: {
            animation: 'path-in',
            duration: 5000000000,
          },
        },
      },
      {
        geometry: 'line',
        seriesField: 'name',
        smooth: true,
        animation: {
          appear: {
            animation: 'path-in',
            duration: 5000000000,
          },
        },
        point: {},
      },
    ],
  };
  return <DualAxes {...config} />;
};

ReactDOM.render(<DemoDualAxes />, document.getElementById('container'));

export default TableList;


import {
  AlipayCircleOutlined,
  LockOutlined,
  PlusOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import {
  DrawerForm,
  LightFilter,
  LoginForm,
  ModalForm,
  ProForm,
  ProFormDateRangePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  QueryFilter,
  StepsForm,
} from '@ant-design/pro-components';
import { Button, message, Space } from 'antd';
import { useState } from 'react';

const iconStyles = {
  marginInlineStart: '16px',
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '24px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
