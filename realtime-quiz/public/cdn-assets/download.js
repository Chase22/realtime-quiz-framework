const https = require('https');
const fs = require('fs');

const download = function (url, dest, cb) {
    if (fs.existsSync(dest)) {
        fs.unlinkSync(dest)
    }
    console.log(`remove ${dest}`)
    const file = fs.createWriteStream(dest);
    https.get(url, function (response) {
        console.log(`Downloading ${dest}`)
        response.pipe(file);
        file.on('finish', function () {
            file.close(cb);  // close() is async, call cb after close completes.
        });
    }).on('error', function (err) { // Handle errors
        fs.unlink(dest); // Delete the file async. (But we don't check the result)
        if (cb) cb(err.message);
    });
};

download("https://pro.fontawesome.com/releases/v5.10.0/css/all.css", `${__dirname}/all.css`)
download("https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css", `${__dirname}/bootstrap.min.css`)