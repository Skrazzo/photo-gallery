<?php

include './config/config.php';
include SECURITY_SCRIPT;

// Function to recursively scan a directory and retrieve image file names
function getImages($sourcePath)
{
    // Check if the sourcePath directory exists
    if (!is_dir($sourcePath)) {
        die("Error: Source directory not found.\n");
    }

    $imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    $images = array();

    // Get a list of all files and directories in the sourcePath
    $dirIterator = new RecursiveDirectoryIterator($sourcePath, RecursiveDirectoryIterator::SKIP_DOTS);
    $iterator = new RecursiveIteratorIterator($dirIterator, RecursiveIteratorIterator::SELF_FIRST);

    // Loop through each file/directory in the sourcePath
    foreach ($iterator as $file) {
        $sourceFilePath = $file->getPathname();

        // Check if the current item is a file
        if ($file->isFile()) {
            // Check if the file has an image extension
            $ext = strtolower(pathinfo($sourceFilePath, PATHINFO_EXTENSION));
            if (in_array($ext, $imageExtensions)) {
                // Add the image file name to the data array
                $images[] = $file->getFilename();
            }
        }
    }

    return $images;
}

// Function to check for differences in directories
function compareDirectories($path1, $path2)
{
    $images1 = getImages($path1);
    $images2 = getImages($path2);

    // Convert the arrays to lowercase for case-insensitive comparison
    $lowercaseImages1 = array_map('strtolower', $images1);
    $lowercaseImages2 = array_map('strtolower', $images2);

    // Check for image files in the first directory that don't exist in the second directory
    $missingImagesIn2 = array_diff($lowercaseImages1, $lowercaseImages2);

    // Check for image files in the second directory that don't exist in the first directory
    $missingImagesIn1 = array_diff($lowercaseImages2, $lowercaseImages1);

    // If there are missing image files in either directory, return true
    if (!empty($missingImagesIn1) || !empty($missingImagesIn2)) {
        return true;
    } else {
        return false;
    }
}

// Request handler
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Compare the directories
    $differencesExist = compareDirectories(IMAGE_PATH, THUMB_PATH);

    // Prepare the response as JSON
    header('Content-Type: application/json');
    echo json_encode($differencesExist);
} else {
    // Return an error response for unsupported methods
    http_response_code(405);
    echo json_encode(array('error' => 'Method Not Allowed'));
}
?>
