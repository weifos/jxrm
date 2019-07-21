var api = require("../../../modules/api.js")
var appG = require("../../../modules/appGlobal.js")
var passport = require("../../../modules/passport.js")
var user = require("../../../modules/userInfo.js")
var router = require("../../../modules/router.js")
var app = getApp()

Page({
  data: {
    userInfo: {
      id: 0,
      login_name: '未登录',
      headimgurl: 'user-unlogin.png',
    }
  },
  /**
   * 页面加载事件
   */
  onLoad: function(e) {
    let that = this
    //检测成功回调
    passport.checkSession(function(openid) {
      let wxUser = user.methods.getUser()
      if (!wxUser.login_name) {
        //加载用户信息
        that.api_106()
      }else{
        that.bindUser(wxUser)
      }
    })
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
            router.goUrl({
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
   * 加载微信用户信息
   */
  bindUser: function (user) {
    this.setData({
      userInfo: user
    })
    this.setData({
      ['userInfo.login_name']: appG.util.getHideMobile(user.login_name)
    })
  },
  /**
   * 加载用户信息
   */
  api_106: function() {
    let that = this
    let userInfo = user.methods.getUser()
    console.log("openid:" + userInfo.openid)
    wx.post(api.api_106,
      wx.GetSign({
        OpenID: userInfo.openid
      }),
      function(app, res) {
        if (res.data.Basis.State == api.state.state_200) {
          if (res.data.Result.login_name != undefined) {
            //登录
            user.methods.login(res.data.Result)
            //绑定用户
            that.bindUser(res.data.Result)
          } else {
            //弹出用户登录
            that.setData({
              showFlag: true
            })
          }
        } else {
          wx.showToast({
            title: res.data.Basis.Msg,
            icon: 'none',
            duration: 3000
          })
        }
      })
  },
  /**
   * 收藏店铺
   */
  goStoreCollect: function() {
    router.goUrl({
      url: '../userCollect/storeCollect/storeCollect',
    })
  },
  /**
   * 收藏商品
   */
  goProductCollect: function() {
    router.goUrl({
      url: '../userCollect/productCollect/productCollect',
    })
  }
})