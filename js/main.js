(function ($) {
  "use strict";

  /*==================================================================
    [ Validate after type ]*/
  $(".validate-input .input100").each(function () {
    $(this).on("blur", function () {
      if (validate(this) == false) {
        showValidate(this);
      } else {
        $(this).parent().addClass("true-validate");
      }
    });
  });

  /*==================================================================
    [ Validate ]*/
  var input = $(".validate-input .input100");
  var pass = $('input[name="pass"]');
  var repass = $('input[name="repass"]');

  $(".validate-form").on("submit", function (e) {
    e.preventDefault(); // Menghentikan perilaku bawaan formulir
    var check = true;

    for (var i = 0; i < input.length; i++) {
      if (validate(input[i]) == false) {
        showValidate(input[i]);
        check = false;
      }
    }

    // if (check) {
    //     // Semua input valid, arahkan pengguna ke halaman utama
    //     window.location.href = "home.html"; // Ganti "halaman-utama.html" dengan URL halaman utama yang sebenarnya
    // }
  });

  $(".validate-form .input100").each(function () {
    $(this).focus(function () {
      hideValidate(this);
      $(this).parent().removeClass("true-validate");
    });
  });

  function validate(input) {
    var username = $(input).val().trim();

    // Username harus diisi
    if (!username) {
      return false;
    }

    // Username harus memiliki panjang minimal 4 karakter
    if (username.length < 4) {
      return false;
    }

    // Username tidak boleh mengandung karakter spesial
    var regex = /^[a-zA-Z0-9_-]+$/;
    if (!regex.test(username)) {
      return false;
    }
    // Validate email format
    if ($(input).attr("type") == "email" || $(input).attr("name") == "email") {
      var email = $(input).val().trim();
      if (
        !email ||
        !email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ) {
        return false;
      }
    }

    // Validate password strength and length
    if ($(input).attr("name") == "pass") {
      var passValue = $(input).val().trim();
      if (!passValue || passValue.length < 8) {
        return false;
      }

      // Check for strong password criteria
      var regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+-])(.{8,})$/;
      if (!regex.test(passValue)) {
        return false;
      }
    }

    // Validate password confirmation
    if ($(input).attr("name") == "repass") {
      var repassValue = $(input).val().trim();
      var passValue = $(input).siblings("input[name='pass']").val().trim();
      if (!repassValue || repassValue !== passValue) {
        return false;
      }
    }

    // Validate other input fields with non-empty values
    if (
      !$(input).attr("type") == "email" &&
      !$(input).attr("name") == "pass" &&
      !$(input).attr("name") == "repass"
    ) {
      var inputValue = $(input).val().trim();
      if (!inputValue) {
        return false;
      }
    }

    return true; // Input is valid
  }

  function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass("alert-validate");

    $(thisAlert).append('<span class="btn-hide-validate">&#xf135;</span>');
    $(".btn-hide-validate").each(function () {
      $(this).on("click", function () {
        hideValidate(this);
      });
    });
  }

  function hideValidate(input) {
    var thisAlert = $(input).parent();
    $(thisAlert).removeClass("alert-validate");
    $(thisAlert).find(".btn-hide-validate").remove();
    $(thisAlert).find(".error-message").text("");
  }


})(jQuery);
