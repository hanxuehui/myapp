import React, { Fragment, useEffect, useState, useRef } from "react"
import { Space, Modal, Button, message, DatePicker, Form,Table } from "antd"
import { dialogHOC } from "@/components/DialogAction/dialogHOC"
const PicModal=(props)=>{
    const [imgArr,setImgArr]=useState([])
    const columnss = [
        {
            title: '文件名',
            dataIndex: 'name',
            key: 'fileName',
        },

        {

            title: '操作',
            dataIndex: '',
            key: 'x',
            render: record => <a onClick={() =>LookPic(record,'preview')}>预览</a>,
        },
    ];
    const LookPic=(record,type)=>{
        props.scmDialog.open({
            key:type,
            params:record,
            // tableRef: proTableRef
      })
    }
    return <Table
    dataSource={imgArr}
    pagination={false}
    rowKey={item => item.uid}
    columns={columnss}
/>
}
export default dialogHOC(() => {
    return {
          bindComponents: [
          {
                key: 'preview',
                width:'50%',
                load: () => import('./prevModal'),
                title: '预览',   
          }
          ]
    }
}, PicModal);