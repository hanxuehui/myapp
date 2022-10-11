export const DataProce=(data)=>{
    let result = {
        ...data,
        success: true,
        data: data?.list,
        pageSize:data?.size,
        total:data?.total,
        current:data?.current
      };
      return result
}