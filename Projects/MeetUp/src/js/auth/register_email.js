$(function() {
  var name_input = $('#fname');
  email_input = $('#email'),
    pass_field = $("#password")[0];

  // Sets events for when name and email are supplied.
  $('.email_name_button').click(function(evt) {
    evt.preventDefault();
    var form = document.getElementById("name-form");
    if (form.checkValidity() == true) {
      $('.signup').slideToggle(500);
      $('.finish-form').removeClass('hide');
      return false;
    }else {
      return form.validationMessage;
    }
  });

  $('.email_submit_button').click(function() {
    var form = $("#finish-form")[0];
    if (form.checkValidity() == true) {
      switch (pwcheck($('#password'))) {
        case 0:
          register_user();
          console.log(pwcheck($('#password')));
          break;
        case 1:
          pass_field.setCustomValidity("Your password needs a special character: !@#$%^&*");
          console.log(pwcheck($('#password')));
          break;
        case 2:
          pass_field.setCustomValidity("Your password needs at least one lower case english letter.");
          console.log(pwcheck($('#password')));
          break;
        case 3:
          pass_field.setCustomValidity("Your password needs at least one number.");
          console.log(pwcheck($('#password')));
          break;
        case 4:
          pass_field.setCustomValidity("Your password needs at least one upper case english letter.");
          console.log(pwcheck($('#password')));
          break;
        case 5:
          pass_field.setCustomValidity("Your password needs to be more than 8 characters and less than 100.");
          console.log(pwcheck($('#password')));
          break;
        case 6:
          pass_field.setCustomValidity("Your password contains an illegal character");
          console.log(pwcheck($('#password')));
          break;
      }
      return false;
    }else {
      return form.validationMessage;
    }
  });
  //add more info check box
  $('#addInfo').click(function() {
    if ($('.moreinfo').hasClass('hide')) {
      $('.moreinfo').removeClass('hide');
    } else {
      $('.moreinfo').addClass('hide');
      $('#employer').val('');
      $('#jobTitle').val('');
      $('#birthDay').val('');
    }
  });
  // datepicker
  $('#birthday').datepicker({
    dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    changeYear: true,
    changeMonth: true,
    yearRange: "-100:+0",
  });
});

function register_user(){
  var name = $('#fname').val(),
    email = $('#email').val();

  //TODO send array of options.
  newUser(email, pass_field.value, name);
}

function pwcheck(value) {
  // At least one upper case English letter
  // At least one lower case English letter
  // At least one digit
  // At least one special character
  value = value[0].value;
  var illegalCharacterGroup = value.match(/[^A-z0-9\!\@\#\$\%\^\&\*]/g);
  var special_character = value.match(/[\!\@\#\$\%\^\&\*]/g);
  var lower_az = value.match(/[a-z]/g);
  var numbers = value.match(/\d/g);
  var upper_az = value.match(/[A-Z]/g);
  var len = value.length;
  // 0 = OKAY
  var error = 0;
  // 1 = special_character
  if (!special_character)
    error = 1;
  // 2 = lower case a-z
  if (!lower_az)
    error = 2;
  // 3 = needs a numbers
  if (!numbers)
    error = 3;
  // 4 = uppercase a-z
  if (!upper_az)
    error = 4;
  // 5 = too short
  if (len < 8) {
    error = 5;
  }
  if (illegalCharacterGroup) {
    error = 6;
  }
  return error;
}
