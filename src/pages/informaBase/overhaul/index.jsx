import { PageContainer } from '@ant-design/pro-layout';
import React, { Fragment, useEffect, useRef, useState } from "react"
import TableDrap from '@/components/TableDrap';
import { Space, Modal, Button, message, DatePicker, Form } from "antd"
import { dialogHOC } from "@/components/DialogAction/dialogHOC"
import FilterSelect from '@/components/FilterSelect'
import { DeleteOutlined, PlusOutlined, ColumnWidthOutlined, FileAddOutlined } from '@ant-design/icons'
import APIFunction from '@/services/index.js';
const { overhaulQueryPage, overhaulDel, overhaulExport,overhaulExcel } = APIFunction;
import moment from 'moment';
import AuthBtn from '@/components/AuthBtn/AuthBtn'
import { DataProce } from "@/components/DataProce"
const Overhaul = (props) => {
      let proTableRef = useRef();
      let formRef = useRef();
      const [parameter, setParameter] = useState({})
      const queryTableData = async (params) => {
            let param = {
                  ...params,
                  qualificationCertificate: params?.qualificationCertificate?.join(','),
                  safePersonCertificate: params?.safePersonCertificate?.join(','),
            }
            setParameter(param)
            let res = await overhaulQueryPage(param)
            if (res.statusCode == 200) {
                  return DataProce(res)
            }
      }

      // 导出Excel表格
      const exportExcel = (row) => {
            overhaulExport(parameter).then(res => {
                  if (res.statusCode == 200) {
                        message.success('Excel表格下载成功')
                  } else {
                        message.error('下载失败')
                  }
            })
      }
      const modalVisible = (row, type) => {
            let data
            if (type == 'editer') {
                  data = {
                        ...row,
                        joinTime: moment(row.joinTime),
                        initialGraduationTime: moment(row.joinTime),
                        specialOperationCertificate: row.specialOperationCertificate.split(','),
                        safePersonCertificate: row.safePersonCertificate.split(','),
                        qualificationCertificate: row.qualificationCertificate.split(',')

                  }
            }
            props.scmDialog.open({
                  key: type,
                  params: type == 'add' ? null : data,
                  tableRef: proTableRef
            })

      }
      const upLoadFile = (row) => {
            props.scmDialog.open({
                  key: 'excel',
                  width:'400px',
                  params:overhaulExcel,
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
                              overhaulDel({ ids }).then(res => {
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
            title: '姓名',
            align: 'left',
            dataIndex: 'name',
            width: '100px',
      },
      {
            title: '性别',
            align: 'left',
            dataIndex: 'sex',
            width: '100px',
            hideInSearch: true
      },
      {
            title: '年龄',
            align: 'left',
            dataIndex: 'age',
            width: '100px',
      },
      {
            title: '身份证',
            dataIndex: 'idCard',
            align: 'left',
            width: '180px',
            hideInSearch: true
      },
      {
            title: '参加工作时间',
            align: 'right',
            dataIndex: 'joinTime',
            width: '120px',
            valueType: 'date',
            hideInSearch: true
      },
      {
            title: '联系方式',
            dataIndex: 'contactType',
            align: 'right',
            width: '120px',
            hideInSearch: true
      },
      {
            title: '证书',
            align: 'left',
            dataIndex: 'qualificationCertificate',
            width: '100px',
            hideInTable: true,
            renderFormItem: (item, { defaultRender, ...rest }, form) => {
                  return (
                        <Form.Item label="" name='qualificationCertificate'
                        // initialValue={[geMonthDay(30)[0], geMonthDay(30)[1]]}
                        >
                              <FilterSelect mode="multiple" allowClear="true">
                                    <Option key='无'>无</Option>
                                    <Option key='一级注册建造师'>一级注册建造师</Option>
                                    <Option key='二级注册建造师'>二级注册建造师</Option>
                                    <Option key='注册安全工程师'>注册安全工程师</Option>
                                    <Option key='一级造价工程师'>一级造价工程师</Option>
                                    <Option key='二级造价工程师'>二级造价工程师</Option>
                                    <Option key='注册监理工程师'>注册监理工程师</Option>
                                    <Option key='注册消防工程师'>注册消防工程师</Option>
                                    <Option key='注册会计师'>注册会计师</Option>
                              </FilterSelect>
                        </Form.Item>
                  );
            },
      },
      {
            title: '居住地',
            align: 'left',
            dataIndex: 'homeAddress',
            width: '100px',
            hideInTable: true
      },
      {
            title: '现家庭住址',
            align: 'left',
            dataIndex: 'homeAddress',
            width: '100px',
            hideInSearch: true
      },
      {
            title: '专业',
            align: 'left',
            dataIndex: 'major',
            width: '100px',
            renderFormItem: (item, { defaultRender, ...rest }, form) => {
                  return (
                        <Form.Item label="" name='major'>
                              <FilterSelect allowClear="true">
                                    <Option key='工程管理'>工程管理</Option>
                                    <Option key='安全管理'>安全管理</Option>
                                    <Option key='汽机本体'>汽机本体</Option>
                                    <Option key='汽机调速'>汽机调速</Option>
                                    <Option key='汽机发电机'>汽机发电机</Option>
                                    <Option key='汽机辅机'>汽机辅机</Option>
                                    <Option key='锅炉本体'>锅炉本体</Option>
                                    <Option key='锅炉辅机'>锅炉辅机</Option>
                                    <Option key='脱硫除灰系统'>脱硫除灰系统</Option>
                                    <Option key='电气发电机'>电气发电机</Option>
                                    <Option key='电气实验'>电气实验</Option>
                                    <Option key='电气配电'>电气配电</Option>
                                    <Option key='电气电动机'>电气电动机</Option>
                                    <Option key='电气调试'>电气调试</Option>
                                    <Option key='热控调试'>热控调试</Option>
                                    <Option key='热控安装'>热控安装</Option>
                                    <Option key='热控试验'>热控试验</Option>
                                    <Option key='高压焊工'>高压焊工</Option>
                                    <Option key='金相、热处理'>金相、热处理</Option>
                                    <Option key='架子工'>架子工</Option>
                                    <Option key='保温工'>保温工</Option>
                                    <Option key='行车司机'>行车司机</Option>
                                    <Option key='起重工'>起重工</Option>
                                    <Option key='土建'>土建</Option>
                                    <Option key='其他'>其他</Option>
                              </FilterSelect>
                        </Form.Item>
                  );
            },
      },
      {
            title: '专业年限',
            align: 'left',
            dataIndex: 'majorYear',
            width: '100px',
            hideInSearch: true
      },
      {
            title: '岗位',
            dataIndex: 'position',
            width: 150,
            ellipsis: true,
      },
      {
            title: '政治面貌',
            dataIndex: 'politicalOutlook',
            width: 150,
            ellipsis: true,
            hideInSearch: true
      },
      {
            title: '初始学历',
            dataIndex: 'initialEducation',
            width: 150,
            ellipsis: true,
            hideInSearch: true,
      },
      {
            title: '学历',
            dataIndex: 'initialEducation',
            width: 150,
            ellipsis: true,
            hideInTable: true,
            renderFormItem: (item, { defaultRender, ...rest }, form) => {
                  return (
                        <Form.Item label="" 
                        name="initialEducation"
                        >
                              <FilterSelect allowClear="true">
                              <Option key='小学'>小学</Option>
                              <Option key='初中'>初中</Option>
                              <Option key='高中'>高中</Option>
                              <Option key='中专'>中专</Option>
                              <Option key='大专'>大专</Option>
                              <Option key='本科'>本科</Option>
                              <Option key='硕士'>硕士</Option>
                              <Option key='博士'>博士</Option>
                              <Option key='其他'>其他</Option>
                              </FilterSelect>
                        </Form.Item>
                  );
            },
      },
      {
            title: '初始学历所学专业',
            dataIndex: 'initialMajor',
            width: 150,
            ellipsis: true,
            hideInSearch: true
      },
      {
            title: '初始学历毕业院校',
            dataIndex: 'initialSchool',
            width: 150,
            ellipsis: true,
            hideInSearch: true
      },
      {
            title: '初始学历毕业时间',
            dataIndex: 'initialGraduationTime',
            width: 150,
            ellipsis: true,
            hideInSearch: true,
            render:(text,row)=>{
                  return row.initialGraduationTime.split(' ')[0]
            }
      },
      {
            title: '特种作业操作证',
            dataIndex: 'specialOperationCertificate',
            width: 150,
            ellipsis: true,
            hideInSearch: true,
      },
      {
            title: '安全人员资格证',
            dataIndex: 'safePersonCertificate',
            width: 150,
            ellipsis: true,
            hideInSearch: true,
            renderFormItem: (item, { defaultRender, ...rest }, form) => {
                  return (<FilterSelect mode="multiple" allowClear="true">
                        <Option key='无'>无</Option>
                        <Option key='企业负责人（三类人员A证）'>企业负责人（三类人员A证）</Option>
                        <Option key='项目负责人（三类人员B证）'>项目负责人（三类人员B证）</Option>
                        <Option key='安全员（三类人员C证）'>安全员（三类人员C证）</Option>
                  </FilterSelect>)
            }
      },
      {
            title: '执业资格证',
            dataIndex: 'qualificationCertificate',
            width: 150,
            ellipsis: true,
            hideInSearch: true
      },
      {
            title: '归属单位',
            dataIndex: 'belongUnit',
            width: 150,
            ellipsis: true,
            hideInSearch: true
      },
      {
            title: '签订劳务合同时限',
            dataIndex: 'contractLimit',
            width: 150,
            ellipsis: true,
            hideInSearch: true,
      },
      {
            title: '业务特长/专业技能',
            dataIndex: 'businessExpertise',
            width: 150,
            ellipsis: true,
      },
      {
            title: '推荐人',
            dataIndex: 'recommendPerson',
            width: 150,
            ellipsis: true,
            hideInSearch: true,
      },
      {
            title: '推荐原因',
            dataIndex: 'recommendReason',
            width: 150,
            ellipsis: true,
            hideInSearch: true,
      },
      {
            title: '项目经理评价',
            dataIndex: 'managerEvaluation',
            width: 150,
            ellipsis: true,
            renderFormItem: (item, { defaultRender, ...rest }, form) => {
                  return (
                        <FilterSelect allowClear="true">
                        <Option key='优秀'>优秀</Option>
                        <Option key='良好'>良好</Option>
                        <Option key='一般'>一般</Option>
                        <Option key='较差'>较差</Option>
                        </FilterSelect>
                  )
            },
      },
      {
            title: '备注',
            dataIndex: 'remark',
            width: 150,
            ellipsis: true,
            hideInSearch: true,
      },
      {
            title: '操作',
            align: 'left',
            width: '180px',
            hideInSearch: true,
            hideInTable:JSON.parse(localStorage.getItem('userInfo'))[0].role=='admin'?false:true,
            fixed: 'right',
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
                  rowKey="id"
                  options={{setting:JSON.parse(localStorage.getItem('userInfo'))[0].role=='admin'?true:false}}
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
            }, {
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
}, Overhaul);

