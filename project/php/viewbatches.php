<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

// Database connection parameters
$db_host = 'localhost';
$db_username = 'root';
$db_password = '';
$db_name = 'alumniconnect';

// Connect to the database
$mysqli = mysqli_connect($db_host, $db_username, $db_password, $db_name);

// Check if the connection was successful
if (!$mysqli) {
    die('Error : ('. mysqli_connect_errno() .') '. mysqli_connect_error());
}

// Query the database to retrieve all data from a table
$sql = "SELECT stud_batch, COUNT(*) as batch_count FROM stud_register GROUP BY stud_batch ORDER BY stud_batch ASC";

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
} else {
  //echo "No results found.";
}
// Close the database connection
mysqli_close($mysqli);
?>
