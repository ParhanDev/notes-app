import express from "express";
import { sayHello } from "../Handlers/helloHandler.js";

const helloRouter = express.Router();

helloRouter.get("/", sayHello);

export default helloRouter;