// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"project-database-v58ji"
})

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var f = event.function_advise
  var u = event.usage_advise
  var o = event.other_advise
  var s = event.score
  var time = event.time
  await db.collection('feedback').add({
    data:{
      openid: wxContext.OPENID,
      appid: wxContext.APPID,
      function_advise:f,
      usage_advise:u,
      other_advise:o,
      score:s,
      time:time
    }
  })
}