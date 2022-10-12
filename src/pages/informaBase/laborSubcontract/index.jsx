import { PageContainer } from '@ant-design/pro-layout';
import React, { useState, useEffect, useRef } from 'react';
import TableDrap from '@/components/TableDrap';
import { Space, Popconfirm, Button, Select, Message, Modal } from 'antd';
import { dialogHOC } from '@/components/DialogAction/dialogHOC';
import {
  DeleteOutlined,
  PlusOutlined,
  ColumnWidthOutlined,
  FileAddOutlined,
} from '@ant-design/icons';
import FilterSelect from '@/components/FilterSelect';
import APIFunction from '@/services/index.js';
const { laborQueryPage, laborDelete, laborExcel, laborExportExcel } = APIFunction;
import moment from 'moment';
import AuthBtn from '@/components/AuthBtn/AuthBtn';
import { DataProce } from '@/components/DataProce';
const laborSubcontract = (props) => {
  let proTableRef = useRef();
  const [parameter, setParameter] = useState({});
  const queryTableData = async (params) => {
    let param = {
      ...params,
      qualificationCertificate: params?.qualificationCertificate?.join(','),
      safePersonCertificate: params?.safePersonCertificate?.join(','),
    };
    setParameter(param);
    let res = await laborQueryPage(param);
    if (res.statusCode == 200) {
      return DataProce(res);
    }
  };
  const exportExcel = (row) => {
    laborExportExcel(parameter).then((res) => {
      if (res.statusCode == 200) {
        Message.success('Excel表格下载成功');
      } else {
        Message.error('下载失败');
      }
    });
  };
  const modalVisible = (row, type) => {
    props.scmDialog.open({
      key: type,
      params: type == 'add' ? {} : row,
      tableRef: proTableRef,
    });
  };
  const upLoadFile = (row) => {
    props.scmDialog.open({
      key: 'excel',
      params: laborExcel,
      tableRef: proTableRef,
    });
  };
  const deleteData = (row) => {
    Modal.confirm({
      title: '批量删除',
      content: '确定删除这些数据吗?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        if (row.length > 0) {
          let ids = row.map((item) => item.id);
          // 接口替换
          laborDelete({ ids }).then((res) => {
            if (res.status == 200) {
              Message.success('数据删除成功');
              proTableRef.current.reload();
            } else {
              Message.warning(res.msg || '删除失败');
            }
          });
        } else {
          Message.warning('请选择至少一条数据');
        }
      },
    });
  };
  // 公共组件
  const getPicModal = (row, type) => {
    props.scmDialog.open({
      key: type,
      params: row,
      tableRef: proTableRef,
    });
  };
  const columns = [
    //       {

    //       title: '序号',
    //       align: 'left',
    //       dataIndex: 'a',
    //       width: '120px',
    //       hideInSearch: true,
    //       render: (text, row, index) => {
    //             return <span>{index + 1}</span>
    //       }
    // },
    {
      title: '编码',
      dataIndex: 'code',
      width: 150,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '负责人',
      align: 'left',
      dataIndex: 'director',
      width: '100px',
      render: (text, row) => {
        return (
          <span
            style={{ color: '#1890ff', cursor: 'pointer' }}
            onClick={() => getPicModal(row, 'pic')}
          >
            {row.director}
          </span>
        );
      },
    },
    {
      title: '联系人',
      dataIndex: 'contractPerson',
      align: 'left',
      width: '120px',
      hideInSearch: true,
    },
    {
      title: '主要从事专业',
      align: 'right',
      dataIndex: 'mainProfession',
      width: '120px',
      // valueType: 'date',
    },
    {
      title: '人数规模',
      dataIndex: 'scale',
      align: 'right',
      width: '120px',
      hideInSearch: true,
    },
    {
      title: '大部分人员居住地',
      align: 'left',
      dataIndex: 'moreLiveAddress',
      width: '200px',
      hideInSearch: true,
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
      title: '居住地',
      dataIndex: 'moreLiveAddress',
      width: 150,
      ellipsis: true,
      hideInTable: true,
    },
    {
      title: '项目经理评价',
      dataIndex: 'managerEvaluation',
      width: 150,
      ellipsis: true,
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        return (
          <FilterSelect allowClear="true">
            <Option key="优秀">优秀</Option>
            <Option key="良好">良好</Option>
            <Option key="一般">一般</Option>
            <Option key="较差">较差</Option>
          </FilterSelect>
        );
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
      hideInTable: JSON.parse(localStorage.getItem('userInfo'))[0].role == 'admin' ? false : true,
      fixed: 'right',
      render: (text, row, index, action) => {
        return (
          <Space>
            <AuthBtn
              key={row.id}
              onClick={(e) => modalVisible(row, 'editer')}
              style={{ cursor: 'pointer', color: '#1E98D7' }}
            >
              编辑
            </AuthBtn>
          </Space>
        );
      },
    },
  ];
  return (
    <PageContainer>
      <TableDrap
        search={{
          defaultCollapsed: false,
          span: 6,
          labelWidth: 'auto',
        }}
        rowKey="id"
        rowSelection={{}}
        columns={columns}
        request={(params) => queryTableData(params)}
        actionRef={proTableRef}
        toolBarRender={(action, { selectedRows }) => [
          <AuthBtn
            type="primary"
            onClick={() => {
              exportExcel(selectedRows);
            }}
          >
            导出excel
          </AuthBtn>,
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
          <AuthBtn onClick={() => deleteData(selectedRows)}>批量删除</AuthBtn>,
        ]}
      />
    </PageContainer>
  );
};

export default dialogHOC(() => {
  return {
    bindComponents: [
      {
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
        width: '50%',
        load: () => import('@/components/ExcelMode'),
        title: '导入excel',
      },
      {
        key: 'pic',
        width: '50%',
        load: () => import('@/components/picModal'),
        title: '图片列表',
      },
    ],
  };
}, laborSubcontract);
