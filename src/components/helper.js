import { render as reactDomRender, unmountComponentAtNode } from 'react-dom';
import { getDvaApp } from 'umi';
import { ConfigProvider } from 'antd';
import { Provider, connect } from 'react-redux';
import zhCN from 'antd/es/locale/zh_CN';

class Helper {
  /**
   * 渲染弹出窗Modal
   * @param component //reactElement react组件
   */
  constructor() {
  }
  parcel = com => {
    return (
      <ConfigProvider locale={zhCN}>
        {/* <Provider store={window.g_app._store}>{com}</Provider> */}
        <Provider store={getDvaApp()._store}>{com}</Provider>
      </ConfigProvider>
    );
  };
  /**
   * 渲染弹出窗Modal
   * @param component
   * @param key
   */

  //渲染多个
  renderModal_level(component, key) {
    const domId = key ? 'xc-render-dom' + key : 'xc-render-dom';
    const oldDomElement = document.querySelector('#' + domId);

    if (oldDomElement) {
      unmountComponentAtNode(oldDomElement);
      document.body.removeChild(oldDomElement);
    }

    const el = document.createElement('div');
    el.setAttribute('id', domId);
    document.querySelector('body').appendChild(el);
    reactDomRender(component, el);
  }
  //渲染单个 key不能重复  传key是多个
  renderModal(component, key) {
    const domId = key ? 'xc-render-dom' + key : 'xc-render-dom';
    let domObject = document.querySelector('#' + domId);
    if (!domObject) {
      const el = document.createElement('div');
      el.setAttribute('id', domId);
      document.querySelector('body').appendChild(el);
      domObject = el;
    }
    unmountComponentAtNode(domObject);
    // document.body.removeChild(domObject);
    reactDomRender(this.parcel(component), domObject);
  }
}
export default new Helper();
