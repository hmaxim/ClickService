$('document').ready(function(){
	getUserInfo();
});

function getUserInfo() {
	var token = localStorage.getItem("userToken");
	$.ajax({
		beforeSend: function(req) {
			req.setRequestHeader("Authorization",token);
		},
		method: 'GET',
		url: 'https://hair-salon-personal.herokuapp.com/client/info/',
		contentType: "application/json; charset=utf-8",
		success: function(data) {
			console.log(data.clientName);
			$("#client_name").val(data.clientName);
			$("#client_lName").val(data.clientLastName);
			$("#client_email").val(data.clientEmail);
			$("#client_phone").val(data.clientPhoneNumber);
		}
	});
}

var inputName = $('#client_name');
var inputLName = $('#client_lName');
var inputPhone = $('#client_phone');
var inputPassword = $('#client_pass');
$('#edit_btn').click(function(e) {
  e.preventDefault();
  if (inputName.prop('disabled')) {
    inputName.prop('disabled', false);
    inputLName.prop('disabled', false);
    inputPhone.prop('disabled', false);
    inputPassword.show();
    inputPassword.prop('disabled',false);
    $('#submit_edit_btn').show();
    $('#edit_btn').hide();
  } else {
    inputName.prop('disabled', true);
    inputLName.prop('disabled', true);
    inputPhone.prop('disabled', true);
  }
});

$('#submit_edit_btn').click(function(e){
    e.preventDefault();
    inputName.prop('disabled', true);
    inputLName.prop('disabled', true);
    inputPhone.prop('disabled', true);
    inputPassword.prop('disabled',true);
    inputPassword.hide();
    $('#submit_edit_btn').hide();
    $('#edit_btn').show();

	var token = localStorage.getItem("userToken");
	var name = $('#client_name').val();
    var lastName = $('#client_lName').val();
    var phone = $('#client_phone').val();
    var email = $('#client_email').val();
    var password = $('#client_pass').val();

    var updateClient = {
      clientName: name,
      clientLastName: lastName,
      clientPhoneNumber: phone,
      clientEmail: email
    }

   var str = JSON.stringify(updateClient);
   var token = localStorage.getItem("userToken");
	  $.ajax({
	    beforeSend: function(req) {
	      req.setRequestHeader("Authorization", token);
	    },
	    method: 'PUT',
	    url: 'https://hair-salon-personal.herokuapp.com/client/update',
	    contentType: "application/json; charset=utf-8",
	    data: str,
	    success: function(res) {
	      console.log(res);
	    }
  });

});