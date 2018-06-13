import { expect } from "chai";
import { Chance } from "chance";
import * as express from "express";

import { CallListsController } from "../../../express";
import { User, UserDocument, CallList, CallListDocument } from "../../../mongoose";

const index = require("../../");

const chance = new Chance();
const callListsController = new CallListsController();

describe("express/controllers/callListsController.ts", function() {
  let callList: CallListDocument;
  let user: UserDocument;

  beforeEach(async function() {
    user = await User.mock();
    callList = await CallList.mock({ ownerId: user._id });
  });

  describe("count()", function() {
    it("returns the number of callLists matching the criteria", async function() {
      const req = {
        query: {},
        user
      } as express.Request;

      const res = await callListsController.count(req);

      expect(res.count).to.eql(1);
    });
  });

  describe("create()", function() {
    it("creates a new callList", async function() {
      const req = {
        body: {},
        user
      } as express.Request;

      const res = await callListsController.create(req);

      expect(res.callList).to.exist;
    });
  });

  describe("find()", function() {
    it("returns all callLists", async function() {
      const req = {
        query: {},
        user
      } as express.Request;

      const res = await callListsController.find(req);

      expect(res.callLists.length).to.eql(1);
    });
  });

  describe("findOne()", function() {
    it("returns the callList", async function() {
      const req = {
        params: {
          id: callList._id
        },
        user
      } as express.Request;

      const res = await callListsController.findOne(req);

      expect(res.callList).to.exist;
    });
  });

  describe("remove()", function() {
    it("returns a success message", async function() {
      const req = {
        params: {
          id: callList._id
        },
        user
      } as express.Request;

      const res = await callListsController.remove(req);

      expect(res.message).to.exist;
    });
  });

  describe("update()", function() {
    it("updates and returns the callList", async function() {
      const req = {
        body: {},
        params: {
          id: callList._id
        },
        user
      } as express.Request;

      const res = await callListsController.findOne(req);

      expect(res.callList).to.exist;
    });
  });
});
