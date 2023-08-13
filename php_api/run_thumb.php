<?php

include './config/config.php';
include SECURITY_SCRIPT;

system('php make_thumb.php');

echo '<br>All done!';
?>