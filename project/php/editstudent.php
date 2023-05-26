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

$target_dir = "../uploaded_profile_pic/";
$mysqli = mysqli_connect($db_host, $db_username, $db_password, $db_name);

if (mysqli_connect_errno()) {
    die('Error : ('. mysqli_connect_errno() .') '. mysqli_connect_error());
}

$status = "failed";
$profile_pic_name = basename($_FILES['profile_pic']['name']);
$target_file = $target_dir . $profile_pic_name;
$uploadok = 1;
$image_file_type = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));


if(file_exists($target_file)){
    $msg = 'sorry, file already exists';
    $status = "failed";
    $uploadok = 0;
}

if($_FILES['profile_pic']['size'] > 500000){
    $msg = 'sorry, file too large';
    $status = "failed";
    $uploadok = 0;
}

if($image_file_type != "jpg" && $image_file_type != "jpeg" && $image_file_type != "png" && $image_file_type != "gif"){
    $msg = 'sorry, only jpg, jpeg, png and gif allowed';
    $status = "failed";
    $uploadok = 0;
}
$required = array("sp_name","sp_email","sp_dob","sp_designation","sp_company","sp_linkedin","sp_mobile","sp_address","sp_about","sp_profile_image");
$msg = "unknown error";
$status = "failed";
$status="success";

foreach($required as $field){
    if($_POST[$field] == ""){
        $status = "fail";
    }
}
if($uploadok == 0){
    $msg = "file is not uploaded";
    $status = "failed";
}
else{
    if(($status === "success") && (move_uploaded_file($_FILES["profile_pic"]["tmp_name"],$target_file))){
        $sp_name = $_POST["sp_name"];
        $sp_email = $_POST["sp_email"];
        $sp_dob = $_POST["sp_dob"];
        $sp_designation = $_POST["sp_designation"];
        $sp_company = $_POST["sp_company"];
        $sp_linkedin = $_POST["sp_linkedin"];
        $sp_mobile = $_POST["sp_mobile"];
        $sp_address = $_POST["sp_address"];
        $sp_about = $_POST["sp_about"];
        $sp_profile_image = "http://localhost/project/uploaded_profile_pic/".$profile_pic_name;   
    $sql = "INSERT INTO stud_profile(sp_name,sp_email,sp_dob,sp_designation,sp_company,sp_linkedin,sp_mobile,sp_address,sp_about,sp_profile_image) values('$sp_name','$sp_email','$sp_dob','$sp_designation','$sp_company','$sp_linkedin','$sp_mobile','$sp_address','$sp_about','$sp_profile_image')";

        if(mysqli_query($mysqli, $sql)){
            //$msg = $c_suggestions;
            $msg = 'record insterted successfully';
            $status = "success";
        }
        else{
            //$msg = $sql;
            $msg = "failed to insert ";
            $status="fail";
        }
}
else{
    //$msg = "1 - ".$_POST["c_name"]." 2 - ".$_POST["c_designation"]." 3 - ".$_POST["c_jobtype"]." 4 - ".$_POST["c_location"]." 5 - ".$_POST["c_experience"]." 6 - ".$_POST["c_salary"]." 7 - ".$_POST["company_logo_image_name"]." 8 - ".$_POST["c_suggestions"];
    $msg = "File upload failed.".$sp_name;
    $status="fail";
}
}
$response = array('status' => $status , 'message' => $msg);
echo json_encode($response);
mysqli_close($mysqli);

?> 