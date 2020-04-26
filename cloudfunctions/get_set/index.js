// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"project-database-v58ji"
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  var user_id = event.data1

  try{
    return await db.collection('user').where({
      _id:user_id
    }).get()
  }catch(e){
    console.log(e)
  }
}