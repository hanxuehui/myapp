import { PageContainer } from '@ant-design/pro-layout';
import React, { Fragment, useEffect, useRef, useState } from "react"
import TableDrap from '@/components/TableDrap';
import moment from 'moment';
import { Space, Popconfirm, Button, Modal, DatePicker, Form, message } from "antd"
import { dialogHOC } from "@/components/DialogAction/dialogHOC"
import { DeleteOutlined, PlusOutlined, ColumnWidthOutlined, FileAddOutlined } from '@ant-design/icons'
import APIFunction from '@/services/index.js';
const { queryPageApi, exportExcelApi, personDispatchDel,personImportExcel } = APIFunction;
import AuthBtn from '@/components/AuthBtn/AuthBtn'
import { DataProce } from "@/components/DataProce"
const Management = (props) => {
      let proTableRef = useRef();
      let formRef = useRef();
      const [parameter, setParameter] = useState({})
      const queryTableData = async (params) => {
            //保存查询参数用于导出数据使用
            setParameter(params)
            let res = await queryPageApi(params)
            if (res.statusCode == 200) {
                  return DataProce(res)
            }
      }
      // 导出Excel表格
      const exportExcel = (row) => {
            exportExcelApi(parameter).then(res => {
                  if (res.statusCode == 200) {
                        message.success('Excel表格下载成功')
                  } else {
                        message.error('下载失败')
                  }
            })
      }
      // 新增/编辑
      const modalVisible = (row, type) => {
            if (type == 'editer') {
                  row.time = [moment(row.dispatchStartTime), moment(row.dispatchEndTime)]
            }
            props.scmDialog.open({
                  key: type,
                  params: type == 'add' ? '' : row,
                  tableRef: proTableRef
            })

      }
      const upLoadFile = (row) => {
            props.scmDialog.open({
                  key: 'excel',
                  width:'400px',
                  params:personImportExcel,
                  tableRef: proTableRef
            })
      }
      // 批量删除
      const deleteData = (row) => {
            Modal.confirm({
                  title: '批量删除',
                  content: '确定删除这些数据吗?',
                  okText: '确定',
                  okType: 'danger',
                  cancelText: '取消',
                  onOk() {
                        if (row.length>0) {
                              let ids = row.map(item => item.id)
                              // 接口替换
                              personDispatchDel({ ids }).then(res => {
                                    if (res.status == 200) {
                                          message.success('数据删除成功');
                                          proTableRef.current.reload()
                                    } else {
                                          message.warning(res.msg || '删除失败');
                                    }
                              })
                        } else {
                              message.warning('请选择至少一条数据')
                        }

                  }
            });

      }
      const columns = [
            // {

      //       title: '序号',
      //       align: 'left',
      //       dataIndex: 'a',
      //       width: '60px',
      //       hideInSearch: true,
      //       render: (text, row, index) => {
      //             return <span>{index + 1}</span>
      //       }
      // },
      {
            title: '编码',
            dataIndex: 'code',
            width: 100,
            ellipsis: true,
            hideInSearch: true,
      },
      {
            title: '姓名',
            align: 'left',
            dataIndex: 'name',
            width: '100px',
      },
      {
            title: '原项目部',
            dataIndex: 'originDepartment',
            align: 'left',
            width: '120px',
      },
      {
            title: '调遣开始时间',
            align: 'right',
            dataIndex: 'dispatchStartTime',
            width: '120px',
            valueType: 'date',
      },
      {
            title: '现项目部',
            dataIndex: 'nowDepartment',
            align: 'right',
            width: '120px',
      },
      {
            title: '岗位',
            align: 'left',
            dataIndex: 'position',
            width: '100px',
      },
      {
            title: '调遣结束时间',
            dataIndex: 'dispatchEndTime',
            width: 150,
            ellipsis: true,
            hideInSearch: true,
      },
      {
            title: '备注',
            dataIndex: 'remark',
            width: 120,
            ellipsis: true,
            hideInSearch: true,
      },
      {
            title: '操作',
            align: 'left',
            width: '120px',
            hideInSearch: true,
            hideInTable:JSON.parse(localStorage.getItem('userInfo'))[0].role=='admin'?false:true,
            fixed: 'right',
            render: (text, row, index, action) => {
                  return (
                        <Space>
                              <AuthBtn key={row.vehicleId} onClick={e => modalVisible(row, 'editer')} style={{ cursor: "pointer", color: '#1E98D7' }}>编辑</AuthBtn>

                              {/*row.availableStatus == "ENABLE" ?
                                    <span color="blue" key={row.vehicleId} onClick={e => this.enableButton(row)} style={{ cursor: "pointer", color: '#1E98D7' }} >启用</span> :
                  <span color="blue" key={row.vehicleId} onClick={e => this.disableButton(row)} style={{ cursor: "pointer", color: '#1E98D7', }}>禁用</span>*/}

                        </Space>
                  );
            },
      },]
      return <PageContainer>
            <TableDrap
                  search={{
                        defaultCollapsed: false,
                        span: 6,
                        labelWidth: 'auto',
                  }}
                  options={{setting:JSON.parse(localStorage.getItem('userInfo'))[0].role=='admin'?true:false}}
                  rowKey="id"
                  rowSelection={{}}
                  columns={columns}
                  request={params => queryTableData(params)}
                  actionRef={proTableRef}
                  toolBarRender={(action, { selectedRows }) => [
                        <AuthBtn
                              type="primary"
                              onClick={() => {
                                    exportExcel(selectedRows);

                              }}

                        >导出excel</AuthBtn>,
                        <AuthBtn
                              type="primary"
                              onClick={() => {
                                    modalVisible('', 'add');
                              }}
                        >
                              <PlusOutlined />
                              新增
                        </AuthBtn>,
                        <AuthBtn
                              onClick={() => {
                                    upLoadFile();
                              }}
                        >
                              批量导入
                        </AuthBtn>,
                        <AuthBtn onClick={() => deleteData(selectedRows)}>批量删除</AuthBtn>
                  ]} /></PageContainer>
}

export default dialogHOC(() => {
      return {
            bindComponents: [{
                  key: 'add',
                  load: () => import('./addModal'),
                  title: '新增',
            },
            {
                  key: 'editer',
                  load: () => import('./addModal'),
                  title: '编辑',
            },
            {
                      key: 'excel',
                      width:'50%',
                      load: () => import('@/components/ExcelMode'),
                      title: '导入excel',
                    }
            ]
      }
}, Management);
