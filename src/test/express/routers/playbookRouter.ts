import { expect } from "chai";
import { Chance } from "chance";

import { User, UserDocument, Playbook, PlaybookDocument } from "../../../mongoose";
import { ApiHelper } from "../apiHelper";

const index = require("../../");

const apiHelper = new ApiHelper();
const chance = new Chance();

describe("express/routes/playbooksRouter.ts", function() {
  let admin: UserDocument;
  let playbook: PlaybookDocument;

  beforeEach(async function() {
    admin = await User.mock();
    playbook = await Playbook.mock({ ownerId: admin._id });
  });

  describe("GET /playbooks", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/playbooks";
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("GET /playbooks/count", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/playbooks/count";
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("POST /playbooks", function() {
    it("returns a success response", async function() {
      const method = "post";
      const path = "/playbooks";
      const params = {};

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("GET /playbooks/:id", function() {
    it ("returns a success response", async function() {
      const method = "get";
      const path = "/playbooks/" + playbook._id;
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("PUT /playbooks/:id", function() {
    it("returns a success response", async function() {
      const method = "put";
      const path = "/playbooks/" + playbook._id;
      const params = {};

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });

  describe("DELETE /playbooks/:id", function() {
    it("returns a success response", async function() {
      const method = "delete";
      const path = "/playbooks/" + playbook._id;
      const params: any = null;

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });
});
