$('#register_btn').click(function (){
  var name = $('#name').val();
  var lastName = $('#lastName').val();
  var phone = $('#phoneNumber').val();
  var email = $('#email').val();
  var password1 = $('#password').val();
  var password2 = $('#confirm_password').val();
  var passOk;

  if (password1 === password2){
      passOk = password2;
  }

  var registerationClient = {
      clientName: name,
      clientLastName: lastName,
      clientPhoneNumber: phone,
      clientEmail: email,
      clientPassword: passOk
  };

  var str = JSON.stringify(registerationClient);
  $.ajax('https://hear-saloon.herokuapp.com/rest/masterservice/client', {
    method: 'POST',
    data: str,
    dataType:'json',
    contentType: "application/json; charset=utf-8",
    error: function(){
      alert("Your account is already registered");
    }
  }).then(function(data) {
    console.log(data);
    $("#client_name").val(registerationClient.name);
  });
});

    // registerationClient = JSON.parse(str);
    // alert(registerationClient.clientEmail);
    // alert(registerationClient.clientPassword);
    // $("#name").val(reg.email);