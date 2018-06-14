module.exports = {

  interfaces:{
    own_host: "http://lsqin.top",
    // serverhost: "http://lsqin.top",
    // testhost : "http://sltktest.newgs.net",
    // producthost : "http://sltk.newgs.net",
    sltk_host: "http://sltktest.newgs.net",
    sl_host:"http://examtest.newgs.net",

    //获取opendi
    getOpenId:"/getOpenId",
    sendmsg:"/sendmsg",
    addUser: "/addUser",
    secAllUser: "/secAllUser",
    secOneUser: "/secOneUser",
    addUserInfo: "/addUserInfo",
    secAllInfo: "/secAllInfo",
    secOneInfo: "/secOneInfo",
    addFromId: "/addFromId",
    secOneFromId: "/secOneFromId",
    addAccessToken: "/addAccessToken",
    updateAccessToken: "/updateAccessToken",
    addHost: "/addHost",
    secAllHost: "/secAllHost",
    secOneHost: "/secOneHost",
    addInterface: "/addInterface",
    secAllInterface: "/secAllInterface",
    secOneInterface: "/secOneInterface",



    //获取验证码
    getcodeinterface: "/api/getCode",
    //登陆
    logininterface: "/api/login",
    // 获取用户详细信息
    userInfo:"/api/userInfo",

    //根据手机号码获取token
    maketoken:"/index.php/Admin/Setting/make",

    
  }
}