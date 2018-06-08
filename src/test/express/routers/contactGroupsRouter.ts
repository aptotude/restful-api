import { expect } from "chai";
import { Chance } from "chance";

import { ContactGroup, ContactGroupDocument, User, UserDocument } from "../../../mongoose";
import { ApiHelper } from "../apiHelper";

const index = require("../../");

const apiHelper = new ApiHelper();
const chance = new Chance();

describe("express/routes/contactGroupsRouter.ts", function() {
  let admin: UserDocument;
  let contactGroup: ContactGroupDocument;

  beforeEach(async function() {
    admin = await User.mock();
    contactGroup = await ContactGroup.mock({ ownerId: admin._id });
  });

  describe("GET /contact-groups", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/contact-groups";
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("GET /contact-groups/count", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/contact-groups/count";
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("POST /contact-groups", function() {
    it("returns a success response", async function() {
      const method = "post";
      const path = "/contact-groups";
      const params = {};

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("GET /contact-groups/:id", function() {
    it ("returns a success response", async function() {
      const method = "get";
      const path = "/contact-groups/" + contactGroup._id;
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("PUT /contact-groups/:id", function() {
    it("returns a success response", async function() {
      const method = "put";
      const path = "/contact-groups/" + contactGroup._id;
      const params = {};

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("DELETE /contact-groups/:id", function() {
    it("returns a success response", async function() {
      const method = "delete";
      const path = "/contact-groups/" + contactGroup._id;
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });
});
