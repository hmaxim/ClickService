
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
 // var language =$('input[name=language]:checked').val();
  var dataByClass=document.getElementsByClassName('check');
      var length=dataByClass.length;
      var arrayOflang=[];

      for( var i=0; i<length; i++){
        if (dataByClass[i].checked){
          arrayOflang.push(dataByClass[i].value);
        }
      }
      console.log(arrayOflang);
  var language=arrayOflang;

 // ('input[name=language]:checked').val()
 // var true_password;
 // if(password===confirm_password){
 //  true_password=password;
//  // }
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
      // getMasterID();
    },
    error:function() {
      alert('Such email already is exists')
    }

}).then(function (data) {
  console.log(data);
  location.href="private_master.html"
});
});
}

$(document).ready(main);



  function getMasterID(){
   var token=localStorage.getItem("masterToken");
   var masterID=$('#email').val();
   $.ajax({
    beforeSend: function(req){
      req.setRequestHeader("authorization", token);
    },
     method:'GET',
     url: 'https://hair-salon-personal.herokuapp.com/master/info',
     contentType: "application/json; charset=utf-8",
     success:function(res){
      localStorage.setItem("mID", res.email);
      console.log(res.email);
     }
   })
   .then(function(data) {
     console.log(data)
     location.href="private_master.html"
   });
}





