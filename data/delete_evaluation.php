<?php
header('Content-Type:application/json;charset=UTF-8');
//接受eid,删除相应的评论
$eid = $_REQUEST['eid'];
require('init.php');
$sql = "SELECT courid FROM evaluation WHERE eid=$eid";
$result = mysqli_query($conn,$sql);
$cid = mysqli_fetch_row($result)[0];
$sql = "DELETE FROM evaluation WHERE eid=$eid";
$result = mysqli_query($conn,$sql);
$row = mysqli_affected_rows($conn);
if($row===1){
    echo '{"code":"1","msg":"删除成功"}';
    $sql = "UPDATE course SET count=count-1 WHERE cid=$cid";
    mysqli_query($conn,$sql);
}else{
    echo '{"code":"2","msg":"删除失败"}';
}

