var api = require("../../../../modules/api.js")
var appG = require("../../../../modules/appGlobal.js")

Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    //默认店铺ID
    sid: 0,
    //店铺详情
    shopInfo: {
      id: 0,
      name: '-',
      img_url: '../../images/index/i1.jpg',
      business_scope: '-'
    },
    pager: {
      size: 6,
      index: 0,
      loadComplete: false,
      loading: false
    },
    products: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //加载
    onLoad: function (opt) {
      this.setData({
        sid: opt.id
      })
      this.data.pager.index = 0
      this.api_201()
      this.api_202()
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function (e) {
      console.log('监听用户下拉动作')
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function (e) {
      if (!this.data.pager.loading && !this.data.pager.loadComplete) {
        this.data.pager.loading = true
        this.data.pager.index++
        this.api_202()
      }
    },
    //查看商品详情
    goProductDetails(event) {
      let id = event.currentTarget.dataset.id
      let sid = event.currentTarget.dataset.sid
      wx.navigateTo({
        url: '../../productDetail/productDetail?id=' + id + '&sid=' + sid
      })
    },
    //加载店铺详情
    api_201: function () {
      var this_ = this;
      wx.post(api.api_201, wx.GetSign({
        ID: this_.data.sid
      }), function (app, res) {
        if (res.data.Basis.State != api.state.state_200) {
          wx.showToast({
            title: res.data.Basis.Msg,
            icon: 'none',
            duration: 3000
          })
        } else {
          this_.setData({
            shopInfo: res.data.Result
          })
        }
      });
    },
    //加载店铺商品
    api_202: function () {
      var this_ = this
      wx.post(api.api_202, wx.GetSign({
        ID: this_.data.sid,
        Size: this_.data.pager.size,
        Index: this_.data.pager.index
      }), function (app, res) {
        if (res.data.Basis.State != api.state.state_200) {
          wx.showToast({
            title: res.data.Basis.Msg,
            icon: 'none',
            duration: 3000
          })
        } else {

          if (res.data.Result.length == 0) {
            this_.setData({
              ['pager.loadComplete']: true
            })
            wx.showToast({
              title: '加载完成',
              icon: 'success',
              duration: 3000
            })
          }

          res.data.Result.forEach(function (o, i) {
            this_.data.products.push(o)
          })

          this_.setData({
            products: this_.data.products
          })
        }
        this_.data.pager.loading = false
      });
    }

  }
})