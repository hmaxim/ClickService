
var main=function(){
$('#register').click(function(){
 var phoneNumber=$('#phoneNumber').val();
 var password=$('#password').val();
 var confirm_pass=$('#confirm_pass').val();
 var email=$('#email').val();
 var name=$('#name').val();
 var lastName=$('#lastName').val();
$.ajax({
  url: 'https://hear-saloon.herokuapp.com/rest/hairsalon/master/register',
  method: 'POST',
   data: JSON.stringify({

    phoneNumber: phoneNumber,
    password: password,
    // confirm_password: confirm_pass,
    email: email,
    name: name,
    lastName: lastName
     }),
  dataType: 'json',
  contentType: "application/json; charset=utf-8",
  success: function(){
      location.href="private_master.html"
    },
    error:function() {
      alert('Such email already is exists')
    }

}).then(function (data) {
  console.log(data);
});
});
}



$(document).ready(main);

