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