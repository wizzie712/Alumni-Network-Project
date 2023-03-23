<?php
header('Access-Control-Allow-Origin: *');
include_once("database.php");
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    if(isset($postdata) && !empty($postdata))
    {
        $stud_password = mysqli_real_escape_string($mysqli, trim($request->stud_password));
        $stud_email = mysqli_real_escape_string($mysqli, trim($request->stud_email));
        $sql = "SELECT * FROM stud_register where stud_email='$stud_email' and stud_password='$stud_password'";
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