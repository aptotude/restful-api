import { expect } from "chai";
import { Chance } from "chance";
import * as nock from "nock";

import { Mongoose, FileDocument, FilePermissions, UserDocument } from "../../../mongoose";

const chance = new Chance();
const index = require("../../");
const permissions = new FilePermissions();

describe("mongoose/permissions/filePermissions.ts", function() {
  describe("create()", function() {
    it("creates a new record", async function() {
      const user = await Mongoose.User.mock();
      const params = {
        isPublic: chance.bool(),
        name: chance.hash(),
        ownerId: user._id
      };

      const record = <FileDocument> await permissions.create(params, {}, user);

      expect(record.isPublic).to.eql(params.isPublic);
      expect(record.name).to.eql(params.name);
      expect(record.ownerId).to.eql(params.ownerId);
    });
  });

  describe("read()", function() {
    let record: FileDocument;
    let user: UserDocument;

    beforeEach(async function() {
      user = user = await Mongoose.User.mock();
      record = await Mongoose.File.mock({
        isPublic: chance.bool(),
        name: chance.hash(),
        ownerId: user._id
      });
    });

    it("returns the record", async function() {
      record = <FileDocument> await permissions.read(record, user);

      expect(record.isPublic).to.exist;
      expect(record.name).to.exist;
      expect(record.ownerId).to.exist;
    });
  });

  describe("remove()", function() {
    let record: FileDocument;

    beforeEach(async function() {
      record = await Mongoose.File.mock();
    });

    it("returns the record", async function() {
      const user = await Mongoose.User.mock();

      record = <FileDocument> await permissions.remove(record, user);

      expect(record).to.exist;
    });
  });

  describe("update()", function() {
    let record: FileDocument;

    beforeEach(async function() {
      record = await Mongoose.File.mock();
    });

    it("updates and returns the record", async function() {
      const user = await Mongoose.User.mock();
      const params = {
        isPublic: chance.bool(),
        name: chance.hash(),
        ownerId: user._id
      };

      record = <FileDocument> await permissions.update(record, params, {}, user);

      expect(record.isPublic).to.eql(params.isPublic);
      expect(record.name).to.eql(params.name);
      expect(record.ownerId).to.eql(params.ownerId);
    });
  });

  describe("where()", function() {
    it("returns a valid where query", async function() {
      const user = await Mongoose.User.mock();
      const params = {};

      const query = await permissions.where(params, user);

      expect(query).to.eql({ ownerId: user._id });
    });
  });
});
