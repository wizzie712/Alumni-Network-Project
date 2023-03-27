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
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

if(isset($postdata) && !empty($postdata))
{
    $faculty_password = mysqli_real_escape_string($mysqli, trim($request->faculty_password));
    $faculty_email = mysqli_real_escape_string($mysqli, trim($request->faculty_email));
    $sql = "SELECT * FROM faculty_creds WHERE faculty_email='$faculty_email' AND faculty_password='$faculty_password'";

    $result = mysqli_query($mysqli, $sql);

    if($result)
    {
        $rows = array();
        while($row = mysqli_fetch_assoc($result))
        {
            $rows[] = $row;
        }
        echo json_encode($rows); 
    }
    else
    {
        http_response_code(404);
    }
}

mysqli_close($mysqli);
?>
