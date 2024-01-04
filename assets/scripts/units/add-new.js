$(document).ready(function () {
  const name = $("#name");
  const invalidName = $("#invalid-name");
  const addButton = $("#add-unit-button");

  name.on("input", function () {
    invalidName.empty();
    $(this).css("border", "1px solid #5b6ce1");
  });

  $("#add-unit-button").on("click", function (event) {
    event.preventDefault();

    const checkedIDs = [];

    $('input[type="checkbox"][id^="course_"]').each(function () {
      if ($(this).is(":checked")) {
        const id = $(this).attr("id").replace("course_", "");
        checkedIDs.push({ _id: id });
      }
    });

    const inputValue = name.val().trim();

    if (inputValue === "") {
      name.css("border", "1px solid #BA0021");
      invalidName.text("This field is required");
    } else {
      name.css("border", "1px solid #5b6ce1");
      invalidName.empty();
      const formData = { name: inputValue, departments: checkedIDs };

      addButton.html(`
        <div style="width: 1rem;height: 1rem;" class="spinner-border text-light" role="status">
          <span class="sr-only">Loading...</span>
        </div>`);

      $.ajax({
        url: "/api/v1/auth/unit/add-new",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(formData),
        success: function (response) {
          handleResponse(
            addButton,
            name,
            response.header.message,
            toastr.success
          );
        },
        error: function (xhr, status, error) {
          const response = xhr.responseJSON;
          handleResponse(
            addButton,
            name,
            response.header.message,
            toastr.error
          );
        },
      });
    }
  });

  function handleResponse(addButton, name, message, toastFunction) {
    $("#add-unit-form")[0].reset();
    addButton.empty().text("Submit");
    name.val("");
    toastFunction(message);
  }
});
