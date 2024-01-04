$(document).ready(function () {
  const table = $("table").DataTable();

  $("table").on("click", ".delete-designation-button", function () {
    const _id = $(this).attr("id");
    const $row = $(this).closest("tr");

    table.row($row).remove().draw(false);

    $.ajax({
      url: `/api/v1/auth/designation/delete?_id=${_id}`,
      method: "DELETE",
      contentType: "application/json",
      success: function (response) {
        toastr.success(response.header.message);
        updatePagination();
      },
      error: function (xhr) {
        const response = xhr.responseJSON || {
          header: { message: "An error occurred" },
        };
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
    const newTotalEntries = designations.length;
    return newTotalEntries;
  }
});
