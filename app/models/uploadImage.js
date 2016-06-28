var formidable = require('formidable');
var fs = require('fs-extra');
var path = require('path');
module.exports = function(app) {
    app.post('/upload', function(req, res) {
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            //ok
        });

        form.on('fileBegin', function(name, file) {
            file.path = 'temp/' + file.name;
        });
        form.on('progress', function(bytesReceived, bytesExpected) {
            var percent_complete = (bytesReceived / bytesExpected) * 100;
            console.log(percent_complete.toFixed(2));
        });

        form.on('end', function(fields, files) {
            /* Temporary location of our uploaded file */
            var temp_path = this.openedFiles[0].path;
            /* The file name of the uploaded file */
            var file_name = this.openedFiles[0].name;
            /* Location where we want to copy the uploaded file */
            var new_location = 'upload/';

            fs.copy(temp_path, new_location + file_name, function(err) {
                if (err) {
                    console.error(err);
                } else {
                    console.log("success!");
                    // Delete the "temp" file
                    fs.unlink(temp_path, function(err) {
                        if (err) {
                            console.error(err);
                            console.log("TROUBLE deletion temp !");
                        } else {
                            console.log("success deletion temp !");
                        }
                    });
                }
            });
        });
        res.sendStatus(200);
    });
};
