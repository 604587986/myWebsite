<?php
header('Content-Type:application/json;charset=UTF-8');
@$course = $_REQUEST['course'];
require('init.php');
$sql = "SELECT * FROM course WHERE cname LIKE '%$course%'";
$result = mysqli_query($conn,$sql);
$list = mysqli_fetch_all($result,1);
echo json_encode($list);
