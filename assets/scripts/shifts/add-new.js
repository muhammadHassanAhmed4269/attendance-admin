$(document).ready(function () {
  const name = $("#name");
  const startTime = $("#start");
  const endTime = $("#end");
  const invalidName = $("#invalid-name");
  const addButton = $("#add-shift-button");

  name.on("input", function () {
    invalidName.empty();
    $(this).css("border", "1px solid #5b6ce1");
  });

  $("#add-shift-button").on("click", function (event) {
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

      addButton.html(`
        <div style="width: 1rem;height: 1rem;" class="spinner-border text-light" role="status">
          <span class="sr-only">Loading...</span>
        </div>`);

      $.ajax({
        url: "/api/v1/auth/shift/add-new",
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
    $("#add-shift-form")[0].reset();
    addButton.empty().text("Submit");
    name.val("");
    toastFunction(message);
  }

  function convertTo12HourFormat(time24) {
    const [hour24, minutes] = time24.split(":").map(Number);

    const period = hour24 >= 12 ? "PM" : "AM";

    let hour12 = hour24 % 12;
    hour12 = hour12 ? hour12 : 12;

    const time12 = `${hour12}:${minutes.toString().padStart(2, "0")} ${period}`;

    return time12;
  }
});
