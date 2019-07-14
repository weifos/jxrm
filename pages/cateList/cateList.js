var api = require("../../modules/api.js")
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
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    products: [],
    cateList: [],
    cateContent: [
    ],
    pager: {
      size: 6,
      index: 0,
      loadComplete: false,
      loading: false
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (opt) {
      this.api_204()
    },
    /**
     * 查看门店详情
     */
    goStore: function (event) {
      let id = event.currentTarget.dataset.id
      wx.navigateTo({
        url: '../home/productDetail/productDetail?id=' + id,
      })
    },
    //获取店铺分类
    api_204: function () {
      var this_ = this;
      wx.post(api.api_204, wx.GetSign({
        PageSize: this_.data.pager.size
      }), function (app, res) {
        if (res.data.Basis.State != api.state.state_200) {
          wx.showToast({
            title: res.data.Basis.Msg,
            icon: 'none',
            duration: 3000
          })
        } else {
          this_.setData({
            cateList: res.data.Result[0].catgs
          })
          this_.setData({
            products: res.data.Result[1].products
          })
        }
      });
    }
  }

})