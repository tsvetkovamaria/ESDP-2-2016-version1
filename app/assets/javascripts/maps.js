$(document).ready(function () {

    // необходимые настройки карты
    var defaultCoordinate = [42.87, 74.60];
    var mymap = L.map('map').setView(defaultCoordinate, 13);
    var indexMap = L.map('index-map').setView(defaultCoordinate, 10);
    var leafletURL = 'https://api.mapbox.com/styles/v1/tsvetkovamariia/cited6yv400an2hrzaezesxtn/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidHN2ZXRrb3ZhbWFyaWlhIiwiYSI6ImNpdGU4dnhvMTAwY2EyeW1qM216aDN3aHgifQ.D-AjvTmNye975Riw4LfT2A';

    // элементы страницы для взаимодействия с картой
    var fieldLatitude  = document.getElementById('latitude');
    var fieldLongitude = document.getElementById('longitude');
    var btnReset = document.getElementById('map-reset');

    L.tileLayer(leafletURL, {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18
        }).addTo(mymap);

    L.tileLayer(leafletURL, {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18
    }).addTo(indexMap);

    var marker = L.marker(defaultCoordinate).addTo(mymap);
    marker.bindPopup("<h5>Name</h5><p>Address</p>").openPopup();

    fieldLatitude.value = marker.getLatLng().lat;
    fieldLongitude.value = marker.getLatLng().lng;

    function moveMarker(e) {
        marker.setLatLng(e.latlng);
        mymap.panTo(e.latlng);
    }

    function resetMarker(){
        marker.setLatLng(defaultCoordinate);
        mymap.panTo(defaultCoordinate);
    }

    function updateFields() {
        fieldLatitude.value = marker.getLatLng().lat;
        fieldLongitude.value = marker.getLatLng().lng;
    }

    function updateMarker() {
        var lt = parseFloat(fieldLatitude.value);
        var ln = parseFloat(fieldLongitude.value);
        var newCoordinate = new L.LatLng(lt, ln);
        marker.setLatLng(newCoordinate);
        mymap.panTo(newCoordinate);
    }

    function populateMap(map, organizations) {
        for (var i = 0; i < organizations.length; ++i)
        {
            var org = organizations[i];
            var orgCoordinate = new L.latLng(parseFloat(org.latitude), parseFloat(org.longitude));
            var marker = L.marker(orgCoordinate).addTo(map);
            marker.bindPopup("<h5>" + org.name + "</h5><p>" + org.address + "</p>");
        }
    }

    mymap.on('click', function(e) {
        moveMarker(e);
        updateFields();
    });

    fieldLongitude.onkeydown = function() {updateMarker()} ;
    fieldLatitude.onkeydown = function() {updateMarker()} ;

    btnReset.onclick = function() {
        resetMarker();
        updateFields();
    };

    var allOrganizations = [
        {
            name: "test org",
            latitude: 42.87,
            longitude: 74.7,
            address: "Test Street, 85"
        },
        {
            name: "One more org",
            latitude: 42.77,
            longitude: 74.3,
            address: "New street, 43"
        }
    ];

    populateMap(indexMap, allOrganizations);

});