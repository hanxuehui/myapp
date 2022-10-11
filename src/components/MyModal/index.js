import React from 'react';
import {
  Modal,
} from 'antd'
/**
 * [MyModal description] 自定义对话框。（2秒后自动关闭）
 * @param       {[type]} msg  弹出的信息
 * @param       {[type]} type 弹框的类型
 * @constructor
 */
export default function MyModal(msg,type) {
      let modal
      switch(type){
          case 'info':
            modal=Modal.info({
                title:msg,
            })
            break;
          case 'success':
            modal=Modal.success({
                title:msg,
            })
            break;
          case 'warning':
            modal=Modal.warning({
                title:msg,
            })
            break;
          case 'error':
            modal=Modal.error({
                title:msg,
            })
            break;
      }
      setTimeout(() => modal.destroy(), 2000);
}
