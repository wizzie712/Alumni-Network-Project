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

$target_dir = "../uploaded_notice_files/";
$mysqli = mysqli_connect($db_host, $db_username, $db_password, $db_name);

if (mysqli_connect_errno()) {
    die('Error: ('. mysqli_connect_errno() .') '. mysqli_connect_error());
}

$notice_info = isset($_POST["notice_info"]) ? $_POST["notice_info"] : '';
$notice_link = '';

$msg = "Unknown error in notice upload";
$status = "fail";

$update_fields = "";

if (isset($_FILES['notice_link'])) {
    // Code to handle when the 'notice_link' parameter is set

    // For example, if you want to check if it is null:
    if ($_FILES['notice_link']['error'] === UPLOAD_ERR_NO_FILE) {
        $response = array('status' => 'fail', 'message' => 'The notice file is not set.');
        echo json_encode($response);
        exit; // Stop further execution
    }

    // Continue processing the file
    $notice_name = basename($_FILES['notice_link']['name']);
    $target_file = $target_dir . $notice_name;
    $uploadok = 1;
    $notice_file_type = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    if (file_exists($target_file)) {
        unlink($target_file);
    }

    if ($_FILES['notice_link']['size'] > 500000) {
        $msg = 'Sorry, the file is too large. Please try again with a smaller file.';
        $status = "fail";
        $uploadok = 0;
    }

    $allowed_notice_types = array("pdf");
    if (!in_array($notice_file_type, $allowed_notice_types)) {
        $msg = 'Sorry, only PDF files are allowed.';
        $status = "fail";
        $uploadok = 0;
    }

    if ($uploadok == 0) {
        $response = array('status' => $status, 'message' => $msg);
        echo json_encode($response);
        exit; // Stop further execution
    }

    if (move_uploaded_file($_FILES["notice_link"]["tmp_name"], $target_file)) {
        $notice_link = "http://localhost/project/uploaded_notice_files/" . $notice_name;
        $update_fields .= "notice_link = '$notice_link'";
    }
}

if (!empty($notice_info) && !empty($update_fields)) {
    $table_name = "notices";
    $sql = "INSERT INTO $table_name (notice_info, notice_link) VALUES ('$notice_info', '$notice_link')";

    if (mysqli_query($mysqli, $sql)) {
        $msg = 'Notice added successfully';
        $status = "success";
    } else {
        $msg = "Failed to add notice: " . mysqli_error($mysqli);
        $status = "fail";
    }
}

$response = array('status' => $status, 'message' => $msg);
echo json_encode($response);
mysqli_close($mysqli);
?>
