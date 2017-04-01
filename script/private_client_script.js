$('document').ready(function(){
	    getUSer();
	});

//its works
function initialize() {
	navigator.geolocation.getCurrentPosition(function(position) {
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
		var map = new google.maps.Map(document.getElementById("map_canvas"), 
			settings);

		var emarker = new google.maps.Marker({
			position:latlng,
			map: map,
			title: "You are here"
		});
	});
};


function getUSer(){
    var data = {};
    if (localStorage.getItem("user")) {
    data = JSON.parse(localStorage.getItem("user"));
  }
      $("#client_name").val(data.clientName);
      $("#client_lName").val(data.clientLastName);
      $("#client_email").val(data.clientEmail);
      $("#client_phone").val(data.clientPhoneNumber);
}


