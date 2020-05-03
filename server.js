const express = require("express");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");


// Initialize the app and create a port
const app = express();
//using port 8000 because I kept getting an error "in use" for 3000
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


// app.use("/api", apiRoutes);
app.use("/", htmlRoutes);
app.use("/api", apiRoutes);

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));