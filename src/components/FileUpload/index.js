import React, { useEffect, useState, Fragment } from 'react';
import { Message, Upload } from 'antd';
import { isPDForImg } from '@/utils/validators';
// import withModal from '@/components/Hoc/withModal';
import FilesRead from '../FileReader';
import axios from 'axios';
import { dialogHOC } from "@/components/DialogAction/dialogHOC"
import { interfaceProce } from "@/components/interfaceProce"
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
function onRemove(file) {
  console.log(file)
  if (file?.response) {
    if (file?.response?.code == 200) {
      Message.success('删除成功');
    } else {
      Message.error('删除失败')
    }
  } else {

  }

}
const FileUpload = props => {
  const [fileSet, setFileSet] = useState({});
  useEffect(() => {
    let fileSet = {
      // action: interfaceProce(props.actions),
      // headers: {
      //   'Authorization':localStorage.getItem('token'),
      // },
      onPreview(file) {
        let fileName = file.name;
        let filePath = file?.response?.data?.link || file.thumbUrl;
        if (!filePath) {
          new Promise(function (resolve) {
            axios
              .post(
                props.actions + file.response,
                {},
                { responseType: 'blob' },
              )
              .then(res => {
                resolve(res);
              });
          }).then(res => {
            filePath = window.URL.createObjectURL(res.data);
            if (isPDForImg(fileName, filePath)) {
              props.scmDialog.open({
                key: 'editer',
                // tableRef: proTableRef,
                filePath: filePath,
                fileName: fileName,
              })
            }
          });
        } else {
          if (isPDForImg(fileName, filePath)) {
            props.scmDialog.open({
              key: 'editer',
              // tableRef: proTableRef,
              filePath: filePath,
              fileName: fileName,
            })
          }
        }
      },
      // onRemove: file => {
      //   let params={
      //     fileId:file.fileId,
      //     rootId:file.rootId,
      //     documentId:file.documentId,
      //   }
      //     props.url(params).then(res=>{
      //       if(res.success==true){
      //         Message.success('删除图片成功');
      //       }
      //     })
      // },
    };
    if (!props.onChange) {
      fileSet.onChange = onChange;
    }
    if (!props.beforeUpload) {
      fileSet.beforeUpload = beforeUpload;
    }
    if (!props.onRemove) {
      fileSet.onRemove = onRemove;
    }
    setFileSet(fileSet);
  }, []);

  return (
    <Fragment>
      <Upload {...props} {...fileSet}></Upload>
      {/* <p style={{ color: '#faad14', margin: '10px 0 0 0' }}>
        请上传{props.listType === 'picture' ? '图片' : '附件'}
        ,单个文件体积小于100M!
      </p> */}
    </Fragment>
  );
};
export default dialogHOC(() => {
  return {
    bindComponents: [
      {
        key: 'editer',
        load: () => import('../FileReader'),
        title: '预览',
      }]
  }
}, FileUpload);
