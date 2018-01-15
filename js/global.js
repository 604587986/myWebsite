$(function () {
    //异步加载header和footer
    $('#header').load('data/header.php');
    $('#footer').load('data/footer.php');
    $('#modal').load('data/modal.php');

    //异步登录验证
    $('#modal').on('click', '#loginBtn', function () {
        var data = $('#login-form').serialize();//表单序列化
        $.ajax({
            type: 'get',
            url: 'data/user_login.php',
            data: data,
            success: function (result) {
                if (result.code === 2) {
                    $('#login-alert').html('用户名或密码错误').removeClass('hide');
                } else if (result.code === 1) {
                    $('#myModal').modal('hide');
                    $('#header').load('data/header.php');
                } else {
                    $('#login-alert').html('用户名或密码不能为空').removeClass('hide');
                }
            },
            error: function () {
                alert('服务器响应完成但发生了一些问题')
            }
        })
    });

    //异步注册
    $('#modal').on('click', '#regBtn', function () {
        var data = $('#reg-form').serialize();
        $.ajax({
            type: 'post',
            url: 'data/user_reg.php',
            data: data,
            success: function (result) {
                console.log(result)
                if (result.code === 1) {
                    $('#uname-help').addClass('hide');
                    $('#reg-alert').html('恭喜！注册成功').removeClass('hide');
                } else if (result.code === 2) {
                    $('#reg-alert').addClass('hide');
                    $('#uname-help').html(result.msg).addClass('label-danger').removeClass('hide');
                } else {
                    $('#reg-alert').html('用户名或密码不能为空').removeClass('hide');
                }
            },
            error: function () {
                alert('发生了错误')
            }
        })
    })

    //退出登录
    $('html').on('click', '#logoff', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'get',
            url: 'data/logoff.php',
            success: function () {
                location.href = 'index.html'
            }
        });

    });

    //给用户名添加跳转
    $('#header').on('click', '#user', function (e) {
        e.preventDefault();
        location.href = 'my_eval.html'
    });

    //给搜索按钮添加跳转
    $('#header').on('click', '.search-btn', function (e) {
        e.preventDefault();
        var keyword = $('#search').val();
        if (keyword !== '') {
            sessionStorage.course = keyword;//将搜索关键字存储
            location.href = 'course_search.html'
        }
    });
    //enter键开始触发搜索
    $('html').keydown(function (event) {
        if (event.which == 13) {
            event.preventDefault();
            var keyword = $('#search').val();
            if (keyword !== '') {
                sessionStorage.course = keyword;//将搜索关键字存储
                location.href = 'course_search.html'
            }

        }
    })


});