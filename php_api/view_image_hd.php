<?php

include './config/config.php';
include SECURITY_SCRIPT;

if(isset($_GET['path'])) {
    // Sanitize the input to prevent directory traversal attacks
    $imagePath = str_replace('../', '', $_GET['path']);

    // Combine directory path and image file name
    $fullImagePath = IMAGE_PATH . $imagePath;

    // Check if the file exists
    if (file_exists($fullImagePath)) {
        // Get the MIME type of the image
        $mime = mime_content_type($fullImagePath);
        
        // Set the appropriate Content-Type header
        header("Content-Type: $mime");
        
        // Output the image content
        readfile($fullImagePath);
    } else {
        // Image not found, you can display a placeholder or error message
        echo "Image not found.";
    }
} else {
    // No 'path' parameter provided in the URL
    echo "Image path not specified.";
}

?>