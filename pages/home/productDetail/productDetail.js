var api = require("../../../modules/api.js")
var appG = require("../../../modules/appGlobal.js")
var wxParse = require('../../../modules/wxParse/wxParse.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs: [],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    tab: '0',
    collected: 0,
    product: {
      id: 0,
      name: '-',
      desc: "-",
      details: '-'
    },
    store: {
      id: 0,
      name: '-',
      phone: '10000'
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(opt) {
    this.setData({
      ['store.id']: opt.sid,
      ['product.id']: opt.id
    })
    this.api_203(opt)
    this.api_301(opt)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**
   * 拨打电话
   */
  calling: function() {
    wx.makePhoneCall({
      phoneNumber: '***************',
      success: function() {},
      fail: function() {
        console.log("拨打电话失败！")
      }
    })
  },
  /**
   * Tab切换
   */
  bindTabClick: function(event) {
    let id = event.currentTarget.dataset.id;
    this.setData({
      tab: id
    })
  },
  /**
   * 收藏功能
   */
  collection: function() {
    //已收藏
    if (this.data.collected == 1) {
      //取消收藏
      this.api_302()
    } else {
      //加入收藏
      this.api_300()
    }
  },
  /**
   * 加载商品详情
   */
  api_203: function() {
    var this_ = this
    wx.post(api.api_203, wx.GetSign({
      ID: this_.data.product.id,
      StoreID: this_.data.store.id
    }), function(app, res) {
      if (res.data.Basis.State != api.state.state_200) {
        wx.showToast({
          title: res.data.Basis.Msg,
          icon: 'none',
          duration: 3000
        })
      } else {
        if (res.data.Result.product.details != undefined) {
          wxParse.wxParse('details', 'html', res.data.Result.product.details, this_, 5)
        }
        this_.setData({
          imgs: res.data.Result.imgs,
          product: res.data.Result.product,
        })
      }
    })
  },
  /**
   * 加入收藏
   */
  api_300: function(opt) {
    var this_ = this
    wx.post(api.api_300, wx.GetSign({
      BizID: this_.data.product.id,
      StoreID: this_.data.store.id,
      BizType: 0
    }), function(app, res) {
      if (res.data.Basis.State != api.state.state_200) {
        wx.showToast({
          title: res.data.Basis.Msg,
          icon: 'none',
          duration: 3000
        })
      } else {
        this_.setData({
          collected: 1
        })
      }
    })
  },
  /**
   * 是否收藏
   */
  api_301: function(opt) {
    let this_ = this
    wx.post(api.api_301,
      wx.GetSign({
        BizID: this_.data.product.id,
        StoreID: this_.data.store.id,
        BizType: 0
      }),
      function(app, res) { 
        if (res.data.Basis.State == 403) {
          this_.setData({
            collected: 1
          })
        }
      })
  },
  /**
   * 取消收藏
   */
  api_302: function(opt) {
    let this_ = this
    wx.post(api.api_302,
      wx.GetSign({
        BizID: this_.data.product.id,
        StoreID: this_.data.store.id,
        BizType: 0
      }),
      function(app, res) {
        if (res.data.Basis.State == 200) {
          this_.setData({
            collected: 0
          })
        }
      })
  }
})