$(document).ready(function checkPassword() {
$('input[type=password]').keyup(function() {
var pswd = $(this).val();
  var pass1 = $('#password').val();
  var pass2 = $('#confirm_password').val();
if ( pswd.length < 8 ) {
  $('#length').removeClass('valid-password').addClass('invalid-password');
} else {
  $('#length').removeClass('invalid-password').addClass('valid-password');
}
if ( pswd.match(/[A-z]/) ) {
  $('#letter').removeClass('invalid-password').addClass('valid-password');
} else {
  $('#letter').removeClass('valid-password').addClass('invalid-password');
}
if ( pswd.match(/[A-Z]/) ) {
  $('#capital').removeClass('invalid-password').addClass('valid-password');
} else {
  $('#capital').removeClass('valid-password').addClass('invalid-password');
}
if ( pswd.match(/[0-9]/) ) {
  $('#number').removeClass('invalid-password').addClass('valid-password');
} else {
  $('#number').removeClass('valid-password').addClass('invalid-password');
}
if(pass1 != pass2){
  $('#match').removeClass('valid-password').addClass('invalid-password');
}
else {
  $('#match').removeClass('invalid-password').addClass('valid-password');
}
})
$('input[type=password]').focus(function() {
  $('#pswd_info').show();
});
$('input[type=password]').blur(function() {
 $('#pswd_info').hide();
});
});


$('#register_btn').click(function (){
  var name = $('#name').val();
  var lastName = $('#lastName').val();
  var phone = $('#phoneNumber').val();
  var email = $('#email').val();
  var password1 = $('#password').val();
  var password2 = $('#confirm_password').val();
  var passOk;

    if (password1 === password2){
      passOk = password2;
  }

  var registerationClient = {
      clientName: name,
      clientLastName: lastName,
      clientPhoneNumber: phone,
      clientEmail: email,
      clientPassword: passOk
  };

  var str = JSON.stringify(registerationClient);
  $.ajax('https://hear-saloon.herokuapp.com/rest/hairsalon/client/register', {
    method: 'POST',
    data: str,
    dataType:'json',
    contentType: "application/json; charset=utf-8",
    success: function(){
        location.href="client_account.html";
  },
    error: function(){
      alert("Your account is already registered");
    }
  }).then(function(data) {
    console.log(data);
    localStorage.setItem("client", JSON.stringify(data));
  });
  });

$('#logout').click(function(){
  localStorage.clear();
  location.href="index.html";
});