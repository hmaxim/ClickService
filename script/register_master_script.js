
var main=function(){
$('#register').click(function(){
 var teleph=$('#tel').val();
 var password=$('#pass').val();
 var confirm_pass=$('#confirm_pass').val();
 var email=$('#email').val();
 var name=$('#name').val();
 var Last_name=$('#Last_name').val();
$.ajax({
  url: 'http://jsonplaceholder.typicode.com/users',
  method: 'GET',
   data: {

    // telephone: teleph,
    // password: password,
    // confirm_password: confirm_pass,
    email: email
    // name: name,
    // Last_name: Last_name
     },
  dataType: 'json'

}).then(function (data) {
  console.log(data[0].name);
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