
var main=function(){
$('#register').click(function(){
 var phoneNumber=$('#phoneNumber').val();
 var password=$('#password').val();
 var confirm_pass=$('#confirm_pass').val();
 var email=$('#email').val();
 var name=$('#name').val();
 var lastName=$('#lastName').val();
$.ajax({
  url: 'https://hear-saloon.herokuapp.com/rest/masterservice/master',
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
  contentType: "application/json; charset=utf-8"

}).then(function (data) {
  console.log(data);
});
});
}
$(document).ready(main);

$(document).ready(function(){
    $(".slide-adress1").click(function(){
        $(".schedule1").slideToggle("slow");
    });
});
$(document).ready(function(){
    $(".slide-adress2").click(function(){
        $(".schedule2").slideToggle("slow");
    });
});