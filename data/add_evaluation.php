<?php
header('Content-Type:application/json;charset=UTF-8');
@$uid = $_COOKIE['uid'] or die('{"code":"3","msg":"请先登录"}');
@$cid = $_COOKIE['cid'] or die('{"code":"4","msg":"请先返回所有课程列表"}');
$content = $_REQUEST['content'];
$etime = time()*1000;
require('init.php');
$sql = "INSERT INTO evaluation VALUES(NULL,'$content',$uid,$cid,$etime)";
mysqli_query($conn,$sql);
$row = mysqli_affected_rows($conn);
if($row===-1){
    echo  '{"code":"2","msg":"评论失败"}';
}else{
	$sql = "UPDATE course SET count=count+1 WHERE cid=$cid";
	mysqli_query($conn,$sql);
    echo  '{"code":"1","msg":"评论成功"}';
}

