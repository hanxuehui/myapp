import { PageContainer } from '@ant-design/pro-layout';
import React, {useState,useRef } from "react"
import TableDrap from '@/components/TableDrap';
import { Space, Modal, Button, message, DatePicker, Form } from "antd"
import { dialogHOC } from "@/components/DialogAction/dialogHOC"
import { DeleteOutlined, PlusOutlined, ColumnWidthOutlined, FileAddOutlined } from '@ant-design/icons'
import FilterSelect from "@/components/FilterSelect"
import APIFunction from '@/services/index.js';
const {professGetPage,importExcelApi,professDelApi,professExcel} = APIFunction;
import { DataProce } from "@/components/DataProce"
import AuthBtn from '@/components/AuthBtn/AuthBtn'
const ProfeSubcontract = (props) => {
      let proTableRef = useRef();
      const [parameter, setParameter] = useState({})
      const queryTableData =async (params) => {
            let param = {
                  ...params
            }
            setParameter(param)
            let res = await professGetPage(param)
            if (res.statusCode == 200) {
                  return DataProce(res)
            }
      }
      const exportExcel = (row) => {
            professExcel(parameter).then(res => {
                  if (res.statusCode == 200) {
                        message.success('Excel表格下载成功')
                  } else {
                        message.error('下载失败')
                  }
            })
      }
      const modalVisible = (row, type) => {
            props.scmDialog.open({
                  key: type,
                  params:type=='add'?null : row,
                  tableRef:proTableRef
                })
           
      }
      const upLoadFile = (row) => {
            props.scmDialog.open({
                  key: 'excel',
                  width:'400px',
                  params:importExcelApi,
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
                  if (row.length > 0) {
                        let ids = row.map(item => item.id)
                        // 接口替换
                        professDelApi({ ids }).then(res => {
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
 // 公共组件
 const getPicModal=(row,type)=>{
      props.scmDialog.open({
            key:type,
            params:row,
            tableRef: proTableRef
      })
}
      const columns = [
            {

            title: '序号',
            align: 'left',
            dataIndex: 'a',
            width: '120px',
            hideInSearch: true,
            render: (text, row, index) => {
                  return <span>{index + 1}</span>
            }
      },
      {
            title: '单位名称',
            align: 'left',
            dataIndex: 'unitName',
            width: '100px',
            render:(text,row)=>{
                  return <span style={{color:'#1890ff',cursor: "pointer",}} onClick={()=>getPicModal(row,'pic')}>{row.unitName}</span>
            }
      },
      {
            title: '资质等级',
            dataIndex: 'certificateType',
            align: 'left',
            width: '180px',
      },
      {
            title: '资质类型',
            align: 'right',
            dataIndex: 'certificateLevel',
            width: '120px',
            hideInSearch:true,
      },
      {
            title: '主要从事专业',
            dataIndex: 'mainProfession',
            align: 'right',
            width: '120px',
            // hideInSearch:true
            // 需要后端支持查询
      },
      {
            title: '人数规模',
            align: 'left',
            dataIndex: 'scale',
            width: '100px',
            hideInSearch:true
      },
      {
            title: '负责人',
            dataIndex: 'director',
            width: 150,
            ellipsis: true,
      },
      {
            title: '联系方式',
            align: 'left',
            dataIndex: 'contactType',
            width: '100px',
            hideInSearch:true
      },
      {
            title: '单位地址',
            dataIndex: 'homeAddress',
            width: 150,
            ellipsis: true,
            hideInSearch:true
      },
      {
            title: '推荐人',
            align: 'left',
            dataIndex: 'recommendPerson',
            width: '100px',
            hideInSearch:true
      },
      {
            title: '推荐原因',
            align: 'left',
            dataIndex: 'recommendReason',
            width: '100px',
            hideInSearch:true
      },
      {
            title: '项目经理评价',
            dataIndex: 'managerEvaluation',
            width: 150,
            ellipsis: true,
            renderFormItem:(item, { defaultRender, ...rest }, form)=>{
                  return(
                      <FilterSelect allowClear="true">
                      <Option key='优秀'>优秀</Option>
                      <Option key='良好'>良好</Option>
                      <Option key='一般'>一般</Option>
                      <Option key='较差'>较差</Option>
                      </FilterSelect>  
                  )
            }
      },
      {
            title: '备注',
            dataIndex: 'remark',
            width: 150,
            ellipsis: true,
            hideInSearch:true
      },
      {
            title: '操作',
            align: 'left',
            width: '180px',
            hideInSearch: true,
            fixed: 'right',
            hideInTable:JSON.parse(localStorage.getItem('userInfo'))[0].role=='admin'?false:true,
            render: (text, row, index, action) => {
                  return (
                        <Space>
                              <AuthBtn key={row.vehicleId} onClick={e => modalVisible(row, 'editer')} style={{ cursor: "pointer", color: '#1E98D7' }}>编辑</AuthBtn>

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
            key: 'excel',
            width:'50%',
            load: () => import('@/components/ExcelMode'),
            title: '导入excel',
          },
          {
            key: 'editer',
            load: () => import('./addModal'),
            title: '编辑',
      },
//       {
//       key: 'pic',
//       width:'50%',
//       load: () => import('@/components/PicModal'),
//       title: '图片列表',   
// }
      ]
      }
    }, ProfeSubcontract);
