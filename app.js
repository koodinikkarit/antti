var sharp = require("sharp");
const fs = require("fs");

const express = require("express");

var app = express();


sharp("kuva.jpg").resize(500, 1500).ignoreAspectRatio().toFile("op.jpg");

fs.watch('./pictures', {encoding: 'buffer'}, (eventType, filename) => {
  if (filename)
    console.log(filename);
    // Prints: <Buffer ...>
});

app.get("/*", function (req, res) {
    var path = __dirname + "/pictures" + req.path;
    console.log(path, req.query);
    var width = req.query.width;
    var height = req.query.height;
    console.log(req.query.strech != "false");
    var strech = req.query.strech && req.query.strech === "true" ? true : false;
    if (fs.existsSync(path)) {
        var transformer = sharp(path).resize(width ? parseInt(width) : null, height ? parseInt(height) : null);
        if (strech) transformer = transformer.ignoreAspectRatio();

        transformer.toBuffer(function (err, data) {
            console.log(data.length);
            res.write(data);
            res.end();
        });
        //res.end();
    }
});

app.listen(3333);