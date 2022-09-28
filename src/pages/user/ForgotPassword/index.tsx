import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { Form, Button, Col, Input, Popover, Progress, Row, Select, message } from 'antd';
import type { Store } from 'antd/es/form/interface';
import { Link, useRequest, history, SelectLang, useIntl, FormattedMessage } from 'umi';
import type { StateType } from './service';
import { modifyPassward, sendSmsCode } from './service';

import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;

const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <span>强度：强</span>
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <span>强度：中</span>
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <span>强度：太短</span>
    </div>
  ),
};

const passwordProgressMap: {
  ok: 'success';
  pass: 'normal';
  poor: 'exception';
} = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

const UserRegister: FC = () => {
  const [count, setCount]: [number, any] = useState(0);
  const [visible, setVisible]: [boolean, any] = useState(false);
  const [prefix, setPrefix]: [string, any] = useState('+86');
  const [popover, setPopover]: [boolean, any] = useState(false);
  const confirmDirty = false;
  let interval: number | undefined;
  const [form] = Form.useForm();
  const intl = useIntl();

  useEffect(
    () => () => {
      clearInterval(interval);
    },
    [interval],
  );

  const onGetCaptcha = () => {
    let country_code = form.getFieldValue('country_code');
    let mobile = form.getFieldValue('mobile');
    sendSmsCode(country_code, mobile)

    let counts = 59;
    setCount(counts);
    interval = window.setInterval(() => {
      counts -= 1;
      setCount(counts);
      if (counts === 0) {
        clearInterval(interval);
      }
    }, 1000);
  };

  const getPasswordStatus = () => {
    const value = form.getFieldValue('password');
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'poor';
  };

  const { loading: submitting, run: register } = useRequest<{ data: StateType }>(modifyPassward, {
    manual: true,
    onSuccess: (data, params) => {
      console.log("data:", data,  "   params:", params);
      if (data.status === 'ok') {
        //message.success(intl.formatMessage({ id: 'pages.register_result.title', defaultMessage: '注册成功！', }));
        message.success('修改密码成功');
        history.push({
          pathname: '/user/register-result',
          state: {
            account: params.email,
          },
        });
      }
      else
      {
        message.error('修改密码失败！'+ data.remark);
      }
    },
  });

  const onFinish = (values: Store) => {
    register(values);
  };

  const checkConfirm = (_: any, value: string) => {
    const promise = Promise;
    if (value && value !== form.getFieldValue('password')) {
      return promise.reject(intl.formatMessage({ id: 'pages.login.registerAccount_password_verification', defaultMessage: '两次输入的密码不匹配!', }));
    }
    return promise.resolve();
  };

  const checkPassword = (_: any, value: string) => {
    const promise = Promise;
    // 没有值的情况
    if (!value) {
      setVisible(!!value);
      return promise.reject(intl.formatMessage({ id: 'pages.login.password.reject', defaultMessage: '请输入密码!', }));
    }
    // 有值的情况
    if (!visible) {
      setVisible(!!value);
    }
    setPopover(!popover);
    if (value.length < 6) {
      return promise.reject('');
    }
    if (value && confirmDirty) {
      form.validateFields(['confirm']);
    }
    return promise.resolve();
  };

  const changePrefix = (value: string) => {
    setPrefix(value);
  };

  const renderPasswordProgress = () => {
    const value = form.getFieldValue('password');
    const passwordStatus = getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  return (
    <div className={styles.container}>
      <div className={styles.divleft}>
          <img className={styles.logoimg} src="/login.jpg" />
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
              <div className={styles.desc}>
                {intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
              </div>
            </div>
            <br/>
            <br/>
            <br/>
            <div className={styles.main}>
              <h3>{intl.formatMessage({ id: 'pages.login.post_new_password', defaultMessage: '重置密码', })}</h3>
              <Form 
                form={form} 
                name="UserRegister" 
                onFinish={onFinish}
                initialValues={{
                  country_code: "+852",
                }}
              >
                <FormItem
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: intl.formatMessage({ id: 'pages.login.username.required', defaultMessage: '请输入用户名!', }),
                    },
                  ]}
                >
                  <Input size="large" placeholder={intl.formatMessage({ id: 'pages.login.username.placeholder', defaultMessage: '用户名', })} />
                </FormItem>


                <InputGroup compact>
                  <FormItem
                    name="country_code"
                    noStyle
                  >
                    <Select size="large" value={prefix} onChange={changePrefix} style={{ width: '25%' }}>
                      <Option value="+852">+852</Option>
                      <Option value="+86">+86</Option>
                    </Select>
                  </FormItem>
                  <FormItem
                    style={{ width: '75%' }}
                    name="mobile"
                    rules={[
                      {
                        required: true,
                        message: intl.formatMessage({ id: 'pages.borrower_form.shareholder_info.please_input_phone', defaultMessage: '请输入手机号!',}),
                      },
                      {
                        pattern: /^\d{8}$|^\d{11}$/,
                        message: intl.formatMessage({ id: 'pages.borrower_form.shareholder_info.wrong_phone', defaultMessage: '手机号格式错误!',}),
                      },
                    ]}
                  >
                    <Input size="large" placeholder={intl.formatMessage({ id: 'pages.borrower_form.shareholder_info.phone', defaultMessage: '手机号',})} />
                  </FormItem>
                </InputGroup>
                <Row gutter={8}>
                  <Col span={16}>
                    <FormItem
                      name="captcha"
                      rules={[
                        {
                          required: true,
                          message: intl.formatMessage({ id: 'pages.login.captcha.placeholder', defaultMessage: '请输入验证码!',}),
                        },
                      ]}
                    >
                      <Input size="large" placeholder={intl.formatMessage({ id: 'pages.login.captcha.tab', defaultMessage: '验证码',})} />
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <Button
                      size="large"
                      disabled={!!count}
                      className={styles.getCaptcha}
                      onClick={onGetCaptcha}
                    >
                      {count ? `${count} s` : intl.formatMessage({ id: 'pages.login.phoneLogin.getVerificationCode', defaultMessage: '获取验证码',}) }
                    </Button>
                  </Col>
                </Row>

                <br/><br/>

                <Popover
                  getPopupContainer={(node) => {
                    if (node && node.parentNode) {
                      return node.parentNode as HTMLElement;
                    }
                    return node;
                  }}
                  content={
                    visible && (
                      <div style={{ padding: '4px 0' }}>
                        {passwordStatusMap[getPasswordStatus()]}
                        {renderPasswordProgress()}
                        <div style={{ marginTop: 10 }}>
                          <span>{intl.formatMessage({ id: 'pages.login.password.limitation1'})}</span>
                        </div>
                      </div>
                    )
                  }
                  overlayStyle={{ width: 240 }}
                  placement="right"
                  visible={visible}
                >
                  <FormItem
                    name="password"
                    className={
                      form.getFieldValue('password') &&
                      form.getFieldValue('password').length > 0 &&
                      styles.password
                    }
                    rules={[
                      {
                        validator: checkPassword,
                      },
                    ]}
                  >
                    <Input size="large" type="password" placeholder={intl.formatMessage({ id: 'pages.login.password.limitation2', defaultMessage: '至少6位密码，区分大小写',})} />
                  </FormItem>
                </Popover>
                <FormItem
                  name="confirm"
                  rules={[
                    {
                      required: true,
                      message: intl.formatMessage({ id: 'pages.login.password.confirm', defaultMessage: '确认密码',}),
                    },
                    {
                      validator: checkConfirm,
                    },
                  ]}
                >
                  <Input size="large" type="password" placeholder={intl.formatMessage({ id: 'pages.login.password.confirm', defaultMessage: '确认密码',})} />
                </FormItem>

                <FormItem>
                  <Button
                    size="large"
                    loading={submitting}
                    className={styles.submit}
                    type="primary"
                    htmlType="submit"
                  >
                    <span>{intl.formatMessage({ id: 'pages.login.post_new_password', defaultMessage: '重置密码',})}</span>
                  </Button>
                  <Link className={styles.login} to="/user/login">
                    <span>{intl.formatMessage({ id: 'pages.login.used_existed_user', defaultMessage: '使用已有账户登录',})}</span>
                  </Link>
                </FormItem>
              </Form>
            </div>

          </div>
        </div>
      </div>
  );
};
export default UserRegister;
