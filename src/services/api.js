export default {
    loginApi:`POST person-manager/user/login`,
    logoutApi:`POST person-manager/user/logout`,//退出登录
    // 人员调遣
    queryPageApi:`POST person-manager/personDispatch/queryPage`,//列表分页查询
    personDispatchAdd:`POST person-manager/personDispatch/add`,//新增
    personDispatchEdit:`POST person-manager/personDispatch/edit`,//新增
    personDispatchDel:`POST person-manager/personDispatch/delete`,//删除
    personImportExcel:`POST person-manager/personDispatch/importExcel querys`,//Excel数据导入 
    exportExcelApi:`POSTDOWN person-manager/personDispatch/exportExcel`,//Excel数据导出
    // 检修人员
    overhaulQueryPage:`POST person-manager/overhaulPerson/queryPage`,//列表分页查询-----检修人员
    overhaulAdd:`POST person-manager/overhaulPerson/add`,//新增
    overhaulEdit:`POST person-manager/overhaulPerson/edit`,//编辑
    overhaulDel:`POST person-manager/overhaulPerson/delete`,//删除
    overhaulExcel:`POST person-manager/overhaulPerson/importExcel querys`,//Excel数据导入
    overhaulExport:`POSTDOWN person-manager/overhaulPerson/exportExcel`,//导出

    // 劳务分包
    laborAdd:`POST person-manager/laborSubcontract/add`,
    laborEdit:`POST person-manager/laborSubcontract/edit`,
    laborQueryPage:`POST person-manager/laborSubcontract/queryPage`,
    laborDelete:`POST person-manager/laborSubcontract/delete`,
    laborExcel:`POST person-manager/laborSubcontract/importExcel querys`,//Excel数据导入
    laborExportExcel:`POSTDOWN person-manager/laborSubcontract/exportExcel`,

    // 内部人员
    innerQueryPage:`POST /person-manager/innerPerson/queryPage`,
    innerEdit:`POST person-manager/innerPerson/edit querys`,
    innerAdd:`POST person-manager/innerPerson/add querys`,
    innerDelete:`POST person-manager/innerPerson/delete`,
    innerExcel:`POST person-manager/innerPerson/importExcel querys`,//Excel数据导入
    innerExportExcel:`POSTDOWN person-manager/innerPerson/exportExcel`,
    // 专业分包
    professGetPage:`POST /person-manager/professionSubcontract/queryPage`,
    importExcelApi:`POST /person-manager/professionSubcontract/importExcel`,//导入excel
    professEdit:`POST /person-manager/professionSubcontract/edit`,//编辑
    professDelApi:`POST /person-manager/professionSubcontract/delete`,//删除
    professAdd:`POST /person-manager/professionSubcontract/add`,//新增
    professExcel:`POSTDOWN /person-manager/professionSubcontract/exportExcel`,//导出
}