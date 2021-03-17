const pins = document.querySelector(".pins__ul");
const myLat = document.querySelector(".mylat");
const myLng = document.querySelector(".mylng");
const lat = document.querySelector("#lat");
const lng = document.querySelector("#lng");
const markerTitle = document.querySelector("#markerTitle");
const markerDescription = document.querySelector("#markerDescription");
const markerBtn = document.querySelector("#markerBtn");

let markersAll = [];
let markerReplay = false;


function clearInput(){
  lat.value = "";
  lng.value = "";
  markerTitle.value = "";
  markerDescription.value = "";
}

function checkReplay(){
  markersAll.forEach(e => {
    if(e.name === markerTitle.value || (e.lat === lat.value && e.lng === lng.value)){
      markerReplay = true;
    } else {
      markerReplay = false;
    }
  })

}

function addPin(marker){
    const pin = document.createElement("li");
    const pinTitle = document.createElement("div");
    const pinDelete = document.createElement("button");

    pinTitle.classList.add("pins__title");
    pinDelete.classList.add("pins__delete");

    pinTitle.textContent = marker.name;

    pinTitle.appendChild(pinDelete);
    pin.appendChild(pinTitle);
    pins.appendChild(pin)
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(initMap)
} else {
  alert("Геолокация не доступна")
};




function initMap(position){
    const clientLat = position.coords.latitude;
    const clientLng = position.coords.longitude;
    myLat.textContent = clientLat;
    myLng.textContent = clientLng;
    const clientPosition = new google.maps.LatLng(clientLat,clientLng);
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 9,
      center: clientPosition,
      styles:[
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#212121"
            }
          ]
        },
        {
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#212121"
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "administrative.country",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative.locality",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#bdbdbd"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#181818"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#1b1b1b"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#2c2c2c"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#427160"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#427160"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#427160"
            }
          ]
        },
        {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#4e4e4e"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#000000"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#3d3d3d"
            }
          ]
        }
      ],
    });
    const clientPositionMarker = new google.maps.Marker({
      position: (clientPosition),
      map: map,
      title:"Мое местоположение",
      icon: "markers/mypos.svg"
    });
    

    markerBtn.addEventListener("click", () => {
      const clientMarker = new google.maps.Marker({
        position: new google.maps.LatLng(),
        map: map,
        title: "",
        icon: "markers/marker.svg"
      });
      checkReplay();
      if(!markerReplay){
        const marker = {
          "name": markerTitle.value, 
          "lat": lat.value, 
          "lng": lng.value, 
          "descrp": markerDescription.value,
          "is_exact": true,
          "clientMarker": clientMarker
        };
        markersAll.push(marker);
        addPin(marker)
        showMarker();
        clearInput();
      }else{
        alert("Такой маркер уже добавлен")
      }
    });
    
    function showMarker() {
      for(let i = 0; i < markersAll.length; i++){
        markersAll[i].clientMarker = new google.maps.Marker({
            position: new google.maps.LatLng(markersAll[i].lat,  markersAll[i].lng),
            map: map,
            title: markersAll[i].name,
            icon: "markers/marker.svg"
          });
          addWindow(markersAll[i]);
      }
    };

    function addWindow(marker){
      const content = `<h3>${marker.name}</h3><p>${marker.descrp}</p>`
      const infoWindow = new google.maps.InfoWindow({
        content: content
      });
      google.maps.event.addListener(marker.clientMarker, 'click', function() {
        infoWindow.open(map,marker.clientMarker);
      });
    };

    pins.addEventListener("click", (e) => {
      const btn = e.target.closest(".pins__delete");
      if (!btn) {
        return;
      }
      markersAll.forEach(e => {
        if(e.name === btn.parentElement.innerText){
          markersAll = markersAll.filter(el => el != e);
          btn.parentElement.remove();
          deleteMarker(e.clientMarker)
        }
      })
    })

    function deleteMarker(marker){
      marker.setMap(null);
      marker = null;
    }
}


