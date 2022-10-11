import axios from 'axios';
import { saveAs } from 'file-saver';
// import axios from 'axios-https-proxy-fix';
import { cloneDeep, isEmpty } from 'lodash';
import * as pathToRegexp from 'path-to-regexp';
import { message, notification } from 'antd';
import { CANCEL_REQUEST_MESSAGE, codeMessage } from '@/utils/constant';
import MyModal from '@/components/MyModal';
import qs from 'qs';
import { getDvaApp } from 'umi';
import { getToken, removeAll, getCurrentUser } from './authority';

const { CancelToken } = axios; //abort()
window.cancelRequest = new Map();
export default function request(options) {
  let { params = null, data = null, url, method = 'get', headers } = options;
  const cloneData = cloneDeep(data);
  try {
    // getDvaApp()._store.dispatch({
    //   type: 'global/setLoading',
    //   payload: {
    //     isLoading: true,
    //   },
    // });
    let domain = '';
    const urlMatch = url.match(/[a-zA-z]+:\/\/[^/]*/);
    if (urlMatch) {
      [domain] = urlMatch;
      url = url.slice(domain.length);
    }
    const match = pathToRegexp.parse(url);
    
    url = pathToRegexp.compile(url)(data);
    for (const item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name];
      }
    }
    url = domain + url;
  } catch (e) {
    message.error(e.message, 10);
    // getDvaApp()._store.dispatch({
    //   type: 'global/setLoading',
    //   payload: {
    //     isLoading: false,
    //   },
    // });
  }

  options.url = url;
  // options.params = cloneData;
  if (method.endsWith('DOWN')) {
    options.responseType = 'blob';
    options.method = method.startsWith('GET') ? 'get' : 'post';
  }
  /**
   * @url https://www.jianshu.com/p/42d1c58e785e
   * @message 在真实项目中，当路由已经跳转，而上一页的请求还在pending状态，
   *          如果数据量小还好，数据量大时，跳到新页面，旧的请求依旧没有停止，
   *          这将会十分损耗性能  executor函数
   */
  options.cancelToken = new CancelToken(cancel => {
    window.cancelRequest.set(Symbol(Date.now()), {
      pathname: window.location.pathname,
      cancel,
    });
  });
  //  axios- header
  const userToken = getToken();
  const currentUserObj = getCurrentUser();
  // const fixedHeader = {
  //   'Content-Type': 'application/json',
  //   'Authorization': userToken,
  //   //'Authorization': 'Basic c3dvcmQ6c3dvcmRfc2VjcmV0',
  //   // 'Connection': 'keep-alive',
  // }
  let userToeknObj = {};
  if (userToken) {
    userToeknObj = {
      'Authorization': userToken
    }
  };
  options.headers = {
    // ...fixedHeader,
    ...userToeknObj,
    ...headers
  };
  // 添加响应拦截器
  // axios.interceptors.response.use(function (response) {
  //   console.log(response)
  //   // 对响应数据做点什么
  //   return response;
  // }, function (error) {
  //   // 对响应错误做点什么
  //   console.log(error)
  //   return Promise.reject(error);
  // });
  // 设置axios - 响应拦截器
  axios.interceptors.response.use(response => {
    // console.log(response)
    // 设置延迟响应
    // return new Promise(resolve => setTimeout(()=>{resolve(response)}, 5));
    return response
  })
  return axios(options)
    .then(response => {
      // getDvaApp()._store.dispatch({
      //   type: 'global/setLoading',
      //   payload: {
      //     isLoading: false,
      //   },
      // });
      // console.log(response)
      const { statusText, status, data } = response;
      if (
        options?.responseType != 'blob' &&
        status != 200
      ) {
        // notification.error({
        //   // message: `错误`,
        //   description: data.msg || '错误',
        //   duration: 9,
        // });
        // 直接抛出异常 防止页面报错
        return Promise.reject(data);
      }
      //验证类逻辑，状态码处理。
      if (response.data && response.data.status == 5001) {
        let messages = response.data.message;
        message.error(messages ? messages : '失败!', 10);
        return Promise.reject(messages);
      }
      if (options?.responseType == 'blob') {
        let fileName = '';
        if (response.headers['content-type'] == 'application/pdf') {
          //导出文件名根据后端返回命名
          if (response.headers.filename) {
            fileName = decodeURI(response.headers.filename)
          } else {
            fileName = Date.parse(new Date()) + '.pdf';
          }
          saveAs(data, fileName);
        } else {
          if (response.headers['content-disposition']) {
            let b = response.headers['content-disposition'].slice(20)
            fileName = decodeURIComponent(b)
          } else {
            fileName = Date.parse(new Date()) + '.xls';
          }
          saveAs(data, fileName);
        }

        return Promise.resolve({
          success: true,
          message: statusText,
          statusCode: status,
          data,
        });
      } else {
        //console.log('response=', response)
        // if (response.config.url.indexOf('/blade-system/region/getRegionJson') > -1 && Array.isArray(response.data)) {
        //   return Promise.resolve({
        //     data
        //   })
        // } else {
        return Promise.resolve({
          success: true,
          message: statusText,
          statusCode: status,
          ...data,
        });
        // }
      }
    })
    .catch(error => {
      // getDvaApp()._store.dispatch({
      //   type: 'global/setLoading',
      //   payload: {
      //     isLoading: false,
      //   },
      // });
      const { response, message } = error;
      //终止协议 不作处理立即返回
      if (String(message) === CANCEL_REQUEST_MESSAGE) {
        return {
          success: false,
        };
      }
      let msg;
      let statusCode;
      if (response && response instanceof Object) {
        const { data, statusText } = response;
        statusCode = response.status;
        if (response.data.code == 500) {
          notification.error({
            // message: `错误`,
            description: response.data.msg,
            duration: 9,
          });
        } else {
          msg = data.msg || codeMessage[statusCode] || data.error || data.message || statusText;
          notification.error({
            // message: `错误`,
            description: msg,
            duration: 9,
          });
        }


        if (statusCode == 401) {
          notification.error({
            message: `登陆过期，重新登陆`,
            description: 401,
          });
          window.localStorage.clear();
          window.location.href = '/user/login';
        }
      } else {
        statusCode = 600;
        msg = error.message || 'Network Error';
        notification.error({
          message: `Network Error`,
          description: '网络异常',
        });
      }

      /* eslint-disable */
      return Promise.reject({
        success: false,
        statusCode,
        message: msg,
      });
    });
}
