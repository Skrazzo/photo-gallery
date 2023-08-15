<?php

include './config/config.php';

header("Content-Type: application/json");
@session_start();

$logged_in = false;
if(isset($_SESSION['PhotoGallery']) && isset($_SESSION['PhotoGallery']['logged_in'])){
    if($_SESSION['PhotoGallery']['logged_in'] == true){
        $logged_in = true;
    }
}

$res = array(
    'login_req' => SIMPLE_LOGIN,
    'logged_in' => $logged_in
);

echo json_encode($res);
exit();


?>