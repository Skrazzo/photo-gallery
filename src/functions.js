export function get_current_folder_files(allFiles, currentPath){
    // remove parts that are empty
    const parts = currentPath.split('/').filter(x => {
        return x !== '';
    });


    var result = allFiles;

    parts.forEach((x, i) => {
        if(x !== ''){
            result.some(el => {
                if(typeof el === 'object' && el.name === x){
                    result = el['images'];
                    return;
                }
            });
        }

    });

    return result;
}

export function calculate_phone_image_size(gap_size){
    return (window.innerWidth - (window.imagesPerRowPhone) * gap_size) / window.imagesPerRowPhone;
}

export function get_images_from_array(arr){
    return arr.filter(x => typeof x === 'string');
}

export function get_folders_from_array(arr){
    return arr.filter(x => typeof x === 'object');
}

export function containsPictureExtension(str) {
    const pictureExtensions = /\.(jpg|jpeg|png|gif|bmp|svg)$/i;
    return pictureExtensions.test(str);
}

export function check_folder_exists(files, folder_name){
    var bool = false;
    files.some((x) => {
        if(typeof x === "object" && x.name === folder_name){
            bool = true;
            return;
        }
    });


    return bool;
}

function check_picture_exists(files, picture_name){
    var bool = false;

    files.some(x => {
        if(typeof x === 'string' && x === picture_name){
            bool = true;
            return;
        }
    });

    return bool;
}

export function check_if_thumb_exists(files, path){
    // remove parts that are empty
    const parts = path.split('/').filter(x => {
        return x !== '';
    });

    var currentPath = '/';
    var exists = false;

    parts.forEach(x => {
        var currentFiles = get_current_folder_files(files, currentPath);

        if(!containsPictureExtension(x)){ // its not a file, then a folder, we need to check if folder exists 
            if(check_folder_exists(currentFiles, x)){
                currentPath += x + '/'; // add folder to the current path
            }
        }else{ // it is a picture

            if(check_picture_exists(currentFiles, x)){ // and it exists
                exists = true;
            }
        }
    });

    return exists;
}

export function getFileNameFromPath(filePath) {
    // Use the built-in JavaScript method to extract the file name
    return filePath.split('/').pop();
}