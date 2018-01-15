<?php
header('Content-Type: application/json;charset=UTF-8');
$cid = $_REQUEST['cid'];
setrawcookie("cid","$cid",time()+3600);
@$pageNum = $_REQUEST['pageNum'];
if($pageNum===null){ //客户端未提交pageNum，默认值为1
	$pageNum = 1;
}else { //客户端提交了pageNum，把字符串解析为整数
	$pageNum = intval($pageNum);
}

//将要向客户端输出的分页数据
$output = [
	'recordCount' => 0,
	'pageSize' => 10,
	'pageCount' => 0,
	'pageNum' => $pageNum,
	'data'=>null,
	'cname'=>null
];
require('init.php');

//SQL1: 查询总的记录数量
$sql = "SELECT COUNT(*) FROM evaluation WHERE courid=$cid";
$result = mysqli_query($conn, $sql);
//COUNT(*)结果集中有一行一列的数据
$output['recordCount'] = intval( mysqli_fetch_row($result)[0] );
//计算出总页数
$output['pageCount'] = ceil( $output['recordCount'] / $output['pageSize'] );

//SQL2: 查询指定页中的数据
$start = ($output['pageNum']-1)*$output['pageSize'];
//从哪一行记录开始读取
$count = $output['pageSize']; //一次最多读取的记录数量
$sql = "SELECT eid,uname,content,etime FROM course,user,evaluation WHERE cid=$cid AND uid=userid AND cid=courid LIMIT $start, $count";
$result = mysqli_query($conn,$sql);
$output['data'] = mysqli_fetch_all($result,1);
$sql = "SELECT cname FROM course WHERE cid=$cid";
$result = mysqli_query($conn,$sql);
$output['cname'] = mysqli_fetch_row($result)[0];

echo json_encode($output);
