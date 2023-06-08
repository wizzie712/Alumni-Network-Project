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
    die('Error: Failed to connect to the database');
}

$faculty_email = mysqli_real_escape_string($mysqli, $_GET['faculty_email']);

// Delete records from faculty_creds table
$sql_creds = "DELETE FROM faculty_creds WHERE faculty_email = '$faculty_email'";

// Delete records from faculty_profile table
$sql_profile = "DELETE FROM faculty_profile WHERE fp_email = '$faculty_email'";

// Perform both deletions in a transaction
mysqli_begin_transaction($mysqli);

try {
    mysqli_query($mysqli, $sql_creds);
    mysqli_query($mysqli, $sql_profile);
    mysqli_commit($mysqli);

    $authdata = [
        "success" => true,
        "message" => "User records deleted successfully"
    ];
    echo json_encode($authdata);
} catch (Exception $e) {
    mysqli_rollback($mysqli);
    echo "Error deleting records: " . $e->getMessage();
}

mysqli_close($mysqli);
?>
