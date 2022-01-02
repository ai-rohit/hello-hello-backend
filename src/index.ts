import express from "express";
import verify from "jsonwebtoken";

const app = express();

app.get("/", async (req: any, res) => {
  res.json("test");
});

console.error("Test Error");
