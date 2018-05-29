import { expect } from "chai";
import { Chance } from "chance";
import * as express from "express";

import { FilesController } from "../../../express";
import { Mongoose, UserDocument, FileDocument } from "../../../mongoose";

const index = require("../../");

const chance = new Chance();
const filesController = new FilesController();

describe("express/controllers/filesController.ts", function() {
  let file: FileDocument;
  let user: UserDocument;

  beforeEach(async function() {
    user = await Mongoose.User.mock();
    file = await Mongoose.File.mock({ ownerId: user._id });
  });

  describe("count()", function() {
    it("returns the number of files matching the criteria", async function() {
      const req = {
        query: {},
        user
      } as express.Request;

      const res = await filesController.count(req);

      expect(res.count).to.eql(1);
    });
  });

  describe("create()", function() {
    it("creates a new file", async function() {
      const req = {
        body: {},
        user
      } as express.Request;

      const res = await filesController.create(req);

      expect(res.file).to.exist;
    });
  });

  describe("find()", function() {
    it("returns all files", async function() {
      const req = {
        query: {},
        user
      } as express.Request;

      const res = await filesController.find(req);

      expect(res.files.length).to.eql(1);
    });
  });

  describe("findOne()", function() {
    it("returns the file", async function() {
      const req = {
        params: {
          id: file._id
        },
        user
      } as express.Request;

      const res = await filesController.findOne(req);

      expect(res.file).to.exist;
    });
  });

  describe("remove()", function() {
    it("returns a success message", async function() {
      const req = {
        params: {
          id: file._id
        },
        user
      } as express.Request;

      const res = await filesController.remove(req);

      expect(res.message).to.exist;
    });
  });

  describe("update()", function() {
    it("updates and returns the file", async function() {
      const req = {
        body: {},
        params: {
          id: file._id
        },
        user
      } as express.Request;

      const res = await filesController.findOne(req);

      expect(res.file).to.exist;
    });
  });
});
