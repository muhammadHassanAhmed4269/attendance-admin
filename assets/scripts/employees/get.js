$(document).ready(function () {
  const fields = [
    $("#fullName"),
    $("#email"),
    $("#password"),
    $("#profilePicture"),
    $("#mobileNumber"),
    $("#emergencyNumber"),
    $("#nicNumber"),
    $("#nicFrontPicture"),
    $("#nicBackPicture"),
    $("#nextToKin"),
    $("#relationToKin"),
    $("#homeAddress1"),
    $("#homeAddress2"),
  ];

  const invalidFields = [
    $("#invalid-full-name"),
    $("#invalid-email"),
    $("#invalid-password"),
    $("#invalid-profile-picture"),
    $("#invalid-mobile-number"),
    $("#invalid-emergency-number"),
    $("#invalid-nic-number"),
    $("#invalid-nic-front-picture"),
    $("#invalid-nic-back-picture"),
    $("#invalid-next-to-kin"),
    $("#invalid-relation-to-kin"),
    $("#invalid-home-address-1"),
    $("#invalid-home-address-2"),
  ];

  fields.forEach((field, index) => {
    field.on("input", function () {
      invalidFields[index].text("");
      $(this).css("border", "1px solid #5b6ce1");
    });
  });

  $("#profilePic, #nicFront, #nicBack").on("change", function () {
    const id = $(this).attr("id");
    const fileName = $(this).val().split("\\").pop();
    const correspondingField = $(`#${id.replace("Pic", "Picture")}`);

    if (fileName && this.files[0].type.startsWith("image/")) {
      correspondingField.val(`${id.replace("Pic", "Picture")} : ${fileName}`);
    } else {
      alert(
        `Please select an image file for ${id.replace("Pic", "")} picture.`
      );
      $(this).val("");
      correspondingField.val("");
    }
  });

  $("#add-employee-button").on("click", function (event) {
    event.preventDefault();
    const personalDetails = {
      fullName: $("#fullName").val(),
      email: $("#email").val(),
      password: $("#password").val(),
      mobileNumber: $("#mobileNumber").val(),
      emergencyNumber: $("#emergencyNumber").val(),
      nicNumber: $("#nicNumber").val(),
      nextToKin: $("#nextToKin").val(),
      relationToKin: $("#relationToKin").val(),
      homeAddress1: $("#homeAddress1").val(),
      homeAddress2: $("#homeAddress2").val(),
    };

    const assignRole = {
      selectedUnit: $("#unit").val(),
      selectedDepartment: $("#department").val(),
      selectedDesignation: $("#designation").val(),
      selectedRole: $("#role").val(),
    };

    const assignShift = {
      selectedShift: $("#shift").val(),
    };

    const formData = {
      personalDetails,
      assignRole,
      assignShift,
    };
    console.log(formData);

    $("#add-employee-button").html(`
            <div style="width: 1rem;height: 1rem;" class="spinner-border text-light" role="status">
                <span class="sr-only">Loading...</span>
            </div>`);

    $.ajax({
      url: "/api/v1/auth/employee/add-new",
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
    });
  });

  function handleResponse(message, toastFunction) {
    $("#add-employee-button").html("Submit");
    toastFunction(message);
  }
});
