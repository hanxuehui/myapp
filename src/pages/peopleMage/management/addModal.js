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
import FilterSelect from "@/components/FilterSelect"
import {
  PlusOutlined,
  MinusCircleOutlined,
  UploadOutlined,
  ConsoleSqlOutlined,
  ContactsOutlined,
} from '@ant-design/icons';
const {
  personDispatchAdd,
  personDispatchEdit,
  innerQueryPage
} = APIFunction;
const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const addModal = props => {
  const [codeList, setCodeList] = useState([]);
  const [maintenancer, setMaintenancer] = useState([]);
  const [loadFlag, setLoading] = useState(false);
  let [form] = Form.useForm();
  let FormRef;
  useEffect(() => {
    innerQueryPage({ page: 1, size: 1000 }).then(res => {
      if (res.statusCode == 200) {
        setMaintenancer(res.list)
      }

    })
  }, []);
  const getCodeValue=(e,b)=>{
    form.setFieldsValue({
       code:b.code
    })
  };
  //确定
  const okHandle = () => {
    setLoading(true)
    FormRef.validateFields().then(values => {
      let obj = {
        ...values,
        dispatchStartTime: values?.time[0].format('YYYY-MM-DD HH:mm:ss').toString(),
        dispatchEndTime: values?.time[1].format('YYYY-MM-DD HH:mm:ss').toString()
      }
      delete obj.time
      let urlApi = null,
        info = '';
      if (props.scmDialog.params.id) {
        (urlApi = personDispatchEdit), (info = '编辑成功');
        obj.id = props.scmDialog.params.id;
      } else {
        (urlApi = personDispatchAdd), (info = '新增成功');
      }
      urlApi(obj).then(res => {
        if (res?.status == 200) {
          setLoading(false)
          message.success(info);
          props.scmDialog.close()
          props.scmDialog.refresh()
        } else {
          setLoading(false)
          message.error(res)
        }
      });
    });
  };
  // 取消
  const cancel = async () => {
    props.scmDialog.close()
  };
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
              <FilterSelect 
               allowClear="true"
               onSelect={(e,b)=>getCodeValue(e,b)}
              >
                {maintenancer?.map(item => {
                    return <Option key={item.id} 
                                   code={item.code} 
                                   value={item.name}
                                   >
                                   {item.name}
                                   </Option>
                })}
              </FilterSelect>
            </Form.Item>
          </Col>

          <Col md={8}>
            <Form.Item
              label="原项目部"
              name="originDepartment"
              rules={[{ required: true, message: '必选' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={8}>
            <Form.Item
              label="现项目部"
              name="nowDepartment"
              rules={[{ required: true, message: '必填' }]}
            >
              <Input />
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
              <Input />
            </Form.Item>
          </Col>
          <Col md={8}>
            <Form.Item
              label="派遣时间"
              name="time"
              rules={[{ required: true, message: '请选择派遣时间' }]}
            >
              <RangePicker />
            </Form.Item>
          </Col>
          <Col md={8}>
            <Form.Item
              label="编码"
              name="code"
              rules={[{ required: true, message: '请填写唯一编码' }]}
            >
              <Input disabled/>
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <Row>
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
