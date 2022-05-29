//没错调用ajax函数的时候会先调用ajaxPrefilter这个函数，在这个函数中可以拿到给ajax提供的配置对象

$.ajaxPrefilter(function (options) {
  //在发起真正的ajax请求前同一进行根路径的拼接
  options.url = "http://www.liulongbin.top:3007" + options.url;

  //统一为有权限的接口，设置headers请求头
  if (options.url.indexOf("/my/") !== -1) {
    options.headers = {
      Authorization: localStorage.getItem("token") || "",
    };
  }


  //全局统一挂载complete回调函数
  options.complete = function (res) {
    if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
      // 1：强制清空token
      localStorage.removeItem('token')
      // 2：强制跳转到登录页面
      location.href = '/login.html'
  }
  }
});
