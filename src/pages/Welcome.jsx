import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography,Result } from 'antd';
import img from '@/assets/welcome.png';
import styles from './Welcome.less';
export default () => {
  // const intl = useIntl();
  return (
    <PageContainer>
    <Card style={{ marginTop: 8, textAlign: 'center' }}>
    <img src={img} />
  </Card>
    </PageContainer>
  );
};
