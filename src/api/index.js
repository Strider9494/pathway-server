import { Router } from "express";
import registration from "./registration";
import login from "./login";

export default ({ config, User }) => {
  let api = Router();

  // mount the facets resource
  api.use("/registration", registration(User));

  // perhaps expose some API metadata at the root
  api.use("/login", login(User));
  return api;
};
