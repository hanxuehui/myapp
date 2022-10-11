import React, { Component, Fragment, useRef, useState, useEffect } from 'react';
import { Button, Image, Form, Row, Col, Divider, Upload, Message } from 'antd';
import { history } from 'umi';
import { saveAs } from 'file-saver';
import FileUpload from '@/components/FileUpload/fileIndex';
// import FileUpload from '@/components/FileUpload';//直接上传到服务器
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import excelImg from './images/excel.webp'

/*
    formData参数对象：
        downLoadUrl：下载模板地址
        downLoadParams： 下载模板参数  // 无参数可不传
        upLoadUrl： 上传文件地址 -- 点击确定按钮调用的接口
        upLoadParams：上传文件参数  // 无参数可不传
*/

const FileImportALL = props => {
    let FormRef;
    const { formData } = props;
    const [downLoading, setDownLoading] = useState(false);

    //下载模板
    const downLoadExcel = () => {
        setDownLoading(true);
        // 请求接口，成功后
        let downLoadParams = formData.downLoadParams ? formData.downLoadParams : {}
        formData.downLoadUrl(downLoadParams).then(blobStream => {
            if (blobStream.statusCode == 200) {
                Message.success("下载成功")
                setDownLoading(false);
                props.modalControl.close();
                props.handleSearch();
            }
        }).catch((res) => {
            Message.error(res.msg)
            setDownLoading(false);
        });
    };
    //附件上传
    const enclosureProps = {
        listType: 'file',
        name: 'file',
    };
    // 点击确定
    const okHandle = () => {
        props.modalControl.Loading(true);
        FormRef.validateFields().then(values => {
            props.modalControl.Loading(true);
            let formDataFile = new FormData();
            if (formData.upLoadParams) { // 存在参数
                formDataFile.append('file', values.signPhoto.file.originFileObj);
                formData.upLoadParams.forEach((v, i) => {
                    Object.keys(v).forEach(v => {
                        formDataFile.append(v, formData.upLoadParams[i][v]);
                        // console.log(v)//取到了key
                        // console.log(formData.upLoadParams[i][v])//取到了值
                    })
                })
            } else {
                formDataFile.append('file', values.signPhoto.file.originFileObj);
            }
            formData.upLoadUrl(formDataFile).then(res => {
                props.modalControl.Loading(false);
                if (res.statusCode == 200) {
                    Message.success(res.msg);
                    props.modalControl.close();
                    props.handleSearch();
                }
            }).catch(res => {
                props.modalControl.Loading(false);
                Message.error(res.msg)
            })
        })
    }

    props.modalControl.registerOk(okHandle);

    return (
        <Form ref={ref => (FormRef = ref)}>
            <div style={{ 'marginBottom': '20px' }}>{props.title || '请按照系统信息模版进行导入, 否则系统无法正确识别您导入的信息'}</div>
            <Image
                style={{ 'width': '100px', 'marginBottom': '20px' }}
                src={excelImg}
                preview={false}
            />
            {
                formData.isUrl ?
                    <Button
                        href={formData.downLoadUrl}
                        style={{ 'display': 'block', width: '100px' }}
                        size="small"
                    >
                        <DownloadOutlined />下载模板
                    </Button> :
                    <Button
                        loading={downLoading}
                        size="small"
                        style={{ 'display': 'block', width: '100px' }}
                        onClick={() => downLoadExcel()}>
                        <DownloadOutlined />下载模板
                    </Button>
            }

            <Divider />
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={24} sm={24}>
                    <Form.Item
                        name="signPhoto"
                        label=""
                        rules={[{ required: true, message: '必填' }]}
                    >
                        <FileUpload {...enclosureProps}>
                            <Button>
                                <UploadOutlined type="upload" /> 上传文件
                            </Button>
                        </FileUpload>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default FileImportALL