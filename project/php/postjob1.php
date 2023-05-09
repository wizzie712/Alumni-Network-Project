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
$required = array("c_name","c_designation","c_jobtype","c_location","c_experience","c_salary","c_suggestions");
$msg = "unknown error";
$status="success";

foreach($required as $field){
    if($_POST[$field] == ""){
        $status = "fail";
    }
}

if($status === "success") {
    // $request=json_decode($postdata);
    // $c_name =$trim($request->c_name);
    // $c_designation = trim($request->c_designation);
    // $c_jobtype =  trim($request->c_jobtype);
    // $c_location = trim($request->c_location);
    // $c_experience =  trim($request->c_experience);
    // $c_salary = trim($request->c_salary);
    // $c_suggestions =  trim($request->c_suggestions);
    $c_name = $_POST["c_name"];
    $c_designation = $_POST["c_designation"];
    $c_jobtype = $_POST["c_jobtype"];
    $c_location = $_POST["c_location"];
    $c_experience= $_POST["c_experience"];
    $c_salary = $_POST["c_salary"];
    $c_suggestions = $_POST["c_suggestions"];
    
    $sql = "INSERT INTO postjob(c_name, c_designation,c_jobtype, c_location, c_experience, c_salary, c_suggestions) values('$c_name','$c_designation','$c_jobtype','$c_location','$c_experience','$c_salary','$c_suggestions')";

        if(mysqli_query($mysqli, $sql)){
            //$msg = $c_suggestions;
            $msg = 'record insterted successfully';
            $status = "success";
        }
        else{
            //$msg = $sql;
            $msg = "failed to insert ";
            $status="fail";
        }
}
else{
    //$msg = "1 - ".$_POST["c_name"]." 2 - ".$_POST["c_designation"]." 3 - ".$_POST["c_jobtype"]." 4 - ".$_POST["c_location"]." 5 - ".$_POST["c_experience"]." 6 - ".$_POST["c_salary"]." 7 - ".$_POST["c_suggestions"];
    $msg = "received empty data ";
    $status="fail";
}
    
$response = array('status' => $status , 'message' => $msg);
echo json_encode($response);
mysqli_close($mysqli);
?> 