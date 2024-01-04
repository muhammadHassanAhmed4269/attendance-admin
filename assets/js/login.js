$(document).ready(function () {
  const loginButton = $("#loginBtn");
  const invalidCredentials = $("#invalid-credentials");

  let email = $("#email");
  let password = $("#password");

  email.on("input", function () {
    invalidCredentials.empty();
  });

  password.on("input", function () {
    invalidCredentials.empty();
  });

  loginButton.on("click", function (e) {
    e.preventDefault();

    const formData = {
      email: email.val(),
      password: password.val(),
    };

    if (email.val() === "" && password.val() === "") {
      invalidCredentials.text("Email and password are required");
    } else if (email.val() === "") {
      invalidCredentials.text("Email is required");
    } else if (password.val() === "") {
      invalidCredentials.text("Password is required");
    } else {
      // AJAX request
      $.ajax({
        url: "/api/v1/auth/login",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(formData),
        success: function (response) {
          handleResponse(
            loginButton,
            email,
            password,
            response.header.message,
            toastr.success
          );

          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 1000);
        },
        error: function (xhr, status, error) {
          const response = xhr.responseJSON;
          handleResponse(
            loginButton,
            email,
            password,
            response.header.message,
            toastr.error
          );
        },
      });
    }

    function handleResponse(
      loginButton,
      email,
      password,
      message,
      toastFunction
    ) {
      loginButton.empty().text("Submit");
      email.val("");
      password.val("");
      toastFunction(message);
    }
  });
});
