import { Suspense, useEffect, useState } from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import { Col, Dropdown, Menu, Row } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import IntroduceRow from './components/IntroduceRow';
import SalesCard from './components/SalesCard';
import TopSearch from './components/TopSearch';
import ProportionSales from './components/ProportionSales';
import ProportionSale from './components/ProportionSale';
import OfflineData from './components/OfflineData';
import { useRequest } from 'umi';
import { fakeChartData } from './service';
import PageLoading from './components/PageLoading';
import { getTimeDistance } from './utils/utils';
import styles from './style.less';
import APIFunction from '@/services/index.js';
const { queryPageApi, innerQueryPage, overhaulQueryPage, professGetPage, laborQueryPage } = APIFunction;

const Analysis = () => {
  const [salesType, setSalesType] = useState('all');
  const [currentTabKey, setCurrentTabKey] = useState('');
  const [rangePickerValue, setRangePickerValue] = useState(getTimeDistance('year'));
  const [cricData, setCricData] = useState([]);
  const { loading, data } = useRequest(fakeChartData);

  useEffect(async () => {  
    let params = { page: 1, size: 20 }
    let res = await queryPageApi(params)
    let data = await innerQueryPage(params)
    let list = await laborQueryPage(params)
    let dta = await overhaulQueryPage(params)
    let lst = await professGetPage(params)
    let arrlist = [[
      {
        x: '调遣人员', y: res?.total
      }], [{
        x: '内部人员', y: data?.total
      }], [{
        x: '劳务分包人员', y: list?.total
      }], [{
        x: '检修人员', y: dta?.total
      }], [{
        x: '专业分包人员', y: lst?.total
      }]]
    setCricData(arrlist)
  }, [])
  const selectDate = (type) => {
    setRangePickerValue(getTimeDistance(type));
  };

  const handleRangePickerChange = (value) => {
    setRangePickerValue(value);
  };

  const isActive = (type) => {
    if (!rangePickerValue) {
      return '';
    }

    const value = getTimeDistance(type);

    if (!value) {
      return '';
    }

    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }

    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate;
    }

    return '';
  };

  let salesPieData;

  if (salesType === 'all') {
    salesPieData = data?.salesTypeData;
  } else {
    salesPieData = salesType === 'online' ? data?.salesTypeDataOnline : data?.salesTypeDataOffline;
  }

  const menu = (
    <Menu>
      <Menu.Item>操作一</Menu.Item>
      <Menu.Item>操作二</Menu.Item>
    </Menu>
  );
  const dropdownGroup = (
    <span className={styles.iconGroup}>
      <Dropdown overlay={menu} placement="bottomRight">
        <EllipsisOutlined />
      </Dropdown>
    </span>
  );

  const handleChangeSalesType = (e) => {
    setSalesType(e.target.value);
  };

  const handleTabChange = (key) => {
    setCurrentTabKey(key);
  };

  const activeKey = currentTabKey || (data?.offlineData[0] && data?.offlineData[0].name) || '';
  return (
    <GridContent>
      <>
        {/*<Suspense fallback={<PageLoading />}>
          <IntroduceRow 
          loading={loading} 
          // visitData={data?.visitData || []} 
          visitData={cricData || []}
          />
  </Suspense>*/}

        <Row
          gutter={24}
          style={{
            marginTop: 24,
            marginBottom: 24,
          }}
        >
          {cricData.map((item, index) => {
            return <Col xl={8} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={null} key={index}>
                <ProportionSale
                  dropdownGroup={dropdownGroup}
                  salesType={salesType}
                  loading={loading}
                  salesPieData={item || []}
                  handleChangeSalesType={handleChangeSalesType}
                />
              </Suspense>
            </Col>
          })}
        </Row>
      </>
    </GridContent>
  );
};

export default Analysis;
