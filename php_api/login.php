<?php

include './config/config.php';

if(!isset($_POST['username']) || !isset($_POST['password'])){
    http_response_code(400);
    die('Incorrect information given!');
}

$hash = hash('sha256', $_POST['password']);

if($hash == PASSWORD && $_POST['username'] == USERNAME){
    @session_start();
    $_SESSION['PhotoGallery']['logged_in'] = true;
    

    die();
}

http_response_code(403);





?>