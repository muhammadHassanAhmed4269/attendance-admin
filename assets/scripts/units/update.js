$(document).ready(function () {
  const name = $("#name");
  const invalidName = $("#invalid-name");
  const updateButton = $("#update-unit-button");

  name.on("input", function () {
    invalidName.empty();
    $(this).css("border", "1px solid #5b6ce1");
  });

  $("#update-unit-button").on("click", function (event) {
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

      updateButton.html(`
        <div style="width: 1rem;height: 1rem;" class="spinner-border text-light" role="status">
          <span class="sr-only">Loading...</span>
        </div>`);

      const urlParams = new URLSearchParams(window.location.search);
      const _id = urlParams.get("_id");

      $.ajax({
        url: "/api/v1/auth/unit/update?_id=" + _id,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(formData),
        success: function (response) {
          handleResponse(updateButton, response.header.message, toastr.success);
        },
        error: function (xhr, status, error) {
          const response = xhr.responseJSON;
          handleResponse(updateButton, response.header.message, toastr.error);
        },
      });
    }
  });

  function handleResponse(updateButton, message, toastFunction) {
    updateButton.empty().text("Submit");
    toastFunction(message);
  }
});
