

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



// $(document).ready(function GetAllRecords() {
//   var token=localStorage.getItem("masterToken");
//   $.ajax({
//      beforeSend: function(req){
//       req.setRequestHeader("authorization", token);
//     },
//     method:'GET',
//     url: 'https://hair-salon-personal.herokuapp.com/master/all_timetable',
//     contentType: "application/json; charset=utf-8",
// success: function(data_master_timetable){
//   console.log(data_master_timetable);
//   }
// })
// })


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
  $('#name').val(data_master.name);
  $('#typeMaster').val(data_master.masterType);
  $('#lang').val(data_master.lang);

   if (data_master.addresses!==null) {
   $('#adr1').text(data_master.addresses);
}else{
  $('#adr1').text('Adress');
}


  if (data_master.serivce.length===0) {
     var newTr=document.createElement('tr');
        $('#listService').append(newTr);
    newTr.innerHTML='Here you will see the services, which you provide';
  }else{
  for (var i = 0; i < data_master.serivce.length; i++) {
    var newTd = document.createElement('td');
   listService.append(newTd);
   newTd.innerHTML=data_master.serivce[i].name;
 }

  }




$(document).ready(function GetShedule() {
  var token=localStorage.getItem("masterToken");
  $.ajax({
     beforeSend: function(req){
      req.setRequestHeader("authorization", token);
    },
    method:'GET',
    url: 'https://hair-salon-personal.herokuapp.com/master/all_timetable',
    contentType: "application/json; charset=utf-8",
success: function(data_master_timetable){
  console.log(data_master_timetable);


if (data_master_timetable.length==0) {
  var newTd=document.createElement('td');
    dateRecords.insertBefore(newTd,dateRecords.lastChild);
    newTd.innerHTML='You dont add date of your work';

    var newTd=document.createElement('td');
    $('.records').append(newTd);
    newTd.innerHTML='Here your records will be displayed';
    $('#chooseDate').hide();
}

//   var counter=0;
//   $('.btnRight').click(function(slideDate) {
//     counter=counter+1;
//    // console.log(counter);
//    // localStorage.setItem('counter', counter);
//   });
//    $('.btnLeft').click(function(slideDate) {
//     counter=counter-1;
//    // console.log(counter);
//    // localStorage.setItem('counter', counter);
//   });
// var counter7=counter+7;
// var count=localStorage.getItem('counter');
// console.log(count);
else{
// if ($(window).width() < 590) {
// //    setTimeout( function() {
// // location.reload();
// //         }, 500);
//      for (var i = 0; i <3; i++) {
//     var newTd=document.createElement('td');
//      dateRecords.insertBefore(newTd,dateRecords.lastChild);
//      newTd.setAttribute('id', 'dateRecords'+[i]);
//      newTd.setAttribute('class', 'dateRecords');
//     // $('#dateRecords').append(newTd);
//   var data_myCalendar=data_master_timetable[i].myCalendar.split('/');
//   var dayCalendar=data_myCalendar[2];
//   var monthCalendar=data_myCalendar[1];
//   var yearCalendar=data_myCalendar[0];
//   newTd.innerHTML=dayCalendar+'.'+monthCalendar+'.'+yearCalendar;
//   }

// }
// $(window).resize(function() {
  // window.onresize=function(){
  //   console.log($(window).width());
  //   newTd.innerHTML='';
  
// if ($(window).width() < 1200&& $(window).width() >767||$(window).width() < 590) {
//    setTimeout( function() {
// location.reload();
//         }, 500);
     for (var i = 0; i <3; i++) {
      var newTd=document.createElement('td');
     dateRecords.insertBefore(newTd,dateRecords.lastChild);
     newTd.setAttribute('id', 'dateRecords'+[i]);
     newTd.setAttribute('class', 'dateRecords');
    // $('#dateRecords').append(newTd);
  var data_myCalendar=data_master_timetable[i].myCalendar.split('/');
  var dayCalendar=data_myCalendar[2];
  var monthCalendar=data_myCalendar[1];
  var yearCalendar=data_myCalendar[0];
  newTd.innerHTML=dayCalendar+'.'+monthCalendar+'.'+yearCalendar;
  }

  // $('.btnRight').click(function nextDay(event) {
  //       for (var i = 3; i <5; i++) {
  //         .dateRecords
  //     var newTd=document.createElement('td');
  //    dateRecords.insertBefore(newTd,dateRecords.lastChild);
  //    newTd.setAttribute('id', 'dateRecords'+[i]);
  //    newTd.setAttribute('class', 'dateRecords');
  //   // $('#dateRecords').append(newTd);
  // var data_myCalendar=data_master_timetable[i].myCalendar.split('/');
  // var dayCalendar=data_myCalendar[2];
  // var monthCalendar=data_myCalendar[1];
  // var yearCalendar=data_myCalendar[0];
  // newTd.innerHTML=dayCalendar+'.'+monthCalendar+'.'+yearCalendar;
  // }
  // });

  // function nextDay(){
  //    for (var i = 3; i <5; i++) {
  //     var newTd=document.createElement('td');
  //    dateRecords.insertBefore(newTd,dateRecords.lastChild);
  //    newTd.setAttribute('id', 'dateRecords'+[i]);
  //    newTd.setAttribute('class', 'dateRecords');
  //   // $('#dateRecords').append(newTd);
  // var data_myCalendar=data_master_timetable[i].myCalendar.split('/');
  // var dayCalendar=data_myCalendar[2];
  // var monthCalendar=data_myCalendar[1];
  // var yearCalendar=data_myCalendar[0];
  // newTd.innerHTML=dayCalendar+'.'+monthCalendar+'.'+yearCalendar;
  // }
  // }

// }
// else {
//   for (var i = 0; i <7; i++) {
//     var newTd=document.createElement('td');
//      dateRecords.before(newTd,dateRecords.lastChild);
//      newTd.setAttribute('id', 'dateRecords'+[i]);
//      newTd.setAttribute('class', 'dateRecords');
//     // $('#dateRecords').append(newTd);
//   var data_myCalendar=data_master_timetable[i].myCalendar.split('/');
//   var dayCalendar=data_myCalendar[2];
//   var monthCalendar=data_myCalendar[1];
//   var yearCalendar=data_myCalendar[0];
//   newTd.innerHTML=dayCalendar+'.'+monthCalendar+'.'+yearCalendar;
//   }
// }
// }

// })


  // for (var i = 0; i <7; i++) {
  //   var newTd=document.createElement('td');
  //    dateRecords.insertBefore(newTd,dateRecords.lastChild);
  //    newTd.setAttribute('id', 'dateRecords'+[i]);
  //    newTd.setAttribute('class', 'dateRecords');
  //   // $('#dateRecords').append(newTd);
  // var data_myCalendar=data_master_timetable[i].myCalendar.split('/');
  // var dayCalendar=data_myCalendar[2];
  // var monthCalendar=data_myCalendar[1];
  // var yearCalendar=data_myCalendar[0];
  // newTd.innerHTML=dayCalendar+'.'+monthCalendar+'.'+yearCalendar;
  // }



// $('.btnRight').click(function slideDate() {
//   for (var i = 7; i <data_master_timetable.length-1; i++) {
//     var newTd=document.createElement('td');
//      dateRecords.insertBefore(newTd,dateRecords.lastChild);
//      newTd.setAttribute('id', 'dateRecords'+[i]);
//     // $('#dateRecords').append(newTd);
//   var data_myCalendar=data_master_timetable[i].myCalendar.split('/');
//   var dayCalendar=data_myCalendar[2];
//   var monthCalendar=data_myCalendar[1];
//   var yearCalendar=data_myCalendar[0];
//   newTd.innerHTML=dayCalendar+'.'+monthCalendar+'.'+yearCalendar;
//   }
// });

}

  // console.log(data_master_timetable[0].myCalendar);
  // console.log(data_master_timetable[0].startWork.hourLight);
   if (data_master_timetable.length===0) {
    var newTr=document.createElement('tr');
  $('.table_shedule').append(newTr);
  newTr.innerHTML='Please, create your shedule of work';
  }
  else{
    for (var i = 0; i < data_master_timetable.length; i++) {
     var newTr=document.createElement('tr');
    $('.table_shedule').append(newTr);
     var newTd=document.createElement('td');
    newTr.append(newTd);
  var data_myCalendar=data_master_timetable[i].myCalendar.split('/');
  var dayCalendar=data_myCalendar[2];
  var monthCalendar=data_myCalendar[1];
  var yearCalendar=data_myCalendar[0];
  newTd.innerHTML=dayCalendar+'.'+monthCalendar+'.'+yearCalendar;
    
    var newTd1=document.createElement('td');
    newTr.append(newTd1);
    if (data_master_timetable[i].working==true) {

 var startWorkMin=data_master_timetable[i].startWork.minuteLight;
      if (startWorkMin<10) {
var startWorkMin='0'+startWorkMin;
      }
var startWorkHour=data_master_timetable[i].startWork.hourLight;
      if (startWorkHour<10) {
var startWorkHour='0'+startWorkHour;
      }
 var finishWorkHour=data_master_timetable[i].endWork.hourLight;
      if (finishWorkHour<10) {
var finishWorkHour='0'+finishWorkHour;
      }
 var finishWorkMin=data_master_timetable[i].endWork.minuteLight;
      if (finishWorkMin<10) {
var finishWorkMin='0'+finishWorkMin;
      }

  newTd1.innerHTML=startWorkHour+':'+startWorkMin+'-'+finishWorkHour+':'+finishWorkMin;
  }else{
   newTd1.innerHTML='Day off';
  }
    }
  }
  
 
  $('.dateRecords').click(function Show_this_day() {

  $(this).attr('id');
  $('.dayOff').hide();
  $('.dayNoRecords').hide();
  $('.WorkDay').hide();
  $(this).show();
  $('#chooseDate').hide();
    // newTr0.hide();
  // console.log($(this).attr('id'));
  var date0=$(this).text();
  // console.log(date0);
  var token=localStorage.getItem('masterToken');
  var date=date0.split('.');
  var dayLight=date[0];
  var monthLight=date[1];
  var yearLight=date[2];
  $.ajax({
     beforeSend: function(req){
      req.setRequestHeader("authorization", token);
    },
    method:'POST',
    url:'https://hair-salon-personal.herokuapp.com/master/day_records',
    contentType: "application/json; charset=utf-8",
    dataType:'json',
    data: JSON.stringify({
      dayLight:dayLight,
      monthLight:monthLight,
      yearLight:yearLight
    }),
    success: function(data_master_records){
      console.log(data_master_records);

      if (data_master_records===false) {
          var newTr=document.createElement('tr');
          newTr.setAttribute('class', 'dayOff');
          newTr.setAttribute('id', 'Records'+[i]);
        $('.records').append(newTr);
        var newTd=document.createElement('td')
        newTr.append(newTd);
        newTd.setAttribute('colspan','3');
       newTd.innerHTML='Day off';
      }

      if (data_master_records.length===0) {
        // console.log(data_master.length);
       var newTr=document.createElement('tr');
        newTr.setAttribute('class', 'dayNoRecords');
        newTr.setAttribute('id', 'Records'+[i]);
        $('.records').append(newTr);
         var newTd=document.createElement('td')
        newTr.append(newTd);
        newTd.setAttribute('colspan','3');
        newTd.innerHTML='You dont have records yet';
      }
      if(data_master_records.length!==0){
        for (var i = 0; i < data_master_records.length; i++) {
        var newTr=document.createElement('tr');
         newTr.setAttribute('class', 'WorkDay');
         newTr.setAttribute('id', 'Records'+[i]);
        $('.records').append(newTr);
        var newTdTime=document.createElement('td');
        var newTdName=document.createElement('td');
        var newTdService=document.createElement('td');
        newTr.append(newTdTime);
        newTr.append(newTdName);
        newTr.append(newTdService);
var startRecordHour=data_master_records[i].starTime.hourLight;
      if (startRecordHour<10) {
var startRecordHour='0'+startRecordHour;
      }
var startRecordMin=data_master_records[i].starTime.minuteLight;
      if (startRecordMin<10) {
var startRecordMin='0'+startRecordMin;
      }
        newTdTime.innerHTML=startRecordHour+':'+startRecordMin;
        newTdName.innerHTML=data_master_records[i].client;
         arrTemp=data_master_records[i].services;

        var nameService = "";
           for (var j = 0; j < arrTemp.length; j++) {
            nameService= nameService + arrTemp[j].name +"<br>";
            // newTdService1.innerHTML=nameService;
          }
        newTdService.innerHTML=nameService;
}
      }
// }


    }
  })
});





//   $(document).ready(function GetRecords0(){


//   var date0=$('#dateRecords0').text();
//   var token=localStorage.getItem('masterToken');
//   var date=date0.split('.');
//   var dayLight=date[0];
//   var monthLight=date[1];
//   var yearLight=date[2];
//   $.ajax({
//      beforeSend: function(req){
//       req.setRequestHeader("authorization", token);
//     },
//     method:'POST',
//     url:'https://hair-salon-personal.herokuapp.com/master/day_records',
//     contentType: "application/json; charset=utf-8",
//     dataType:'json',
//     data: JSON.stringify({
//       dayLight:dayLight,
//       monthLight:monthLight,
//       yearLight:yearLight
//     }),
//     success: function(data_master_records){
//       console.log(data_master_records);
//       if (data_master_records==false) {
//           var newTr0=document.createElement('tr');
//           newTr0.setAttribute('id', 'TrRest');
//         $('.records').append(newTr0);
//        newTr0.innerHTML='Day off';

//       }else{
//       if (data_master_records.length==0) {
//        var newTr0=document.createElement('tr');
//        newTr0.setAttribute('id', 'TrNoRecords');
//         $('.records').append(newTr0);
//         newT0.innerHTML='You dont have records yet';
//       }else{
// for (var i = 0; i < data_master_records.length; i++) {
//         var newTr=document.createElement('tr');
//         newTr0.setAttribute('id', 'newTr'+[i]);
//         $('.records').append(newTr0);
//         var newTdTime=document.createElement('td');
//         var newTdName=document.createElement('td');
//         var newTdService=document.createElement('td');
//         newTr0.append(newTdTime);
//         newTr0.append(newTdName);
//         newTr0.append(newTdService);
// var startRecordHour=data_master_records[i].starTime.hourLight;
//       if (startRecordHour<10) {
// var startRecordHour='0'+startRecordHour;
//       }
// var startRecordMin=data_master_records[i].starTime.minuteLight;
//       if (startRecordMin<10) {
// var startRecordMin='0'+startRecordMin;
//       }
//         newTdTime.innerHTML=startRecordHour+':'+startRecordMin;
//         newTdName.innerHTML=data_master_records[i].client;
//          arrTemp=data_master_records[i].services;

//         var nameService = "";
//            for (var j = 0; j < arrTemp.length; j++) {
//             nameService= nameService + arrTemp[j].name +"<br>";
//             console.log(nameService);
//             // newTdService1.innerHTML=nameService;
//           }
//         newTdService.innerHTML=nameService;
// }
//       }
// }


//     }
//   })


// })

  

    }
});
})



}
})
});

$("#logout").click(function logout(){
    localStorage.removeItem("masterToken");
    location.href="index.html";
  });