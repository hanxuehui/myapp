import React, { Component, useEffect, useState } from 'react';
const PrevModal=(props)=>{
    const [imgUrl, setImgUrl] = useState(props.formData.fileUrl ? props.formData.fileUrl : '');
    const [fileType, setFileType] = useState(null)
    useEffect(() => {
      let typeArr = props.formData.name.split('.')
      let type = typeArr[typeArr.length - 1]
      setFileType(type)
    })
    return (
      <div style={{ height: '800px', width: '100%' }}>
        {fileType == 'pdf' ? <iframe
          src={imgUrl}
          style={{ height: '100%', width: '100%' }}
        ></iframe> : <img style={{ height: '100%', width: '100%' }} src={imgUrl}></img>}
      </div>
    );
  };

export default PrevModal;