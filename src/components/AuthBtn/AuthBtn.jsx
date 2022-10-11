import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import { history } from 'umi';

const AuthBtn = props => {
const [userName,setUserName]=useState('')
  useEffect(() => {
   let user=JSON.parse(localStorage.getItem('userInfo'))[0].role
   setUserName(user)
  }, [history.location]);
  const printPdf = () => {
    const { path, params } = props;
    path && path(params);
  };
  return userName=='admin'? (
      <Button
        // onClick={printPdf}
        {...props}
        dispatch={null}
      ></Button>
    ): null;
};

export default AuthBtn;
