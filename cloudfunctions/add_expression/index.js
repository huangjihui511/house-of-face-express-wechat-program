
const cloud = require('wx-server-sdk')

cloud.init({
  env:"project-database-v58ji"
})
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  var request = event.request
  console.log("entrance")
  var globalPicIndex = 0
  if (request == 'search_upgrade') {
    console.log("search_label")
    var label = event.data1
    var retList = []
    await db.collection("tag_names").get({
      success:function(res) {
        var all_tags = res.data[0].name
        console.log("label:",label)
        console.log(all_tags)
        for (var runover = 0;runover < all_tags.length;runover++) {
          //console.log(runover)
          if (runover%100 == 0) {
            console.log("100")
          }
          var judge = 0 
          var inputString = String(label)
          var tag = all_tags[runover]
          var labelString = String(tag)
          //console.log(inputString,"---",labelString,"是否匹配:",inputString.indexOf(labelString))
          if (inputString.indexOf(labelString) >= 0) {
            judge = 1
          }
          if (judge == 1 && (globalPicIndex < 9)) {
            console.log("匹配成功")
            var path
            db.collection("tags").where({
              name:tag
            }).get({
              success:function(res) {
                var datas = res.data
                for (var f = 0;f < datas.length;f++) {
                  var ids = datas[f]['expression_id']
                  for (var key in ids) {
                    console.log("path:",key)
                    retList[globalPicIndex] = key
                    globalPicIndex++
                }
              }
              }
            })
          }
        } 
      }
    })
  }

  if (request == 'user_exp') {
    var exp = event.data1
    var expList = [0,5,15,30,50,100,200,500,1000,2000,3000,6000,10000,18000,30000,60000,
      100000,300000]
    //根据用户的经验计算等级
    var upbound
    var i = 0
    for (;i < 17;i++) {
      if ((exp >= expList[i]) && (exp < expList[i+1])) {
        upbound = expList[i+1]
        break
      }
      if (exp >= 300000) {
        i = 17
        break
      }
    }
    console.log("rank:"+(i+1))
    return (i+1)
  }
  if (request == "searchByLabel") {
    var label = event.data1
    const countResult = await db.collection('tags').count()
    const MAX_LIMIT = 100
  const total = countResult.total
  // 计算需分几次取
  //const batchTimes = Math.ceil(total / 100)
  const batchTimes = 10
  // 承载所有读操作的 promise 的数组
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    const promise = db.collection('tags').skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promise)
  }
  // 等待所有
  return (await Promise.all(tasks)).reduce((acc, cur) => {
    return {
      data: acc.data.concat(cur.data),
      errMsg: acc.errMsg,
    }
  })
  }

  if (request == "add_expression") {
    var id = event.data1
    var file_id = event.data2
    var tags1 = event.data3
    try {
    return await db.collection('user').where({
      open_id:id
    }).update({
      data:{
        expression_set:_.push([{file_id:file_id, times:1, tags:tags1, exp:0}])
      },
    })
  } catch (e) {
    console.log(e)
  }
  }  else if (request == "add_picture") {
    var time =event.data1
    var open_id=event.data2
    var id =event.data3
    var file_id=event.data4
    var public=event.data5


 /*   var id = event.data1
    var time = event.data2
    var tags = event.data3
    var openid = event.data4
    var path = event.data5*/

    try {
      return await db.collection('expression').add({
        data:{
          time:time,
          tags:{},
          open_id:open_id,
          id:id,
          file_id:file_id,
          des_num:0,
          tag_num:0,
          description:[],
          public:public
        }
      })
    } catch(e) {
      console.log(e)
    }
  }
  else if(request=="add_user"){
    var id = event.data1

    try {
      return await db.collection('user').add({
        data:{
          open_id:id,
          exp:0
        }
      })
    } catch(e) {
      console.log(e)
    }
  }
  else if(request=="find_user"){
    var id = event.data1
    try {
      return await db.collection('user').where({
        open_id:id
      }).get()
    } catch(e) {
      console.log(e)
    }
  }
  else if (request == "add_tag") {
    var name1 = event.data1

    try {
      return await db.collection('tag').add({
        data:{
          name:name1,
          expression_id:[]
        }
      })
    } catch(e) {
      console.log(e)
    }
  } else if (request == "addtag_expression") {
    var id = event.data1
    var tag1 = event.data2

    try {
      return await db.collection('expression').where({
        id:id
      }).update({
        data:{
          tags:_.push([{name:tag1,num: 0}])
        },
      })
    } catch (e) {
      console.log(e)
    }
  } else if (request == "get_expression") {
    var expression_id = event.data1
    try{
      return db.collection('expression').where({
        id:expression_id
      }).get()
    } catch(e){
      console.log(e)
    }
  } else if (request == "get_set") {
    var user_id = event.data1
    //var res_file = new Array()
    var path_file = new Array()
    try{
      var res_file =  db.collection('user').where({
        open_id:user_id
      }).field({
        expression_set:true
      }).get()
      console.log("转移", res_file)
      return res_file
    }catch(e){
      console.log(e)
    }
  } else if (request == "set_description") {
    var docid = event.data1
    var vdata1 = event.data2
  
    try {
      return await db.collection('expression').where({
        id:docid
      }).update({
        data:{
          description:_.push(vdata1)
        }
      })
    } catch(e) {
      console.log(e)
    }
  } else if (request == "sub_expression") {
    var user_id = event.data1
    var expression = event.data2
    try{
      return await db.collection('user').where({
        open_id:user_id
      }).update({
        data:{
          expression_set:_.pull({
            file_id:_.eq(expression)
          })
        }
      })
    } catch(e) {
      console.log(e)
    }
  } else if (request == "sub_tag") {
    var name1 = event.data1

    try {
      return await db.collection('tag').where({
        name:name1
      }).remove()
    } catch(e) {
      console.log(e)
    }
  } else if (request == "tab_expression") {
    var id = event.data1
    var names1 = event.data2
  
    for (var i = 0; i < names1.length; i++) {
      try {
        await db.collection('expression').where({
          id:id,
          'tags.name':names1[i]
        }).update({
          data:{
            'tags.$.num':_.inc(1)
          },
        })
      } catch (e) {
        console.log(e)
      }
    }
  } else if (request == "add_times") {
    var id = event.data1
    var path = event.data2

    try {
      await db.collection('user').where({
        open_id:id,
        'expression_set.file_id':path
      }).update({
        data:{
          'expression_set.$.times':_.inc(1)
        },
      })
    } catch (e) {
      console.log(e)
    }
  }
}