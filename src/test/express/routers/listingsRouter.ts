import { expect } from "chai";
import { Chance } from "chance";

import { Listing, ListingDocument, User, UserDocument } from "../../../mongoose";
import { ApiHelper } from "../apiHelper";

const index = require("../../");

const apiHelper = new ApiHelper();
const chance = new Chance();

describe("express/routes/listingsRouter.ts", function() {
  let admin: UserDocument;
  let listing: ListingDocument;

  beforeEach(async function() {
    admin = await User.mock();
    listing = await Listing.mock({ ownerId: admin._id });
  });

  describe("GET /listings", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/listings";
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("GET /listings/count", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/listings/count";
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("POST /listings", function() {
    it("returns a success response", async function() {
      const method = "post";
      const path = "/listings";
      const params = {};

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("GET /listings/:id", function() {
    it ("returns a success response", async function() {
      const method = "get";
      const path = "/listings/" + listing._id;
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("PUT /listings/:id", function() {
    it("returns a success response", async function() {
      const method = "put";
      const path = "/listings/" + listing._id;
      const params = {};

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("DELETE /listings/:id", function() {
    it("returns a success response", async function() {
      const method = "delete";
      const path = "/listings/" + listing._id;
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });
});
