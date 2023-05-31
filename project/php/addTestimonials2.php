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
    die('Error: ('. mysqli_connect_errno() .') '. mysqli_connect_error());
}

$required = array("sp_email","stud_testimonial","stud_date");
$msg = "unknown error";
$status = "success";

foreach ($required as $field) {
    if (empty($_POST[$field])) {
        $status = "fail";
    }
}

if (empty($_POST["sp_email"])) {
    $status = "fail";
}
if ($status === "success") {
    $sp_email = $_POST["sp_email"];
    $stud_testimonial = $_POST["stud_testimonial"];
    $stud_date = date('Y-m-d'); // Get the current date

    // Retrieve sp_email from stud_profile table based on a condition
    $selectQuery = "SELECT sp_email FROM stud_profile WHERE sp_email = '$sp_email'";
    $result = mysqli_query($mysqli, $selectQuery);
    if ($result && mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        $sp_email = $row['sp_email'];

        // Insert the data into stud_guidance table
        $insertQuery = "INSERT INTO stud_guidance(sp_email, stud_testimonial, stud_date) VALUES ('$sp_email', '$stud_testimonial', '$stud_date')";
        if (mysqli_query($mysqli, $insertQuery)) {
            $msg = 'Record inserted successfully';
            $status = "success";
        } else {
            $msg = "Failed to insert record";
            $status = "fail";
        }
    } else {
        $msg = "No data found in stud_profile";
        $status = "fail";
    }
} else {
    $msg = "Received empty data";
    $status = "fail";
}

$response = array('status' => $status, 'message' => $msg);
echo json_encode($response);
mysqli_close($mysqli);
?>
