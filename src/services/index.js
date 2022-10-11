import request from '@/utils/request2';
import { apiPrefix, apiPrefixToken } from '@/utils/config';

import api from './api';
const gen = (params, option) => {
  const paramsArray = params.split(' ');
  let url = apiPrefix + params;
  let method = 'GET';
  if (paramsArray.length >= 2) {
    method = paramsArray[0];
    url = paramsArray[1].startsWith('http')
      ? paramsArray[1]
      : apiPrefix + paramsArray[1];
  }

  return function(data, option) {
    let requestData={}
    if(paramsArray[2]==='query'){
      requestData={ 
        url,
        params:data,
        method,
        ...option,}
    }else if(paramsArray[2]=='querys'){
      requestData={ 
        url,
        method,
        data:data,
        headers: {
          'Content-Type':'multipart/form-data'
        },
        ...option,}
    }else{
      requestData={
        url,
      data,
      method,
      ...option,}
    }
    //console.log('requestData=', requestData)
    // return request({
    //   url,
    //   data,
    //   method,
    //   ...option,
    // });
    return request(requestData)
  };
};
// 以control为命名空间 避免api重复
const setAPI = api => {
  let apiList = {};
  for (const key in api) {
    if (Object.prototype.toString.call(api[key]) === '[object Object]') {
      // 尾调 允许套娃
      apiList[key] = setAPI(api[key]);
    } else {
      apiList[key] = gen(api[key]);
    }
  }
  return apiList;
};
const APIFunction = setAPI(api);
export default APIFunction;
