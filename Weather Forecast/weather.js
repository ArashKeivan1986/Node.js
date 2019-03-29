var https = require('https');

function getLocation(location , callback , error) {
    https.get('https://maps.googleapis.com/maps/api/geocode/json?address='+ location +'&key=AIzaSyB8D15hBx0SvEn9OpVKNEZ-q3QN6J_Hd4o',function(res){
        var body = '';
        res.on('data' , function (data) {
            body += data;
        });

        res.on('end' , function (){
            var google = JSON.parse(body);
            for( var key in google) {
                if(google['status'] == 'OK') {
                    var lat  = google.results[0].geometry.location.lat;
                    var lng = google.results[0].geometry.location.lng;
                    callback(lat,lng);
                    break;
                }
            }
        });

        res.on('error' , function (err) {
            error(err);
        });

    });
}


function getWeather(lat , lng , success , error) {

    https.get('https://api.forecast.io/forecast/5468ad0689ff0d1b3a3a2470798ea50c/'+ lat + ',' + lng +'?units=si',function(res){
        var body = '';
        res.on('data', function (data) {
            body += data;
        });

        res.on('end' , function(){
            var weather = JSON.parse(body);
            success(weather);
        });

        res.on('error' , function (err) {
            error(err);
        });
    });

}


module.exports.getLocation = getLocation;
module.exports.getWeather = getWeather;