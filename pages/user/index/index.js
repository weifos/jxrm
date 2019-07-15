var WXBizDataCrypt = require('../../../modules/WXBizDataCrypt.js')
var passport = require("../../../modules/passport.js")

Page({
  data: {
    userInfo: {
      id: 111,
      name: '用户1',
      img: 'user-unlogin.png',
    }
  },

  onLoad: function() {
    //弹出用户登录
    this.setData({
      showFlag: true
    })
  },
  /**
   * 获取手机号码
   */
  getMobile: function(e) {
    debugger
    //确认
    if (e.detail.errMsg === "getPhoneNumber:ok") {
      //解密数据
      var pc = new WXBizDataCrypt(wx.getStorageSync('appId'), wx.getStorageSync('session_key'))
      debugger
      var data = pc.decryptData(e.detail.encryptedData, e.detail.iv)
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 
            wx.redirectTo({
              url: '../../user/index/index'
            })
          } else {
            // 没有授权 
            passport.toAuth()
          }
        }
      })
    } else {
      //隐藏授权确认框
      this.setData({
        showFlag: false
      })
    }
  },
  bindCollectClick: function() {
    wx.navigateTo({
      url: '../../collect/collect',
    })
  }
})