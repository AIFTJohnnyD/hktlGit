import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  headerTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'Laboratory for AI-Powered Financial Technology Limited',
  pwa: false,
  logo: 'https://hkaift.com/wp-content/uploads/2021/04/HKAIFT-Logo-100x91.png',
  iconfontUrl: '',
};

export default Settings;
