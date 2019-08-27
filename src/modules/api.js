import {get, post,deletes,put} from './axios.js' ;//导入axios实例文件中方法
import Vue from 'vue'
let bsae_api = 'http://47.103.23.189:8080'//获取项目api请求地址
//根据id获取用户信息
export const getUserInfoByUserName=(userName)=>{
  return post(`/getAllUser`, {
    data: {
      model: {
        "userName": Vue.$getCookie('userName')
      },
      orderParams: [

      ],
      pageNum: 0,
      pageSize: 5
    }
  });
}

