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
      name: '-',
      phone: '-'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(opt) {
    this.api_203(opt)
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
   * Tab切换
   */
  bindTabClick: function(event) {
    let id = event.currentTarget.dataset.id;
    this.setData({
      tab: id
    });
  },
  bindCollectClick: function() {
    let collected = this.data.collected;
    if (collected == 0) {
      this.setData({
        collected: 1
      });
    } else if (collected == 1) {
      this.setData({
        collected: 0
      });
    }
  },
  //加载商品详情
  api_203: function(opt) {
    var this_ = this;
    wx.post(api.api_203, wx.GetSign({
      ID: opt.id
    }), function(app, res) {
      if (res.data.Basis.State != api.state.state_200) {
        wx.showToast({
          title: res.data.Basis.Msg,
          icon: 'none',
          duration: 3000
        })
      } else {
        wxParse.wxParse('details', 'html', res.data.Result.product.details, this_, 5)
        this_.setData({
          imgs: res.data.Result.imgs,
          product: res.data.Result.product,
        })
      }
    });
  }
})