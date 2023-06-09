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

$required = array("email", "testimonial");

foreach ($required as $field) {
    if (empty($_POST[$field])) {
        $response = array('status' => 'fail', 'message' => 'Required field is missing');
        echo json_encode($response);
        exit();
    }
}

$email = $_POST["email"];
$testimonial = $_POST["testimonial"];
$date = date('Y-m-d'); // Get the current date

// Check if the email belongs to stud_profile or faculty_profile
$selectQuery = "SELECT * FROM stud_profile WHERE sp_email = '$email'";
$result = mysqli_query($mysqli, $selectQuery);
if ($result && mysqli_num_rows($result) > 0) {
    // Email belongs to stud_profile
    $insertQuery = "INSERT INTO stud_guidance(stud_email, stud_testimonial, stud_date) VALUES ('$email', '$testimonial', '$date')";
    $table = "stud_guidance";
} else {
    $selectQuery = "SELECT * FROM faculty_profile WHERE fp_email = '$email'";
    $result = mysqli_query($mysqli, $selectQuery);
    if ($result && mysqli_num_rows($result) > 0) {
        // Email belongs to faculty_profile
        $insertQuery = "INSERT INTO faculty_guidance(faculty_email, faculty_testimonial, faculty_date) VALUES ('$email', '$testimonial', '$date')";
        $table = "faculty_guidance";
    } else {
        $response = array('status' => 'fail', 'message' => 'Email not found in stud_profile or faculty_profile');
        echo json_encode($response);
        exit();
    }
}

// Insert the data into the respective table
if (mysqli_query($mysqli, $insertQuery)) {
    $response = array('status' => 'success', 'message' => 'Record inserted successfully in ' . $table);
    echo json_encode($response);
} else {
    $response = array('status' => 'fail', 'message' => 'Failed to insert record: ' . mysqli_error($mysqli));
    echo json_encode($response);
}

mysqli_close($mysqli);

?>
