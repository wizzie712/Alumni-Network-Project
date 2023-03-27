<?php
header('Access-Control-Allow-Origin: *');

$db_host = 'localhost';
$db_username = 'root';
$db_password = '';
$db_name = 'alumniconnect';
$mysqli = mysqli_connect($db_host, $db_username, $db_password, $db_name);

if (mysqli_connect_errno()) {
    die('Error : ('. mysqli_connect_errno() .') '. mysqli_connect_error());
}

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)){
    $request = json_decode($postdata);
    $stud_name = trim($request->stud_name);
    $stud_password = mysqli_real_escape_string($mysqli, trim($request->stud_password));
    $stud_email = mysqli_real_escape_string($mysqli, trim($request->stud_email));
    $stud_gender = mysqli_real_escape_string($mysqli, trim($request->stud_gender));
    $stud_batch = mysqli_real_escape_string($mysqli, trim($request->stud_batch));

    $sql = "UPDATE stud_register SET stud_name = '$stud_name', stud_password = '$stud_password', stud_gender = '$stud_gender', stud_batch = '$stud_batch' WHERE stud_email = '$stud_email'";

    if (mysqli_query($mysqli, $sql)) {
        $authdata = [
            'stud_name'=> $stud_name,
            'stud_password' => $stud_password,
            'stud_email' => $stud_email,
            'stud_gender' => $stud_gender,
            'stud_batch' => $stud_batch
        ];
        echo json_encode($authdata);
    } else {
        echo "Error updating record: " . mysqli_error($mysqli);
    }
}
?>