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
import FileUpload from '../../../components/FileUpload';
import FilterSelect from "@/components/FilterSelect"
import checkValue from '@/utils/index'
import {
  UploadOutlined,
} from '@ant-design/icons';
const {
  laborAdd,
  laborEdit
} = APIFunction;
const { TextArea } = Input;
//定义 “订单录入模态框”
const addModal = props => {
  const [loadFlag, setLoading] = useState(false);
  let [form] = Form.useForm();
  let FormRef;
  useEffect(() => {
    let obj = {
      ...props.scmDialog.params,

    }
    if (props.scmDialog.params.id) {
      form.setFieldsValue(obj)
    }

  }, [props.scmDialog.params.id]);

  //附件上传
  const enclosureProps = {
    multiple: true,
    accept: 'image/jpeg,image/png,image/gif',
    listType: 'picture',
    name: 'file',
  };
  const normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  //确定
  const okHandle = () => {
    FormRef.validateFields().then(values => {
      values.certificate=JSON.stringify(values.certificate)
      let urlApi = null,
        info = '';
      if (props.scmDialog.params.id) {
        (urlApi = laborEdit), (info = '编辑成功');
        values.id = props.scmDialog.params.id;
      } else {
        (urlApi = laborAdd), (info = '新增成功');
      }
      urlApi(values).then(res => {
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
        initialValues={props.formData}
        autoComplete="off"
        form={form}
      >
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8}>
            <Form.Item
              label="负责人"
              name="director"
              rules={[{ required: true, message: '请输入负责人姓名' }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col md={8}>
            <Form.Item
              label="联系人"
              name="contractPerson"
              rules={[{ required: true, message: '必选' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={8}>
            <Form.Item
              label="主要从事专业"
              name="mainProfession"
              rules={[{ required: true, message: '必填' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8}>
            <Form.Item
              label="人数规模"
              name="scale"
              rules={[
                { required: true, message: '必填' },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={8}>
            <Form.Item
              label="大部分人员居住地"
              name="moreLiveAddress"
              rules={[{ required: true, message: '请输入大部分人员居住地' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={8}>
            <Form.Item
              label="推荐人"
              name="recommendPerson"
              rules={[{ required: true, message: '请输入推荐人' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col md={8}>
            <Form.Item
              label="推荐原因"
              name="recommendReason"
              rules={[{ required: true, message: '请选择输入推荐原因' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={8}>
            <Form.Item
              label="项目经理评价"
              name="managerEvaluation"
              rules={[{ required: true, message: '请选择项目经理评价' }]}
            >
            <FilterSelect allowClear="true">
            <Option key='优秀'>优秀</Option>
            <Option key='良好'>良好</Option>
            <Option key='一般'>一般</Option>
            <Option key='较差'>较差</Option>
          </FilterSelect>
            </Form.Item>
          </Col>
          <Col  md={8}>
            <Form.Item
              label="居住地"
              name="liveAddress"
              rules={[{ required: true, message: '请输入居住地' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <Form.Item
              label="编码"
              name="code"
              rules={[{ required: true, message: '请输入唯一编码' }]}
            >
              <Input />
            </Form.Item>
          </Col>
         {/*<Col md={8}>
            <Form.Item label="资质附件文件" name="certificate" 
            valuePropName="fileList" getValueFromEvent={normFile}
            >
              <FileUpload {...enclosureProps} >
                <Button icon={<UploadOutlined />}>简历上传</Button>
              </FileUpload>
            </Form.Item>
            </Col>*/}
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
