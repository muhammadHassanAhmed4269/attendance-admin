class Pages {
  getLogin(req, res) {
    try {
      return res.render("auth/get", { title: "Login" });
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Pages;
