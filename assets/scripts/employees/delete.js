$(document).ready(function () {
  $("table").on("click", ".delete-employee-button", function () {
    const _id = $(this).attr("id");
    const table = $("table").DataTable();

    table.row($(this).parents("tr")).remove().draw(false);

    $.ajax({
      url: "/api/v1/auth/employee/delete?_id=" + _id,
      method: "DELETE",
      contentType: "application/json",
      success: function (response) {
        handleResponse(response.header.message, toastr.success);
        updatePagination();
      },
      error: function (xhr, status, error) {
        const response = xhr.responseJSON;
        handleResponse(response.header.message, toastr.error);
        // If there's an error, you might want to consider adding the removed row back to the table.
      },
    });

    function handleResponse(message, toastFunction) {
      toastFunction(message);
    }

    function updatePagination() {
      // After deletion, you might want to update the pagination by reloading data from the server.
      table.ajax.reload(null, false); // This reloads the table data without changing the current paging position.
    }
  });
});
