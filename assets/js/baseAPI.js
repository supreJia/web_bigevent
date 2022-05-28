//没错调用ajax函数的时候会先调用ajaxPrefilter这个函数，在这个函数中可以拿到给ajax提供的配置对象

$.ajaxPrefilter(function (options) {
    //在发起真正的ajax请求前同一进行根路径的拼接
    options.url  = 'http://www.liulongbin.top:3007' + options.url
})