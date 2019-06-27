// pages/cateList/cateList.js
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
    imgUrls: [
      'https://img.alicdn.com/imgextra/i4/2453833909/TB1t9Awi5AnBKNjSZFvXXaTKXXa_!!0-item_pic.jpg_430x430q90.jpg',
      'https://img.alicdn.com/imgextra/i4/2453833909/TB1t9Awi5AnBKNjSZFvXXaTKXXa_!!0-item_pic.jpg_430x430q90.jpg',
      'https://img.alicdn.com/imgextra/i4/2453833909/TB1t9Awi5AnBKNjSZFvXXaTKXXa_!!0-item_pic.jpg_430x430q90.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    cateList:[
      {
        classifysName:'山货',
        cateClassify:[
          '山货分类1山货分类1山货分类1山货分类1',
           '山货分类1',
           '山货分类1',
           '山货分类1',
           '山货分类1',
           '山货分类1',
        ]
      },
      {
        classifysName: '水产',
        cateClassify: [
           '水产分类1',
           '水产分类1',
           '水产分类1',
           '水产分类1',
           '水产分类1',
           '水产分类1',
        ]
      },
      {
        classifysName: '生鲜',
        cateClassify: [
           '生鲜分类1',
           '生鲜分类1',
           '生鲜分类1',
           '生鲜分类1',
           '生鲜分类1',
           '生鲜分类1',
        ]
      }
    ],
    cateContent:[
      {
        name: '商家1',
        img: '../../images/index/bn2.jpg',
        id:1
      },
      {
        name: '商家1',
        img: '../../images/index/bn2.jpg',
        id: 1
      },
      {
        name: '商家1',
        img: '../../images/index/bn2.jpg',
        id: 1
        
      },
      {
        name: '商家1',
        img: '../../images/index/bn2.jpg',
        id: 1
      },
      {
        name: '商家1',
        img: '../../images/index/bn2.jpg',
        id: 1
      },
      {
        name: '商家1',
        img: '../../images/index/bn2.jpg',
        id: 1
      },
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
