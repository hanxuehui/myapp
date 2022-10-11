/**
 * 支持img类型和pdf类型的文件预览
 * 其余的直接下载到本地
 */

import React, { useEffect, useState } from 'react';
import { Image } from 'antd';

const FilesRead = props => {
  const [urlPath, setUrlPath] = useState(null); // 项目列表
  const [fileType, setFileType] = useState(null); // 项目列表
  const { filePath, fileName } = props;

  useEffect(() => {
    let fileTypeArr = fileName.split('.');
    let fileType = fileTypeArr[fileTypeArr.length - 1];
    setFileType(fileType);
    if (fileType == 'pdf') {
      setUrlPath(filePath);
    } else {
      setUrlPath(filePath);
    }
  }, []);

  return (
    <React.Fragment>
      <div>
        {fileType == 'pdf' ? (
          <iframe
            src={urlPath}
            style={{ height: '600px', width: '66vw' }}
          ></iframe>
        ) : (
          <Image
            // style={{ maxHeight: '66vh', maxWidth: '100%' }}
            height="66vh"
            src={urlPath}
          />
        )}
      </div>
    </React.Fragment>
  );
};
export default FilesRead;
