$('document').ready(function(){
	initialize();
});

//its works with geolocation
var geocoder;
var map;
function initialize() {
  geocoder = new google.maps.Geocoder();
	navigator.geolocation.watchPosition(function(position) {
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		var latlng = new google.maps.LatLng(latitude, longitude);
		var settings = {
			zoom: 15,
			center: latlng,
			mapTypeControl: true,
			mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
			navigationControl: true,
			navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		map = new google.maps.Map(document.getElementById("map_canvas"), 
			settings);
      codeAddress();
		  var marker_current_position = new google.maps.Marker({
		    position: latlng,
		    map: map,
		    title: 'Hello World!',
		  });
	});
}

    function codeAddress() {
    var token = localStorage.getItem("userToken");
    var address;
	$.ajax({
		beforeSend: function(req) {
			req.setRequestHeader("Authorization",token);
		},
		method: 'GET',
		url: 'https://hair-salon-personal.herokuapp.com/master/list',
		contentType: "application/json; charset=utf-8",
		success: function(data) {
  			for (var i=0;i<data.length;i++){
  				address = data[i].addresses;
  				console.log(data[i].addresses);
          geocoder.geocode( { 'address': address}, function(results, status) {
          if (status == 'OK') {
          // map.setCenter(results[0].geometry.location);
          var marker_masters = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
            icon:"images/master_marker.png"
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  		}
		}
	});
}

// function getMasretInfo() {
// 	var token = localStorage.getItem("userToken");
// 	$.ajax({
// 		beforeSend: function(req) {
// 			req.setRequestHeader("Authorization",token);
// 		},
// 		method: 'GET',
// 		url: 'https://hair-salon-personal.herokuapp.com/master/list',
// 		contentType: "application/json; charset=utf-8",
// 		success: function(data) {
//   			for (var i=0;i<data.length;i++){
//   				console.log(data[i].addresses);
//   		}
// 			// console.log(data);
// 		}
// 	});
// }

//without geolocation
  // function initialize() {
  //   geocoder = new google.maps.Geocoder();
  //   var latlng = new google.maps.LatLng(-34.397, 150.644);
  //   var mapOptions = {
  //     zoom: 8,
  //     center: latlng
  //   }
  //   map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
  //    codeAddress();
  // }


