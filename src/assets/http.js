import axios from 'axios'
import store from '../store'
import router from '../router'
export const HTTP = axios.create({
  //baseURL: `http://39.104.146.237:8083`,
  headers: {
    Authorization: 'Basic YWNtZTo='
  }
})

HTTP.interceptors.response.use(function (response) {
  // if token is expired, redirect to login
  if (response.status === 401) {
    router.push('/')
  }
  return response
}, function (error) {
  return Promise.reject(error)
})

/**
 * Ajax 异步数据请求
 * @author nianguowei
 * @param type [String] e.g.:"POST" or "GET"
 * @param url [String] 请求url
 * @param param [Object] 参数
 * @param successFunction [Function] 成功回调函数
 * @param beforeFun [Function] 调用之前，可以用于loading
 * @param completeFun [Function] ajax执行完成，可以用于loading
 */
export default{
  install (Vue) {
    Vue.prototype.get = (url, param, successFun, errorFun) => {
      var token = store.state.token
      var header = {'Authorization': 'Bearer ' + token}

      HTTP({
        method: 'get',
        url: url,
        params: param,
        dataType: 'json',
        headers: header,
        contentType: 'application/json'
      }).then(successFun)
        .catch(errorFun)
    }

    Vue.prototype.post = (url, param, successFun, errorFun) => {
      Vue.prototype.http('post', url, param, successFun, errorFun)
    }

    Vue.prototype.delete = (url, param, successFun, errorFun) => {
      Vue.prototype.http('delete', url, param, successFun, errorFun)
    }

    Vue.prototype.put = (url, param, successFun, errorFun) => {
      Vue.prototype.http('put', url, param, successFun, errorFun)
    }

    Vue.prototype.http = (method, url, param, successFun, errorFun) => {
      var token = store.state.token
      var header = {'Authorization': 'Bearer ' + token}

      HTTP({
        method: method,
        url: url,
        data: param,
        dataType: 'json',
        headers: header,
        contentType: 'application/json'
      }).then(successFun)
        .catch(errorFun)
    }

    //Vue.prototype.loginRequest = (param, successFun, errorFun) => {
    //  HTTP({
    //    method: 'post',
    //    url: '/uaa/oauth/token',
    //    params: param,
    //    dataType: 'json',
    //    contentType: 'json'
    //  }).then(successFun)
    //    .catch(errorFun)
    //}
  }
}
