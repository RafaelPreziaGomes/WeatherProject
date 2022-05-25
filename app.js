const express = require("express");

const https = require("https");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + '/css/styles.css'));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html")

    })



app.post("/", function(req,res){
  console.log(req.body.cityName)
  let query = req.body.cityName
  const apiKey = "ccacfb31397f03e28f037bc9028878d9"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey
  https.get(url ,function(response) {
    console.log(response.statusCode)
    response.on("data", function(data){
      const weatherData = JSON.parse(data)
      const weatherMain = weatherData.weather[0].main
      const weatherDescription = weatherData.weather[0].description
      const weatherTemp = weatherData.main.temp
      const weatherCity = weatherData.name
      const weatherIcon = weatherData.weather[0].icon
      const imageURL = 'http://openweathermap.org/img/wn/' + weatherIcon + "@2x.png"
      const primaryMessage = "<h1> Hello " + query + "</h1>"
      res.write(primaryMessage)
      res.write("<img src =" + imageURL + ">")

      res.send()

        })
      })
})


app.listen(3000, function () {
  console.log("Server is running on port  3000")
})
