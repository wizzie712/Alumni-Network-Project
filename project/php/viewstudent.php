<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$db_host = 'localhost';
$db_username = 'root';
$db_password = '';
$db_name = 'alumniconnect';
$mysqli = mysqli_connect($db_host, $db_username, $db_password, $db_name);

if (!$mysqli) {
  die('Error : ('. mysqli_connect_errno() .') '. mysqli_connect_error());
}

// Query the database to retrieve all data from a table
$sql = "SELECT * FROM stud_register";
$result = mysqli_query($mysqli, $sql);

// Check if there are any results
if (mysqli_num_rows($result) > 0) {
  // Convert the result set to an array of objects
  $rows = array();
  while ($row = mysqli_fetch_assoc($result)) {
    $rows[] = $row;
  }
  // Return the data as a JSON object
  echo json_encode($rows);
  //print_r($rows);
} else {
  //echo "No results found.";
}

// Close the database connection
mysqli_close($mysqli);
?>