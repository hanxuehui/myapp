import FileUpload from '@/components/FileUpload';
import {
    Form,
    Button,
    Row,
    Col,
    message
} from 'antd';
import {
    UploadOutlined,
} from '@ant-design/icons';
import React, { useState, Fragment, useEffect, useRef } from 'react';
const ExcelMode = (props) => {
    const [loadFlag, setLoading] = useState(false);
    let [form] = Form.useForm();
    let FormRef;
    //附件上传
    const enclosureProps = {
        name: 'file',
        multiple: true,
        // accept: 'image/jpeg,image/png,image/gif',
        // listType: 'picture',
        // onRemove: onRemove,
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
            const formData = new FormData()
            values.file.fileList.map(item=>{
                formData.append('file',item.originFileObj)
            })
            props.scmDialog.params(formData).then(res => {
                if (res.status == 200) {
                    message.success(res.msg);
                    props.scmDialog.close()
                    props.scmDialog.refresh()
                }else{
                    message.error(res.msg);
                }
            })
        })
    }
    // 取消
    const cancel = async () => {
        props.scmDialog.close()
    }
    return <Form
        ref={ref => (FormRef = ref)}
        labelCol={{
            span: 9,
        }}
        wrapperCol={{
            span: 15,
        }}
        labelAlign="right"
        // initialValues={props.scmDialog.params}
        autoComplete="off"
        form={form}>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8}><Form.Item label="excel导入" name="file" 
            // valuePropName="fileList" 
            // getValueFromEvent={normFile}
            >
                <FileUpload {...enclosureProps} >
                    <Button icon={<UploadOutlined />}>数据导入</Button>
                </FileUpload>
            </Form.Item></Col>
        </Row>

        <div style={{ width: '100%', textAlign: 'center', marginTop: '100px' }}>
            <Button style={{ marginRight: '100px' }} onClick={() => cancel()}>取消</Button>
            <Button type="primary" onClick={() => okHandle()} loading={loadFlag} disabled={loadFlag}>
                保存
            </Button>
        </div>
    </Form>
}

export default ExcelMode;