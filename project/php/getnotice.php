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
    die('Error: (' . mysqli_connect_errno() . ') ' . mysqli_connect_error());
}

if (isset($_GET['id'])) {
    $notice_id = $_GET['id'];

    $table_name = "notices";
    $sql = "SELECT * FROM $table_name WHERE notice_id = '$notice_id'";

    $result = mysqli_query($mysqli, $sql);
    if ($result) {
        $row = mysqli_fetch_assoc($result);
        $response = array('status' => 'success', 'notice_info' => $row['notice_info']);
    } else {
        $response = array('status' => 'fail', 'message' => 'Failed to fetch notice details.');
    }
} else {
    $response = array('status' => 'fail', 'message' => 'Notice ID not provided.');
}

echo json_encode($response);
mysqli_close($mysqli);
?>
