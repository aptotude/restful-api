require("source-map-support").install();

import * as bluebird from "bluebird";

import { Documentation } from "./documentation";
import { Express } from "./express";
import { Loggly } from "./loggly";
import { Mongoose, User } from "./mongoose";
import { Passport } from "./passport";
import { SocketIo } from "./socketIo";

global.Promise = bluebird;

// Load environment
process.env.ENVIRONMENT = process.env.ENVIRONMENT || "local";
if (process.env.ENVIRONMENT !== "test") console.log("Using Environment: " + process.env.ENVIRONMENT);

// Setup components
const loggly = new Loggly();
const mongoose = new Mongoose();
const express = new Express();
const documentation = new Documentation(express.app);
const passport = new Passport(express.app);
const socketIo = new SocketIo(express.server);

export = { documentation, express, mongoose, passport, socketIo };

// Create admin user if user doesn't exit, but only when running locally
if (process.env.ENVIRONMENT === "local") {
  User.update({
    email: "test@example.com"
  }, {
    email: "test@example.com",
    level: 1,
    password: User.getPasswordHash("password")
  }, {
    new: true,
    upsert: true
  }, (err, user) => {
    if (err) console.error(err);
  });
}
