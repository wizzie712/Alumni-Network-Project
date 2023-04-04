<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$db_host = 'localhost';
$db_username = 'root';
$db_password = '';
$db_name = 'alumniconnect';

// Create connection
$mysqli = mysqli_connect($db_host, $db_username, $db_password, $db_name);

// Check connection
if (!$mysqli) {
    die("Connection failed: " . mysqli_connect_error());
}

$faculty_email = mysqli_real_escape_string($mysqli, $_GET['faculty_email']);

$sql = "SELECT * FROM faculty_creds where faculty_email = '$faculty_email'";

$result = mysqli_query($mysqli, $sql);

if (mysqli_num_rows($result) > 0) {
    $rows = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $rows[] = $row;
    }
    // Return the data as a JSON object with proper structure
    $response = array(
        "success" => true,
        "data" => $rows
    );
    echo json_encode($response);
} else {
    $response = array(
        "success" => false,
        "message" => "No results found"
    );
    echo json_encode($response);
}

mysqli_close($mysqli);
?>
