<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$db_host = 'localhost';
$db_username = 'root';
$db_password = '';
$db_name = 'alumniconnect';

$mysqli = mysqli_connect($db_host, $db_username, $db_password, $db_name);

if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}

$stud_email = $_GET['stud_email'];

$sql = "SELECT * FROM stud_register where stud_email = '$stud_email'";
$result = $mysqli->query($sql);

if ($result->num_rows > 0) {
  $rows = array();
  while ($row = $result->fetch_assoc()) {
    $rows[] = $row;
  }
  // Return the data as a JSON object with proper structure
  $response = array(
    "success" => true,
    "data" => $rows
  );
  echo json_encode($response);
} else {
  $response = array(
    "success" => false,
    "message" => "No results found"
  );
  echo json_encode($response);
}

$mysqli->close();
?>