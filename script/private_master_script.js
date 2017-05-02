

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
$(document).ready(function(){
    $(".slide-services").click(function(){
        $(".list-of-services").slideToggle("slow");
    });
});

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
  $('#name').text(data_master.name);
  $('#lastName').text(data_master.lastName);
  $('#phoneNumber').text(data_master.phoneNumber);
  $('#email').text(data_master.email);
  $('#typeMaster').text(data_master.masterType);
  $('#lang').text(data_master.lang);
  $('#adr1').text(data_master.addresses);
  
  var newLi = document.createElement('li');
   listService.insertBefore(newLi, listService.lastChild);
   newLi.innerHTML=data_master.serivce[0].service;
    



  // $('#sOne').text(data_master.serivce[0].service);
}
})
});