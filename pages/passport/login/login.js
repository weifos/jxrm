// miniprogram/pages/login/login.js
var WXBizDataCrypt = require('../../../utils/WXBizDataCrypt.js')
var passport = require("../../../modules/passport.js")
var api = require("../../../modules/api.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    timer: '', //定时器变量
    showFlag: false, //快速登陆
    login: {
      mobile: '13544233071',
      yzm: '',
      sendObj: {
        text: '发送验证码',
        isSend: false,
        seconds: 60
      }
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    clearInterval(this.data.timer);
    this.setData({
      showFlag: true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }, 

  //获取手机号码
  getMobile(e) {
    //确认
    if (e.detail.errMsg === "getPhoneNumber:ok") {
      //解密数据
      var pc = new WXBizDataCrypt(wx.getStorageSync('appId'), wx.getStorageSync('session_key'))
      var data = pc.decryptData(e.detail.encryptedData, e.detail.iv)

      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 
            wx.redirectTo({ url: '../../user/index/index' })
          }
          else {
            // 没有授权 
            passport.toAuth()
          }
        }
      })
      
    } else {
      //隐藏授权确认框
      this.setData({ showFlag: false })
    }
  },
  //获取验证码
  api_104: function () {

    var this_ = this;
    if (!this.data.login.sendObj.isSend) {
      this.setData({
        'login.sendObj.isSend': true
      })
      wx.post(api.api_104,
        wx.GetSign({
          Type: 10,
          Mobile: this.data.login.mobile
        }),
        function (app, res) {
          if (res.data.Basis.State == api.state.state_200) {
            console.log(res, "---23332")
            wx.showToast({
              title: res.data.Basis.Msg,
              duration: 2000
            })
          } else {
            wx.showToast({
              title: res.data.Basis.Msg,
              icon: 'none',
              duration: 3000
            })
          }
        });
    }
  },
  //获取验证码
  api_110: function () {
    if (!api.verifyStr.isMoblie(this.data.login.mobile)) {
      wx.showToast({
        title: '手机号码输入有误',
        duration: 2000,
        icon: 'none'
      })
      return
    }

    var this_ = this;
    if (!this.data.login.sendObj.isSend) {
      this.setData({
        'login.sendObj.isSend': true
      })
      wx.post(api.api.api_110,
        wx.GetSign({
          Type: 10,
          Mobile: this.data.login.mobile
        }),
        function (app, res) {
          if (res.data.Basis.State == api.state.state_200) {
            console.log(res, "---23332")
            wx.showToast({
              title: res.data.Basis.Msg,
              duration: 2000
            })
            this_.data.timer = setInterval(function () {
              if (this_.data.login.sendObj.seconds <= 0) {
                this_.setData({
                  'login.sendObj.isSend': false,
                  'login.sendObj.seconds': 60,
                  'login.sendObj.text': '发送验证码',
                })
                clearInterval(this_.data.timer)
              } else {
                this_.data.login.sendObj.seconds--;
                this_.setData({
                  'login.sendObj.isSend': true,
                  // 'login.sendObj.seconds': 60,
                  'login.sendObj.text': '发送验证码(' + this_.data.login.sendObj.seconds + ')',
                })
              }
            }, 1000)

          } else {
            wx.showToast({
              title: res.data.Basis.Msg,
              icon: 'none',
              duration: 3000
            })
          }
        });
    }
  },
  //input双向数据绑定
  inputedit: function (e) {
    let this_ = this;
    let dataset = e.currentTarget.dataset;
    let value = e.detail.value.replace(/\s+/g, '');
    let names = dataset.name;
    this_.data[names] = value;
    this_.setData({
      [names]: this_.data[names]
    })
  }
})