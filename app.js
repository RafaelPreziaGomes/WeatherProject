const express = require("express");

const https = require("https");

const url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=ccacfb31397f03e28f037bc9028878d9"

https.get(url ,function(response) {
  console.log(response.statusCode)
  response.on("data", function(data){
    const weatherData = JSON.parse(data)
    const weatherMain = weatherData.weather[0].main
    const weatherDescription = weatherData.weather[0].description
    const weatherTemp = weatherData.main.temp
    const weatherCity = weatherData.name
    const weatherIcon = weatherData.weather[0].icon

  })
})

const app = express();

app.get("/", function(req, res){
  res.send("<h1></h1>")
})

app.listen(3000, function () {
  console.log("Server is running on port  3000")
})
