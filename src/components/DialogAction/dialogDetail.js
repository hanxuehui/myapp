/*
 * @Descripttion: SCMsafe.com
 * @version: 1.0
 * @Author: wangyang 13718932754
 * @Date: 2022-02-22 13:42:10
 * @LastEditors: wangyang
 * @LastEditTime: 2022-02-23 13:22:00
 */

import React, { Component } from 'react';
import { Modal } from 'antd';

export default class dialogDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      title: '详情',
      params: {},
      Comp: null
    }
    this.load(props)
  }
  load(props) {
    props.load().then(Comp => {
      this.setState({
        Comp: Comp.default || null
      })
    })
  }
  handleOk = () => {

  }
  open = (params) => {
    this.setState({ visible: true, params });
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  render() {
    const {visible, title, Comp} = this.state
    //console.log('this.props.bindData=', this.props.bindData)
    return (
      <Modal
        destroyOnClose={true}
        visible={visible}
        title={title}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[]}
        width={'80%'}
      >
        <Comp dialogClose={this.handleCancel} params={this.state.params} bindData={this.props.bindData} />
      </Modal>
    )
  }
}