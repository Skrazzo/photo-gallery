<?php


include './config/config.php';
include SECURITY_SCRIPT;

// Set the path for the original images
$IMAGE_PATH = IMAGE_PATH;

// Function to recursively scan the IMAGE_PATH and retrieve albums and images
function getAlbumsAndImages($sourcePath)
{
    // Check if the sourcePath directory exists
    if (!is_dir($sourcePath)) {
        die("Error: Source directory not found.\n");
    }

    $albums = array();

    // Get a list of all files and directories in the sourcePath
    $files = scandir($sourcePath);

    // Loop through each file/directory in the sourcePath
    foreach ($files as $file) {
        // Skip '.' and '..' directories
        if ($file == '.' || $file == '..') {
            continue;
        }

        $sourceFilePath = $sourcePath . '/' . $file;

        // Check if the current item is a directory
        if (is_dir($sourceFilePath)) {
            // Recursively retrieve albums and images for subdirectories
            $subAlbum = array(
                'name' => $file,
                'images' => getAlbumsAndImages($sourceFilePath)
            );

            $albums[] = $subAlbum;
        } else {
            // Check if the file is an image (you can adjust the image extensions if needed)
            $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
            if (in_array($ext, ['jpg', 'jpeg', 'png', 'gif'])) {
                // Add the image path to the current album
                $albums[] = $file;
            }
        }
    }

    return $albums;
}

// Call the function to get albums and images for the given path
$albumsAndImages = getAlbumsAndImages($IMAGE_PATH);

// Prepare the response as JSON
header('Content-Type: application/json');
echo json_encode($albumsAndImages, JSON_PRETTY_PRINT);

?>
