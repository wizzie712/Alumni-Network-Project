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

$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata);
    $faculty_name = trim($request->faculty_name);
    $fp_email = mysqli_real_escape_string($mysqli, trim($request->fp_email));
    $faculty_dept = trim($request->fp_dept);
    $faculty_designation = mysqli_real_escape_string($mysqli, trim($request->fp_designation));
    $fp_linkedin = mysqli_real_escape_string($mysqli, trim($request->fp_linkedin));
    $faculty_aoi = mysqli_real_escape_string($mysqli, trim($request->fp_aoi));

    // Update faculty_name in faculty_creds table
    $sql_creds = "UPDATE faculty_creds SET faculty_name = '$faculty_name' WHERE faculty_email = '$fp_email'";

    // Update fp_dept, fp_designation, fp_linkedin, fp_aoi in faculty_profile table
    $sql_profile = "UPDATE faculty_profile SET fp_dept = '$faculty_dept', fp_designation = '$faculty_designation', fp_linkedin = '$fp_linkedin', fp_aoi = '$faculty_aoi' WHERE fp_email = '$fp_email'";

    // Perform both updates in a transaction
    mysqli_begin_transaction($mysqli);

    try {
        mysqli_query($mysqli, $sql_creds);
        mysqli_query($mysqli, $sql_profile);
        mysqli_commit($mysqli);

        $authdata = [
            'faculty_name' => $faculty_name,
            'fp_email' => $fp_email,
            'fp_dept' => $faculty_dept,
            'fp_designation' => $faculty_designation,
            'fp_linkedin' => $fp_linkedin,
            'fp_aoi' => $faculty_aoi
        ];
        echo json_encode($authdata);
    } catch (Exception $e) {
        mysqli_rollback($mysqli);
        echo "Error updating record: " . $e->getMessage();
    }
}
?>
