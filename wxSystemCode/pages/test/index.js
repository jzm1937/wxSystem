//Page Object
Page({
     data: {

     },
     //options(Object)
     onLoad: function (options) {

     },
     getOpenid() {
          wx.cloud.callFunction({
               name: 'getopenid',
          }).then(res=>{
               console.log(res);
          })
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
