/*
 * @Descripttion: SCMsafe.com
 * @version: 1.0
 * @Author: wangyang 13718932754
 * @Date: 2022-03-17 10:46:27
 * @LastEditors: wangyang
 * @LastEditTime: 2022-03-17 17:13:05
 */
import { Button, message } from 'antd';
import { useState } from 'react';

export const SubmitButton = (props, scmDialog) => {
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const { button, form, api } = props
  const cancel = () => {
    scmDialog.close()
  }
  const submit = () => {
    setLoading(true)
    setDisabled(true)
    form().validateFields().then(values => {
      api(values).then(res => {
        //console.log('res=', res)
        if (res.code == 200) {
          message.success(res.msg)
          scmDialog.close()
          scmDialog.refresh()
        } else {
          message.error(res.msg)
        }
      }).catch((err) => {
        console.log('接口调用报错 ', err)
      }).finally(() => {
        setLoading(false)
        setDisabled(false)
      })
    }).catch((err) => {
      console.log('表单验证失败 ', err)
      setLoading(false)
      setDisabled(false)
    })
  }
  return (<>
    <Button type={button?.cancel?.type || ''} style={{ 'marginRight': '100px' }} onClick={cancel}>{button?.cancel?.text || '取消'}</Button>
    <Button type={button?.type || 'primary'} onClick={submit} loading={loading} disabled={disabled}>{button?.text || '保存'}</Button>
  </>)
}