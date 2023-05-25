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
    die('Error : ('. mysqli_connect_errno() .') '. mysqli_connect_error());
}

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if(isset($postdata) && !empty($postdata)) {
    $c_name =trim($request->c_name);
    $c_designation = trim($request->c_designation);
    $c_jobtype =  trim($request->c_jobtype);
    $c_location = trim($request->c_location);
    $c_experience =  trim($request->c_experience);
    $c_salary = trim($request->c_salary);
    $c_suggestions =  trim($request->c_suggestions);
        $c_name = $_POST["c_name"];
        $c_designation = $_POST["c_designation"];
        $c_jobtype = $_POST["c_jobtype"];
        $c_location = $_POST["c_location"];
        $c_experience= $_POST["c_experience"];
        $c_salary = $_POST["c_salary"];
        $c_suggestions = $_POST["c_suggestions"];
    
        $sql = "INSERT INTO postjob(c_name, c_designation,c_jobtype, c_location, c_experience, c_salary, c_suggestions)";

        mysqli_query($mysqli, $sql);

}
mysqli_close($mysqli);
?> 