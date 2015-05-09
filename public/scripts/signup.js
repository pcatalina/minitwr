
$("input#password").mouseover(function(){
    $('#password').popover('show');
});

$("input#password").mouseout(function(){
    $('#password').popover('hide');
});

var passWord = document.getElementById("password").innerHTML;

function password(passWord) {
  var i = 0;
  var accepted = false;
  if(passWord.length >= 8) {
    for(i; i < passWord.length; i++)
      if((passWord[i] >= 'A') && (passWord[i] <= 'Z'))
        for(i; i < passWord.length; i++)
          if((passWord[i] >= 'a') && (passWord[i] <= 'z'))
            for(i; i < passWord.length; i++)
              if((passWord[i] >= 33) && (passWord[i] <= 38))
                accepted = true;
  }
  return accepted;
}

$(document).ready(function(){
    $("button").click(function(){
        if ((password(passWord))== true)
        {
            $.post({password: passWord});
        }
        else
        {
            $("#password").popover({ title: 'Look! A bird!', content: 'ewfew' });
        }
        console.log(passWord);
        });
});



/*var fullName = document.getElementById("exampleInputFullName").innerHTML;

var eMail = document.getElementById("exampleInputEmail1").innerHTML;
//var signUp = false;

function validateFullName() {
  var x = document.getElementById("exampleInputFullName").innerHTML;
  if(x == null || x == "") {
    alert("Name must be filled out");
    return false;
  }

}

function validateEmail(eMail) {
  if(eMail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i);
}



function signUp() {
  if((validateFullName()) && (validateEmail(eMail)) && (password(passWord))) {
    window.location.href = 'myprofile';
  }
}


/**
 * Created by C on 28.04.2015.
 */
