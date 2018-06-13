import { expect } from "chai";
import { Chance } from "chance";
import * as express from "express";

import { PlaybooksController } from "../../../express";
import { User, UserDocument, Playbook, PlaybookDocument } from "../../../mongoose";

const index = require("../../");

const chance = new Chance();
const playbooksController = new PlaybooksController();

describe("express/controllers/playbooksController.ts", function() {
  let playbook: PlaybookDocument;
  let user: UserDocument;

  beforeEach(async function() {
    user = await User.mock();
    playbook = await Playbook.mock({ ownerId: user._id });
  });

  describe("count()", function() {
    it("returns the number of playbooks matching the criteria", async function() {
      const req = {
        query: {},
        user
      } as express.Request;

      const res = await playbooksController.count(req);

      expect(res.count).to.eql(1);
    });
  });

  describe("create()", function() {
    it("creates a new playbook", async function() {
      const req = {
        body: {},
        user
      } as express.Request;

      const res = await playbooksController.create(req);

      expect(res.playbook).to.exist;
    });
  });

  describe("find()", function() {
    it("returns all playbooks", async function() {
      const req = {
        query: {},
        user
      } as express.Request;

      const res = await playbooksController.find(req);

      expect(res.playbooks.length).to.eql(1);
    });
  });

  describe("findOne()", function() {
    it("returns the playbook", async function() {
      const req = {
        params: {
          id: playbook._id
        },
        user
      } as express.Request;

      const res = await playbooksController.findOne(req);

      expect(res.playbook).to.exist;
    });
  });

  describe("remove()", function() {
    it("returns a success message", async function() {
      const req = {
        params: {
          id: playbook._id
        },
        user
      } as express.Request;

      const res = await playbooksController.remove(req);

      expect(res.message).to.exist;
    });
  });

  describe("update()", function() {
    it("updates and returns the playbook", async function() {
      const req = {
        body: {},
        params: {
          id: playbook._id
        },
        user
      } as express.Request;

      const res = await playbooksController.findOne(req);

      expect(res.playbook).to.exist;
    });
  });
});
