$(document).ready(function () {
  $("table").on("click", ".delete-role-button", function () {
    const _id = $(this).attr("id");
    const table = $("table").DataTable();

    table.row($(this).parents("tr")).remove().draw(false);

    $.ajax({
      url: "/api/v1/auth/role/delete?_id=" + _id,
      method: "DELETE",
      contentType: "application/json",
      success: function (response) {
        handleResponse(response.header.message, toastr.success);
        updatePagination();
      },
      error: function (xhr, status, error) {
        const response = xhr.responseJSON;
        handleResponse(response.header.message, toastr.error);
      },
    });

    function handleResponse(message, toastFunction) {
      toastFunction(message);
    }

    function updatePagination() {
      table.ajax.reload();
    }
  });
});
