import { expect } from "chai";
import { Chance } from "chance";

import { Pursuit, PursuitDocument, User, UserDocument } from "../../../mongoose";
import { ApiHelper } from "../apiHelper";

const index = require("../../");

const apiHelper = new ApiHelper();
const chance = new Chance();

describe("express/routes/pursuitsRouter.ts", function() {
  let admin: UserDocument;
  let pursuit: PursuitDocument;

  beforeEach(async function() {
    admin = await User.mock();
    pursuit = await Pursuit.mock({ ownerId: admin._id });
  });

  describe("GET /pursuits", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/pursuits";
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("GET /pursuits/count", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/pursuits/count";
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("POST /pursuits", function() {
    it("returns a success response", async function() {
      const method = "post";
      const path = "/pursuits";
      const params = {};

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("GET /pursuits/:id", function() {
    it ("returns a success response", async function() {
      const method = "get";
      const path = "/pursuits/" + pursuit._id;
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("PUT /pursuits/:id", function() {
    it("returns a success response", async function() {
      const method = "put";
      const path = "/pursuits/" + pursuit._id;
      const params = {};

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("DELETE /pursuits/:id", function() {
    it("returns a success response", async function() {
      const method = "delete";
      const path = "/pursuits/" + pursuit._id;
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });
});
