<?php

include './config/config.php';
//include SECURITY_SCRIPT;

// Function to recursively generate thumbnails and delete obsolete ones
function generateAndDeleteThumbnails($sourcePath, $thumbPath, $thumbnailWidth, $thumbnailHeight)
{
    // Check if the sourcePath directory exists
    if (!is_dir($sourcePath)) {
        die("Error: Source directory not found.\n");
    }

    // Create the THUMB_PATH directory if it doesn't exist
    if (!is_dir($thumbPath)) {
        mkdir($thumbPath, 0777, true);
    }

    // Get a list of all files and directories in the sourcePath
    $files = scandir($sourcePath);

    // Loop through each file/directory in the sourcePath
    foreach ($files as $file) {
        // Skip '.' and '..' directories
        if ($file == '.' || $file == '..') {
            continue;
        }

        $sourceFilePath = $sourcePath . '/' . $file;
        $thumbnailPath = $thumbPath . '/' . $file;

        // Check if the current item is a directory
        if (is_dir($sourceFilePath)) {
            // Recursively generate thumbnails for subdirectories
            generateAndDeleteThumbnails($sourceFilePath, $thumbnailPath, $thumbnailWidth, $thumbnailHeight);

            // Check if the directory is empty after deleting thumbnails
            if (count(scandir($thumbnailPath)) === 2) {
                rmdir($thumbnailPath); // Remove the empty directory
                echo "Empty directory deleted: $thumbnailPath\n";
            }
        } else {
            // Check if the file is an image (you can adjust the image extensions if needed)
            $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
            if (in_array($ext, ['jpg', 'jpeg', 'png', 'gif'])) {
                // Check if a thumbnail already exists and if it's outdated
                $sourceFileModifiedTime = filemtime($sourceFilePath);
                $thumbnailExists = is_file($thumbnailPath);
                $thumbnailModifiedTime = $thumbnailExists ? filemtime($thumbnailPath) : 0;

                if (!$thumbnailExists || $sourceFileModifiedTime > $thumbnailModifiedTime) {
                    // Generate thumbnail using ImageMagick
                    $sourceImage = new Imagick($sourceFilePath);

                    // Resize the image
                    $sourceImage->cropThumbnailImage($thumbnailWidth, $thumbnailHeight);

                    // Save the thumbnail to the THUMB_PATH directory
                    $thumbnailPath = $thumbPath . '/' . $file;
                    $sourceImage->writeImage($thumbnailPath);

                    // Free up memory
                    $sourceImage->destroy();

                    echo "Thumbnail generated for: $file\n";
                }
            }
        }
    }

    // Delete obsolete thumbnails
    $thumbnailFiles = scandir($thumbPath);
    foreach ($thumbnailFiles as $thumbnailFile) {
        if ($thumbnailFile != '.' && $thumbnailFile != '..') {
            $thumbnailFilePath = $thumbPath . '/' . $thumbnailFile;
            if (is_file($thumbnailFilePath)) {
                $sourceFile = $sourcePath . '/' . $thumbnailFile;
                if (!file_exists($sourceFile)) {
                    unlink($thumbnailFilePath);
                    echo "Obsolete thumbnail deleted: $thumbnailFile\n";
                }
            } elseif (is_dir($thumbnailFilePath)) {
                $sourceDir = $sourcePath . '/' . $thumbnailFile;
                if (!is_dir($sourceDir)) {
                    // Delete the entire directory and its contents recursively
                    deleteDirectory($thumbnailFilePath);
                    echo "Obsolete directory deleted: $thumbnailFile\n";
                }
            }
        }
    }
}

// Helper function to delete a directory and its contents recursively
function deleteDirectory($dir)
{
    if (!file_exists($dir)) {
        return;
    }

    $files = scandir($dir);
    foreach ($files as $file) {
        if ($file != '.' && $file != '..') {
            $filePath = $dir . '/' . $file;
            if (is_dir($filePath)) {
                deleteDirectory($filePath);
            } else {
                unlink($filePath);
            }
        }
    }

    rmdir($dir);
}

// Call the function to generate thumbnails for the given paths and dimensions
generateAndDeleteThumbnails(IMAGE_PATH, THUMB_PATH, T_WIDTH, T_HEIGHT);

echo "Thumbnail generation and deletion complete.\n";

?>
