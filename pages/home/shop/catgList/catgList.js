var api = require("../../../../modules/api.js")
var router = require("../../../../modules/router.js")

Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    catgId: 0,
    stores: [],
    cateList: [],
    cateContent: [],
    pager: {
      size: 6,
      index: 0,
      keyWord: '',
      loadComplete: false,
      loading: false
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 绑定查询关键词
     */
    bindKeyWord: function (e) {
      this.setData({
        ['pager.keyWord']: e.detail.value
      })
    },
    /**
     * 滚动事件
     */
    scroll: function (e) {
      if (!this.data.pager.loading && !this.data.pager.loadComplete) {
        this.data.pager.loading = true
        this.data.pager.index++
        this.api_205()
      }
    },
    /**
     * 选择分类
     */
    selectCatg: function (event) {
      let id = event.currentTarget.dataset.id
      this.setData({
        catgId: id
      })
      this.search()
    },
    /**
     * 查看门店详情
     */
    goStore: function (event) {
      let id = event.currentTarget.dataset.id
      router.goUrl({
        url: '../details/details?id=' + id,
      })
    },
    /**
     * 查询
     */
    search() {
      this.setData({
        ['pager.index']: 0
      })
      this.setData({
        ['pager.loadComplete']: false
      })
      this.setData({
        stores: []
      })
      this.api_205()
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (opt) {
      this.api_204()
    },
    /**
     * 获取店铺分类
     */
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
          //获取默认类别ID
          if (res.data.Result[0].catgs.length > 0) {
            this_.setData({
              catgId: res.data.Result[0].catgs[0].id
            })
          }
          this_.setData({
            cateList: res.data.Result[0].catgs
          })
          this_.setData({
            stores: res.data.Result[1].stores
          })
        }
      });
    },
    /**
     * 获取店铺商品翻页
     */
    api_205: function () {
      var this_ = this;
      wx.post(api.api_205, wx.GetSign({
        Size: this_.data.pager.size,
        Index: this_.data.pager.index,
        KeyWord: this_.data.pager.keyWord,
        CatgID: this_.data.catgId
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
            this_.data.stores.push(o)
          })
          this_.setData({
            stores: this_.data.stores
          })
        }
        this_.data.pager.loading = false
      })
    }
  }

})