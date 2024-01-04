$(document).ready(function () {
  const name = $("#name");
  const startTime = $("#start");
  const endTime = $("#end");
  const invalidName = $("#invalid-name");
  const updateButton = $("#update-shift-button");

  name.on("input", function () {
    invalidName.empty();
    $(this).css("border", "1px solid #5b6ce1");
  });

  $("#update-shift-button").on("click", function (event) {
    event.preventDefault();

    const inputValue = name.val().trim();

    if (inputValue === "") {
      name.css("border", "1px solid #BA0021");
      invalidName.text("This field is required");
    } else {
      name.css("border", "1px solid #5b6ce1");
      invalidName.empty();
      let formData;
      if (startTime.val() !== "" && endTime.val() !== "") {
        formData = {
          name: inputValue,
          timings: {
            start: convertTo12HourFormat(startTime.val()),
            end: convertTo12HourFormat(endTime.val()),
          },
        };
      } else {
        formData = {
          name: inputValue,
        };
      }

      updateButton.html(`
        <div style="width: 1rem;height: 1rem;" class="spinner-border text-light" role="status">
          <span class="sr-only">Loading...</span>
        </div>`);

      const urlParams = new URLSearchParams(window.location.search);
      const _id = urlParams.get("_id");

      $.ajax({
        url: "/api/v1/auth/shift/update?_id=" + _id,
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
