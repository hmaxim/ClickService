
var main=function(){

$(function valid() {
  $("form[name='registration']").validate({

    rules: {
       phoneNumber:{
        required:true,
        digits:true
      },
      name:{
        required:true
      },
      password:{
        required:true,
        minlength:8
      },
      confirm_password:{
        required:true,
        minlength:8,
        equalTo:'#password'
      },
      email:{
        required:true,
        email:true
      },

    },

    messages: {
      phoneNumber:{
        digits:'Use only digits',
        required:"This field is required"
      },
      name: {
        required:"This field is required"
    },
      password: {
        required: "This field is required",
        minlength: "Min 8 characters"
      },
      confirm_password:{
        required: "This field is required",
        minlength: "Min 8 characters",
        equalTo:'Incorrect password'
      },
      email: {
       email: "Not valid email address",
       required:"This field is required"
      },
    },

    submitHandler: function(form) {
 var phoneNumber=$('#phoneNumber').val();
 console.log(phoneNumber);
 var password=$('#password').val();
 var confirm_pass=$('#confirm_password').val();

 var email=$('#email').val();
 var name=$('#name').val();
 var lastName=$('#lastName').val();
 var masterType=$('input[name=type_of_master]:checked').val();
  var dataByClass=document.getElementsByClassName('check');
      var length=dataByClass.length;
      var arrayOflang=[];

      for( var i=0; i<length; i++){
        if (dataByClass[i].checked){
          arrayOflang.push(dataByClass[i].value);
        }
      }
  var language=arrayOflang;

$.ajax({
  url: 'https://hair-salon-personal.herokuapp.com/register/master',
  method: 'POST',
   data: JSON.stringify({

    phoneNumber: phoneNumber,
    password:password,
    // confirm_password: confirm_pass,
    email: email,
    name: name,
    lastName: lastName,
    masterType: masterType,
    lang: language
     }),
  dataType: 'json',
  contentType: "application/json; charset=utf-8",
  success: function(data){
      localStorage.setItem('masterToken',data.token);
      location.href="private_master.html";
      // getMasterID();
    },
    error:function(data) {
      console.log(data);
      console.log(phoneNumber+', '+password+', '+email);
      alert('Error')
    }

})


    }
  });
});



// $('#register').click(function Register(){
// // function Register(){
//   // $( "form" ).submit(function() {
//   // getMaster();
//  var phoneNumber=$('#phoneNumber').val();
//  console.log(phoneNumber);
//  var password=$('#password').val();
//  var confirm_pass=$('#confirm_pass').val();
// if (document.getElementById('password').value != document.getElementById('confirm_password').value)
// {
//   alert('Password do not match');
//  // document.getElementById('sRePass').innerHTML ="password do not match.\\n"
// }

//  // $("input[type='password']")
//  //    .equal("Passwords do not match.");
//  var email=$('#email').val();
//  var name=$('#name').val();
//  var lastName=$('#lastName').val();
//  var masterType=$('input[name=type_of_master]:checked').val();
//  // var language =$('input[name=language]:checked').val();
//   var dataByClass=document.getElementsByClassName('check');
//       var length=dataByClass.length;
//       var arrayOflang=[];

//       for( var i=0; i<length; i++){
//         if (dataByClass[i].checked){
//           arrayOflang.push(dataByClass[i].value);
//         }
//       }
//       console.log(arrayOflang);
//   var language=arrayOflang;

// console.log(phoneNumber+', '+password+', '+email);
//  // ('input[name=language]:checked').val()
//  // var true_password;
//  // if(password===confirm_password){
//  //  true_password=password;
// //  // }
// $.ajax({
//   url: 'https://hair-salon-personal.herokuapp.com/register/master',
//   method: 'POST',
//    data: JSON.stringify({

//     phoneNumber: phoneNumber,
//     password:password,
//     // confirm_password: confirm_pass,
//     email: email,
//     name: name,
//     lastName: lastName,
//     masterType: masterType,
//     lang: language
//      }),
//   dataType: 'json',
//   contentType: "application/json; charset=utf-8",
//   success: function(data){
//       localStorage.setItem('masterToken',data.token);
//       location.href="private_master.html";
//       // getMasterID();
//     },
//     error:function(data) {
//       console.log(data);
//       console.log(phoneNumber+', '+password+', '+email);
//       alert('Error')
//     }

// })
// // .then(function (data) {
// //   // console.log(data);
// //   // location.href="private_master.html"
// // });
// });

}

$(document).ready(main);



//   function getMasterID(){
//    var token=localStorage.getItem("masterToken");
//    var masterID=$('#email').val();
//    $.ajax({
//     beforeSend: function(req){
//       req.setRequestHeader("authorization", token);
//     },
//      method:'GET',
//      url: 'https://hair-salon-personal.herokuapp.com/master/info',
//      contentType: "application/json; charset=utf-8",
//      success:function(res){
//       localStorage.setItem("mID", res.email);
//       console.log(res.email);
//      }
//    })
//    .then(function(data) {
//      console.log(data)
//      location.href="private_master.html"
//    });
// }





