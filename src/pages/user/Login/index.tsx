import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import { Alert, Space, message, Tabs, Form, Select, Input, Row} from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { useIntl, Link, history, FormattedMessage, SelectLang, useModel, getLocale} from 'umi';
import Footer from '@/components/Footer';
import { login } from '@/services/ant-design-pro/api';
import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import styles from './index.less';

import { request } from 'umi';
export async function sendSmsCode(country_code: string, mobile: string) {
  return request('/api/user/smscode', {
    method: 'POST',
    data: {"country_code": country_code, "mobile": mobile},
  });
}

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const LogPicture = () => {
  return( <img className={styles.logoimg} src="/login.jpg" /> )
  /*
  return (
    <video className={styles.vlog_center} controls={false} autoPlay={true} loop={true} muted={true}>
      <source src="/movie.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
  */
};

const Login: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');

  const intl = useIntl();

  const [form] = Form.useForm();
  const [prefix, setPrefix]: [string, any] = useState('+86');
  const changePrefix = (value: string) => {
    setPrefix(value);
  };

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    setSubmitting(true);
    try {
      // 登录
      const msg = await login({ ...values, type });
      if (msg.status === 'ok') {
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: '登录成功！',
        });
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as { redirect: string };
        history.push(redirect || '/');
        return;
      }
      // 如果失败去设置用户错误信息
      setUserLoginState(msg);
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '登录失败，请重试！',
      });

      message.error(defaultLoginFailureMessage);
    }
    setSubmitting(false);
  };
  const { status, type: loginType } = userLoginState;

  // console.log("status:", status, "type:", type, "loginType:", loginType);

  return (
    <Row>
      {/* <Col span={12}> */}
      <div className={styles.container}>
        <div className={styles.divleft}>
          <LogPicture />
        </div>
        <div className={styles.divright}>
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
              <div className={styles.desc_cn}>
                {intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
              </div>
            </div>

            <div className={styles.main}>
              <ProForm
                form={form}
                initialValues={{
                  autoLogin: true,
                  country_code: '+852',
                }}
                submitter={{
                  searchConfig: {
                    submitText: intl.formatMessage({
                      id: 'pages.login.submit',
                      defaultMessage: '登录',
                    }),
                  },
                  render: (_, dom) => dom.pop(),
                  submitButtonProps: {
                    loading: submitting,
                    size: 'large',
                    style: {
                      width: '100%',
                    },
                  },
                }}
                onFinish={async (values) => {
                  await handleSubmit(values as API.LoginParams);
                }}
              >
                <Tabs activeKey={type} onChange={setType}>
                  <Tabs.TabPane
                    key="account"
                    tab={intl.formatMessage({
                      id: 'pages.login.accountLogin.tab',
                      defaultMessage: '账户密码登录',
                    })}
                  />
                  {/*
                  <Tabs.TabPane
                    key="mobile"
                    tab={intl.formatMessage({
                      id: 'pages.login.phoneLogin.tab',
                      defaultMessage: '手机号登录',
                    })}
                  />
                  */}
                </Tabs>

                {status === 'error' && loginType === 'account' && (
                  <LoginMessage
                    content={intl.formatMessage({
                      id: 'pages.login.accountLogin.errorMessage',
                      defaultMessage: '账户或密码错误',
                    })}
                  />
                )}
                {type === 'account' && (
                  <>
                    <ProFormText
                      name="username"
                      fieldProps={{
                        size: 'large',
                        prefix: <UserOutlined className={styles.prefixIcon} />,
                      }}
                      placeholder={intl.formatMessage({
                        id: 'pages.login.username.placeholder',
                        defaultMessage: '用户名',
                      })}
                      rules={[
                        {
                          required: true,
                          message: (
                            <FormattedMessage
                              id="pages.login.username.required"
                              defaultMessage="请输入用户名!"
                            />
                          ),
                        },
                      ]}
                    />
                    <ProFormText.Password
                      name="password"
                      fieldProps={{
                        size: 'large',
                        prefix: <LockOutlined className={styles.prefixIcon} />,
                      }}
                      placeholder={intl.formatMessage({
                        id: 'pages.login.password.placeholder',
                        defaultMessage: '密码',
                      })}
                      rules={[
                        {
                          required: true,
                          message: (
                            <FormattedMessage
                              id="pages.login.password.required"
                              defaultMessage="请输入密码！"
                            />
                          ),
                        },
                      ]}
                    />

                    {/*for captcha*/}
                    <InputGroup compact>
                      <FormItem name="country_code" noStyle>
                        <Select
                          size="large"
                          value={prefix}
                          onChange={changePrefix}
                          style={{ width: '25%' }}
                        >
                          <Option value="+852">+852</Option>
                          <Option value="+86">+86</Option>
                        </Select>
                      </FormItem>
                      <FormItem
                        style={{ width: '75%' }}
                        name="mobile"
                        rules={[
                          {
                            //required: true,
                            required: false,
                            message: (
                              <FormattedMessage
                                id="pages.login.phoneNumber.placeholder"
                                defaultMessage="请输入手机号!"
                              />
                            ),
                          },
                          {
                            pattern: /^\d{8}$|^\d{11}$/,
                            message: (
                              <FormattedMessage
                                id="pages.login.phoneNumber.invalid"
                                defaultMessage="手机号格式错误!"
                              />
                            ),
                          },
                        ]}
                      >
                        <Input size="large" placeholder="手机号" />
                      </FormItem>
                    </InputGroup>

                    <ProFormCaptcha
                      fieldProps={{
                        size: 'large',
                        prefix: <LockOutlined className={styles.prefixIcon} />,
                      }}
                      captchaProps={{
                        size: 'large',
                      }}
                      placeholder={intl.formatMessage({
                        id: 'pages.login.captcha.tab',
                        defaultMessage: '验证码',
                      })}
                      captchaTextRender={(timing, count) => {
                        if (timing) {
                          return `${count} ${intl.formatMessage({
                            id: 'pages.getCaptchaSecondText',
                            defaultMessage: '秒后重新获取',
                          })}`;
                        }
                        return intl.formatMessage({
                          id: 'pages.login.phoneLogin.getVerificationCode',
                          defaultMessage: '获取验证码',
                        });
                      }}
                      name="captcha"
                      rules={[
                        {
                          //required: true,
                          required: false,
                          message: (
                            <FormattedMessage
                              id="pages.login.captcha.placeholder"
                              defaultMessage="请输入验证码！"
                            />
                          ),
                        },
                      ]}
                      onGetCaptcha={async () => {
                        let country_code = form.getFieldValue('country_code');
                        let mobile = form.getFieldValue('mobile');
                        const result = await sendSmsCode(country_code, mobile);
                        if (result === false) {
                          return;
                        }
                        message.success('获取验证码已发送成功！');
                      }}
                    />
                    {/*end for captcha*/}
                  </>
                )}

                <div
                  style={{
                    marginBottom: 24,
                  }}
                >
                  <ProFormCheckbox noStyle name="autoLogin">
                    <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录" />
                  </ProFormCheckbox>

                  <Link className={styles.login} to="/user/forgotPassword">
                    <span>
                      {intl.formatMessage({
                        id: 'pages.login.forgotPassword',
                        defaultMessage: '忘记密码',
                      })}
                    </span>
                  </Link>
                </div>
              </ProForm>
              <Space className={styles.other}>
                <Link className={styles.login} to="/user/register">
                  <span>
                    <FormattedMessage id="pages.login.registration" defaultMessage="新用户注册" />
                  </span>
                </Link>
              </Space>
              <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          {/*
          <Space className={styles.other}>
            <FormattedMessage id="pages.login.loginWith" defaultMessage="其他登录方式" />
            <AlipayCircleOutlined className={styles.icon} />
            <TaobaoCircleOutlined className={styles.icon} />
            <WeiboCircleOutlined className={styles.icon} />
          </Space>
          */}
            </div>
          </div>
          <div className={styles.footsyl}>
            <Footer />
          </div>
        </div>
      </div>
      {/* </Col> */}
    </Row>
  );
};

export default Login;
