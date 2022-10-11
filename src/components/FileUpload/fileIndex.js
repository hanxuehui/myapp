import React, { useEffect, useState,Fragment } from 'react';
import { Message, Upload } from 'antd';
import { isPDForImg } from '@/utils/validators';
import withModal from '@/components/Hoc/withModal';
import FilesRead from '../FileReader';
import helper from '@/utils/helper';
import axios from 'axios';
function beforeUpload(file) {
  const isLt100M = file.size / 1024 / 1024 < 100;
  if (!isLt100M) {
    Message.error('文件不能超过 100MB!');
    file.status = 'error';
  }
  return isLt100M;
}

function onChange(info, fileList, event) {
  if (info.file.status === 'done') {
    Message.success(`${info.file.name} file uploaded successfully`);
    return 'response';
  } else if (info.file.status === 'error') {
    Message.error(`${info.file.name} file upload failed.`);
  }
}

const FileIndex = props => {
  const [fileSet, setFileSet] = useState({});

  useEffect(() => {
    let fileSet = {
      multiple: true,
      headers: {
        'Blade-Auth':window.localStorage.getItem('sword-token'),
      },
      onPreview(file) {
        let fileName = file.name;
        let filePath = file.url || file.thumbUrl;
        // 如果没有路径可以判断为新上传的文件则请求下载
        if (!filePath) {
          new Promise(function(resolve) {
            axios
              .post(
                fileAttach + file.response,
                {},
                { responseType: 'blob' },
              )
              .then(res => {
                resolve(res);
              });
          }).then(res => {
            filePath = window.URL.createObjectURL(res.data);
            if (isPDForImg(fileName, filePath)) {
              const Modal = withModal(FilesRead);
              helper.renderModal(
                <Modal
                  filePath={filePath}
                  fileName={fileName}
                  nameType="确定"
                  modalProps={{
                    title: '预览',
                    width: 1100,
                    maskClosable: false,
                    footer: null,
                  }}
                />,
                'pic',
              );
            }
          });
        } else {
          if (isPDForImg(fileName, filePath)) {
            const Modal = withModal(FilesRead);
            helper.renderModal(
              <Modal
                filePath={filePath}
                fileName={fileName}
                nameType="确定"
                modalProps={{
                  title: '预览',
                  width: 1100,
                  maskClosable: false,
                  footer: null,
                }}
              />,
              'pic',
            );
          }
        }
      },
    };
    if (!props.onChange) {
      fileSet.onChange = onChange;
    }
    if (!props.beforeUpload) {
      fileSet.beforeUpload = beforeUpload;
    }
    if (!props.onRemove) {
        return
    }
    setFileSet(fileSet);
  }, []);

  return (
    <Fragment>
      <Upload {...props} {...fileSet}></Upload>
      <p style={{ color: '#faad14', margin: '10px 0 0 0' }}>
        请上传{props.listType === 'picture' ? '图片' : '附件'}
        ,单个文件体积小于100M!
      </p>
    </Fragment>
  );
};
export default FileIndex;
