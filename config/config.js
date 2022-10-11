// https://umijs.org/config/
import { defineConfig } from 'umi';
import { join } from 'path';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
// const { REACT_APP_ENV } = process.env;
import routerConfig from './routes';
export default defineConfig({
  hash: true,
  define: {
    'process.env.apiUrl': 'http://120.48.82.97:8107/',
    // APP_TYPE: APP_TYPE || '',
    //'process.env.apiUrl': '',
    // 'process.env.logoPath': logoPath,
    // 'process.env.logoMenuPath': logoMenuPath,
    // 'docTitle': title,
    // 'docIcon': icon,
    // 'alifeLoggerPid': alifeLoggerPid
  },
  metas: [
    {
      httpEquiv: 'Cache-Control',
      content: 'no-cache',
    },
    {
      httpEquiv: 'Pragma',
      content: 'no-cache',
    },
    {
      httpEquiv: 'Expires',
      content: '0',
    },
  ],
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  proxy: {
    '/api': {
      target: 'http://localhost',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  routes: routerConfig,
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  manifest: {
    basePath: '/',
  },
  // Fast Refresh 热更新
  fastRefresh: {},
  // openAPI: [
  //   {
  //     requestLibPath: "import { request } from 'umi'",
  //     schemaPath: join(__dirname, 'oneapi.json'),
  //     mock: false,
  //   },
  //   {
  //     requestLibPath: "import { request } from 'umi'",
  //     schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
  //     projectName: 'swagger',
  //   },
  // ],
  nodeModulesTransform: {
    type: 'none',
  },
  mfsu: {},
  webpack5: {},
  exportStatic: {},
});
