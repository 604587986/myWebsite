<?php
header('Content-Type:text/html;charset=UTF-8');
?>
<!--登录模态框开始-->
<div class="container">
    <div class="modal fade" id="myModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <a href="#" type="button" class="close" data-dismiss="modal">&times</a>
                    <h4>登录</h4>
                    <h3 id="login-alert" class="alert hide alert-danger"></h3>
                </div>
                <div class="modal-body">
                    <form id="login-form">
                        <div class="form-group">
                            <label class="control-label" for="userName">请输入账号：</label>
                            <input class="form-control" id="userName" name="uname" type="text">
                            <span class="help-block label"></span>
                        </div>
                        <div class="form-group">
                            <label class="control-label" for="userPwd">请输入密码：</label>
                            <input class="form-control" id="userPwd" name="upwd" type="password">
                            <span class="help-block label"></span>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <a id="loginBtn" class="btn btn-default" href="#">登录</a>
                </div>
            </div>
        </div>
    </div>
</div>
<!--登录模态框结束-->

<!--注册模态框开始-->
<div class="container">
    <div class="modal fade" id="myRegModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <a href="#" type="button" class="close" data-dismiss="modal">&times</a>
                    <h4>注册</h4>
                    <div id="reg-alert" class="alert alert-success hide"></div>
                </div>
                <div class="modal-body">
                    <form id="reg-form">
                        <div class="form-group">
                            <label class="control-label" for="uName">请输入用户名：</label>
                            <input class="form-control" id="uName" name="uname" type="text">
                            <span id="uname-help" class="help-block label"></span>
                        </div>
                        <div class="form-group">
                            <label class="control-label" for="uPwd">请输入密码：</label>
                            <input class="form-control" id="uPwd" name="upwd" type="password">
                            <span id="upwd-help" class="help-block label"></span>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <a id="regBtn" class="btn btn-default" href="#">注册</a>
                </div>
            </div>
        </div>
    </div>
</div>
<!--注册模态框结束-->