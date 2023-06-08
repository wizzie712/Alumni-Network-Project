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

//$target_dir = "../uploaded_company_logo/";
$mysqli = mysqli_connect($db_host, $db_username, $db_password, $db_name);

if (mysqli_connect_errno()) {
    die('Error: ('. mysqli_connect_errno() .') '. mysqli_connect_error());
}

$required = array("fp_email", "fp_mobile", "fp_dob", "fp_aoi", "fp_linkedin", "fp_designation", "fp_dept");
$msg = "unknown error";
$status = "success";

foreach ($required as $field) {
    if ($_POST[$field] == "") {
        $status = "fail";
    }
}

if ($status === "success") {
    $faculty_name = $_POST["faculty_name"];
    $fp_email = $_POST["fp_email"];
    $fp_mobile = $_POST["fp_mobile"];
    $fp_dob = $_POST["fp_dob"];
    $fp_aoi = $_POST["fp_aoi"];
    $fp_linkedin = $_POST["fp_linkedin"];
    $fp_designation = $_POST["fp_designation"];
    $fp_dept = $_POST["fp_dept"];
  
    // Check if the record already exists with the same email
    $existingRecordQuery = "SELECT * FROM faculty_profile WHERE fp_email = '$fp_email'";
    $existingRecordResult = mysqli_query($mysqli, $existingRecordQuery);

    if (mysqli_num_rows($existingRecordResult) > 0) {
        // Update the existing record
        $updateQuery = "UPDATE faculty_profile SET fp_mobile = '$fp_mobile', fp_dob = '$fp_dob', fp_aoi = '$fp_aoi', fp_linkedin = '$fp_linkedin', fp_designation = '$fp_designation',  fp_dept = '$fp_dept' WHERE fp_email = '$fp_email'";
        if (mysqli_query($mysqli, $updateQuery)) {
            $msg = 'Record updated successfully';
            $status = "success";

            // Update fp_name in Faculty_creds table
            $updateNameQuery = "UPDATE faculty_creds SET faculty_name = '$faculty_name' WHERE faculty_email = '$fp_email'";
            if (mysqli_query($mysqli, $updateNameQuery)) {
                $msg .= ' and faculty_name updated in faculty_creds table';
            } else {
                $msg .= ' but failed to update faculty_name in faculty_creds table';
            }
        } else {
            $msg = "Failed to update record";
            $status = "fail";
        }
    } else {
        // Insert a new record
        $insertQuery = "INSERT INTO faculty_profile(fp_email, fp_mobile, fp_dob, fp_aoi, fp_linkedin, fp_designation, fp_dept) VALUES ('$fp_email', '$fp_mobile', '$fp_dob', '$fp_aoi', '$fp_linkedin', '$fp_designation', '$fp_dept')";
        if (mysqli_query($mysqli, $insertQuery)) {
            $msg = 'Record inserted successfully';
            $status = "success";
        } else {
            $msg = "Failed to insert record";
            $status = "fail";
        }
    }
} else {
    $msg = "Received empty data";
    $status = "fail";
}

$response = array('status' => $status, 'message' => $msg);
echo json_encode($response);
mysqli_close($mysqli);
?>