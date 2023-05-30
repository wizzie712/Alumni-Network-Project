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
    die('Error: (' . mysqli_connect_errno() . ') ' . mysqli_connect_error());
}

$status = "success";

if (empty($_POST["email"])) {
    $status = "fail";
}

if ($status === "success") {
    $email = $_POST["email"];
    $stmt = mysqli_prepare($mysqli, "SELECT sp.*, sr.* FROM stud_profile sp JOIN stud_register sr ON sp.sp_email = sr.stud_email WHERE sp.sp_email = ?");
    mysqli_stmt_bind_param($stmt, "s", $email);
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

    echo json_encode($response, JSON_UNESCAPED_UNICODE); // Add JSON_UNESCAPED_UNICODE flag to preserve non-ASCII characters
}

mysqli_close($mysqli);
?>
