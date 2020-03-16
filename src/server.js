import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./components/App";

const app = express();

app.set("view engine", "ejs");
app.set("views", "src/views");
app.use("/static", express.static("public"));

app.get("*", async (req, res) => {
  const context = {};
  res.render("layout", {
    content: ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    )
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
