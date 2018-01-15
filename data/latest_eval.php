<?php
    header('Content-Type:application/json;charset=UTF-8');
    require('init.php');
    $sql = "SELECT eid,uname,cname,content,etime FROM evaluation,user,course WHERE userid=uid AND courid=cid ORDER BY eid DESC LIMIT 0,5";
    $result = mysqli_query($conn,$sql);
    $list = mysqli_fetch_all($result,1);
    echo json_encode($list);

?>