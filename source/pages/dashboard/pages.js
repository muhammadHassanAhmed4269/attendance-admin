class Pages {
  getDashboard(req, res) {
    try {
      return res.render("dashboard/get", {
        title: "Dashboard",
        user: req?.user,
      });
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Pages;
