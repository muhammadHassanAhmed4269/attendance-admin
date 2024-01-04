$(document).ready(function () {
  const name = $("#name");
  const invalidName = $("#invalid-name");
  const addButton = $("#add-role-button");

  name.on("input", function () {
    invalidName.empty();
    $(this).css("border", "1px solid #5b6ce1");
  });

  addButton.on("click", function (event) {
    event.preventDefault();

    const checkedIDs = $('input[type="checkbox"][id^="course_"]:checked')
      .map(function () {
        return { _id: $(this).attr("id").replace("course_", "") };
      })
      .get();

    const inputValue = name.val().trim();

    if (inputValue === "") {
      name.css("border", "1px solid #BA0021");
      invalidName.text("This field is required");
    } else {
      name.css("border", "1px solid #5b6ce1");
      invalidName.empty();
      const formData = { name: inputValue, permissions: checkedIDs };

      addButton.html(`
        <div style="width: 1rem;height: 1rem;" class="spinner-border text-light" role="status">
          <span class="sr-only">Loading...</span>
        </div>`);

      $.ajax({
        url: "/api/v1/auth/role/add-new",
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

  function resetForm() {
    $("#add-role-form")[0].reset();
    addButton.empty().text("Submit");
    name.val("");
  }

  function handleResponse(message, toastFunction) {
    resetForm();
    toastFunction(message);
  }
});
