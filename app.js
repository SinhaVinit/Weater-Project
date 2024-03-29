const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    const city = req.body.cityName;
    const API_key = "<YOUR-API>";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + API_key + "&units=" + unit;
    https.get(url, function(response) {

        response.on("data", function(data) {
            const weatherData = JSON.parse(data);

            const temp = weatherData.main.temp;

            const weatherDescription = weatherData.weather[0].description;

            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<h1>The temperature in " + city + " is " + temp + " degrees celcius<h1>");
            res.write("<h2>Currently the weather is " + weatherDescription + "<h2>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        });
    });
});

app.listen(3000, function() {
    console.log("Server is running at port-3000")
});