#!/usr/bin/env node

var $ = require('http');
function getCity(data) {
    console.log("您好，您现在所在的城市为 "+data);
}







$.get('http://api.jirengu.com/city.php', (res) => {

            var resData = "";
            res.on('data', (chunk) => {
                resData += `${chunk}`;
            });
            res.on("end", function() {
                    getCity(resData);
                    });

                res.resume();
            }).on('error', (e) => {
            console.log(`Got error: ${e.message}`);
        });
   
