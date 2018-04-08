let gMap = null;
let gMarkerCenter = null;
 
function initMap() {
    //latlng setting
    let mapOptions = {
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // make a map
    gMap = new google.maps.Map(document.getElementById("map"), mapOptions);

    //Geocoder object
    let geocoder = new google.maps.Geocoder();
    //get the address from the p
    let address = $('[id=event_address]').text();
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
            let pos = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
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
    let markerCenter = new google.maps.Marker({
        position: pos,
        map: gMap,
        draggable: false 
    });
    return markerCenter;
}





