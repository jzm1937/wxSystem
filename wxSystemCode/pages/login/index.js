//Page Object
Page({
     data: {
          username: "",
          password: ""
     },
     //options(Object)
     onLoad: function (options) {

     },
     getMobile(e) {
          const { value } = e.detail;
          this.setData({
               username: value
          })
     },
     getPassword(e) {
          const { value } = e.detail;
          this.setData({
               password: value
          })
     },
     login() {
          let db = wx.cloud.database();
          let user = db.collection('user');
          user.where({
               username: this.data.username,
               password: this.data.password
          }).get()
               .then(res => {
                    if (res.data.length === 0) {
                         wx.showToast({
                              title: '登录失败',
                              icon: 'error',
                              image: '',
                              duration: 1500,
                              mask: false,
                              success: (result) => {

                              },
                              fail: () => { },
                              complete: () => { }
                         });

                    } else {
                         wx.setStorageSync("userInfo", res.data[0]);
                         wx.setStorageSync("userTimeOut", new Date().getTime());

                         this.setData({
                              username: "",
                              password: ""
                         })

                         wx.switchTab({
                              url: '/pages/user/index',
                              success: (result) => {
                                   wx.showToast({
                                        title: '登录成功',
                                        icon: 'none',
                                        image: '',
                                        duration: 1500,
                                        mask: false,
                                        success: (result) => {

                                        },
                                        fail: () => { },
                                        complete: () => { }
                                   });

                              },
                              fail: () => { },
                              complete: () => { }
                         });


                    }
               }).catch(err => {

               })
     },
     autoLogin() {

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

     },
     onReachBottom: function () {

     },
     onShareAppMessage: function () {

     },
     onPageScroll: function () {

     },
     //item(index,pagePath,text)
     onTabItemTap: function (item) {

     }
});
