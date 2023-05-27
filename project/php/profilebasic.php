<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

$db_host = 'localhost';
$db_username = 'root';
$db_password = '';
$db_name = 'alumniconnect';

//$target_dir = "../uploaded_company_logo/";
$mysqli = mysqli_connect($db_host, $db_username, $db_password, $db_name);

if (mysqli_connect_errno()) {
    die('Error : ('. mysqli_connect_errno() .') '. mysqli_connect_error());
}

$required = array("sp_name","sp_email","sp_dob","sp_designation","sp_company","sp_linkedin","sp_mobile","sp_address","sp_about");
$msg = "unknown error";
$status = "success";

foreach($required as $field){
    if($_POST[$field] == ""){
        $status = "fail";
    }
}

if($status === "success") {
    $sp_name = $_POST["sp_name"];
    $sp_email = $_POST["sp_email"];
    $sp_dob = $_POST["sp_dob"];
    $sp_designation = $_POST["sp_designation"];
    $sp_company = $_POST["sp_company"];
    $sp_linkedin = $_POST["sp_linkedin"];
    $sp_mobile = $_POST["sp_mobile"];
    $sp_address = $_POST["sp_address"];
    $sp_about = $_POST["sp_about"];

    $sql = "INSERT INTO stud_profile(sp_name,sp_email,sp_dob,sp_designation,sp_company,sp_linkedin,sp_mobile,sp_address,sp_about) values('$sp_name','$sp_email','$sp_dob','$sp_designation','$sp_company','$sp_linkedin','$sp_mobile','$sp_address','$sp_about')";
            
    if(mysqli_query($mysqli, $sql)){
        $msg = 'Record inserted or updated successfully';
        $status = "success";
    } else{
        $msg = "Failed to insert or update record";
        $status = "fail";
    }
} else{
    $msg = "Received empty data";
    $status = "fail";
}

$response = array('status' => $status, 'message' => $msg);
echo json_encode($response);
mysqli_close($mysqli);
?>