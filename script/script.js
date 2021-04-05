// Set api token for mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoiaGVyb25pZXdvbGQiLCJhIjoiY2tta21heDYxMTIwNzJ2cWtlNTN2ajg4eiJ9.rJcm3XnaaoRpprFOObYz1A';

// Get map
var map = new mapboxgl.Map ({
    container: 'landingmap',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [4.648403547169576, 52.05517378028636], 
    zoom: 10
});

// Get coordinates in a popup when clicked on location
map.on('style.load', function() {
    map.on('click', function(e) {
        var coordinates = e.lngLat;
        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML('Pizza')
           // .setHTML('Possible landing place coordinates: <br/>' + 'Latitude' + ' ' + '\"' + coordinates.lat + '\" <br/>' + 'Longitude' + ' ' + '\"' + coordinates.lng + '\"')
            .addTo(map);
        //PROBEER VOLGENDE KEER DE TEXT OP DE POPUP TE KRIJGEN DOOR DE VAR ONWATER BOVEN DE SETHTML TE DOEN
        // make text show on land or on water
        var onWaterUrl = 'https://api.onwater.io/api/v1/results/' + coordinates.lat + ',' + coordinates.lng + '?access_token=A8ekD6ka1XKuFYxvNZ2Y';
    
        fetch(onWaterUrl)
    
        .then(function(response) {
            return response.json();
        })
    
        .then(function(response) {
            console.log(response.water);
            if (response.water == true) {
                document.getElementById("onwater").innerHTML = "statement is true";
            }
            else if (response.water == false) {
                document.getElementById("onwater").innerHTML = "statement is false";
            }
        })    
    });
});




