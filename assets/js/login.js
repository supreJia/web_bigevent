$(function(){
    //点击“去注册”的链接
    $('#link_reg').on('click', function () {
        $('.login-Box').hide()
        $('.reg-Box').show()
    })

    //点击“去登录”的链接
    $('#link_login').on('click', function () {
        $('.login-Box').show()
        $('.reg-Box').hide()
    })

    //从layui上面获取form对象
    var form = layui.form

    var layer = layui.layer
    //通过form.verify()函数自定义验证
    form.verify({
        //自定义一个叫pwd的校验规则
        pwd: [
            /^[\S]{6,12}$/,'密码必须6到12位,且不能出现空格'
          ] ,

          //这是校验两次密码是否一致的规则
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 进行判定
            var pwd = $('.reg-Box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit',function (e) {
        e.preventDefault()
        // 发起ajax的post请求
        var data = {username:$('#form_reg [name=username]').val(), password:$('#form_reg [name=password]').val()}
        $.post('/api/reguser',data,function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功');
            //模拟人的点击
            $('#link_login').click()
        })
    })

    //监听登录表单的提交事件
    $('#form_login').on('submit',function (e) {
        e.preventDefault()
        // 发起ajax的post请求
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败');
                }
                layer.msg('登录成功');
                //将登录成功得到的token字符串，保存到localStorage中
                localStorage.setItem('token',res.token)
                //跳转到后台主页
                location.href = '/index.html'
            }
        });
        
    })
})