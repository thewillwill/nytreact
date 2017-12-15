const router = require("express").Router();
const articleRoutes = require("./articles");
const searchRoutes = require("./search");

// Articles routes
router.use("/articles", articleRoutes);

//NYT API Search routes
router.use("/search", searchRoutes)

module.exports = router;
