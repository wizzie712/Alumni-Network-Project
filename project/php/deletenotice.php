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

$notice_id = $_GET['notice_id']; // Retrieve the notice_id from the query parameters or request body

// Prepare and execute the DELETE query
$stmt = mysqli_prepare($mysqli, "DELETE FROM notices WHERE notice_id = ?");
mysqli_stmt_bind_param($stmt, "i", $notice_id);
mysqli_stmt_execute($stmt);

if (mysqli_stmt_affected_rows($stmt) > 0) {
    echo json_encode(['message' => 'Notice deleted successfully']);
} else {
    echo json_encode(['message' => 'No notice found with the specified ID']);
}

mysqli_stmt_close($stmt);
mysqli_close($mysqli);
?>
