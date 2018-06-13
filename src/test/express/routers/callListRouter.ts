import { expect } from "chai";
import { Chance } from "chance";

import { User, UserDocument, CallList, CallListDocument } from "../../../mongoose";
import { ApiHelper } from "../apiHelper";

const index = require("../../");

const apiHelper = new ApiHelper();
const chance = new Chance();

describe("express/routes/callListsRouter.ts", function() {
  let admin: UserDocument;
  let callList: CallListDocument;

  beforeEach(async function() {
    admin = await User.mock();
    callList = await CallList.mock({ ownerId: admin._id });
  });

  describe("GET /call-lists", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/call-lists";
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("GET /call-lists/count", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/call-lists/count";
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("POST /call-lists", function() {
    it("returns a success response", async function() {
      const method = "post";
      const path = "/call-lists";
      const params = {};

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("GET /call-lists/:id", function() {
    it ("returns a success response", async function() {
      const method = "get";
      const path = "/call-lists/" + callList._id;
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("PUT /call-lists/:id", function() {
    it("returns a success response", async function() {
      const method = "put";
      const path = "/call-lists/" + callList._id;
      const params = {};

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("DELETE /call-lists/:id", function() {
    it("returns a success response", async function() {
      const method = "delete";
      const path = "/call-lists/" + callList._id;
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });
});
