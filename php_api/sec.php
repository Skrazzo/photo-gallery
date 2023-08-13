<?php

// Check the session status
$sessionStatus = session_status();

if(SIMPLE_LOGIN){
    if ($sessionStatus === PHP_SESSION_ACTIVE) {
        echo "A session is already active.";
        die();
    } elseif ($sessionStatus === PHP_SESSION_NONE) {
        // Start a new session
        session_start();
        
    } else {
        echo "Sessions are disabled.";
        die();
    }


    if(!isset($_SESSION['PhotoGallery']) && !isset($_SESSION['PhotoGallery']['logged_in'])){
        http_response_code(403);
        die();
    }

    if($_SESSION['PhotoGallery']['logged_in'] != true){
        http_response_code(403);
        die();
    }    
}



?>