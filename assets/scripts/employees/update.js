$(document).ready(function () {
  const fullName = $("#fullName");
  const email = $("#email");
  const password = $("#password");
  // const profilePicture = $("#profilePicture");
  const mobileNumber = $("#mobileNumber");
  const emergencyNumber = $("#emergencyNumber");
  const nicNumber = $("#nicNumber");
  // const nicFrontPicture = $("#nicFrontPicture");
  // const nicBackPicture = $("#nicBackPicture");
  const nextToKin = $("#nextToKin");
  const relationToKin = $("#relationToKin");
  const homeAddress1 = $("#homeAddress1");
  const homeAddress2 = $("#homeAddress2");

  const grossSalary = $("#grossSalary");
  const basicSalary = $("#basicSalary");
  const houseRent = $("#houseRent");
  const utility = $("#utility");
  const medicalAllowance = $("#medicalAllowance");
  const taxableAmount = $("#taxableAmount");
  const incomeTax = $("#incomeTax");
  const eobi = $("#eobi");
  const bankCharges = $("#bankCharges");

  let selectedUnit;
  let selectedDepartment;
  let selectedDesignation;
  let selectedRole;
  let selectedShift;

  let profilePicture;
  let frontPicture;
  let backPicture;

  $("#unit").on("change", function () {
    selectedUnit = $(this).val();
  });
  $("#department").on("change", function () {
    selectedDepartment = $(".department li.option.selected").data("value");
  });

  $("#designation").on("change", function () {
    selectedDesignation = $(".designation li.option.selected").data("value");
  });

  $("#employee-role").on("change", function () {
    selectedRole = $(".employee-role li.option.selected").data("value");
  });
  $("#shift").on("change", function () {
    selectedShift = $(this).val();
  });

  const invalidfullName = $("#invalid-full-name");
  const invalidemail = $("#invalid-email");
  const invalidpassword = $("#invalid-password");
  const invalidmobileNumber = $("#invalid-mobile-number");
  const invalidprofilePicture = $("#invalid-profile-picture");
  const invalidemergencyNumber = $("#invalid-emergency-number");
  const invalidnicNumber = $("#invalid-nic-number");
  const invalidnicFrontPicture = $("#invalid-nic-front-picture");
  const invalidnicBackPicture = $("#invalid-nic-back-picture");
  const invalidnextToKin = $("#invalid-next-to-kin");
  const invalidrelationToKin = $("#invalid-relation-to-kin");
  const invalidhomeAddress1 = $("#invalid-home-address-1");
  const invalidhomeAddress2 = $("#invalid-home-address-2");
  const invalidselectedUnit = $("#invalid-unit");
  const invalidselectedDepartment = $("#invalid-department");
  const invalidselectedDesignation = $("#invalid-designation");
  const invalidselectedRole = $("#invalid-role");
  const invalidselectedShift = $("#invalid-shift");

  const invalidgrossSalary = $("#invalid-gross-salary");
  const invalidbasicSalary = $("#invalid-basic-salary");
  const invalidhouseRent = $("#invalid-house-rent");
  const invalidutility = $("#invalid-utility");
  const invalidmedicalAllowance = $("#invalid-medical-allowance");
  const invalidtaxableAmount = $("#invalid-taxable-amount");
  const invalidincomeTax = $("#invalid-income-tax");
  const invalideobi = $("#invalid-eobi");
  const invalidbankCharges = $("#invalid-bank-charges");

  fullName.on("input", function () {
    invalidfullName.text("");
    $(this).css("border", "1px solid #5b6ce1");
    $(this).css("border", "1px solid #5b6ce1");
  });
  email.on("input", function () {
    invalidemail.text("");
    $(this).css("border", "1px solid #5b6ce1");
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (emailPattern.test(email.val())) {
      $(this).css("border", "1px solid #5b6ce1");
      invalidemail.text("");
    } else {
      email.css("border", "1px solid #BA0021");
      invalidemail.text("Invalid email");
    }
  });
  password.on("input", function () {
    invalidpassword.text("");
    $(this).css("border", "1px solid #5b6ce1");
    $(this).css("border", "1px solid #5b6ce1");
  });
  mobileNumber.on("input", function () {
    invalidmobileNumber.text("");
    $(this).css("border", "1px solid #5b6ce1");
    $(this).css("border", "1px solid #5b6ce1");
    const mobileNumberPattern = /^(03|\+923)\d{9}$/;
    if (mobileNumberPattern.test(mobileNumber.val())) {
      $(this).css("border", "1px solid #5b6ce1");
      invalidmobileNumber.text("");
    } else {
      mobileNumber.css("border", "1px solid #BA0021");
      invalidmobileNumber.text("Invalid mobile number");
    }
  });
  emergencyNumber.on("input", function () {
    invalidemergencyNumber.text("");
    $(this).css("border", "1px solid #5b6ce1");
    $(this).css("border", "1px solid #5b6ce1");
    const emergencyNumberPattern = /^(03|\+923)\d{9}$/;
    if (emergencyNumberPattern.test(emergencyNumber.val())) {
      $(this).css("border", "1px solid #5b6ce1");
      invalidemergencyNumber.text("");
    } else {
      emergencyNumber.css("border", "1px solid #BA0021");
      invalidemergencyNumber.text("Invalid emergency number");
    }
  });
  nicNumber.on("input", function () {
    invalidnicNumber.text("");
    $(this).css("border", "1px solid #5b6ce1");
    const nicPattern = /^\d{5}-\d{7}-\d$/;
    if (nicPattern.test(nicNumber.val())) {
      $(this).css("border", "1px solid #5b6ce1");
    } else {
      nicNumber.css("border", "1px solid #BA0021");
      invalidnicNumber.text("Invalid NIC number");
    }
  });
  nextToKin.on("input", function () {
    invalidnextToKin.text("");
    $(this).css("border", "1px solid #5b6ce1");
    $(this).css("border", "1px solid #5b6ce1");
  });
  relationToKin.on("input", function () {
    invalidrelationToKin.text("");
    $(this).css("border", "1px solid #5b6ce1");
    $(this).css("border", "1px solid #5b6ce1");
  });
  homeAddress1.on("input", function () {
    invalidhomeAddress1.text("");
    $(this).css("border", "1px solid #5b6ce1");
    $(this).css("border", "1px solid #5b6ce1");
  });
  homeAddress2.on("input", function () {
    invalidhomeAddress2.text("");
    $(this).css("border", "1px solid #5b6ce1");
    $(this).css("border", "1px solid #5b6ce1");
  });
  grossSalary.on("input", function () {
    invalidgrossSalary.text("");
    $(this).css("border", "1px solid #5b6ce1");
    $(this).css("border", "1px solid #5b6ce1");
  });
  basicSalary.on("input", function () {
    invalidbasicSalary.text("");
    $(this).css("border", "1px solid #5b6ce1");
    $(this).css("border", "1px solid #5b6ce1");
  });
  houseRent.on("input", function () {
    invalidhouseRent.text("");
    $(this).css("border", "1px solid #5b6ce1");
    $(this).css("border", "1px solid #5b6ce1");
  });
  utility.on("input", function () {
    invalidutility.text("");
    $(this).css("border", "1px solid #5b6ce1");
    $(this).css("border", "1px solid #5b6ce1");
  });
  taxableAmount.on("input", function () {
    invalidtaxableAmount.text("");
    $(this).css("border", "1px solid #5b6ce1");
    $(this).css("border", "1px solid #5b6ce1");
  });
  incomeTax.on("input", function () {
    invalidincomeTax.text("");
    $(this).css("border", "1px solid #5b6ce1");
    $(this).css("border", "1px solid #5b6ce1");
  });
  eobi.on("input", function () {
    invalideobi.text("");
    $(this).css("border", "1px solid #5b6ce1");
    $(this).css("border", "1px solid #5b6ce1");
  });
  bankCharges.on("input", function () {
    invalidbankCharges.text("");
    $(this).css("border", "1px solid #5b6ce1");
    $(this).css("border", "1px solid #5b6ce1");
  });
  medicalAllowance.on("input", function () {
    invalidmedicalAllowance.text("");
    $(this).css("border", "1px solid #5b6ce1");
    $(this).css("border", "1px solid #5b6ce1");
  });

  $("#profilePic").on("change", function () {
    profilePicture = this.files[0];
    if (profilePicture && profilePicture.type.startsWith("image/")) {
      $("#profilePicture").val("Profile Picture: " + profilePicture.name);
    } else {
      alert("Please select an image file for profile picture.");
      $(this).val("");
      $("#profilePicture").val("");
    }
  });

  $("#nicFront").on("change", function () {
    frontPicture = this.files[0];
    if (frontPicture && frontPicture.type.startsWith("image/")) {
      $("#nicFrontPicture").val("NIC Front Picture: " + frontPicture.name);
    } else {
      alert("Please select an image file for NIC front picture.");
      $(this).val("");
      $("#nicFrontPicture").val("");
    }
  });

  $("#nicBack").on("change", function () {
    backPicture = this.files[0];
    if (backPicture && backPicture.type.startsWith("image/")) {
      $("#nicBackPicture").val("NIC Back Picture: " + backPicture.name);
    } else {
      alert("Please select an image file for NIC back picture.");
      $(this).val("");
      $("#nicBackPicture").val("");
    }
  });

  $("#update-employee-button").on("click", function (event) {
    event.preventDefault();

    const properties = {
      fullName: fullName.val(),
      email: email.val(),
      password: password.val(),
      profilePicture,
      mobileNumber: mobileNumber.val(),
      emergencyNumber: emergencyNumber.val(),
      nicNumber: nicNumber.val(),
      nicFrontPicture: frontPicture,
      nicBackPicture: backPicture,
      nextToKin: nextToKin.val(),
      relationToKin: relationToKin.val(),
      homeAddress1: homeAddress1.val(),
      homeAddress2: homeAddress2.val(),
      grossSalary: grossSalary.val(),
      basicSalary: basicSalary.val(),
      houseRent: houseRent.val(),
      medicalAllowance: medicalAllowance.val(),
      utility: utility.val(),
      taxableAmount: taxableAmount.val(),
      incomeTax: incomeTax.val(),
      eobi: eobi.val(),
      bankCharges: bankCharges.val(),
      selectedUnit,
      selectedDepartment,
      selectedDesignation,
      selectedRole,
      selectedShift,
    };

    if (properties.fullName === "") {
      fullName.css("border", "1px solid #BA0021");
      invalidfullName.text("This field is required");
    }

    if (properties.email === "") {
      email.css("border", "1px solid #BA0021");
      invalidemail.text("This field is required");
    }

    if (properties.password === "") {
      password.css("border", "1px solid #BA0021");
      invalidpassword.text("This field is required");
    }

    if (properties.mobileNumber === "") {
      mobileNumber.css("border", "1px solid #BA0021");
      invalidmobileNumber.text("This field is required");
    }

    if (properties.emergencyNumber === "") {
      emergencyNumber.css("border", "1px solid #BA0021");
      invalidemergencyNumber.text("This field is required");
    }

    if (properties.nicNumber === "") {
      nicNumber.css("border", "1px solid #BA0021");
      invalidnicNumber.text("This field is required");
    }

    if (properties.nextToKin === "") {
      nextToKin.css("border", "1px solid #BA0021");
      invalidnextToKin.text("This field is required");
    }

    if (properties.relationToKin === "") {
      relationToKin.css("border", "1px solid #BA0021");
      invalidrelationToKin.text("This field is required");
    }

    if (properties.homeAddress1 === "") {
      homeAddress1.css("border", "1px solid #BA0021");
      invalidhomeAddress1.text("This field is required");
    }

    if (properties.homeAddress2 === "") {
      homeAddress2.css("border", "1px solid #BA0021");
      invalidhomeAddress2.text("This field is required");
    }

    if (properties.grossSalary === "") {
      grossSalary.css("border", "1px solid #BA0021");
      invalidgrossSalary.text("This field is required");
    }

    if (properties.basicSalary === "") {
      basicSalary.css("border", "1px solid #BA0021");
      invalidbasicSalary.text("This field is required");
    }

    if (properties.houseRent === "") {
      houseRent.css("border", "1px solid #BA0021");
      invalidhouseRent.text("This field is required");
    }

    if (properties.medicalAllowance === "") {
      medicalAllowance.css("border", "1px solid #BA0021");
      invalidmedicalAllowance.text("This field is required");
    }

    if (properties.utility === "") {
      utility.css("border", "1px solid #BA0021");
      invalidutility.text("This field is required");
    }

    if (properties.taxableAmount === "") {
      taxableAmount.css("border", "1px solid #BA0021");
      invalidtaxableAmount.text("This field is required");
    }

    if (properties.incomeTax === "") {
      incomeTax.css("border", "1px solid #BA0021");
      invalidincomeTax.text("This field is required");
    }

    if (properties.eobi === "") {
      eobi.css("border", "1px solid #BA0021");
      invalideobi.text("This field is required");
    }

    if (properties.bankCharges === "") {
      bankCharges.css("border", "1px solid #BA0021");
      invalidbankCharges.text("This field is required");
    }

    if (properties.selectedUnit === "") {
      selectedUnit.css("border", "1px solid #BA0021");
      invalidselectedUnit.text("This field is required");
    }

    if (properties.selectedDepartment === "") {
      selectedDepartment.css("border", "1px solid #BA0021");
      invalidselectedDepartment.text("This field is required").show();
    }

    if (properties.selectedDesignation === "") {
      selectedDesignation.css("border", "1px solid #BA0021");
      invalidselectedDesignation.text("This field is required");
    }

    if (properties.selectedRole === "") {
      selectedRole.css("border", "1px solid #BA0021");
      invalidselectedRole.text("This field is required");
    }

    if (properties.selectedShift === "") {
      selectedShift.css("border", "1px solid #BA0021");
      invalidselectedShift.text("This field is required");
    }

    $("#update-employee-button").html(`
            <div style="width: 1rem;height: 1rem;" class="spinner-border text-light" role="status">
                <span class="sr-only">Loading...</span>
            </div>`);

    const formData = {
      fullName: fullName.val(),
      email: email.val(),
      password: password.val(),
      profilePicture,
      mobileNumber: mobileNumber.val(),
      emergencyNumber: emergencyNumber.val(),
      nicNumber: nicNumber.val(),
      nicFrontPicture: frontPicture,
      nicBackPicture: backPicture,
      nextToKin: nextToKin.val(),
      relationToKin: relationToKin.val(),
      homeAddress1: homeAddress1.val(),
      homeAddress2: homeAddress2.val(),
      grossSalary: grossSalary.val().replace("PKR:", ""),
      basicSalary: basicSalary.val().replace("PKR:", ""),
      houseRent: houseRent.val().replace("PKR:", ""),
      medicalAllowance: medicalAllowance.val().replace("PKR:", ""),
      utility: utility.val().replace("PKR:", ""),
      taxableAmount: taxableAmount.val().replace("PKR:", ""),
      incomeTax: incomeTax.val().replace("PKR:", ""),
      eobi: eobi.val().replace("PKR:", ""),
      bankCharges: bankCharges.val().replace("PKR:", ""),
      selectedUnit,
      selectedDepartment,
      selectedDesignation,
      selectedRole,
      selectedShift,
    };
    console.log({ formData });

    const urlParams = new URLSearchParams(window.location.search);
    const _id = urlParams.get("_id");

    $.ajax({
      url: "/api/v1/auth/employee/update?_id=" + _id,
      method: "PUT",
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
    // $("#update-employee-form")[0].reset();
    $("#update-employee-button").html("Submit");
    toastFunction(message);
  }
});
