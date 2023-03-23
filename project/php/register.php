<?php
header('Access-Control-Allow-Origin: *');
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