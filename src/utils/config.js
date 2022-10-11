const HOST = process.env.apiUrl
module.exports = {
  apiPrefix: process.env.apiUrl,
  fixedHeader: true, // sticky primary layout header
  scriptUrl: '//at.alicdn.com/t/font_874708_q7hdcobzkqq.js',
  SFUrl: { T8img: '/img_lod/123T8.jpg' },
  CORS: [HOST],
  api:{
    /** ---------------------用户中心-------------------*/
    userLogin: `${HOST}/api/blade-auth/oauth/token`,

    /**车辆管理接口 */
    getVehicleList: `${HOST}/api/mv/vehicle/search/selectSimplePage`,
    

  }
};
