
import React, { Component } from 'react';
import { Modal } from 'antd';
export default class dialogAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      title: '添加',
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
    return (
      <Modal
        destroyOnClose={true}
        visible={visible}
        title={title}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        // footer={[]}
        width={'80%'}
      >
        <Comp dialogClose={this.handleCancel} params={this.state.params} bindData={this.props.bindData} />
      </Modal>
    )
  }
}