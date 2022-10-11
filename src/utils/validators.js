/**
 * 表单验证1-15个字符
 * @param rule
 * @param value
 * @param callback
 */
export const inputLengthMax15 = (rule, value, callback) => {
  if (value && value.length > 0) {
    if (value.length > 15) {
      callback('1~15个字');
    } else {
      callback();
    }
  } else {
    callback('请输入');
  }
};

export const inputLengthMax5 = (rule, value, callback) => {
  if (value && value.length > 0) {
    if (value.length > 5) {
      callback('1~5个字');
    } else {
      callback();
    }
  } else {
    callback('请输入');
  }
};
/**
 * 判断文件时候是img 或 pdf 类型
 * @param fileName
 * @param filePath
 * @returns {boolean}
 */
export const isPDForImg = (fileName, filePath) => {
  let type = ['pdf', 'bmp', 'png', 'gif', 'jpg', 'jpeg'];
  let fileTypeArr = fileName?.split('.');
  let fileType = fileTypeArr[fileTypeArr?.length - 1].toLowerCase();

  if (type.includes(fileType)) {
    return true;
  } else {
    let link = document.createElement('a');
    link.href = filePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(filePath);
  }
};
