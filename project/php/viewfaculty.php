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

if (!$mysqli) {
  die('Error : ('. mysqli_connect_errno() .') '. mysqli_connect_error());
}

// Query the database to retrieve data from both tables
$sql = "SELECT fc.faculty_name, fc.faculty_email, COALESCE(fp.fp_email, '') AS fp_email, COALESCE(fp.fp_dept, '') AS fp_dept, COALESCE(fp.fp_designation, '') AS fp_designation, COALESCE(fp.fp_aoi, '') AS fp_aoi FROM faculty_creds fc LEFT JOIN faculty_profile fp ON fc.faculty_email = fp.fp_email";
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
  echo "No results found.";
}

// Close the database connection
mysqli_close($mysqli);
?>
