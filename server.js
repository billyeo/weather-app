const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');

const apiKey = "1ffe997b22b3cbedc0450a8ddf61300b";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', function(request, response){
    response.render('index', {weather: null, error: null});
})

app.post('/', function(req, res){
    //res.render('index');
    console.log(req.body.city);
    let city = req.body.city;
    //let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    //let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city},uk&APPID=1ffe997b22b3cbedc0450a8ddf61300b`
    console.log(url);
    request(url, function(err, response, body){
        //if error fetching city name
        if(err){
            
            console.log("error in getting request " + err);
            //continue;
            //next(err);
            res.render('index', {weather: null, error: 'Error code 101, please try again!'});
        } 
        else{
            let weather = JSON.parse(body);

            //checks to see if json body is valid
            if(weather.main == undefined){
                console.log("error in getting JSON body")
                res.render('index', {weather: null, error: 'Error code 202, please try again!'});
            }
            else{
                let weatherData = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index', {weather: weatherData, error: null});
            }
        }
    });
})

app.listen(3000, function(){
    console.log("server is up and running on port 3000");
})