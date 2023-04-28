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

$target_dir = "../uploaded_company_logo/";
$mysqli = mysqli_connect($db_host, $db_username, $db_password, $db_name);

if (mysqli_connect_errno()) {
    die('Error : ('. mysqli_connect_errno() .') '. mysqli_connect_error());
}

$company_image = basename($_FILES['company_image']['name']);
$target_file = $target_dir . $company_image;
$uploadok = 1;
$image_file_type = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

if(file_exists($target_file)){
    $msg = 'sorry, file already exists';
    $uploadok = 0;
}

if($_FILES['company_logo_file']['size'] > 500000){
    $msg = 'sorry, file too large';
    $uploadok = 0;
}

if($image_file_type != "jpg" && $image_file_type != "jpeg" && $image_file_type != "png" && $image_file_type != "gif"){
    $msg = 'sorry, only jpg, jpeg, png and gif allowed';
    $uploadok = 0;
}

if($uploadok == 0){
    $msg = "file is not uploaded";
}
else{
    if(move_uploaded_file($_FILES["company_logo_file"]["tmp_name"],$target_file)){
        $company_name = $_POST["company_name"];
        $sql = "INSERT INTO imagetest(company_name, company_image) VALUES ('$company_name','$company_logo_name')";
        
        if(mysqli_query($mysqli, $sql)){
            $msg = "File uploaded successfully.";
        }
        else{
            $msg = "File upload failed.";
        }
    }
}
mysqli_close($mysqli);

echo json_encode(array("message" => $msg));
?>
