var api = require("../../../../modules/api.js")
var router = require("../../../../modules/router.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    pager: {
      size: 8,
      index: 0,
      keyWord: '',
      loadComplete: false,
      loading: false
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(opt) {
    this.api_303()
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
  //查看商品详情
  goProductDetails(event) {
    let id = event.currentTarget.dataset.id
    let sid = event.currentTarget.dataset.sid
    router.goUrl({
      url: '../../productDetail/productDetail?id=' + id + '&sid=' + sid
    })
  },
  /**
   * 滚动事件
   */
  scroll: function(e) {
    if (!this.data.pager.loading && !this.data.pager.loadComplete) {
      this.data.pager.loading = true
      this.data.pager.index++
        this.api_303()
    }
  },
  //查看商品详情
  goProductDetails(e) {
    let id = e.currentTarget.dataset.id
    let sid = e.currentTarget.dataset.sid
    router.goUrl({
      url: '../../../home/productDetail/productDetail?id=' + id + '&sid=' + sid
    })
  },
  /**
   * 用户收藏列表
   */
  api_303: function() {
    var this_ = this;
    wx.post(api.api_303, wx.GetSign({
      BizType: 0,
      Size: this_.data.pager.size,
      Index: this_.data.pager.index
    }), function(app, res) {
      if (res.data.Basis.State != api.state.state_200) {
        wx.showToast({
          title: res.data.Basis.Msg,
          icon: 'none',
          duration: 3000
        })
      } else {
        res.data.Result.forEach(function(o, i) {
          this_.data.list.push(o)
        })
        this_.setData({
          list: this_.data.list
        })
      }
    });
  }
})