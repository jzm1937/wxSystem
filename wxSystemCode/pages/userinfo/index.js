Page({

     /**
      * 页面的初始数据
      */
     data: {
          checkCodeBtn: false,
          phone: ""
     },
     phoneInput: "",
     codeInput: "",
     verification_Code: "",

     /**
      * 生命周期函数--监听页面加载
      */
     onLoad: function (options) {

          const code = wx.getStorageSync("code");


          var db = wx.cloud.database().collection("user")
          db.doc({
               openid: this.getOpenid(code)
          }).get().then(res => {

          })

          db.doc({
               openid: this.getOpenid(code)
          }).get()
               .then(res => {
                    if (res.data.phone) {
                         this.setData({
                              phone: res.data.phone
                         })
                    } else if (!res.data.phone) {
                         this.setData({
                              phone: ""
                         })
                    }
               })

          // const openid = this.getOpenid(code);
          // wx.cloud.database().collection('user')
          //      .doc({
          //           openid: this.getOpenid(code)
          //      })
          //      .update({
          //           data: {
          //                phone: this.phoneInput
          //           }
          //      }).then(res => {
          //           console.log(res);
          //           wx.showToast({
          //                title: '绑定成功',
          //                icon: 'success',
          //                image: '',
          //                duration: 1500,
          //                mask: true,
          //                success: (result) => {

          //                },
          //                fail: () => { },
          //                complete: () => { }
          //           });

          //      }).catch(err => {
          //           console.log("绑定失败");
          //      })
     },

     getOpenid(code) {

          var reqTask = wx.request({
               url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxe110fb1733227fd2&secret=cbb0c9dc63fef25b728cb383cf82f401&js_code=' + code + '&grant_type=authorization_code',
               data: {},
               header: { 'content-type': 'application/json' },
               method: 'GET',
               dataType: 'json',
               responseType: 'text',
               success: (result) => {

                    return result.data.openid;
               },
               fail: () => { },
               complete: () => { }
          });

     },
     getPhone(e) {
          const { value } = e.detail;
          this.phoneInput = value;
          if (!(/^1[3456789]\d{9}$/.test(value))) {

               this.setData({
                    checkCodeBtn: false
               })
          } else {

               this.setData({
                    checkCodeBtn: true
               })
          }
     },
     submitPhone(e) {
          if (this.data.checkCodeBtn) {

               this.code(this.phoneInput);
          } else {

               wx.showToast({
                    title: '请检查手机号码是否正确',
                    icon: 'none',
                    image: '',
                    duration: 1500,
                    mask: false,
                    success: (result) => {

                    },
                    fail: () => { },
                    complete: () => { }
               });

          }
     },
     code(phone) {
          if (!wx.cloud) {
               wx.redirectTo({
                    url: '/pages/index/index',
               })
               return
          }
          wx.cloud.callFunction({
               name: 'sendsms',
               data: {
                    mobile: phone,
                    nationcode: '86'
               },
               success: res => {


                    if (res.result.resData.errmsg !== "OK") {
                         wx.showToast({
                              title: '操作频繁',
                              icon: 'error',
                              image: '',
                              duration: 1500,
                              mask: false,
                              success: (result) => {

                              },
                              fail: () => { },
                              complete: () => { }
                         });
                    } else if (res.result.resData.errmsg === "OK") {

                         this.verification_Code = res.result.res.body.params[0]
                         this.codeTimeOut = res.result.res.body.time;
                         wx.showToast({
                              title: '发送成功',
                              icon: 'success',
                              image: '',
                              duration: 1500,
                              mask: false,
                              success: (result) => {

                              },
                              fail: () => { },
                              complete: () => { }
                         });
                    }


               },
               fail: err => {

               }
          })
     },
     getCode(e) {
          const { value } = e.detail;
          this.codeInput = value;
     },
     checkCode(e) {
          if ((new Date().getTime() / 1000) - this.codeTimeOut > 120) {
               wx.showToast({
                    title: '验证码超时',
                    icon: 'error',
                    image: '',
                    duration: 1500,
                    mask: true,
                    success: (result) => {

                    },
                    fail: () => { },
                    complete: () => { }
               });

          } else {

               if (this.codeInput === this.verification_Code) {
                    //更新数据库绑定手机号码


                    const code = wx.getStorageSync("code");

                    const openid = this.getOpenid(code);
                    wx.cloud.database().collection('user')
                         .doc({
                              openid: this.getOpenid(code)
                         })
                         .update({
                              data: {
                                   phone: this.phoneInput
                              }
                         }).then(res => {

                              wx.showToast({
                                   title: '绑定成功',
                                   icon: 'success',
                                   image: '',
                                   duration: 1500,
                                   mask: true,
                                   success: (result) => {

                                   },
                                   fail: () => { },
                                   complete: () => { }
                              });
                              this.setData({
                                   phone: this.phoneInput
                              })

                         }).catch(err => {

                         })
               } else {
                    wx.showToast({
                         title: '验证码错误',
                         icon: 'error',
                         image: '',
                         duration: 1500,
                         mask: true,
                         success: (result) => {

                         },
                         fail: () => { },
                         complete: () => { }
                    });

               }
          }
     },

     /**
      * 生命周期函数--监听页面初次渲染完成
      */
     onReady: function () {

     },

     /**
      * 生命周期函数--监听页面显示
      */
     onShow: function () {




          const userInfo = wx.getStorageSync("userInfo");

          if (userInfo.avatarUrl) {

          } else {

               wx.switchTab({
                    url: '/pages/user/index',
                    success: (result) => {

                    },
                    fail: () => { },
                    complete: () => { }
               });
          }
     },

     /**
      * 生命周期函数--监听页面隐藏
      */
     onHide: function () {

     },

     /**
      * 生命周期函数--监听页面卸载
      */
     onUnload: function () {

     },

     /**
      * 页面相关事件处理函数--监听用户下拉动作
      */
     onPullDownRefresh: function () {

     },

     /**
      * 页面上拉触底事件的处理函数
      */
     onReachBottom: function () {

     },

     /**
      * 用户点击右上角分享
      */
     onShareAppMessage: function () {

     }
})