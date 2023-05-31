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
    $response = array('status' => 'fail', 'message' => 'Failed to connect to the database');
    echo json_encode($response);
    exit();
}

$required = array("stud_email","stud_testimonial","stud_date");

foreach ($required as $field) {
    if (empty($_POST[$field])) {
        $response = array('status' => 'fail', 'message' => 'Required field is missing');
        echo json_encode($response);
        exit();
    }
}
$stud_email = $_POST["stud_email"];
$stud_testimonial = $_POST["stud_testimonial"];
$stud_date = date('Y-m-d'); // Get the current date

// Retrieve sp_email from stud_profile table
$selectQuery = "SELECT stud_email FROM stud_register WHERE stud_email = '$stud_email'";
$result = mysqli_query($mysqli, $selectQuery);
if ($result && mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    $stud_email = $row['stud_email'];

    // Insert the data into stud_guidance table
    $insertQuery = "INSERT INTO stud_guidance(stud_email, stud_testimonial, stud_date) VALUES ('$stud_email', '$stud_testimonial', '$stud_date')";
    if (mysqli_query($mysqli, $insertQuery)) {
        $response = array('status' => 'success', 'message' => 'Record inserted successfully');
        echo json_encode($response);
    } else {
        $response = array('status' => 'fail', 'message' => 'Failed to insert record: ' . mysqli_error($mysqli));
        echo json_encode($response);
    }
} else {
    $response = array('status' => 'fail', 'message' => 'No data found in stud_profile');
    echo json_encode($response);
}

mysqli_close($mysqli);
?>
