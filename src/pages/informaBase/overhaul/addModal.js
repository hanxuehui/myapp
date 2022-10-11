import React, { useState, Fragment, useEffect } from 'react';
import {
  Form,
  Row,
  Col,
  Input,
  Select,
  Radio,
  message,
  DatePicker,
  Button,
  Space,
  Divider,
  Table,
  Message,
  Card 
} from 'antd';
import APIFunction from '@/services/index.js';
// import { debounce } from '../../../utils';
import {
  PlusOutlined,
  MinusCircleOutlined,
  UploadOutlined,
  ConsoleSqlOutlined,
} from '@ant-design/icons';
const {
  overhaulAdd,
  overhaulEdit
} = APIFunction;
const FormItem = Form.Item;
import FilterSelect from "@/components/FilterSelect"
const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
//定义 “订单录入模态框”
const addModal = props => {
  const [codeList, setCodeList] = useState([]);
  const [maintenancer, setMaintenancer] = useState([]);
  const [loadFlag, setLoading] = useState(false);
  let [form] = Form.useForm();
  let FormRef;
  useEffect(() => {
   
  }, []);


  //确定
  const okHandle = () => {
    FormRef.validateFields().then(values => {
      let obj={
        ...values,
        initialGraduationTime:values.initialGraduationTime.format('YYYY-MM-DD HH:mm:ss').toString(),
        joinTime:values.joinTime.format('YYYY-MM-DD HH:mm:ss').toString(),
        specialOperationCertificate:values.specialOperationCertificate.join(','),
        safePersonCertificate:values.safePersonCertificate.join(','),
        qualificationCertificate:values.qualificationCertificate.join(','),
      }
      let urlApi = null,
        info = '';
      if (props.scmDialog.params.id) {
        (urlApi =overhaulEdit), (info = '编辑成功');
        obj.id = props.scmDialog.params.id;
      } else {
        (urlApi =overhaulAdd), (info = '新增成功');
      }
      urlApi(obj).then(res => {
        if (res?.status == 200) {
          setLoading(false)
          message.success(info);
          props.scmDialog.close()
          props.scmDialog.refresh()
        }else{
          setLoading(false)
          message.error(res)
        }
      });
    });
  };
  // 取消
  const cancel = async () => {
    props.scmDialog.close()
  }
  return (
    <Card>
    <Form
      ref={ref => (FormRef = ref)}
      labelCol={{
        span: 9,
      }}
      wrapperCol={{
        span: 15,
      }}
      labelAlign="right"
      initialValues={props.scmDialog.params}
      autoComplete="off"
      form={form}
    >
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
      <Col md={8}>
        <Form.Item
          label="姓名"
          name="name"
          rules={[{ required: true, message: '请输入姓名' }]}
        >
          <Input/>
        </Form.Item>
      </Col>
        <Col md={8}>
          <Form.Item
            label="性别"
            name="sex"
            rules={[{ required: true, message: '必选' }]}
          >
          <Select>
          <Option key='女'>女</Option>
          <Option key='男'>男</Option>
          </Select>
          </Form.Item>
        </Col>
        <Col md={8}>
          <Form.Item
            label="年龄"
            name="age"
            rules={[{ required: true, message: '必填' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={8}>
          <Form.Item
            label="身份证号"
            name="idCard"
            rules={[
              { required: true, message: '必填' },
            ]}
          >
            <Input/>
          </Form.Item>
        </Col>
        <Col md={8}>
          <Form.Item
            label="参加工作时间"
            name="joinTime"
            rules={[{ required: true, message: '请选择参加工作时间' }]}
          >
           <DatePicker/>
          </Form.Item>
        </Col>
        <Col md={8}>
        <Form.Item
          label="联系方式"
          name="contactType"
          rules={[{ required: true, message: '请输入联系方式' }]}
        >
         <Input/>
        </Form.Item>
      </Col>
      </Row>
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
      <Col md={8}>
        <Form.Item
          label="现家庭地址"
          name="homeAddress"
          rules={[
            { required: true, message: '必填' },
          ]}
        >
          <Input/>
        </Form.Item>
      </Col>
      <Col md={8}>
        <Form.Item
          label="专业"
          name="major"
          rules={[{ required: true, message: '请选择专业' }]}
        >
         <FilterSelect allowClear="true">
         <Option key='工程管理'>工程管理</Option>
         <Option key='安全管理'>安全管理</Option>
         <Option key='汽机本体'>汽机本体</Option>
         <Option key='汽机调速'>汽机调速</Option>
         <Option key='汽机发电机'>汽机发电机</Option>
         <Option key='汽机辅机'>汽机辅机</Option>
         <Option key='锅炉本体'>锅炉本体</Option>
         <Option key='锅炉辅机'>锅炉辅机</Option>
         <Option key='脱硫除灰系统'>脱硫除灰系统</Option>
         <Option key='电气发电机'>电气发电机</Option>
         <Option key='电气实验'>电气实验</Option>
         <Option key='电气配电'>电气配电</Option>
         <Option key='电气电动机'>电气电动机</Option>
         <Option key='电气调试'>电气调试</Option>
         <Option key='热控调试'>热控调试</Option>
         <Option key='热控安装'>热控安装</Option>
         <Option key='热控试验'>热控试验</Option>
         <Option key='高压焊工'>高压焊工</Option>
         <Option key='金相、热处理'>金相、热处理</Option>
         <Option key='架子工'>架子工</Option>
         <Option key='保温工'>保温工</Option>
         <Option key='行车司机'>行车司机</Option>
         <Option key='起重工'>起重工</Option>
         <Option key='土建'>土建</Option>
         <Option key='其他'>其他</Option>
         </FilterSelect>
        </Form.Item>
      </Col>
      <Col md={8}>
      <Form.Item
        label="专业年限"
        name="majorYear"
        rules={[{ required: true, message: '请输入专业年限' }]}
      >
       <Input/>
      </Form.Item>
    </Col>
    </Row>
    <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
    <Col md={8}>
      <Form.Item
        label="岗位"
        name="position"
        rules={[
          { required: true, message: '必填' },
        ]}
      >
        <Input/>
      </Form.Item>
    </Col>
    <Col md={8}>
      <Form.Item
        label="政治面貌"
        name="politicalOutlook"
        rules={[{ required: true, message: '请选择政治面貌' }]}
      >
       <FilterSelect allowClear="true">
       <Option key='团员'>团员</Option>
       <Option key='党员'>党员</Option>
       <Option key='群众'>群众</Option>
       </FilterSelect>
      </Form.Item>
    </Col>
    <Col md={8}>
    <Form.Item
      label="初始学历"
      name="initialEducation"
      rules={[{ required: true, message: '请选择初始学历' }]}
    >
     <FilterSelect allowClear="true">
     <Option key='小学'>小学</Option>
     <Option key='初中'>初中</Option>
     <Option key='高中'>高中</Option>
     <Option key='中专'>中专</Option>
     <Option key='大专'>大专</Option>
     <Option key='本科'>本科</Option>
     <Option key='硕士'>硕士</Option>
     <Option key='博士'>博士</Option>
     <Option key='其他'>其他</Option>
     </FilterSelect>
    </Form.Item>
  </Col>
  </Row>
      <Divider />
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
      <Col md={8}>
        <Form.Item
          label="初始学历所学专业"
          name="initialMajor"
          rules={[
            { required: true, message: '必填' },
          ]}
        >
          <Input/>
        </Form.Item>
      </Col>
      <Col md={8}>
        <Form.Item
          label="初始学历毕业院校"
          name="initialSchool"
          rules={[{ required: true, message: '请填写初始学历毕业院校' }]}
        >
         <Input/>
        </Form.Item>
      </Col>
      <Col md={8}>
      <Form.Item
        label="初始学历毕业时间"
        name="initialGraduationTime"
        rules={[{ required: true, message: '请选择初始学历毕业时间' }]}
      >
       <DatePicker/>
      </Form.Item>
    </Col>
    </Row>
    <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
    <Col md={8}>
      <Form.Item
        label="特种作业操作证"
        name="specialOperationCertificate"
        rules={[
          { required: true, message: '必填' },
        ]}
      >
        <FilterSelect mode="multiple" allowClear="true">
        <Option key='无'>无</Option>
        <Option key='高压电工'>高压电工</Option>
        <Option key='低压电工'>低压电工</Option>
        <Option key='焊接与热切割'>焊接与热切割</Option>
        <Option key='登高架设作业'>登高架设作业</Option>
        <Option key='高处安转、维护、拆除作业'>高处安转、维护、拆除作业</Option>
        <Option key='制冷与空调作业'>制冷与空调作业</Option>
        <Option key='其他'>其他</Option>
        </FilterSelect>
      </Form.Item>
    </Col>
    <Col md={8}>
      <Form.Item
        label="安全人员资格证"
        name="safePersonCertificate"
        rules={[{ required: true, message: '请选择安全人员资格证' }]}
      >
     <FilterSelect mode="multiple" allowClear="true">
     <Option key='无'>无</Option>
     <Option key='企业负责人（三类人员A证）'>企业负责人（三类人员A证）</Option>
     <Option key='项目负责人（三类人员B证）'>项目负责人（三类人员B证）</Option>
     <Option key='安全员（三类人员C证）'>安全员（三类人员C证）</Option>
     </FilterSelect>
      </Form.Item>
    </Col>
    <Col md={8}>
    <Form.Item
      label="执业资格证"
      name="qualificationCertificate"
      rules={[{ required: true, message: '请选择执业资格证' }]}
    >
    <FilterSelect mode="multiple" allowClear="true">
    <Option key='无'>无</Option>
    <Option key='一级注册建造师'>一级注册建造师</Option>
    <Option key='二级注册建造师'>二级注册建造师</Option>
    <Option key='注册安全工程师'>注册安全工程师</Option>
    <Option key='一级造价工程师'>一级造价工程师</Option>
    <Option key='二级造价工程师'>二级造价工程师</Option>
    <Option key='注册监理工程师'>注册监理工程师</Option>
    <Option key='注册消防工程师'>注册消防工程师</Option>
    <Option key='注册会计师'>注册会计师</Option>
    </FilterSelect>
    </Form.Item>
  </Col>
  </Row>
  <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
  <Col md={8}>
    <Form.Item
      label="归属单位"
      name="belongUnit"
      rules={[
        { required: true, message: '必填' },
      ]}
    >
      <Input/>
    </Form.Item>
  </Col>
  <Col md={8}>
    <Form.Item
      label="签订劳务合同时限"
      name="contractLimit"
      rules={[{ required: true, message: '请填写签订劳务合同时限' }]}
    >
     <Input/>
    </Form.Item>
  </Col>
  <Col md={8}>
  <Form.Item
    label="业务特长/专业技能"
    name="businessExpertise"
    rules={[{ required: true, message: '请填写业务特长' }]}
  >
   <Input/>
  </Form.Item>
</Col>
</Row>
<Row gutter={{ md: 8, lg: 24, xl: 48 }}>
<Col md={8}>
  <Form.Item
    label="推荐人"
    name="recommendPerson"
    rules={[
      { required: true, message: '必填' },
    ]}
  >
    <Input/>
  </Form.Item>
</Col>
<Col md={8}>
  <Form.Item
    label="推荐原因"
    name="recommendReason"
    rules={[
      { required: true, message: '必填' },
    ]}
  >
    <Input/>
  </Form.Item>
</Col>
<Col md={8}>
          <Form.Item label="项目经理评价" 
           name="managerEvaluation" 
          rules={[
            { required: true, message: '必填' },
          ]}>
          <FilterSelect allowClear="true">
          <Option key='优秀'>优秀</Option>
          <Option key='良好'>良好</Option>
          <Option key='一般'>一般</Option>
          <Option key='较差'>较差</Option>
          </FilterSelect>
          </Form.Item>
        </Col>

</Row>
<Row gutter={{ md: 8, lg: 24, xl: 48 }}>
<Col md={8}>
          <Form.Item label="编码" name="code"
          rules={[
            { required: true, message: '必填' },
          ]}>
            <Input />
          </Form.Item>
        </Col>
<Col md={8}>

          <Form.Item label="备注" name="remark">
            <TextArea />
          </Form.Item>
        </Col>
</Row>
    </Form>
    <div style={{ width: '100%', textAlign: 'center', marginTop: '100px' }}>
    <Button style={{ marginRight: '100px' }} onClick={() => cancel()}>取消</Button>
    <Button type="primary" onClick={() => okHandle()} loading={loadFlag} disabled={loadFlag}>
      保存
    </Button>
  </div>
  </Card>
  );
};
export default addModal;
