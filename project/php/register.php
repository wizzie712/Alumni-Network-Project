<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");
include_once("database.php");
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
$request = json_decode($postdata);
$stud_name = trim($request->stud_name);
$stud_password = mysqli_real_escape_string($mysqli, trim($request->stud_password));
$stud_email = mysqli_real_escape_string($mysqli, trim($request->stud_email));
$stud_gender = mysqli_real_escape_string($mysqli, trim($request->stud_gender));
$stud_batch = mysqli_real_escape_string($mysqli, trim($request->stud_batch));
$sql = "INSERT INTO stud_register(stud_name,stud_password,stud_email,stud_gender,stud_batch) VALUES ('$stud_name','$stud_password','$stud_email','$stud_gender','$stud_batch')";
if ($mysqli->query($sql) === TRUE) {
$authdata = [
'stud_name' => $stud_name,
'stud_password' => $stud_password,
'stud_email' => $stud_email,
'stud_gender' => $stud_gender,
'stud_batch' => $stud_batch
];
echo json_encode($authdata);
}
}

?>