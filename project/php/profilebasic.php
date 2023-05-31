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

$required = array("sp_email", "sp_dob", "sp_location", "sp_designation", "sp_company", "sp_linkedin", "sp_mobile");
$msg = "unknown error";
$status = "success";

foreach ($required as $field) {
    if ($_POST[$field] == "") {
        $status = "fail";
    }
}

if ($status === "success") {
    $stud_name = $_POST["sp_name"];
    $sp_email = $_POST["sp_email"];
    $sp_dob = $_POST["sp_dob"];
    $sp_location = $_POST["sp_location"];
    $sp_designation = $_POST["sp_designation"];
    $sp_company = $_POST["sp_company"];
    $sp_linkedin = $_POST["sp_linkedin"];
    $sp_mobile = $_POST["sp_mobile"];
  
    // Check if the record already exists with the same email
    $existingRecordQuery = "SELECT * FROM stud_profile WHERE sp_email = '$sp_email'";
    $existingRecordResult = mysqli_query($mysqli, $existingRecordQuery);

    if (mysqli_num_rows($existingRecordResult) > 0) {
        // Update the existing record
        $updateQuery = "UPDATE stud_profile SET sp_dob = '$sp_dob', sp_location = '$sp_location', sp_designation = '$sp_designation', sp_company = '$sp_company', sp_linkedin = '$sp_linkedin', sp_mobile = '$sp_mobile' WHERE sp_email = '$sp_email'";
        if (mysqli_query($mysqli, $updateQuery)) {
            $msg = 'Record updated successfully';
            $status = "success";

            // Update sp_name in stud_register table
            $updateNameQuery = "UPDATE stud_register SET stud_name = '$stud_name' WHERE stud_email = '$sp_email'";
            if (mysqli_query($mysqli, $updateNameQuery)) {
                $msg .= ' and sp_name updated in stud_register table';
            } else {
                $msg .= ' but failed to update sp_name in stud_register table';
            }
        } else {
            $msg = "Failed to update record";
            $status = "fail";
        }
    } else {
        // Insert a new record
        $insertQuery = "INSERT INTO stud_profile(sp_email, sp_dob, sp_location, sp_designation, sp_company, sp_linkedin, sp_mobile) VALUES ('$sp_email', '$sp_dob', '$sp_location', '$sp_designation', '$sp_company', '$sp_linkedin', '$sp_mobile')";
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
