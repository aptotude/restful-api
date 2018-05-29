import { expect } from "chai";
import { Chance } from "chance";

import { Mongoose, UserDocument, FileDocument } from "../../../mongoose";
import { ApiHelper } from "../apiHelper";

const index = require("../../");

const apiHelper = new ApiHelper(index.config);
const chance = new Chance();

describe("express/routes/filesRouter.ts", function() {
  let admin: UserDocument;
  let file: FileDocument;

  beforeEach(async function() {
    admin = await Mongoose.User.mock();
    file = await Mongoose.File.mock({ ownerId: admin._id });
  });

  describe("GET /files", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/files";
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("GET /files/count", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/files/count";
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("POST /files", function() {
    it("returns a success response", async function() {
      const method = "post";
      const path = "/files";
      const params = {};

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("GET /files/:id", function() {
    it ("returns a success response", async function() {
      const method = "get";
      const path = "/files/" + file._id;
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("PUT /files/:id", function() {
    it("returns a success response", async function() {
      const method = "put";
      const path = "/files/" + file._id;
      const params = {};

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("DELETE /files/:id", function() {
    it("returns a success response", async function() {
      const method = "delete";
      const path = "/files/" + file._id;
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });
});
