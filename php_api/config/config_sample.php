<?php
header("Access-Control-Allow-Credentials: true"); 
header("Access-Control-Allow-Origin: http://localhost:3000"); // allow requests from localhost:3000

// add system path to your pictures, and where you want thumbnails to be generated
define('THUMB_PATH', './thumb/');
define('IMAGE_PATH', '/home/example/');

// if you want you can turn off simple login, and implement your own security check
// security script gets executed before any api script
define('SECURITY_SCRIPT', './sec.php');

// ask login?
define('SIMPLE_LOGIN', false);

// login credentials
define('USERNAME', ''); 
define('PASSWORD', ''); // sha256 password

/*
    Get your sha256 password hash here:
    https://emn178.github.io/online-tools/sha256.html
*/

// thumbnail width and height
define('T_HEIGHT',  100);
define('T_WIDTH',   100);


?>
