$(document).ready(function () {
  const table = $("table").DataTable();

  $("table").on("click", ".delete-department-button", function () {
    const _id = $(this).attr("id");
    const $row = $(this).closest("tr");

    table.row($row).remove().draw(false);

    $.ajax({
      url: "/api/v1/auth/department/delete?_id=" + _id,
      method: "DELETE",
      contentType: "application/json",
      success: function (response) {
        toastr.success(response.header.message);
        updatePagination();
      },
      error: function (xhr) {
        const response = xhr.responseJSON;
        toastr.error(response.header.message);
        // Revert deletion on error
        table.row.add($row).draw(false);
      },
    });
  });

  function updatePagination() {
    const newTotalEntries = calculateTotalEntriesAfterDeletion();
    table.page.len(newTotalEntries).draw();
  }

  function calculateTotalEntriesAfterDeletion() {
    const newTotalEntries = departments.length;
    return newTotalEntries;
  }
});
