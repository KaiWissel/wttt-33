import express from "express";
import { handler as ssrHandler } from "./dist/server/entry.mjs";
import morgan from "morgan";

const app = express();
app.use(express.static("dist/client/"));
app.use(morgan("combined"));
app.use(ssrHandler);

app.listen(54321);

console.log("Server is up and");
