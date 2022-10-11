import { Card, Radio, Typography } from 'antd';
import numeral from 'numeral';
import { Donut } from '@ant-design/charts';
import React from 'react';
import styles from '../style.less';
const { Text } = Typography;


const ProportionSale = ({
  dropdownGroup,
  salesType,
  loading,
  salesPieData,
  handleChangeSalesType,
}) => (
  <div style={{marginBottom: 24,}}> 
 {salesPieData.map(item=>{
  return <Card
  loading={loading}
  className={styles.salesCard}
  bordered={false}
  title={item.x}
  style={{
    height: '100%',
  }}
// extra={
//   <div className={styles.salesCardExtra}>
//     {dropdownGroup}
//     <div className={styles.salesTypeRadio}>
//       <Radio.Group value={salesType} onChange={handleChangeSalesType}>
//         <Radio.Button value="all">全部渠道</Radio.Button>
//         <Radio.Button value="online">线上</Radio.Button>
//         <Radio.Button value="stores">门店</Radio.Button>
//       </Radio.Group>
//     </div>
//   </div>
// }
>
  <div>
   {/*<Text>{item.x}</Text>*/}
    <Donut
      forceFit
      height={340}
      radius={0.8}
      angleField="y"
      colorField="x"
      data={salesPieData}
      legend={{
        visible: false,
      }}
      label={{
        visible: false,
        // visible: true,
      //   type: 'spider',
      //   formatter: (text, item) => {
      //     // eslint-disable-next-line no-underscore-dangle
      //     return `${item._origin.x}: ${numeral(item._origin.y).format('0,0')}`;
      //   },
      }}
       statistic={{
        totalLabel: item.x,
      }}
    />
  </div>
    </Card>
 })}
 
  </div>

);

export default ProportionSale;
