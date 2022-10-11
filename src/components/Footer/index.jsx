import { useIntl } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';
export default () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: '',
  });
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      // links={[
      //   {
      //     key: 'Ant Design Pro',
      //     title: 'Ant Design Pro',
      //   },
        // {
        //   key: 'github',
        //   title: <GithubOutlined />,
          // blankTarget: true,
        // },
        // {
        //   key: 'Ant Design',
        //   title: 'Ant Design',
          // href: 'https://ant.design',
          // blankTarget: true,
        // },
      // ]}
    />
  );
};
