import React, { useState, Fragment, useEffect } from 'react';
import {
  Form,
  Row,
  Col,
  Input,
  Select,
  Button,
  Divider,
  message,
  Card
} from 'antd';
import APIFunction from '@/services/index.js';
import FilterSelect from "@/components/FilterSelect"
import {
  UploadOutlined
} from '@ant-design/icons';
import FileUpload from '../../../components/FileUpload';
import checkValue from '@/utils/index'
const {
  professAdd,
  professEdit
} = APIFunction;
const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;
//定义 “订单录入模态框”
const addModal = props => {
  const [loadFlag, setLoading] = useState(false);
  let [form] = Form.useForm();
  let FormRef;
  useEffect(() => {

  }, []);
  //确定
  const okHandle = () => {
    FormRef.validateFields().then(values => {
      let urlApi = null,
        info = '',data;
      if (props.scmDialog.params.id) {
        (urlApi = professEdit), (info = '编辑成功');
        values.id = props.scmDialog.params.id;
         data=checkValue(values)
      } else {
        (urlApi = professAdd), (info = '新增成功');
         data=checkValue(values)
      }
      urlApi(data).then(res => {
        if (res.status == 200) {
          message.success(info);
          props.scmDialog.close()
          props.scmDialog.refresh()
        }
      });
    });
  };
  // 取消
  const cancel = async () => {
    props.scmDialog.close()
  }
  //附件上传
  const enclosureProps = {
    multiple: true,
    accept: 'image/jpeg,image/png,image/gif',
    listType: 'picture',
    name: 'file',
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
              label="单位名称"
              name="unitName"
              rules={[{ required: true, message: '请输入单位名称' }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col md={8}>
            <Form.Item
              label="资质类型"
              name="certificateType"
              rules={[{ required: true, message: '必填' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={8}>
            <Form.Item
              label="资质等级"
              name="certificateLevel"
              rules={[{ required: true, message: '必填' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8}>
            <Form.Item
              label="主要从事专业"
              name="mainProfession"
              rules={[
                { required: true, message: '必填' },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={8}>
            <Form.Item
              label="人数规模"
              name="scale"
              rules={[{ required: true, message: '请填写人数规模' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={8}>
            <Form.Item
              label="负责人"
              name="director"
              rules={[{ required: true, message: '请填写负责人' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8}>
            <Form.Item 
            label="联系方式"
            name="contactType"
            rules={[{ required: true, message: '请填写联系方式' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col md={8}>
            <Form.Item 
            label="单位地址"
            name="homeAddress"
            rules={[{ required: true, message: '请填写单位地址' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col md={8}>
            <Form.Item 
            label="推荐人" 
            name="recommendPerson"
            rules={[{ required: true, message: '请填写推荐人' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8}>
            <Form.Item 
            label="推荐原因" 
            name="recommendReason"
            rules={[{ required: true, message: '请填写推荐原因' }]}>
              <TextArea />
            </Form.Item>
          </Col>
          <Col md={8}>
            <Form.Item 
            label="项目经理评价" 
            name="managerEvaluation"
            rules={[{ required: true, message: '请填写项目经理评价' }]}>
            <FilterSelect allowClear="true">
            <Option key='优秀'>优秀</Option>
            <Option key='良好'>良好</Option>
            <Option key='一般'>一般</Option>
            <Option key='较差'>较差</Option>
          </FilterSelect>
            </Form.Item>
          </Col>
          <Col md={8}>
            <Form.Item label="备注" name="remark">
            <TextArea />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={8}>
            <Form.Item 
            label="编码" 
            name="code"
            rules={[{ required: true, message: '请填写编码' }]}>
             <Input/>
            </Form.Item>
          </Col>
          <Col md={8}>
            <Form.Item label="资质附件" name="certificateFile">
              <FileUpload {...enclosureProps} >
                <Button icon={<UploadOutlined />}>资质附件上传</Button>
              </FileUpload>
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
