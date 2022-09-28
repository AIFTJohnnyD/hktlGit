import { Button, Result } from 'antd';
import { Link, SelectLang, useIntl } from 'umi';
import React from 'react';
import type { RouteChildrenProps } from 'react-router';

import styles from './style.less';

export type LocationState = Record<string, unknown>;

const RegisterResult: React.FC<RouteChildrenProps> = () => {
  const intl = useIntl();

  const actions = (
    <div className={styles.actions}>
      <Link to="/">
        <Button size="large">{intl.formatMessage({ id: 'pages.register_result.return_homepage' })}</Button>
      </Link>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src="/logo.svg" />
              <span className={styles.title}>
                {intl.formatMessage({ id: 'pages.platform.title' })}
                </span>
            </Link>
          </div>
          <div className={styles.desc}>
            {intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
          </div>
        </div>

        <Result
          className={styles.registerResult}
          status="success"
          title={
            <div className={styles.title}>
              <span>{intl.formatMessage({ id: 'pages.register_result.title' })}</span>
            </div>
          }
          subTitle={intl.formatMessage({ id: 'pages.register_result.subtitle' })}
          extra={actions}
        />

    </div>
  </div>

  );
};

export default RegisterResult;
