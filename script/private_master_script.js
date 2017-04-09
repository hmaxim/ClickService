

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

$(document).ready(function getMaster() {
	 if (localStorage.getItem('master')){
    var data_master=JSON.parse(localStorage.getItem('master'));
  }
  $('#name').text(data_master.name);
  $('#lastName').text(data_master.lastName);
  $('#phoneNumber').text(data_master.phoneNumber);
  $('#email').text(data_master.email);
});