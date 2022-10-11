import { InfoCircleOutlined } from '@ant-design/icons';
import { TinyArea, TinyColumn, Progress } from '@ant-design/charts';
import { Col, Row, Tooltip } from 'antd';
import numeral from 'numeral';
import { ChartCard, Field } from './Charts';
import Trend from './Trend';
import Yuan from '../utils/Yuan';
import styles from '../style.less';
const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 8,
  style: {
    marginBottom: 24,
  },
};

const IntroduceRow = ({ loading, visitData }) => (
  <div>
  <Row gutter={24}>
  {visitData?.map(item=>{
    return <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title={item.x}
        action={
          <Tooltip title={item.x}>
            <InfoCircleOutlined />
          </Tooltip>
        }
        loading={loading}
        total={() => item.y}
        footer={
          <div
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
          >
          <Trend
              flag="down"
              style={{
                marginRight: 16,
              }}
            >
            {item.x}
              <span className={styles.trendText}>{item.y}</span>
            </Trend>
           {/* <Trend flag="up">
              日同比
              <span className={styles.trendText}>11%</span>
            </Trend>*/}
          </div>
        }
        contentHeight={66}
      >
      </ChartCard>
    </Col>
  })}
  </Row>
 
   {/*<Row gutter={24}>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          title="人员调遣"
          action={
            <Tooltip title="指标说明">
              <InfoCircleOutlined />
            </Tooltip>
          }
          loading={loading}
          total={() => 126560}
          footer={
            <div
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
            >
            </div>
          }
          contentHeight={66}
        >
          图片
        </ChartCard>
      </Col>

      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title="内部人员"
          action={
            <Tooltip title="指标说明">
              <InfoCircleOutlined />
            </Tooltip>
          }
          total={numeral(8846).format('0,0')}
          footer={
            <div
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
            >
            </div>
          }
          contentHeight={66}
        >
          图片
        </ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title="检修人员"
          action={
            <Tooltip title="指标说明">
              <InfoCircleOutlined />
            </Tooltip>
          }
          total={numeral(6560).format('0,0')}
          footer={
            <div
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
            >
            </div>
          }
          contentHeight={66}
        >
          图片
        </ChartCard>
      </Col>
        </Row>*/}
   {/*<Row gutter={24}>
      <Col {...topColResponsiveProps}>
        <ChartCard
          loading={loading}
          bordered={false}
          title="专业分包"
          action={
            <Tooltip title="指标说明">
              <InfoCircleOutlined />
            </Tooltip>
          }
          total="78%"
          footer={
            <div
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
            >
            </div>
          }
          contentHeight={66}
        >
          图片
        </ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          loading={loading}
          bordered={false}
          title="劳务分包"
          action={
            <Tooltip title="指标说明">
              <InfoCircleOutlined />
            </Tooltip>
          }
          total="78%"
          footer={
            <div
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
            >
            </div>
          }
          contentHeight={66}
        >
          图片
        </ChartCard>
      </Col>
        </Row>*/}
  </div>

);

export default IntroduceRow;
