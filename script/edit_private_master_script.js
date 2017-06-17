$(document).ready(function(){
    $("#show-calendar").click(function(){
        $(".calendar").toggle();
        $('.shablon').hide();
          $('#saveAll').hide();
        $('.startWork').hide();
    });
    $('#show-shablon').click(function() {
    	$('.shablon').toggle();
      $('.calendar').hide();
         $('#saveAll').hide();
        $('.startWork').hide();
    });

    // $('.addData').click(function(){
    //   $('.calendarTable').clone().appendTo('.calendar').addClass('calendarTable2');
    // });
    
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
   $('#change_lang1').val( data_master.lang);

}

  $('#autocomplete').val(data_master.addresses);

//   if (data_master.addresses!==null||data_master.addresses.length!==0) {
//   $('#adress_1').val(data_master.addresses);
// }else{
//   $('#adress_1').val('Adress');
// }
var serivceArr=[];
var serivceArr=data_master.serivce;

 $('#addService').click(function AddService() {
      var name=$('#name-service option:selected').text();
      var price=$('#price').val();
      var info=$('#description-service').val();
      var duration=$('#during-service option:selected').val();
// console.log(name.length);
// console.log(price.length);
// console.log(info);
// console.log(duration.length);
  if (name.length!==0&&price.length!==0&&duration.length!==0) {
serivceArr.push({name, price, duration, info});
console.log(serivceArr);

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
      localStorage.setItem('masterToken',data.token);



    }
  
}).then(function (data) {
console.log(data);
//  setTimeout( function() {
// location.reload();
//         }, 500);
  });
setTimeout( function() {
location.reload();
        }, 700);
});



 if (data_master.serivce.length===0) {
    var newTrService = document.createElement('tr');
    $('#tableService').append(newTrService);
     newTrService.setAttribute('id','newTrService');
     newTdService=document.createElement('td');
     newTdService.setAttribute('colspan','5');
     newTrService.append(newTdService);
   
   // var newTd=document.createElement('td');
   // newTd.setAttribute('id','newTrService');
   // newTrService.append(newTd);
   newTdService.innerHTML='You have not added a service to your list yet';
  }else{
for (var i = 0; i < data_master.serivce.length; i++){
  var newTrSevice=document.createElement('tr');
  $('#tableService').append(newTrSevice);

           var newTdName = document.createElement('td');
           // newLi.setAttribute('id', 'newLi'+[i]);
           var newTdPrice = document.createElement('td');
           var newTdDuring = document.createElement('td');
           var newTdDescription = document.createElement('td');

           var newButton=document.createElement('button');
           newButton.setAttribute('class','newButton');
           newButton.setAttribute('id','newButton'+[i]);
           newButton.setAttribute('value',[i]);
          newTrSevice.append(newTdName);
          newTrSevice.append(newTdPrice);
         newTrSevice.append(newTdDuring);
          newTrSevice.append(newTdDescription);
          newTrSevice.append(newButton);

    newTdName.innerHTML=data_master.serivce[i].name;
    newTdPrice.innerHTML=data_master.serivce[i].price+' ILS';
    newTdDuring.innerHTML=data_master.serivce[i].duration;
    if (data_master.serivce[i].info=="") {
      newTdDescription.innerHTML='no description';
    }else{
    newTdDescription.innerHTML=data_master.serivce[i].info;
  }
 
   newButton.innerHTML='Remove service';
 }
  // }

}

   $('.newButton').click(function RemoveService() {
//        $(this).attr('id');
// $(this).attr('value');
// console.log($(this).attr('value'));
//         console.log($(this).attr('id'));
        var index = $(this).attr('value');
        // console.log(index);
  serivceArr.splice(index,1);
  console.log(serivceArr);

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
      localStorage.setItem('masterToken',data.token);
    }
  
}).then(function (data) {
console.log(data);
  });
 setTimeout( function() {
location.reload();
        }, 500);
})

 
$('#saveShablon').click(function saveShablon() {
  var activeDayMon=$("#monday").prop("checked");
 
  var sel_Start_Hour_Mon = document.getElementById("StartTime_workHoursMon");
  var hourLightStartMon=sel_Start_Hour_Mon.options[sel_Start_Hour_Mon.selectedIndex].text;

  //  var hourLightStartMon=$('#StartTime_workHoursMon option:selected').value;
  // console.log(hourLightStartMon);

 
  var sel_Start_Min_Mon=document.getElementById('StartTime_workMin_Mon');
  var minLightStartMon=sel_Start_Min_Mon.options[sel_Start_Min_Mon.selectedIndex].text;

 var sel_Finish_Hour_Mon = document.getElementById("FinishTime_workHoursMon");
  var hourLightFinishMon=sel_Finish_Hour_Mon.options[sel_Finish_Hour_Mon.selectedIndex].text;
 
  var sel_Finish_Min_Mon=document.getElementById('FinishTime_workMin_Mon');
  var minLightFinishMon=sel_Finish_Min_Mon.options[sel_Finish_Min_Mon.selectedIndex].text;
 // console.log(activeDayMon);
 // console.log(hourLightFinishMon);
 //  console.log(minLightFinishMon);
var activeDayTue=$("#tuesday").prop("checked");
  
  var sel_Start_Hour_Tue = document.getElementById("StartTime_workHoursTue");
  var hourLightStartTue=sel_Start_Hour_Tue.options[sel_Start_Hour_Tue.selectedIndex].text;
 
  var sel_Start_Min_Tue=document.getElementById('StartTime_workMin_Tue');
  var minLightStartTue=sel_Start_Min_Tue.options[sel_Start_Min_Tue.selectedIndex].text;

 var sel_Finish_Hour_Tue = document.getElementById("FinishTime_workHoursTue");
  var hourLightFinishTue=sel_Finish_Hour_Tue.options[sel_Finish_Hour_Tue.selectedIndex].text;
 
  var sel_Finish_Min_Tue=document.getElementById('FinishTime_workMin_Tue');
  var minLightFinishTue=sel_Finish_Min_Tue.options[sel_Finish_Min_Tue.selectedIndex].text;

 var activeDayWed=$("#wednesday").prop("checked");
  
  var sel_Start_Hour_Wed = document.getElementById("StartTime_workHoursWed");
  var hourLightStartWed=sel_Start_Hour_Wed.options[sel_Start_Hour_Wed.selectedIndex].text;
 
  var sel_Start_Min_Wed=document.getElementById('StartTime_workMin_Wed');
  var minLightStartWed=sel_Start_Min_Wed.options[sel_Start_Min_Wed.selectedIndex].text;

 var sel_Finish_Hour_Wed = document.getElementById("FinishTime_workHoursWed");
  var hourLightFinishWed=sel_Finish_Hour_Wed.options[sel_Finish_Hour_Wed.selectedIndex].text;
 
  var sel_Finish_Min_Wed=document.getElementById('FinishTime_workMin_Wed');
  var minLightFinishWed=sel_Finish_Min_Tue.options[sel_Finish_Min_Wed.selectedIndex].text;

var activeDayThu=$("#thursday").prop("checked");
  
  var sel_Start_Hour_Thu = document.getElementById("StartTime_workHoursThu");
  var hourLightStartThu=sel_Start_Hour_Thu.options[sel_Start_Hour_Thu.selectedIndex].text;
 
  var sel_Start_Min_Thu=document.getElementById('StartTime_workMin_Thu');
  var minLightStartThu=sel_Start_Min_Thu.options[sel_Start_Min_Thu.selectedIndex].text;

 var sel_Finish_Hour_Thu = document.getElementById("FinishTime_workHoursThu");
  var hourLightFinishThu=sel_Finish_Hour_Thu.options[sel_Finish_Hour_Thu.selectedIndex].text;
 
  var sel_Finish_Min_Thu=document.getElementById('FinishTime_workMin_Thu');
  var minLightFinishThu=sel_Finish_Min_Tue.options[sel_Finish_Min_Thu.selectedIndex].text;

var activeDayFri=$("#friday").prop("checked");
  
  var sel_Start_Hour_Fri = document.getElementById("StartTime_workHoursFri");
  var hourLightStartFri=sel_Start_Hour_Fri.options[sel_Start_Hour_Fri.selectedIndex].text;
 
  var sel_Start_Min_Fri=document.getElementById('StartTime_workMin_Fri');
  var minLightStartFri=sel_Start_Min_Fri.options[sel_Start_Min_Fri.selectedIndex].text;

 var sel_Finish_Hour_Fri= document.getElementById("FinishTime_workHoursFri");
  var hourLightFinishFri=sel_Finish_Hour_Fri.options[sel_Finish_Hour_Fri.selectedIndex].text;
 
  var sel_Finish_Min_Fri=document.getElementById('FinishTime_workMin_Fri');
  var minLightFinishFri=sel_Finish_Min_Fri.options[sel_Finish_Min_Fri.selectedIndex].text;

 var activeDaySat=$("#saturday").prop("checked");
  
  var sel_Start_Hour_Sat = document.getElementById("StartTime_workHoursSat");
  var hourLightStartSat=sel_Start_Hour_Sat.options[sel_Start_Hour_Sat.selectedIndex].text;
 
  var sel_Start_Min_Sat=document.getElementById('StartTime_workMin_Sat');
  var minLightStartSat=sel_Start_Min_Sat.options[sel_Start_Min_Sat.selectedIndex].text;

 var sel_Finish_Hour_Sat= document.getElementById("FinishTime_workHoursSat");
  var hourLightFinishSat=sel_Finish_Hour_Sat.options[sel_Finish_Hour_Sat.selectedIndex].text;
 
  var sel_Finish_Min_Sat=document.getElementById('FinishTime_workMin_Sat');
  var minLightFinishSat=sel_Finish_Min_Sat.options[sel_Finish_Min_Sat.selectedIndex].text;

  var activeDaySun=$("#sunday").prop("checked");
  
  var sel_Start_Hour_Sun= document.getElementById("StartTime_workHoursSun");
  var hourLightStartSun=sel_Start_Hour_Sun.options[sel_Start_Hour_Sun.selectedIndex].text;
 
  var sel_Start_Min_Sun=document.getElementById('StartTime_workMin_Sun');
  var minLightStartSun=sel_Start_Min_Sun.options[sel_Start_Min_Sun.selectedIndex].text;

 var sel_Finish_Hour_Sun= document.getElementById("FinishTime_workHoursSun");
  var hourLightFinishSun=sel_Finish_Hour_Sun.options[sel_Finish_Hour_Sun.selectedIndex].text;
 
  var sel_Finish_Min_Sun=document.getElementById('FinishTime_workMin_Sun');
  var minLightFinishSun=sel_Finish_Min_Sun.options[sel_Finish_Min_Sun.selectedIndex].text;

  //  if (activeDayMon===true) {
  //   localStorage.setItem('activeDayMon', 'true');
  // }else{
  //   localStorage.setItem('activeDayMon', 'false');
  // }

      $.ajax({
       beforeSend: function(req){
      req.setRequestHeader("Authorization", token);
    },
  url: 'https://hair-salon-personal.herokuapp.com/master/template',
  method: 'PUT',
  
   data: JSON.stringify(
  [
  {
    activeDay:activeDaySun,
    startWork:{
      hourLight:hourLightStartSun,
      minuteLight:minLightStartSun
    },
    endWork:{
      hourLight:hourLightFinishSun,
      minuteLight:minLightFinishSun
    }
  },
  {
    activeDay:activeDayMon,
    startWork:{
      hourLight:hourLightStartMon,
      minuteLight:minLightStartMon
    },
    endWork:{
      hourLight:hourLightFinishMon,
      minuteLight:minLightFinishMon
    }
  },
  {
    activeDay:activeDayTue,
    startWork:{
      hourLight:hourLightStartTue,
      minuteLight:minLightStartTue
    },
    endWork:{
      hourLight:hourLightFinishTue,
      minuteLight:minLightFinishTue
    }
  },
  {
    activeDay:activeDayWed,
    startWork:{
      hourLight:hourLightStartWed,
      minuteLight:minLightStartWed
    },
    endWork:{
      hourLight:hourLightFinishWed,
      minuteLight:minLightFinishWed
    }
  },
  {
    activeDay:activeDayThu,
    startWork:{
      hourLight:hourLightStartThu,
      minuteLight:minLightStartThu
    },
    endWork:{
      hourLight:hourLightFinishThu,
      minuteLight:minLightFinishThu
    }
  },
  {
    activeDay:activeDayFri,
    startWork:{
      hourLight:hourLightStartFri,
      minuteLight:minLightStartFri
    },
    endWork:{
      hourLight:hourLightFinishFri,
      minuteLight:minLightFinishFri
    }
  },
  {
    activeDay:activeDaySat,
    startWork:{
      hourLight:hourLightStartSat,
      minuteLight:minLightStartSat
    },
    endWork:{
      hourLight:hourLightFinishSat,
      minuteLight:minLightFinishSat
    }
  }
  
  ]
    ),
  dataType: 'json',
  contentType: "application/json; charset=utf-8",
  success: function(data){
      localStorage.setItem('masterToken',data.token);
    }
  
}).then(function (data) {
 console.log(data);
  });
// if (activeDayMon===true) {
//     localStorage.setItem('activeDayMon', 'true');
//   }else{
//     localStorage.setItem('activeDayMon', 'false');
//   }
  // if (localStorage.getItem('activeDayMon')===true) {
  //   document.getElementById("monday").setAttribute('checked', 'checked');
  // }

 setTimeout( function() {
location.reload();
        }, 500);
  //  if (localStorage.getItem('activeDayMon')===true) {
  //   document.getElementById("monday").setAttribute('class', 'checked');
  // }

// if (activeDayMon==true) {
//     localStorage.setItem('activeDayMon', 'true');
//   }else{
//     localStorage.setItem('activeDayMon', 'false');
//   }
//   actDay=localStorage.getItem('activeDayMon');
//   console.log(actDay);

//   if (actDay=='true') {
//     // console.log('yes');
//     var mon=document.getElementById('monday');
//     document.getElementById('monday').setAttribute('checked', 'checked');
//   }

});

