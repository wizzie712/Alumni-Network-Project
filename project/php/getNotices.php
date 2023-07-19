<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');

$db_host = 'localhost';
$db_username = 'root';
$db_password = '';
$db_name = 'alumniconnect';

$mysqli = mysqli_connect($db_host, $db_username, $db_password, $db_name);

if (mysqli_connect_errno()) {
    die('Error: (' . mysqli_connect_errno() . ') ' . mysqli_connect_error());
}

$result = mysqli_query($mysqli, "SELECT notice_id, notice_info, notice_link FROM notices");

if ($result) {
    $notices = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $notices[] = $row;
    }

    echo json_encode($notices);
} else {
    echo json_encode([]);
}

mysqli_close($mysqli);
?>
