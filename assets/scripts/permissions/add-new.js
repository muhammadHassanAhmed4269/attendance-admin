$(document).ready(function () {
  const name = $("#name");
  const invalidName = $("#invalid-name");
  const addButton = $("#add-permission-button");

  const entities = [
    "permission",
    "role",
    "unit",
    "department",
    "designation",
    "employee",
    "shift",
    "attendance",
    "holiday",
    "dashboard",
  ];

  const actions = ["list", "view", "add", "edit", "delete"];

  function validateInput(inputValue) {
    const words = inputValue.split(" ");
    const isValidInput =
      words.length === 2 &&
      actions.includes(words[0]) &&
      entities.includes(words[1]);

    if (isValidInput) {
      clearErrors();
    } else {
      displayError();
    }

    return isValidInput;
  }

  function displayError() {
    name.css("border", "1px solid #BA0021");
    invalidName.html(`
      <p style="color: #BA0021;font-weight:bold;">* Please enter permission name as: 'action entity'.</p>
      <p style="color: #BA0021;font-weight:bold;">* <b>Valid actions are:</b> ${actions.join(
        ", "
      )}.</p>
      <p style="color: #BA0021;font-weight:bold;">* <b>Valid entities are:</b> ${entities.join(
        ", "
      )}.</p>`);
  }

  function clearErrors() {
    invalidName.empty();
    name.css("border", "1px solid #5b6ce1");
  }

  function resetForm() {
    addButton.text("Submit");
    name.val("");
    clearErrors();
  }

  name.on("input", function () {
    validateInput($(this).val().trim());
  });

  addButton.click(function (event) {
    event.preventDefault();

    const inputValue = name.val().trim();

    if (inputValue === "") {
      name.css("border", "1px solid #BA0021");
      invalidName.text("This field is required");
    } else if (validateInput(inputValue)) {
      const formData = { name: inputValue };

      addButton.html(`
        <div style="width: 1rem;height: 1rem;" class="spinner-border text-light" role="status">
          <span class="sr-only">Loading...</span>
        </div>`);

      $.ajax({
        url: "/api/v1/auth/permission/add-new",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(formData),
        success: function (response) {
          handleResponse(response.header.message, toastr.success);
        },
        error: function (xhr, status, error) {
          const response = xhr.responseJSON;
          handleResponse(response.header.message, toastr.error);
        },
        complete: function () {
          resetForm();
        },
      });
    }
  });

  function handleResponse(message, toastFunction) {
    toastFunction(message);
  }
});
