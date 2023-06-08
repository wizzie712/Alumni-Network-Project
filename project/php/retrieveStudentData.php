<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=UTF-8');

$db_host = 'localhost';
$db_username = 'root';
$db_password = '';
$db_name = 'alumniconnect';

$mysqli = mysqli_connect($db_host, $db_username, $db_password, $db_name);

if (mysqli_connect_errno()) {
    die('Error: (' . mysqli_connect_errno() . ') ' . mysqli_connect_error());
}

$status = "success";

$stmt = mysqli_prepare($mysqli, "SELECT sp.sp_linkedin, sp.sp_designation, sp.sp_profile_image, sr.stud_name FROM stud_profile sp JOIN stud_register sr ON sp.sp_email = sr.stud_email");
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

if (mysqli_num_rows($result) > 0) {
    $rows = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $rows[] = $row;
    }

    $response = array(
        "success" => $status,
        "data" => $rows
    );
} else {
    $status = "fail";
    $response = array(
        "success" => $status,
        "message" => "No results found"
    );
}

mysqli_close($mysqli);

echo json_encode($response);
?>
