$(document).ready(function () {
  const name = $("#name");
  const invalidName = $("#invalid-name");
  const updateButton = $("#update-department-button");

  name.on("input", function () {
    invalidName.empty();
    $(this)
      .toggleClass("valid", this.value.trim() !== "")
      .css("border", "");
  });

  updateButton.on("click", function (event) {
    event.preventDefault();

    const checkedIDs = $('input[type="checkbox"][id^="course_"]:checked')
      .map(function () {
        return { _id: this.id.replace("course_", "") };
      })
      .get();

    const inputValue = name.val().trim();

    if (!inputValue) {
      name.css("border", "1px solid #BA0021");
      invalidName.text("This field is required");
      return;
    }

    name.css("border", "").toggleClass("valid", true);
    invalidName.empty();

    const formData = { name: inputValue, designations: checkedIDs };

    updateButton.html(`
      <div style="width: 1rem;height: 1rem;" class="spinner-border text-light" role="status">
        <span class="sr-only">Loading...</span>
      </div>`);

    const urlParams = new URLSearchParams(window.location.search);
    const _id = urlParams.get("_id");

    $.ajax({
      url: `/api/v1/auth/department/update?_id=${_id}`,
      method: "PUT",
      contentType: "application/json",
      data: JSON.stringify(formData),
      success: function (response) {
        handleResponse(response.header.message, toastr.success);
      },
      error: function (xhr) {
        const response = xhr.responseJSON || {
          header: { message: "An error occurred" },
        };
        handleResponse(response.header.message, toastr.error);
        updateButton.html("Submit");
      },
    });
  });

  function handleResponse(message, toastFunction) {
    toastFunction(message);
  }
});
