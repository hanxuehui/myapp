//处理保存数据
  const checkValue = (values) => {
    const formData = new FormData();
    //from表单转formData格式
    Object.keys(values).forEach((key) => {
      if (values[key]) {
        //判断是附件的，特殊处理
        if (key == "file") {
          (values[key].fileList).forEach((item,index) => {
            if (item.originFileObj) {   //在编辑的时候，若添加的图片，那么之前的是没有File的，那么就过滤掉
                formData.append('resumeFile',item.originFileObj)
            }
          })
        }else if(key == "certificateFile"){
          (values[key].fileList).forEach((item,index) => {
            if (item.originFileObj) {   //在编辑的时候，若添加的图片，那么之前的是没有File的，那么就过滤掉
                formData.append('certificateFile',item.originFileObj)
            }
          })
        }else{
            formData.append(key, values[key]);
        }
      }else{
          if(key=='initialGraduationTime'||key=='age'||key=='joinTime'){
            formData.append(key, values[key]);
          }  
      }
    });
    return formData
  }
  export default checkValue;