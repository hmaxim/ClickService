$('document').ready(function(){
	    getUser();
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
}


function getUser(){
    var data = {};
    if (localStorage.getItem("clientReg")) {
      data = JSON.parse(localStorage.getItem("clientReg"));
      $("#client_name").val(data.clientName);
      $("#client_lName").val(data.clientLastName);
      $("#client_email").val(data.clientEmail);
      $("#client_phone").val(data.clientPhoneNumber);
  	}else{
  	  data = JSON.parse(localStorage.getItem("clientAuth"));
      $("#client_name").val(data.clientName);
      $("#client_lName").val(data.clientLastName);
      $("#client_email").val(data.clientEmail);
      $("#client_phone").val(data.clientPhoneNumber);
  }
}



// function getUser(){
//     var data = {};
//     if (localStorage.getItem("user1")) {
//     data = JSON.stringify(localStorage.getItem("user1"));
//     $.ajax('https://hear-saloon.herokuapp.com/rest/hairsalon/client/register', {
//     method: 'POST',
//     data: str,
//     dataType:'json',
//     contentType: "application/json; charset=utf-8",
//     success: function(){
//     location.href="client_account.html";
//   },
//     error: function(){
//       alert("Your account is already registered");
//     }
//   }).then(function(data) {
//     console.log(data);
//   });
//   }
//       $("#client_name").val(data.clientName);
//       $("#client_lName").val(data.clientLastName);
//       $("#client_email").val(data.clientEmail);
//       $("#client_phone").val(data.clientPhoneNumber);
// }



