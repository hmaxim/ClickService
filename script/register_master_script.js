
var main=function(){
$('#register').click(function(){
  // getMaster();
 var phoneNumber=$('#phoneNumber').val();
 var password=$('#password').val();
 var confirm_pass=$('#confirm_pass').val();
 var email=$('#email').val();
 var name=$('#name').val();
 var lastName=$('#lastName').val();
 var masterType=$('input[name=type_of_master]:checked').val();
 // var true_password;

 // if(password===confirm_password){
 //  true_password=password;
 // }
$.ajax({
  url: 'https://hair-salon-personal.herokuapp.com/register/master',
  method: 'POST',
   data: JSON.stringify({

    phoneNumber: phoneNumber,
    password:password,
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
  localStorage.setItem('master',JSON.stringify(data))
});
});
}
$(document).ready(main);

function getMaster(){
  if (localStorage.getItem('master')){
    var data_master=JSON.parse(localStorage.getItem('master'));
  }

}



