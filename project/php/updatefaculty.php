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

if(isset($postdata) && !empty($postdata)){
    $request = json_decode($postdata);
    $faculty_name = trim($request->faculty_name);
    $faculty_email = mysqli_real_escape_string($mysqli, trim($request->faculty_email));
    $faculty_dept = mysqli_real_escape_string($mysqli, trim($request->$faculty_dept));
    $faculty_qualification = mysqli_real_escape_string($mysqli, trim($request->faculty_qualification));
    $faculty_designation = mysqli_real_escape_string($mysqli, trim($request->faculty_designation));
    $faculty_password = mysqli_real_escape_string($mysqli, trim($request->faculty_password));
    $faculty_aoi = mysqli_real_escape_string($mysqli, trim($request->faculty_aoi));

    $sql = "UPDATE faculty_creds SET faculty_name = '$faculty_name', faculty_email = '$faculty_email',faculty_dept = ' $faculty_dept',faculty_qualification = ' $faculty_qualification',faculty_designation = '$faculty_designation', faculty_password = '$faculty_password', faculty_aoi = '$faculty_aoi' WHERE faculty_email = '$faculty_email'";

    if (mysqli_query($mysqli, $sql)) {
        $authdata = [
            'faculty_name'=> $faculty_name,
            'faculty_email' => $faculty_email,
            'faculty_dept' => $faculty_dept,
            'faculty_qualification' => $faculty_qualification,
            'faculty_designation' => $faculty_designation,
            'faculty_password' => $faculty_password,
            'faculty_aoi' => $faculty_aoi
        ];
        echo json_encode($authdata);
    } else {
        echo "Error updating record: " . mysqli_error($mysqli);
    }
}
?>