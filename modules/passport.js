// 公用js函数
var api = require("./api.js") 

module.exports = {
  //授权登录
  AuthLogin() {
    debugger
    let that = this;
    //检查登录
    wx.checkSession({
      //session_key未过期，并且在本生命周期一直有效
      success() {
        //获取用户的当前设置。返回值中只会出现小程序已经向用户请求过的权限
        wx.getSetting({
          success: res => {
            //已经授权则跳转到用户中心
            if (res.authSetting['scope.userInfo']) {
              wx.redirectTo({ url: '../../user/index/index' })
            } else {
              //隐藏授权确认框
              //that.setData({ showFlag: false })
            }
          },
          fail: res => {
            console.log(res, "失败回调")
          }
        })
      },
      //session_key已经失效，需要重新执行登录流程
      fail() {
        that.GetSessionKey()
      }
    })
  },
  /**
   * 调用小程序login方法获取Code,通过Code获取Key
   */
  GetSessionKey() {
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.post(api.api_103, wx.GetSign({ Code: res.code }), function (app, res) {
            if (res.data.Basis.State == api.state.state_200) {
              //获取到的SessionKey存入本地存取文件
              //setStorage同步，setStorageSync异步
              wx.setStorage({
                key: "session_key",
                data: res.data.Result.session_key
              })
              wx.setStorage({
                key: "openid",
                data: res.data.Result.openid
              })
              wx.setStorage({
                key: "appId",
                data: res.data.Result.appId
              })
            } else {
              app.showToast({
                title: '网络错误',
                icon: 'none',
                duration: 5000
              })
            }
          });
        }
      }
    })
  },
  //用户授权页面
  toAuth() {
    wx.redirectTo({
      url: '../../passport/authorize/authorize'
    })
  },
  //获取用户信息
  getUserInfo() {
    //获取用户信息，获取之前是否已经授权
    wx.getSetting({
      success: res => {
debugger
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: function (res) {
              var userInfo = res.userInfo
              var pc = new WXBizDataCrypt(wx.getStorageSync('appId'), wx.getStorageSync('session_key'))
              var data = pc.decryptData(res.encryptedData, res.iv)
              wx.setStorage({
                key: "userInfo",
                data: userInfo
              })
              userInfoSetInSQL(userInfo)
            },
            fail: function () {

            }
          })
        } else {
          toAuth()
        }
      }
    })
  },
  //获取
  userInfoSetInSQL() {
    wx.getStorage({
      key: 'third_Session',
      success: function (res) {
        console.log(res)
        // 后台存储用户信息
        wx.post(
          url,
          wx.GetSign({
            third_Session: res.data,
            nickName: userInfo.nickName,
            avatarUrl: userInfo.avatarUrl,
            gender: userInfo.gender,
            province: userInfo.province,
            city: userInfo.city,
            country: userInfo.country
          }),
          function (app, res) {
            console.log(res, "---请求结果")
            if (res.data.Basis.State == api.state.state_200) {
              //后台更新用户数据成功
            } else {
              app.showToast({
                title: '网络错误',
                icon: 'none',
                duration: 3000
              })
            }
          });
      }
    })
  }
}