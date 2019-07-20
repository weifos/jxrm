var api = require("../../../modules/api.js")
var appG = require("../../../modules/appGlobal.js")
var passport = require("../../../modules/passport.js")
var user = require("../../../modules/userInfo.js")
var app = getApp()

Page({
  data: {
    userInfo: {
      id: 0,
      login_name: '未登录',
      img: 'user-unlogin.png',
    }
  },
  /**
   * 页面加载事件
   */
  onLoad: function(e) {
    var user = app.data.userInfo.methods.getUser()
    if (user.token) {
      this.setData({
        ['userInfo.login_name']: appG.util.getHideMobile(user.login_name)
      })
      if (user.img) {
        this.setData({
          ['userInfo.img']: user.img
        })
      }
    } else {
      //弹出用户登录
      this.setData({
        showFlag: true
      })
    }
  },
  /**
   * 获取手机号码
   */
  getMobile: function(e) {
    let that = this
    passport.bindMobile(e, function(code, user) {
      if (code == api.state.state_200) {
        that.setData({
          showFlag: false
        })
        that.setData({
          ['userInfo.login_name']: appG.util.getHideMobile(user.login_name)
        })
      }

      wx.getStorage({
        key: 'returl',
        success(res) {
          if (res.data) {
            wx.navigateTo({
              url: res.data
            })
          }
          wx.removeStorageSync('returl')
        }
      })

    })
  },
  /**
   * 加载微信用户信息
   */
  getWxUser: function(e) {
    let that = this
    passport.getWxUser(e, function(code, user) {
      if (code == api.state.state_200) {
        that.setData({
          ['userInfo.img']: appG.util.getHideMobile(user.avatarUrl)
        })
      }
    })
  },
  /**
   * 收藏店铺
   */
  goStoreCollect: function() {
    wx.navigateTo({
      url: '../userCollect/storeCollect/storeCollect',
    })
  },
  /**
   * 收藏商品
   */
  goProductCollect: function() {
    wx.navigateTo({
      url: '../userCollect/productCollect/productCollect',
    })
  }
})