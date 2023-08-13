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

        // Load the image
        $image = imagecreatefromstring(file_get_contents($fullImagePath));

        // Get original dimensions
        $width = imagesx($image);
        $height = imagesy($image);

        // Create a new image with reduced quality (50%)
        $newWidth = $width / 2;
        $newHeight = $height / 2;
        $newImage = imagecreatetruecolor($newWidth, $newHeight);
        imagecopyresampled($newImage, $image, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);

        // Output the new image
        header("Content-Type: $mime");
        imagejpeg($newImage, null, 50); // 50% quality
        imagedestroy($newImage);
    } else {
        // Image not found, you can display a placeholder or error message
        echo "Image not found.";
    }
} else {
    // No 'path' parameter provided in the URL
    echo "Image path not specified.";
}
?>
