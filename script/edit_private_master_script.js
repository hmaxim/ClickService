$(document).ready(function(){
    $("#show-calendar").click(function(){
        $(".calendar").toggle();
        $('.shablon').hide();
    });
    $('#show-shablon').click(function() {
    	$('.shablon').toggle();
      $('.calendar').hide();
    });

    $('.addData').click(function(){
      $('.calendarTable').clone().appendTo('.calendar').addClass('calendarTable2');
    });
    
    $('#backToPrivateAccount').click(function(event) {
  location.href='private_master.html';
});


    });
$('#submit_lang1').click(function() {
   var dataByClass=document.getElementsByClassName('checkLang');
      var length=dataByClass.length;
      var arrayOflang=[];

      for( var i=0; i<length; i++){
        if (dataByClass[i].checked){
          arrayOflang.push(dataByClass[i].nextSibling.nodeValue);
        }
      }
  var language=arrayOflang;
  $('#change_lang1').val(arrayOflang);
});

$('#submit_master_type').click(function() {
  var masterType=$('input[name=checkMasterType]:checked').val();
  $('#change_type1').val(masterType);
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
   // var masterID=localStorage.getItem("mID");
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
  
  for (var i = 0; i < data_master.lang.length; i++) {
   $('#change_lang1').val( data_master.lang[i]);
  
}

  // var data_masterLang=[];
  // var data_masterLang= data_master.lang;
  // console.log(data_masterLang);
  // for (var i = 0; i < data_master.lang.length; i++) {
  //    $('#change_lang1').innerHTML=(data_master.lang[i]+',');
  // }


  $('#adress_of_work').val(data_master.addresses);

//   if (data_master.addresses!==null||data_master.addresses.length!==0) {
//   $('#adress_1').val(data_master.addresses);
// }else{
//   $('#adress_1').val('Adress');
// }

 if (data_master.serivce.length===0) {
    var newLi = document.createElement('li');
    listServiceEdit.insertBefore(newLi, listServiceEdit.lastChild);
    newLi.innerHTML='не добавлены оказываемые услуги';
  }else{
for (var i = 0; i < data_master.serivce.length; i++){
           var newLi = document.createElement('li');
   listServiceEdit.insertBefore(newLi, listServiceEdit.lastChild);
   newLi.innerHTML=' название услуги: '+data_master.serivce[i].service+';<br>'+
   ' цена: '+data_master.serivce[i].price+';<br>'+' длительность: '
   +data_master.serivce[i].time+';';
}
 }
//    if (data_master.serivce.length!==0) {
//    $('#name_service1').val(data_master.serivce[0].service);
//    $('#price_service1').val(data_master.serivce[0].price);
//    $('#during_service1').val(data_master.serivce[0].time);

// }
var serivceArr=[];
var serivceArr=data_master.serivce;

 $('#addService').click(function() {
      var service=$('#name-service option:selected').text();
      var price=$('#price').val();
      var description=$('#description-service').val();
      var time=$('#during-service option:selected').text();

  if (service.length!==0&&price!==0&&time!==0) {
serivceArr.push({service, price, time});
// console.log(serivceArr);

}

      $.ajax({
       beforeSend: function(req){
      req.setRequestHeader("Authorization", token);
    },
  url: 'https://hair-salon-personal.herokuapp.com/master/service',
  method: 'POST',
  
   data: JSON.stringify(serivceArr),
  dataType: 'json',
  contentType: "application/json; charset=utf-8",
  success: function(data){
      localStorage.setItem('MasterToken',data.token);



    }
  
}).then(function (data) {
console.log(data);
  });

});



 $('#adress').click(function(){
      var token=localStorage.getItem("masterToken");
      var addresses=$('#adress_of_work').val();
       var phoneNumber=$('#change_fon_number').val();
       var password=$('#change_password').val();
       var email=$('#change_email').val();
       var name=$('#change_name').val();
      var lastName=$('#change_last_name').val();
      // var service=$('#name-service option:selected').text();
      // var price=$('#price').val();
      // var description=$('#description-service').val();
      // var time=$('#during-service option:selected').text();
      var masterType=$('#change_type1').val();
      var lang=$('#change_lang1').val();
      var langArr=lang.split(',');
      console.log(langArr);
      // var service1=$('#name_service1').val();
      // var price1=$('#price_service1').val();
      // var during1=$('#during_service1').val();


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
    lang:langArr,
    addresses:addresses,
    // serivce: serivceArr

     }),
  dataType: 'json',
  contentType: "application/json; charset=utf-8",
  success: function(data){
      localStorage.setItem('MasterToken',data.token);



    }
}).then(function (data) {

console.log(data);
  });
 setTimeout( function() {
location.reload();
        }, 500);


      });




  }

})

});




