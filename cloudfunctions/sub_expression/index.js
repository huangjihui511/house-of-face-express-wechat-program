// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"project-database-v58ji"
})
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  var user_id = event.data1
  var expression = event.data2
  try{
    return await db.collection('user').where({
      _id:user_id
    }).update({
      data:{
        expression_set:_.pull(expression)
      }
    })
  } catch(e) {
    console.log(e)
  }
}