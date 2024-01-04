$(document).ready(function () {
  const name = $("#name");
  const invalidName = $("#invalid-name");
  const updateButton = $("#update-permission-button");
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
  ];
  const actions = ["list", "view", "add", "edit", "delete"];

  function validateInput(inputValue) {
    const words = inputValue.split(" ");
    const isValidInput =
      words.length === 2 &&
      actions.includes(words[0]) &&
      entities.includes(words[1]);

    if (isValidInput) {
      invalidName.text("");
      name.css("border", "1px solid #5b6ce1");
    } else {
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

    return isValidInput;
  }

  function resetForm() {
    updateButton.empty().text("Submit");
    name.val("");
    invalidName.empty();
    name.css("border", "1px solid #5b6ce1");
  }

  name.on("input", function () {
    invalidName.empty();
    validateInput($(this).val().trim());
  });

  updateButton.click(function (event) {
    event.preventDefault();

    const inputValue = name.val().trim();

    if (inputValue === "") {
      name.css("border", "1px solid #BA0021");
      invalidName.text("This field is required");
    } else if (validateInput(inputValue)) {
      const formData = { name: inputValue };
      const urlParams = new URLSearchParams(window.location.search);
      const _id = urlParams.get("_id");

      updateButton.html(`
        <div style="width: 1rem;height: 1rem;" class="spinner-border text-light" role="status">
          <span class="sr-only">Loading...</span>
        </div>`);

      $.ajax({
        url: `/api/v1/auth/permission/update?_id=${_id}`,
        method: "PUT",
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
    updateButton.empty().text("Submit");
    name.val("");
    toastFunction(message);
  }
});
