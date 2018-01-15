<?php
header('Content-Type:application/json;charset=UTF-8');
$uname = $_REQUEST['uname'] or die('{"code":"3","msg":"uname required"}');
$upwd = $_REQUEST['upwd'] or die('{"code":"4","msg":"upwd required"}');
require('init.php');
$sql = "SELECT * FROM user WHERE uname='$uname' AND upwd='$upwd'";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
if($row===null){
    $output = ['code'=>2,'msg'=>'用户名或密码错误'];
}else{
    $output = ['code'=>1,'uname'=>$uname,'uid'=>$row['uid']];
    setrawcookie("user","$uname",time()+3600);
    setrawcookie("uid","$row[uid]",time()+3600);
}
echo json_encode($output);

