<?php
header('Access-Control-Allow-Origin: *');
include_once("database.php");
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    if(isset($postdata) && !empty($postdata))
    {
        $faculty_password= mysqli_real_escape_string($mysqli, trim($request->$faculty_password));
        $faculty_email = mysqli_real_escape_string($mysqli, trim($request->faculty_email));
        $sql = "SELECT * FROM faculty_creds where faculty_email='$faculty_email' and faculty_password='$faculty_password'";
        if($result = mysqli_query($mysqli,$sql))
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
?>