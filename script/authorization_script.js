$(document).ready(function zapros(){
$('#authorization').click(function(){
 var login=$('#inputLogin').val();
 var password=$('#inputPassword').val();
$.ajax({
  url: 'https://hear-saloon.herokuapp.com/rest/masterservice/master',
  method: 'PUT',
   data: JSON.stringify({

    email: login,
    password: password
     }),
  dataType: 'json',
  contentType: "application/json; charset=utf-8",
  success: function(){

	location.href="private_master.html"

  },
  error: function() {
    	alert('login or password is not correct')
    },

}).then(function (data) {
  console.log(data);
});
});
})












// var main=function(){
// 	$('#authorization').click(function() {
// 		var login=$('#inputLogin').val();
// 		var password=$('#inputPassword').val();
// $.ajax({
//   url: 'https://hear-saloon.herokuapp.com/rest/masterservice/master',
//   method: 'PUT',
//    data: JSON.stringify({

//     email: login,
//     password: password
//      }),
//   dataType: 'json',
//   contentType: "application/json; charset=utf-8"

// }).then(function (data) {
//   console.log(data);
// });
// });
// }

// $(document).ready(main);
