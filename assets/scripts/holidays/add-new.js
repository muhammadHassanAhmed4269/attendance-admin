$(document).ready(function () {
  const fields = {
    name: $("#name"),
    startDate: $("#startDate"),
    endDate: $("#endDate"),
    description: $("#description"),
    invalidName: $("#invalid-name"),
    invalidStartDate: $("#invalid-start-date"),
    invalidEndDate: $("#invalid-end-date"),
    invalidDescription: $("#invalid-desc"),
  };

  const validFields = {
    name: $("#name"),
    startDate: $("#startDate"),
    endDate: $("#endDate"),
    description: $("#description"),
  };

  const invalidField = {
    invalidName: $("#invalid-name"),
    invalidStartDate: $("#invalid-start-date"),
    invalidEndDate: $("#invalid-end-date"),
    invalidDescription: $("#invalid-desc"),
  };

  const { name, startDate, endDate, description } = fields;
  const { invalidName, invalidStartDate, invalidEndDate, invalidDescription } =
    invalidField;

  name.on("input", function () {
    invalidName.empty();
    $(this).css("border", "1px solid #5b6ce1");
  });

  startDate.on("select", function () {
    invalidStartDate.empty();
    $(this).css("border", "1px solid #5b6ce1");
  });

  endDate.on("select", function () {
    invalidEndDate.empty();
    $(this).css("border", "1px solid #5b6ce1");
  });

  description.on("input", function () {
    invalidDescription.empty();
    $(this).css("border", "1px solid #5b6ce1");
  });

  fields.startDate
    .datepicker({
      dateFormat: "dd-mm-yyyy",
      onSelect: function (selectedDate) {
        const minEndDate = new Date(selectedDate);
        minEndDate.setDate(minEndDate.getDate() + 1);
        fields.endDate.datepicker("option", "minDate", minEndDate);

        const [startDay, startMonth, startYear] = selectedDate
          .split("-")
          .map(Number);
        const endDateVal = fields.endDate.val();

        if (endDateVal) {
          const [endDay, endMonth, endYear] = endDateVal.split("-").map(Number);

          const isValidStartDate =
            startYear < endYear ||
            (startYear === endYear &&
              startMonth <= endMonth &&
              startDay <= endDay);

          if (!isValidStartDate) {
            displayError(
              fields.startDate,
              invalidField.invalidStartDate,
              "Start date should be less than or equal to the end date"
            );
            return;
          }
        }

        clearErrors();
      },

      language: "en",
    })
    .prop("readonly", true);

  fields.endDate
    .datepicker({
      dateFormat: "dd-mm-yyyy",
      language: "en",
      onSelect: function (selectedDate) {
        const startDateVal = fields.startDate.val().split("-").map(Number);
        const endDateVal = selectedDate.split("-").map(Number);

        const [startDay, startMonth, startYear] = startDateVal;
        const [endDay, endMonth, endYear] = endDateVal;

        if (
          startYear > endYear ||
          (startYear === endYear && startMonth > endMonth) ||
          (startYear === endYear &&
            startMonth === endMonth &&
            startDay > endDay)
        ) {
          displayError(
            fields.endDate,
            invalidField.invalidEndDate,
            "End date should be greater than or equal to start date"
          );
        } else {
          clearErrors();
        }

        const maxStartDate = new Date(selectedDate);
        maxStartDate.setDate(maxStartDate.getDate() - 1);
        fields.startDate.datepicker("option", "maxDate", maxStartDate);
      },
    })
    .prop("readonly", true);

  Object.keys(fields).forEach((key) => {
    fields[key].on("input", function () {
      fields[`invalid${key.charAt(0).toUpperCase() + key.slice(1)}`].empty();
      $(this).css("border", "1px solid #5b6ce1");
    });
  });

  $("#add-holiday-button").on("click", function (event) {
    event.preventDefault();
    handleFormSubmission();
  });

  function handleFormSubmission() {
    const { name, startDate, endDate, description } = fields;

    if (name.val().trim() === "") {
      displayError(name, invalidField.invalidName, "This field is required");
    }
    if (startDate.val() === "") {
      displayError(
        startDate,
        invalidField.invalidStartDate,
        "This field is required"
      );
    }
    if (endDate.val() === "") {
      displayError(
        endDate,
        invalidField.invalidEndDate,
        "This field is required"
      );
    }
    if (description.val() === "") {
      displayError(
        description,
        invalidField.invalidDescription,
        "This field is required"
      );
    } else {
      const endDateErrors = Object.values(invalidField).some(
        (errorField) => errorField.text() !== ""
      );

      if (endDateErrors) {
      } else {
        clearErrors();
        const formData = {
          name: name.val().trim(),
          startDate: formatDate(startDate.val().replace("/", "-")),
          endDate: formatDate(endDate.val().replace("/", "-")),
          description: description.val().trim(),
        };

        showLoadingSpinner();
        $.ajax({
          url: "/api/v1/auth/holiday/add-new",
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
            hideLoadingSpinner();
          },
        });
      }
    }
  }

  function displayError(field, errorField, message) {
    field.css("border", "1px solid #BA0021");
    errorField.text(message);
  }

  function clearErrors() {
    Object.values(validFields).forEach((field) => {
      field.css("border", "1px solid #5b6ce1");
      field.next().empty();
    });
    $("#add-holiday-button").prop("disabled", false);
  }

  function showLoadingSpinner() {
    $("#add-holiday-button").html(`
      <div style="width: 1rem;height: 1rem;" class="spinner-border text-light" role="status">
        <span class="sr-only">Loading...</span>
      </div>`);
  }

  function hideLoadingSpinner() {
    $("#add-holiday-button").html("Submit");
  }

  function handleResponse(message, toastFunction) {
    $("#add-holiday-form")[0].reset();
    hideLoadingSpinner();
    Object.values(fields).forEach((field) => field.val(""));
    toastFunction(message);
  }

  function formatDate(inputDate) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const [day, month, year] = inputDate.split("-");
    const monthName = months[parseInt(month, 10) - 1];
    const formattedDate = `${day}-${monthName}-${year}`;

    return formattedDate;
  }
});
