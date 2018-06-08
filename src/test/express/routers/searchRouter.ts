import { expect } from "chai";
import { Chance } from "chance";

import { User, UserDocument } from "../../../mongoose";
import { ApiHelper } from "../apiHelper";

const index = require("../../");

const apiHelper = new ApiHelper();
const chance = new Chance();

describe("express/routes/searchRouter.ts", function() {
  let admin: UserDocument;

  beforeEach(async function() {
    admin = await User.mock();
  });

  describe("GET /search", function() {
    it("returns a success response", async function() {
      const method = "get";
      const path = "/search";
      const params: any = { search: chance.hash() };

      const res = await apiHelper.request(method, path, params, admin);

      expect(res.status).to.eq(200);
    });
  });
});
