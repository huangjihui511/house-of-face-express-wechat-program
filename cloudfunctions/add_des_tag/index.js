// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"alpha-project-bvqxh"
})

const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var request = event.request
  if (request == "get_des") {
    return await db.collection('expression')
    .orderBy('des_num', 'asc')
    .limit(2)
    .get()
  }
  if (request == "get_tag") {
    return await db.collection('expression')
    .orderBy('tag_num', 'asc')
    .limit(3)
    .get()
  }
  if (request == "add_des") {

  }
  if (request == "add_tag") {
    var id = event.id
    var tags = event.tags
    for (tag in tags) {
      var tag_num
      return await db.collection("expression").where({
        id:id
      }).get()
      // .then(
      //   res => {
      //     console.log(res)
      //     tag_num = res["tags"][tag]
      //     tag_num = num + 1
      //     db.collection("expression").where({
      //       id:id
      //     }).update({
      //       data:{
      //         tags:_.push([{name:tag1,num: tag_num}])
      //       },
      //     })
      //   }
      // )

    }
    return 0
    // try {
    //   return await db.collection('expression').where({
    //     id:id
    //   }).update({
    //     data:{
    //       tags:_.push([{name:tag1,num: 0}])
    //     },
    //   })
    // } catch (e) {
    //   console.log(e)
    // }
  }
}