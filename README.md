# Simple photo gallery using React.js 

### Requirements:
* PHP (im using **v8.2**, but im pretty sure you can do this on older versions aswell)
* PHP library **Imagick**

### Configuration
###### filemanager redirect url
in .env file `REACT_APP_FILE_MANAGER_URL=/home/example/`

###### config.php (backend)
```php

header("Access-Control-Allow-Credentials: true"); 
header("Access-Control-Allow-Origin: http://localhost:3000"); // allow requests from localhost:3000

// add system path to your pictures, and where you want thumbnails to be generated
define('THUMB_PATH', './thumb/'); // path to thumbnail folder (needs to be publicly available)
define('IMAGE_PATH', '/home/example_person/Pictures/'); // full path to pictures on your system

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

```

###### index.js (frontend)
```js
function domain_detect(){
    const currentDomain = window.location.hostname;
    const protocol = window.location.protocol;

    window.baseApiUrl   = protocol + '//'+ currentDomain +'/home/photos/'; // public url to your api files
    window.baseThumbUrl = protocol + '//'+ currentDomain +'/home/photos/thumb/'; // public url to your generated thumbnails
}

window.version = 'v1.0';

// settings for pagination
window.imagesPerPage = 54;
window.imagesPerPagePhone = 24;
window.paginationSiblings = 2; // pages in the middle
window.paginationBoundaries = 1; // pages from both sides

// all picture settings
window.imagesPerRowPhone = 4; // how many images to show per row on phone
window.imageSize = 100; // image size when viewed normaly
```

# Step by step

* Run `npm install` to install all packages
* Configurate front-end settings in **index.js** files
    * Set your public **thumbnail** url
    * Set your public **api** url
    * if you want, then edit other settings aswell
* Do everything that is said in this [tutorial](https://github.com/Skrazzo/React.js-to-apache) to prepeare and build react app
* Upload php api files to previously set destination
* Configurate back-end in **/config/config.php**

## Customize security
You can implement your own security checks in defined security file. Security file is included before every api call.

### For example
if you have your own login system, with token or session checks, you can modify **sec.php** to accept your token, or connect to your own database and check credentials.
