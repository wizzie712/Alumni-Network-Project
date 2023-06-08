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

$target_dir = "../uploaded_faculty_profile_photo/";
$mysqli = mysqli_connect($db_host, $db_username, $db_password, $db_name);

if (mysqli_connect_errno()) {
    die('Error: ('. mysqli_connect_errno() .') '. mysqli_connect_error());
}

$email = isset($_POST["email"]) ? $_POST["email"] : '';
// $student_name = isset($_POST["student_name"]) ? $_POST["student_name"] : '';
// $student_mini_description = isset($_POST["student_mini_description"]) ? $_POST["student_mini_description"] : '';

$msg = "unknown error";
$status = "fail";

$update_fields = "";
// if (!empty($student_name)) {
//     $update_fields .= "name = '$student_name', ";
// }
// if (!empty($student_mini_description)) {
//     $update_fields .= "mini_description = '$student_mini_description', ";
// }

if (isset($_FILES['profile_pic_file'])) {
    // Code to handle when the 'profile_pic_file' parameter is set
    // You can add your logic here

    // For example, if you want to check if it is null:
    if ($_FILES['profile_pic_file']['error'] === UPLOAD_ERR_NO_FILE) {
        $response = array('status' => 'fail', 'message' => 'The profile picture file is not set.');
        echo json_encode($response);
        exit; // Stop further execution
    }

    // Continue processing the file
    $profile_pic_name = basename($_FILES['profile_pic_file']['name']);
    $target_file = $target_dir . $email . "_" . $profile_pic_name;
    $uploadok = 1;
    $image_file_type = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    if (file_exists($target_file)) {
        unlink($target_file);
    }

    if ($_FILES['profile_pic_file']['size'] > 500000) {
        $msg = 'Sorry, the file is too large. Please try again with a smaller file.';
        $status = "fail";
        $uploadok = 0;
    }

    $allowed_image_types = array("jpg", "jpeg", "png", "gif");
    if (!in_array($image_file_type, $allowed_image_types)) {
        $msg = 'Sorry, only JPG, JPEG, PNG, and GIF files are allowed.';
        $status = "fail";
        $uploadok = 0;
    }

    if ($uploadok == 0) {
        $response = array('status' => $status, 'message' => $msg);
        echo json_encode($response);
        exit; // Stop further execution
    }

    if (move_uploaded_file($_FILES["profile_pic_file"]["tmp_name"], $target_file)) {
        $profile_pic_image_name = "http://localhost/project/uploaded_faculty_profile_photo/" . $email . "_" . $profile_pic_name;
        $update_fields .= "fp_profile_image = '$profile_pic_image_name', ";
    }
}

// Remove trailing comma and space from the update fields string
$update_fields = rtrim($update_fields, ", ");

if (!empty($update_fields)) {
    $sql = "UPDATE faculty_profile SET $update_fields WHERE fp_email = '$email'";

    if (mysqli_query($mysqli, $sql)) {
        $msg = 'Record updated successfully'. mysqli_error($mysqli);
        $status = "success";
    } else {
        $msg = "Failed to update record". mysqli_error($mysqli);
        $status = "fail";
    }
}

$msg .= mysqli_error($mysqli);
$response = array('status' => $status, 'message' => $msg);
echo json_encode($response);
mysqli_close($mysqli);
?>