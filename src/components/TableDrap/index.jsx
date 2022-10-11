import React, { useEffect, useState } from 'react';
import ProTable from '@ant-design/pro-table';
import { Empty, ConfigProvider } from 'antd';
// import { Resizable } from 'react-resizable';
import { history } from 'umi';
import { drag } from './drag.js';


import moment from 'moment';
import zhCNIntl from 'antd/lib/locale/zh_CN';
moment.locale('zh-cn');

const ResizableTitle = props => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }
  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={e => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};
let timer = null;
const TableDrap = props => {
  const [FirstEnter, setFirstEnter] = useState(true);
  const [columnsStateMap, setColumnsStateMap] = useState({});
  const [tableScroll, setTableScroll] = useState({});
  const [newColumns, setNewColumns] = useState([]);
  const [tableIndex, setTableIndex] = useState([]); // 鼠标点击行
  const [curPageSelectedRowKeys, setCurPageSelectedRowKeys] = useState([]);//存储当前页选中数据的key值数组
  const [selectedRows, setSelectedRows] = useState([]);//存储所有选中数据

  const onColumnsStateChange = map => {
    let HRtableColumState = localStorage.getItem('HRtableColumState')
      ? JSON.parse(localStorage.getItem('HRtableColumState'))
      : {};
    HRtableColumState[history.location.pathname] = map;
    localStorage.setItem(
      'HRtableColumState',
      JSON.stringify(HRtableColumState),
    );
    setColumnsStateMap(map);
    console.log('onColumnsStateChange')
  };

  const tableOnlaod = () => {
    setTableIndex('-1');
    props.actionRef?.current?.clearSelected();
    props.onLoad && props.onLoad();
    if (FirstEnter) {
      let HRtableColumState = localStorage.getItem('HRtableColumState')
        ? JSON.parse(localStorage.getItem('HRtableColumState'))
        : {};
      if (HRtableColumState[history.location.pathname]) {
        setColumnsStateMap(HRtableColumState[history.location.pathname]);
      }
      setFirstEnter(false);
    }
    drag();
  };
  /**
   * colums 搜索下拉框数据变化
   */
  useEffect(() => {
    setnewColumnsFunc();
  }, [props.columns]);

  /**
   * colums 初始化
   */
  useEffect(() => {
    setnewColumnsFunc();
    settableHeight();
    window.addEventListener('resize', settableHeight);
    return () => {
      window.removeEventListener('resize', settableHeight);
    };
  }, []);
  /**
   * 设置表格高度
   */
  const settableHeight = () => {
    // 顶部 52 + 面包屑 26 + 查询 64 + 表头 47 + toolbar 64 + 分页 72 = 324
    let isFull =
      document.body.scrollHeight == window.screen.height &&
      document.body.scrollWidth == window.screen.width;
    let scroll = props.scroll || {};
    if (isFull) {
      scroll.y = document.body.offsetHeight - 260;
    } else {
      scroll.y = document.body.offsetHeight - 360;
    }
    let newScroll = Object.assign({}, scroll);
    setTableScroll(newScroll);
  };

  /**
   * 更新搜索下拉框数据变化
   */
  const setnewColumnsFunc = () => {
    let newColumns = [...props.columns];
    newColumns.forEach((item, index) => {
      if (!item.key) {
        item.key = item.dataIndex || 'operation' + index;
      }
    });
    setNewColumns(newColumns);
  };
  const components = {
    header: {
      cell: ResizableTitle,
    },
  };

  const handleResize = index => (e, { size }) => {
    const nextColumns = [...newColumns];
    nextColumns[index] = {
      ...nextColumns[index],
      width: size.width,
    };
    setNewColumns(nextColumns);
  };

  const columns = newColumns.map((col, index) => ({
    ...col,
    onHeaderCell: column => ({
      width: column.width,
      onResize: handleResize(index),
    }),
  }));

  // ant-table-click
  const setRowClassName = (record, Rowindex) => {
    return Rowindex === tableIndex ? 'clickRowStyl' : '';
  };
  const onTableClick = index => {
    setTableIndex(index);
  };
  return (
    <ConfigProvider locale={zhCNIntl}>
      <ProTable
        defaultSize='small'
        search={{
          defaultCollapsed: false,
          span: 6,
          labelWidth: 'auto',
          // size:'small',
          // layout: "vertical"
          onCollapse: props.searchOnCollapse || (() => { })
        }}
        rowKey="key"
        pagination={{
          defaultCurrent: 1,
          defaultPageSize: 100,
          pageSizeOptions: [50, 100, 200, 500, 1000]
        }}
        {...props}
        onRow={(record, index) => {
          return {
            onClick: event => {
              onTableClick(index);
            }, // 点击行
          };
        }}
        locale={{
          emptyText: () => {
            return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='当前没有符合条件的数据' />
          }
        }}
        rowClassName={setRowClassName}
        tableClassName="components-table-resizable-column"
        components={components}
        // bordered
        columns={newColumns}
        scroll={tableScroll}
        onLoad={tableOnlaod}
        columnsStateMap={columnsStateMap}
        onColumnsStateChange={onColumnsStateChange}
      ></ProTable>
    </ConfigProvider>
  );
};
export default TableDrap;
