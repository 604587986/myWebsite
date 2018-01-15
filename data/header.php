<?php
header('Content-Type:text/html;charset=UTF-8');
?>
<!--导航栏开始-->
<div class="navbar navbar-default navbar-fixed-top">
    <div class="container">
        <!--导航栏头部（logo+响应按钮）-->
        <div class="navbar-header">
            <a href="http://39.106.37.65" class="navbar-brand">
                <span class="logo"></span>
            </a>
            <a href="#top-menu" class="navbar-toggle" data-toggle="collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </a>
        </div>
        <!--菜单折叠部分-->
        <div class="collapse navbar-collapse" id="top-menu">
            <ul class="nav navbar-nav navbar-right" id="welcome">
            <?php
            if (isset($_COOKIE["user"]))
                echo "<li><a id='user' href='#'>欢迎回来，".$_COOKIE['user']."</a></li><li><a id='logoff' href='#' >退出</a></li> ";
            else
                echo "<li><a href='#myRegModal' data-toggle='modal'>注册</a></li>
                        <li><a href='#myModal' data-toggle='modal'>登录</a></li>";
            ?>
            </ul>
            <form class="navbar-form navbar-right">
                <div class="form-group">
                    <label class="sr-only" for="search">搜索 | </label>
                    <input class="form-control" id="search" type="text" placeholder="搜索课程">
                    <a href="#" class="search-btn navbar-link">搜索</a>
                </div>
            </form>
        </div>
    </div>
</div>
<!--导航栏结束-->