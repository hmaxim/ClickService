

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
  $('#typeMaster').text(data_master.masterType);
  $('#lang').text(data_master.lang);

   if (data_master.addresses!==null) {
   $('#adr1').text(data_master.addresses);
}else{
  $('#adr1').text('Adress');
}


  //  if (data_master.serivce.length!==0){
  // var newLi = document.createElement('li');
  //  listService.insertBefore(newLi, listService.lastChild);
  //  newLi.innerHTML=data_master.serivce[0].service;
  //   }
  if (data_master.serivce.length===0) {
    var newLi = document.createElement('li');
    listService.insertBefore(newLi, listService.lastChild);
    newLi.innerHTML='не добавлены оказываемые услуги';
  }else{
  for (var i = 0; i < data_master.serivce.length; i++) {
    var newLi = document.createElement('li');
   listService.insertBefore(newLi, listService.lastChild);
   newLi.innerHTML=data_master.serivce[i].service;
 }
  }


}
})
});

$("#logout").click(function logout(){
    localStorage.removeItem("masterToken");
    location.href="index.html";
  });