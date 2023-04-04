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
  die('Error: Failed to connect to database');
}

$faculty_email = $_GET['faculty_email'];

$sql = "DELETE FROM faculty_creds where faculty_email = '$faculty_email'";
if (mysqli_query($mysqli, $sql)) {
    $authdata = [
        "success" => true,
        "message" => "User record deleted successfully"
    ];
    echo json_encode($authdata);
} else {
    echo "Error deleting record: " . mysqli_error($mysqli);
}

mysqli_close($mysqli);
?>