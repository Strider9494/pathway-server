import http from "http";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import bodyParser from "body-parser";
import initializeDb from "./db";
import api from "./api";
import config from "./config.json";

let app = express();
app.server = http.createServer(app);

// logger
app.use(morgan("dev"));

// 3rd party middleware
app.use(
  cors({
    exposedHeaders: config.corsHeaders
  })
);

app.use(
  bodyParser.json({
    limit: config.bodyLimit
  })
);
app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// connect to db
initializeDb(User => {
  // api routery
  app.use("/api/users", api({ config, User }));

  app.server.listen(process.env.PORT || config.port, () => {
    console.log(`Started on port ${app.server.address().port}`);
  });
});

export default app;
