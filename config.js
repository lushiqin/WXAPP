module.exports = {

  interfaceList:{
    myhost: "http://localhost:8000",
    // serverhost: "http://lsqin.top",
    // testhost : "http://sltktest.newgs.net",
    // producthost : "http://sltk.newgs.net",
    host: "http://sltktest.newgs.net",
    slhost:"http://examtest.newgs.net",

    //获取opendi
    getOpenId: "/getOpenId",
    getUsers:"/secUser",
    getHost:"/secHost",
    addUser:"/addUser",
    addHost:"/addHost",


    //获取验证码
    getcodeinterface: "/api/getCode",
    //登陆
    logininterface: "/api/login",

    //根据手机号码获取token
    maketoken:"/index.php/Admin/Setting/make",

    
  }
}