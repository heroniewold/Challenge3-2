// Set api token for mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoiaGVyb25pZXdvbGQiLCJhIjoiY2tta21heDYxMTIwNzJ2cWtlNTN2ajg4eiJ9.rJcm3XnaaoRpprFOObYz1A';

// Get map
var map = new mapboxgl.Map ({
    container: 'landingmap',
    //style: 'mapbox://styles/mapbox/satellite-v9',
    style: 'mapbox://styles/heroniewold/ckn5t8yzn0vjq17mzxktesk7l',
    center: [4.648403547169576, 52.05517378028636], 
    zoom: 10
});

// Get coordinates in a popup when clicked on location
map.on('style.load', function() {
    map.on('click', function(e) {
        var coordinates = e.lngLat;
        new mapboxgl.Popup()
            .setLngLat(coordinates)
            //.setHTML('Pizza')
            .setHTML('Possible landing place coordinates: <br/>' + 'Latitude' + ' ' + '\"' + coordinates.lat + '\" <br/>' + 'Longitude' + ' ' + '\"' + coordinates.lng + '\"')
            .addTo(map);
        
        // code to make text show under map
        var onWaterUrl = 'https://api.onwater.io/api/v1/results/' + coordinates.lat + ',' + coordinates.lng + '?access_token=A8ekD6ka1XKuFYxvNZ2Y';
    
        fetch(onWaterUrl)
    
        .then(function(response) {
            return response.json();
        })
    
        .then(function(response) {
            console.log(response.water);
            if (response.water == true) {
                document.getElementById("onwater").innerHTML = "Coordinates are located on a body of water";
            }
            else if (response.water == false) {
                document.getElementById("onwater").innerHTML = "Coordinates are located on the land";
            }
        })    
    });
});

var nasaapod = 'https://api.nasa.gov/planetary/apod?api_key=5cwcboc56Nc7mkgzfRKbCF2CUSvSS8EKEcejN2b3';
fetch(nasaapod)
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            console.log(response);
            var img = response.url;
            console.log(img);
            var url = "url('" + img + "')";
            console.log(url);
            document.body.style.backgroundImage = url;
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.backgroundSize = "cover";
        })

