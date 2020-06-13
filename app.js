const express = require("express");
const path = require("path");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const indexRoutes = require("./public/routes/index");
const userRoutes = require("./public/routes/users");

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// server static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", indexRoutes);
app.use("/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
