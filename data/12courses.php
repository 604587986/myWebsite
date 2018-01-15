<?php
    header('Content-Type:application/json;charset=UTF-8');
    require('init.php');
    $sql = "SELECT * FROM course LIMIT 0,12";
    $result = mysqli_query($conn,$sql);
    $list = mysqli_fetch_all($result,1);
    echo json_encode($list);

?>