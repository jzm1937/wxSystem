//Page Object
Page({
     data: {
          username: "",
          userTimeOut: ""
     },
     onLoad: function (options) {
          const userInfo = wx.getStorageSync('userInfo');
          const userTimeOut = wx.getStorageSync('userTimeOut');

          if (userInfo.username) {
               if (new Date().getTime() - userTimeOut > 1000 * 60 * 60 * 24 * 3) {
                    wx.removeStorageSync("userInfo");
                    wx.removeStorageSync("userTimeOut");

                    wx.showToast({
                         title: '账号信息已过期，请重新登录',
                         icon: 'none',
                         image: '',
                         duration: 1500,
                         mask: false,
                         success: (result) => {

                         },
                         fail: () => { },
                         complete: () => { }
                    });

               } else {
                    this.setData({
                         username: userInfo.username
                    })
               }
          } else {
          }
     },
     toLogin() {
          wx.navigateTo({
               url: '/pages/login/index'
          });

     },
     exitLogin() {
          wx.showModal({
               title: '确定退出吗',
               content: '',
               showCancel: true,
               cancelText: '取消',
               cancelColor: '#000000',
               confirmText: '确定',
               confirmColor: '#3CC51F',
               success: (result) => {
                    if (result.confirm) {
                         wx.removeStorageSync("userInfo");
                         wx.removeStorageSync("userTimeOut");
                         this.setData({
                              userInfo: {}
                         })
                         wx.showToast({
                              title: '退出成功',
                              icon: 'success',
                              duration: 1500,
                              mask: false,
                         });

                    }
               }
          });


     },
     order_list() {

          const userInfo = wx.getStorageSync("userInfo")
          if (userInfo.username) {
               wx.navigateTo({
                    url: '/pages/orders/index',
               });

          } else {
               wx.showToast({
                    title: '请先登录',
                    icon: 'error',
                    mask: true,
               });

          }
     },
     onShareAppMessage: function (ops) {
          if (ops.from === 'button') {
               var title = ops.target.dataset.title;
          };

          return {
               title: title, //转发的标题。当前小程序名称
               path: 'pages/index/index', //转发的路径
               imageUrl: '', //自定义图片路径 支持PNG及JPG。显示图片长宽比是 5:4。
               // success: function (res) {
               //     // 转发成功
               //     var shareTickets = res.shareTickets;
               //     api.showToast('转发成功');
               // },
               // fail: function (res) {
               //     // 转发失败
               //     api.showToast("转发失败:" + JSON.stringify(res));
               // }

               //由于版本更新，现在不能监听回调成功还是失败。
               //分享的内容是都会被成功发出
               //如果一定要回调的话可根据需求自定，目前小编还没有更好的办法。
          }
     },
     onShow: function () {
          const userInfo = wx.getStorageSync("userInfo");
          if (new Date().getTime() - userInfo.timeOut > 1000 * 10 * 60 * 60 * 24 * 3) {
               wx.removeStorageSync("userInfo");
               this.setData({
                    userInfo: {}
               })
          } else {
               this.setData({
                    userInfo: userInfo,
                    ['userInfo.timeOut']: new Date().getTime()
               })
               wx.setStorageSync("userInfo", this.data.userInfo);
          }
     },
     onHide: function () {

     }
});