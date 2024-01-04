$(document).ready(function () {
  const name = $("#name");
  const invalidName = $("#invalid-name");
  const addButton = $("#add-department-button");
  const departmentForm = $("#add-department-form");

  name.on("input", function () {
    invalidName.empty();
    $(this).toggleClass("valid", this.value.trim() !== "");
  });

  addButton.on("click", function (event) {
    event.preventDefault();

    const checkedIDs = $('input[type="checkbox"][id^="course_"]:checked')
      .map(function () {
        return { _id: this.id.replace("course_", "") };
      })
      .get();

    const inputValue = name.val().trim();
    const isValidInput = inputValue !== "";

    name.toggleClass("valid", isValidInput);
    invalidName.text(isValidInput ? "" : "This field is required");

    if (isValidInput) {
      const formData = { name: inputValue, designations: checkedIDs };

      addButton.html(`
        <div style="width: 1rem;height: 1rem;" class="spinner-border text-light" role="status">
          <span class="sr-only">Loading...</span>
        </div>`);

      $.ajax({
        url: "/api/v1/auth/department/add-new",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(formData),
        success: function (response) {
          handleResponse(response.header.message, toastr.success);
        },
        error: function (xhr) {
          const response = xhr.responseJSON;
          handleResponse(response.header.message, toastr.error);
        },
        complete: function () {
          addButton.html("Submit");
          departmentForm[0].reset();
          name.val("");
        },
      });
    }
  });

  function handleResponse(message, toastFunction) {
    toastFunction(message);
  }
});
