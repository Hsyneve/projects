#!/usr/bin/env node

var $ = require('http');
function getWeather(data) {
    if (data) {
        var weathercity = "您好，您现在所在的城市为 " + data.results[0].currentCity+"\n";
        var weatherdegree = "";
        for (var i in data.results[0].index) {
            weatherdegree += data.results[0].index[i].tipt + ":" + data.results[0].index[i].title + " " + data.results[0].index[i].zs + " " + data.results[0].index[i].des+"\n";
        }
        var weatherdata = "今天是" + data.results[0].weather_data[0].date + ",天气" + data.results[0].weather_data[0].weather + " " + data.results[0].weather_data[0].wind + ",温度" + data.results[0].weather_data[0].temperature+"\n";
        var weather_fea = "未来三天\n";
     for (var i in data.results[0].weather_data) {
            if (i != 0) {
                weather_fea += data.results[0].weather_data[i].date + ",天气" + data.results[0].weather_data[i].weather + " " + data.results[0].weather_data[i].wind + ",温度" + data.results[0].weather_data[i].temperature+"\n";
            }

       }
        var weather=weathercity+weatherdegree+weatherdata+weather_fea;
        console.log(weather);
    }
}




$.get('http://api.jirengu.com/weather.php', (res) => {
            var resData = "";
            res.on('data', (chunk) => {
                resData += `${chunk}`;
            });
            res.on("end", function() {
                    getWeather(JSON.parse(resData));
                    });

                res.resume();
            }).on('error', (e) => {
            console.log(`Got error: ${e.message}`);
        });
