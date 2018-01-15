<?php
header('Content-Type:application/json;charset=UTF-8');
$uname = $_REQUEST['uname'] or die('{"code":"3","msg":"uname required"}');
$upwd = $_REQUEST['upwd'] or die('{"code":"4","msg":"upwd required"}');
require('init.php');
$sql = "SELECT * FROM user WHERE uname='$uname'";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
if($row===null){
    $output = ['code'=>1,'msg'=>'当前用户名可以使用'];
    $sql = "INSERT INTO user VALUES(null, '$uname', '$upwd')";
    mysqli_query($conn,$sql);
}else{
    $output = ['code'=>2,'msg'=>'用户名已经存在'];
}
echo json_encode($output);
