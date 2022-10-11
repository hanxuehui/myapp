/*
 * @Descripttion: SCMsafe.com
 * @version: 1.0
 * @Author: wangyang 13718932754
 * @Date: 2022-02-24 14:04:59
 * @LastEditors: wangyang
 * @LastEditTime: 2022-04-14 12:32:28
 */

import React, { Component } from 'react';
import { Modal } from 'antd';
import { withRouter } from 'react-router';
import { SubmitButton } from './submit.js';

export const dialogHOC = (callback, Comp) => {
  const { bindComponents} = callback()

  return withRouter(class Index extends Component {
    constructor(props) {
      super(props)
      this.state = {
        bindComponents,
        num: 0
      }
      bindComponents.forEach(item => {
        item.load().then(Comp => {
          item.component = Comp.default || null
          this.setState({ num: this.state.num + 1 })
        })
      })
    }
    handleOk = () => {
    }
    show = (payload, bln) => {
      this.setState(state => {
        const arr = state.bindComponents.filter(item => item.key == payload.key)
        if (arr.length == 0) {
          console.log('dialogHOC的用法错误，不存在', payload.key)
          return state
        } else {
          arr[0].visible = bln
          arr[0].params = payload.params
        }
        return state
      })
    }
    get = (key, params) => {
      let res = params[key]
      if (res) {
        return res
      } else {
        return this.props.match.params[key]
      }
    }

    render() {
      return (
        <>
          <Comp {...this.props} scmDialog={{
            ...this.props.scmDialog, // 用于嵌套层
            open: payload => {
              this.show(payload, true)
              this.tableRef = payload.tableRef
            },
            close: payload => {
              this.show(payload, false)
            }
          }} />
          {bindComponents.map((item, componentIndex) => {
            const onCancel = () => {
              this.show(item, false)
            }
            const destroyOnClose = item.destroyOnClose === undefined ? true : item.destroyOnClose
            const params = item.params || {}
            const ItemComp = item.component
            const scmDialog = {
              //currentClose: onCancel, // 防止嵌套层时close被覆盖
              close: onCancel,
              params,
              get: key => this.get(key, params),
              refresh: () => {
                if (this.tableRef) {
                  this.tableRef.current.reload()
                } else {
                  console.log('请先设置 tableRef')
                }
              },
              SubmitButton: (submitButtonProps) => {
                return SubmitButton(submitButtonProps, scmDialog)
              }
            }
            return (
              <Modal
                key={componentIndex}
                destroyOnClose={destroyOnClose}
                visible={item.visible || false}
                footer={item.footer || []}
                title={item.title}
                width={item.width || '80%'}
                onOk={this.handleOk}
                onCancel={onCancel}
              >
                {ItemComp ? <ItemComp scmDialog={scmDialog} /> : null}
              </Modal>
            )
          })}
        </>
      )
    }
  })
} 