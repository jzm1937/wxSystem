//下面的除了标注的地方外，其余的不用更改

const cloud = require('wx-server-sdk')

const QcloudSms = require("qcloudsms_js")

const appid = 1400588045 // 替换成云短信的 SDK AppID

const appkey = "aa8681c7c59a7a61ba6611bdd01f511c" // 替换成云短信的 App Key

const templateId = 1169432 // 替换成模板 ID

const smsSign = "江电易报修" // 替换成签名内容

cloud.init()

exports.main = async (event, context) => new Promise((resolve, reject) => {

    /**

    * 下面这段代码的作用是，生成随机的验证码，因为循环了6次，就是6位数的

    */

    // 生成6位数验证码 

    var code = "";

    for (var i = 0; i < 6; i++) {

        var radom = Math.floor(Math.random() * 10);

        code += radom;

     }

    // 生成6位数验证码 

    var qcloudsms = QcloudSms(appid, appkey);

    var ssender = qcloudsms.SmsSingleSender();

    var params = [code,"2"];

    var mobile = event.mobile

    var nationcode = event.nationcode

    ssender.sendWithParam(nationcode, mobile, templateId, params, smsSign, "", "", (err, res, resData) => {

        if (err) {

            reject({ err })

        } else {

            resolve({ res: res.req, resData})

        }

    }

    );

})