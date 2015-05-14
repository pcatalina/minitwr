$("input#password").mouseover(function () {
    $('#password').popover('show');
});

$("input#password").mouseout(function () {
    $('#password').popover('hide');
});

function reset($elem) {
    $elem.before($elem.clone(true));
    var $newElem = $elem.prev();
    $elem.remove();
    return $newElem;
}

function validPassword(password) {
    return ((password == '') || (password.length < 8))
}

function validUserName(username) {
    return (username == null || username.length < 3 )
}

function validEmail(email) {
    var emailForm = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return (!emailForm.test(email))
}
$(document).ready(function () {

    $('button#buttonSignUp').click(function () {

        var username = $('input#username').val();
        console.log(username);
        var email = $('input#email').val();
        console.log(email);
        var password = $('input#password').val();
        console.log(password);

        if (validPassword(password) || validUserName(username) || validEmail(email)) {
            if (validPassword(password)) {
                var pswd = $('input#password');
                pswd.removeClass();
                pswd = reset(pswd);
                pswd.addClass("body form-control registerBlanck shake animated");
            }
            if (validUserName(username)) {
                var usnm = $('input#username');
                usnm.removeClass();
                usnm = reset(usnm);
                usnm.addClass("body form-control registerBlanck shake animated");
            }
            if (validEmail(email)) {
                var mail = $('input#email');
                mail.removeClass();
                mail = reset(mail);
                mail.addClass("body form-control registerBlanck shake animated");
            }

        }
        else {

            $.post("/api/users", {
                username: username,
                email: email,
                password: password
            })
                .done(function (res) {
                    window.location.replace("/signin");
                })
                .fail(function (res) {
                    console.log(res);
                })

        }
    });
});


/*



 function signUp() {
 if((validateFullName()) && (validateEmail(eMail)) && (password(passWord))) {
 window.location.href = 'myprofile';
 }
 }

 */