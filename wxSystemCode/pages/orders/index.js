//Page Object
Page({
     data: {
          tabs: [{
               id: 0,
               value: "待处理",
               isActive: true
          },
          {
               id: 1,
               value: "处理中",
               isActive: false
          },
          {
               id: 2,
               value: "已完成",
               isActive: false
          }],
          page_0_num: 1,
          page_1_num: 1,
          page_2_num: 1,
          pagesize: 10,
          orders_0: [],
          orders_1: [],
          orders_2: [],
          pickerArray: [
               "待处理",
               "处理中",
               "已完成"
          ],
          pickerId: ""
     },
     //options(Object)
     onLoad: function (options) {
          this.getData();
     },
     getData() {
          this.getData_0();
          this.getData_1();
          this.getData_2();
     },
     getData_0() {
          let db = wx.cloud.database();
          let orders = db.collection('orders');

          orders.where({
               status: "待处理"
          })
               .skip((this.data.page_0_num - 1) * this.data.pagesize)
               .limit(this.data.pagesize)
               .get()
               .then(res => {
                    this.setData({
                         orders_0: [...this.data.orders_0, ...res.data]
                    })
               })
          wx.stopPullDownRefresh();
     },
     getData_1() {
          let db = wx.cloud.database();
          let orders = db.collection('orders');

          orders.where({
               status: "处理中"
          })
               .skip((this.data.page_1_num - 1) * this.data.pagesize)
               .limit(this.data.pagesize)
               .get().then(res => {
                    this.setData({
                         orders_1: [...this.data.orders_1, ...res.data]
                    })
               })
          wx.stopPullDownRefresh();
     },
     getData_2() {
          let db = wx.cloud.database();
          let orders = db.collection('orders');

          orders.where({
               status: "已完成"
          })
               .skip((this.data.page_2_num - 1) * this.data.pagesize)
               .limit(this.data.pagesize)
               .get().then(res => {
                    this.setData({
                         orders_2: [...this.data.orders_2, ...res.data]
                    })
               })
          wx.stopPullDownRefresh();
     },
     itemChange(e) {
          this.setData({
               pickerId: e.currentTarget.dataset.id
          })
     },
     itemDel(e) {
          this.setData({
               pickerId: e.currentTarget.dataset.id
          })

          wx.showModal({
               title: '确认删除吗',
               content: '',
               showCancel: true,
               cancelText: '取消',
               cancelColor: '#000000',
               confirmText: '删除',
               confirmColor: '#3CC51F',
               success: (result) => {
                    if (result.confirm) {
                         let orders = wx.cloud.database().collection("orders");
                         orders.where({
                              _id: this.data.pickerId
                         }).remove().then(res => {
                              if (res.stats.removed === 1) {
                                   wx.showToast({
                                        title: '删除成功',
                                        icon: 'success',
                                        mask: false,
                                   });
                                   this.setData({
                                        page_0_num: 1,
                                        page_1_num: 1,
                                        page_2_num: 1,
                                        pagesize: 10,
                                        orders_0: [],
                                        orders_1: [],
                                        orders_2: [],
                                   })
                                   this.getData();
                              } else {
                                   wx.showToast({
                                        title: '删除失败',
                                        icon: 'error',
                                        mask: false,
                                   });
                              }
                         })
                    }
               },
               fail: () => { },
               complete: () => { }
          });

     },
     pickerChange(e) {
          let pickerValue = this.data.pickerArray[e.detail.value];
          let orders = wx.cloud.database().collection("orders");
          orders.where({
               _id: this.data.pickerId
          }).update({
               data: {
                    status: pickerValue
               }
          }).then(res => {
               if (res.stats.updated === 1) {
                    wx.showToast({
                         title: '修改成功',
                         icon: 'success'
                    });
                    this.setData({
                         page_0_num: 1,
                         page_1_num: 1,
                         page_2_num: 1,
                         pagesize: 10,
                         orders_0: [],
                         orders_1: [],
                         orders_2: [],
                    })
                    this.getData();

               } else {
                    wx.showToast({
                         title: '修改失败',
                         icon: 'error',
                         mask: true,
                    });
               }
          })
     },
     handletabItemChange(e) {
          const {
               index
          } = e.detail;
          let {
               tabs
          } = this.data;
          tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
          this.setData({
               tabs
          })
     },
     isExist(pagenum, classify) {
          let orders = wx.cloud.database().collection('orders');
          if (classify === "待处理") {
               orders.where({
                    status: classify
               })
                    .skip((pagenum - 1) * this.data.pagesize)
                    .limit(this.data.pagesize)
                    .get()
                    .then(res => {
                         if (res.data.length === 0) {
                              wx.showToast({
                                   title: '到头了',
                                   icon: 'none'
                              });
                         } else {
                              this.setData({
                                   page_0_num: this.data.page_0_num + 1
                              })
                              this.getData_0();
                         }
                    })
          } else if (classify === "处理中") {
               orders.where({
                    status: classify
               })
                    .skip((pagenum - 1) * this.data.pagesize)
                    .limit(this.data.pagesize)
                    .get()
                    .then(res => {
                         if (res.data.length === 0) {
                              wx.showToast({
                                   title: '到头了',
                                   icon: 'none'
                              });
                         } else {
                              this.setData({
                                   page_1_num: this.data.page_1_num + 1
                              })
                              this.getData_1();
                         }
                    })
          } else if (classify === "已完成") {
               orders.where({
                    status: classify
               })
                    .skip((pagenum - 1) * this.data.pagesize)
                    .limit(this.data.pagesize)
                    .get()
                    .then(res => {
                         if (res.data.length === 0) {
                              wx.showToast({
                                   title: '到头了',
                                   icon: 'none'
                              });
                         } else {
                              this.setData({
                                   page_2_num: this.data.page_2_num + 1
                              })
                              this.getData_2();
                         }
                    })
          }

     },
     onReady: function () {

     },
     onShow: function () {

     },
     onHide: function () {

     },
     onUnload: function () {

     },
     onPullDownRefresh: function () {
          this.setData({
               page_0_num: 1,
               page_1_num: 1,
               page_2_num: 1,
               pagesize: 10,
               orders_0: [],
               orders_1: [],
               orders_2: [],
          })
          this.getData();
     },
     onReachBottom: function () {
          if (this.data.tabs[0].isActive) {
               this.isExist(this.data.page_0_num + 1, "待处理");
          }
          if (this.data.tabs[1].isActive) {
               this.isExist(this.data.page_1_num + 1, "处理中");

          }
          if (this.data.tabs[2].isActive) {
               this.isExist(this.data.page_2_num + 1, "已完成");
          }
     },
     onShareAppMessage: function () {

     },
     onPageScroll: function () {

     },
     //item(index,pagePath,text)
     onTabItemTap: function (item) {

     }
});