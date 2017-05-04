$(document).ready(function autorization(){
  checkLocalStorageClient();
  checkLocalStorageMaster();
  $(loginForm).submit(function (e) {
    e.preventDefault();
    var login=$('#inputLogin').val();
    var password=$('#inputPassword').val();
    var radio = $('input[name=user_type]:checked').val();
    if(radio === 'client'){
     $.ajax({
      url: 'https://hair-salon-personal.herokuapp.com/login/client',
      method: 'POST',
      data: JSON.stringify({
        clientEmail: login,
        clientPassword: password
      }),
      dataType: 'json',
      contentType: "application/json; charset=utf-8",
      success: function(data){
        localStorage.setItem("userToken", data.token);
        getUserID();
      },
      error: function() {
        alert('login or password is not correct')
      },
    }).then(function (data) {
      console.log(data);
    });
  }else{
   $.ajax({
    url: 'https://hair-salon-personal.herokuapp.com/login/master',
    method: 'POST',
    data: JSON.stringify({
      email: login,
      password: password
    }),
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    success: function(data){
     localStorage.setItem("userToken", data.token);
     getUserID();
   },
   error: function() {
     alert('login or password is not correct')
   },
 }).then(function (data) {
  console.log(data);
});
}
});
});

function checkLocalStorageClient() {
  var data  = localStorage.getItem("clientID");
  if(data !== null && data !== 'undefined'){
    location.href="client_account.html"
  }
  return;
}

function checkLocalStorageMaster() {
  var data  = localStorage.getItem("masterID");
  if(data !== null && data !== 'undefined'){
    location.href="private_master.html"
  }
  return;
}

function getUserID() {
  var radio = $('input[name=user_type]:checked').val();
  var token = localStorage.getItem("userToken");
  if(radio === 'client'){
    $.ajax({
      beforeSend: function(req) {
        req.setRequestHeader("authorization",token  );
      },
      method: 'GET',
      url: 'https://hair-salon-personal.herokuapp.com/client/info/',
      contentType: "application/json; charset=utf-8",
      success: function(res) {
        console.log(res.clientEmail);
        location.href="client_account.html"
      }
    }).then(function (data) {
      console.log(data);   
    });
  }else{
    $.ajax({
      beforeSend: function(req) {
        req.setRequestHeader("authorization",token  );
      },
      method: 'GET',
      url: 'https://hair-salon-personal.herokuapp.com/master/info',
      contentType: "application/json; charset=utf-8",
      success: function(res) {
        console.log(res.email);
        localStorage.setItem("masterID", res.email);
        location.href="private_master.html"
      }
    }).then(function (data) {
      console.log(data);   
    });
  }
}
