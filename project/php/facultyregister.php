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

$mysqli = mysqli_connect($db_host, $db_username, $db_password, $db_name);

if (mysqli_connect_errno()) {
    die('Error : ('. mysqli_connect_errno() .') '. mysqli_connect_error());
}

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata);
    $faculty_email = mysqli_real_escape_string($mysqli, trim($request->faculty_email));
    $faculty_password = mysqli_real_escape_string($mysqli, trim($request->faculty_password));

    $sql = "INSERT INTO faculty_creds(faculty_email,faculty_password) VALUES ('$faculty_email','$faculty_password')";
    
    if (mysqli_query($mysqli, $sql)) {
        $authdata = [
            'faculty_email' => $faculty_email,
            'faculty_password' => $faculty_password
        ];
        echo json_encode($authdata);
    }
}

mysqli_close($mysqli);
?>
