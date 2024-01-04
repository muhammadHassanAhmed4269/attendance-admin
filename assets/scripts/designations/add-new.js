$(document).ready(function () {
  const nameField = $("#name");
  const invalidNameField = $("#invalid-name");
  const addButton = $("#add-designation-button");
  const designationForm = $("#add-designation-form");

  nameField.on("input", function () {
    invalidNameField.empty();
    $(this)
      .toggleClass("valid", this.value.trim() !== "")
      .css("border", "");
  });

  addButton.on("click", function (event) {
    event.preventDefault();

    const checkedIDs = $('input[type="checkbox"][id^="course_"]:checked')
      .map(function () {
        return { _id: this.id.replace("course_", "") };
      })
      .get();

    const inputValue = nameField.val().trim();

    if (!inputValue) {
      nameField.css("border", "1px solid #BA0021");
      invalidNameField.text("This field is required");
      return;
    }

    nameField.css("border", "").toggleClass("valid", true);
    invalidNameField.empty();

    const formData = { name: inputValue, roles: checkedIDs };

    addButton.html(`
      <div style="width: 1rem;height: 1rem;" class="spinner-border text-light" role="status">
        <span class="sr-only">Loading...</span>
      </div>`);

    $.ajax({
      url: "/api/v1/auth/designation/add-new",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(formData),
      success: function (response) {
        handleAddDesignationResponse(response.header.message, toastr.success);
      },
      error: function (xhr) {
        const response = xhr.responseJSON || {
          header: { message: "An error occurred" },
        };
        handleAddDesignationResponse(response.header.message, toastr.error);
      },
      complete: function () {
        designationForm[0].reset();
        addButton.html("Submit");
        nameField.val("");
      },
    });
  });

  function handleAddDesignationResponse(message, toastFunction) {
    toastFunction(message);
  }
});
