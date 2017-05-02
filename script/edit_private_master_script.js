$(document).ready(function(){
    $("#show-calendar").click(function(){
        $("#calendar").toggle();
    });
    $('#show-shablon').click(function() {
    	$('.shablon').toggle();
    });



    });
function previewFile() {
  var preview = document.getElementById('imgpreview');
  var pr1=document.querySelector('img');
  var file    = document.querySelector('input[type=file]').files[0];
  var reader  = new FileReader();

  reader.onloadend = function () {
    preview.src = reader.result;
    pr1.src=reader.result;
  }

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
  }
}

$(document).ready(function getMasterInfo() {
  var token=localStorage.getItem("masterToken");
   var masterID=localStorage.getItem("mID");
   $.ajax({
    beforeSend: function(req){
      req.setRequestHeader("authorization", token);
    },
     method:'GET',
     url: 'https://hair-salon-personal.herokuapp.com/master/info',
     contentType: "application/json; charset=utf-8",
     success: function(data_master){
      console.log(data_master);
  $('#change_name').val(data_master.name);
  $('#change_last_name').val(data_master.lastName);
  $('#change_fon_number').val(data_master.phoneNumber);
  $('#change_email').val(data_master.email);
  $('#change_password').val(data_master.password);
  $('#change_type1').val(data_master.masterType);
  $('#change_lang1').val(data_master.lang);
    // var email=data_master.email;
    // var phoneNumber=data_master.phoneNumber;
    // var password=data_master.password;
    // var name=data_master.name;
    // var lastName=data_master.lastName;
    // var masterType=data_master.masterType;
    // var lang=data_master.lang;


  }
})

});

$('#adress').click(function(){
      var token=localStorage.getItem("masterToken");
      var addresses=$('#adress_of_work').val();
       var phoneNumber=$('#change_fon_number').val();
       var password=$('#change_password').val();
       var email=$('#change_email').val();
       var name=$('#change_name').val();
      var lastName=$('#change_last_name').val();
      var name_service=$('#name-service option:selected').text();
      var price=$('#price').val();
      var description=$('#description-service').val();
      var during=$('#during-service option:selected').text();
      var masterType=$('#change_type1').val();
      var lang=$('#change_lang1').val();

      $.ajax({
       beforeSend: function(req){
      req.setRequestHeader("Authorization", token);
    },
  url: 'https://hair-salon-personal.herokuapp.com/master/update',
  method: 'PUT',
   data: JSON.stringify({


    phoneNumber: phoneNumber,
    password:password,
    email: email,
    name: name,
    lastName: lastName,
    masterType: masterType,
    lang:[lang],
    addresses:addresses,
    serivce: [{
      service:name_service,
       price: price,
       // description: description,
        time:during
    }]
   

     }),
  dataType: 'json',
  contentType: "application/json; charset=utf-8",
  success: function(data){
      localStorage.setItem('MasterToken',data.token);
    },
    error:function() {
      alert('oops')
    }

}).then(function (data) {
  console.log(data);

  });

      })


   
    

    





// $(document).ready(function() {
//   $('#adress').click(function(){
//     var addresses=$('#adress_of_work').val();
//     // var email=data_master.email;
//     console.log(addresses);
   
//   });
  
// }); 