$('#saveDate').click(function saveCalendar() {
  var date_from_calendar=$('#calendar').val();
 var dateArr=date_from_calendar.split('-');
 var yearLight=dateArr[0];
 var monthLight=dateArr[1];
 var dayLight=dateArr[2];

  var sel_Start_Hour_Date= document.getElementById("StartTime_workHours_Date");
  var hourLightStartDate=sel_Start_Hour_Date.options[sel_Start_Hour_Date.selectedIndex].text;
 
  var sel_Start_Min_Date=document.getElementById('StartTime_workMin_Date');
  var minLightStartDate=sel_Start_Min_Date.options[sel_Start_Min_Date.selectedIndex].text;

 var sel_Finish_Hour_Date= document.getElementById("FinishTime_workHours_Date");
  var hourLightFinishDate=sel_Finish_Hour_Date.options[sel_Finish_Hour_Date.selectedIndex].text;
 
  var sel_Finish_Min_Date=document.getElementById('FinishTime_workMin_Date');
  var minLightFinishDate=sel_Finish_Min_Date.options[sel_Finish_Min_Date.selectedIndex].text;

  var sel_Work_RestDay=document.getElementById('work/restDay');
  var work_restDay=sel_Work_RestDay.options[sel_Work_RestDay.selectedIndex].value;
if (yearLight===''||monthLight===''||dayLight==='') {  
  alert('Choose date from calendar');
}

if (work_restDay!=1) {
  $.ajax({
       beforeSend: function(req){
      req.setRequestHeader("Authorization", token);
    },
  url: 'https://hair-salon-personal.herokuapp.com/master/add_day',
  method: 'PUT',
  
   data: JSON.stringify(
  {
  myCalendar:
    {
    yearLight:yearLight,
    monthLight:monthLight,
    dayLight:dayLight
    },
    startWork:{
      hourLight:hourLightStartDate,
      minuteLight:minLightStartDate
    },
    endWork:{
      hourLight:hourLightFinishDate,
      minuteLight:minLightFinishDate
    },

    working:work_restDay
  }
  
      ),
  dataType: 'json',
  contentType: "application/json; charset=utf-8",
  success: function(data){
      localStorage.setItem('masterToken',data.token);
    }
  
}).then(function (data) {
console.log(data);
  });
 setTimeout( function() {
location.reload();
        }, 500);

}
else{
  alert('Please, choose correct type of day');
}

});

