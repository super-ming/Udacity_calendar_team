var gMap = null;
var gMarkerCenter = null;

//gets array of events from session storage
var storage = JSON.parse(sessionStorage.getItem("briteEvents"));

//filters array for the event being passed by URL Location Hash
var eventObj = storage.filter(function(event) {
    return '#' + event.id === location.hash;
});

//Should we try to make an if statement to do a single API call
//incase user has linked saved but hasn't gone to index.html
//to generate sessionStorage data?
 
function initMap() {
    //latlng setting
    var mapOptions = {
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // make a map
    gMap = new google.maps.Map(document.getElementById("map"), mapOptions);

    //Geocoder object
    var geocoder = new google.maps.Geocoder();
    //get the address from the p
    var address = $('[id=event_address]').text();
    //address searching
    geocoder.geocode(
        {
            'address': address
        },
        function (results, status) {
            //If it gets the address right
            if (status == google.maps.GeocoderStatus.OK) {
            //get a map matching the latlng
            gMap.setCenter(results[0].geometry.location);
            //get a marker mathing the latlng
            var pos = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
            gMarkerCenter.setPosition(pos);
            } else {
            //error message
            alert('An error occurred while generating a map.');
            }
        }
    );
    gMarkerCenter = drawMarkerCenterInit();
}
 
//Marker setting
function drawMarkerCenterInit(pos) {
    var markerCenter = new google.maps.Marker({
        position: pos,
        map: gMap,
        draggable: false 
    });
    return markerCenter;
}





