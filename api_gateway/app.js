var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");

var dotenv = require("dotenv");

dotenv.config();

var app = express();

app.use(
  "/users",
  createProxyMiddleware({
    target:
      "http://" +
      (process.env.USER_APP_HOST || "users-service") +
      ":" +
      (process.env.USER_APP_PORT || "8000"),
    changeOrigin: true,
    secure: false,
  })
);

app.use(
  "/wallets",
  createProxyMiddleware({
    target:
      "http://" +
      (process.env.WALLET_APP_HOST || "wallets-service") +
      ":" +
      (process.env.WALLET_APP_PORT || "8001"),
    changeOrigin: true,
    secure: false,
  })
);

app.use(
  "/rides",
  createProxyMiddleware({
    target:
      "http://" +
      (process.env.RIDE_APP_HOST || "rides-service") +
      ":" +
      (process.env.RIDE_APP_PORT || "8002"),
    changeOrigin: true,
    secure: false,
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

module.exports = app;
