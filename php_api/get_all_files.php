<?php

include './config/config.php';
include SECURITY_SCRIPT;

// Function to recursively scan the IMAGE_PATH and retrieve image paths
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

        $sourceFilePath = $sourcePath . $file;
        if ($sourcePath[-1] != '\\' && $sourcePath[-1] != '/') {
            $sourceFilePath = $sourcePath . '/' . $file;
        }

        // Check if the current item is a directory
        if (is_dir($sourceFilePath)) {
            // Recursively retrieve albums and images for subdirectories
            $subAlbums = getAlbumsAndImages($sourceFilePath);

            if (!empty($subAlbums)) {
                // Add the sub-albums to the current albums list
                $albums = array_merge($albums, $subAlbums);
            }
        } else {
            // Check if the file is an image (you can adjust the image extensions if needed)
            $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
            if (in_array($ext, ['jpg', 'jpeg', 'png', 'gif'])) {
                // Add the image path and last modified timestamp to the current album
                $lastModifiedTime = filemtime($sourceFilePath);
                $albums[] = array(
                    'path' => str_replace(IMAGE_PATH, '', $sourceFilePath),
                    'lastModified' => $lastModifiedTime
                );
            }
        }
    }

    // Sort the albums array based on the last modified timestamp in descending order (newest to oldest)
    usort($albums, function ($a, $b) {
        return $b['lastModified'] - $a['lastModified'];
    });

    return $albums;
}

// Request handler
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Call the function to get albums and images for the given path
    $albumsAndImages = getAlbumsAndImages(IMAGE_PATH);

    // Prepare the response as JSON
    header('Content-Type: application/json');
    echo json_encode($albumsAndImages);
} else {
    // Return an error response for unsupported methods
    http_response_code(405);
    echo json_encode(array('error' => 'Method Not Allowed'));
}
?>