$('#saveAdress').click(function saveAdress() {
 var addresses=$('#autocomplete').val();
  $.ajax({
     beforeSend: function(req){
      req.setRequestHeader("Authorization", token);
    },
  url: 'https://hair-salon-personal.herokuapp.com/master/address',
  method: 'PUT',
  data:
  // JSON.stringify(
    addresses
  // )
  ,
  dataType: 'json',
  contentType: "application/json; charset=utf-8",
  success: function(data){
      localStorage.setItem('masterToken',data.token);
    }
}).then(function (data) {

console.log(data);
  });
setTimeout( function() {
location.reload();
        }, 500);
  });


 $('#savePrivateInfo').click(function(){

      var token=localStorage.getItem("masterToken");
      var phoneNumber=$('#change_fon_number').val();
       var password=$('#change_password').val();
       var email=$('#change_email').val();
       var name=$('#change_name').val();
      var lastName=$('#change_last_name').val();
      var masterType=$('#change_type1').val();
      var lang=$('#change_lang1').val();
      var langArr=lang.split(',');

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
    lang:langArr
    
     }),
  dataType: 'json',
  contentType: "application/json; charset=utf-8",
  success: function(data){
      localStorage.setItem('masterToken',data.token);
    }
}).then(function (data) {

console.log(data);
  });
 setTimeout( function() {
location.reload();
        }, 500);


      });


$('#StartWork').click(function StartWork() {
        $.ajax({
       beforeSend: function(req){
      req.setRequestHeader("Authorization", token);
    },
  url: 'https://hair-salon-personal.herokuapp.com/master/start',
  method: 'GET',
  dataType: 'json',
  contentType: "application/json; charset=utf-8",
success: function(data){
      localStorage.setItem('MasterToken',data.token);
    }
}).then(function (data) {

console.log(data);
  });
});

  }

})

});




