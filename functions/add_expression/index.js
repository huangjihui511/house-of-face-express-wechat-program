
const cloud = require('wx-server-sdk')

cloud.init({
  env:"program-byiln"
})
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  var id = event.data1
  var value1 = event.data2

  try {
    return await db.collection('user').where({
      _id:id
    }).update({
      data:{
        expression_set:_.push(value1)
      },
    })
  } catch (e) {
    console.log(e)
  }
}