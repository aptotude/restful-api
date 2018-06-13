import { expect } from "chai";
import { Chance } from "chance";
import * as nock from "nock";

import { ContactGroup, ContactGroupDocument, ContactGroupPermissions, User, UserDocument } from "../../../mongoose";

const chance = new Chance();
const index = require("../../");
const permissions = new ContactGroupPermissions();

describe("mongoose/permissions/contactGroupPermissions.ts", function() {
  describe("create()", function() {
    it("creates a new record", async function() {
      const user = await User.mock();
      const params = {
        createdDate: chance.hash(),
        name: chance.hash(),
        numberOfMembers: chance.integer()
      };

      const record = <ContactGroupDocument> await permissions.create(params, { ownerId: user._id }, user);

      expect(record.createdDate).to.eql(params.createdDate);
      expect(record.name).to.eql(params.name);
      expect(record.numberOfMembers).to.eql(params.numberOfMembers);
    });
  });

  describe("read()", function() {
    let record: ContactGroupDocument;
    let user: UserDocument;

    beforeEach(async function() {
      user = await User.mock();
      record = await ContactGroup.mock({
        createdDate: chance.hash(),
        name: chance.hash(),
        numberOfMembers: chance.integer(),
        ownerId: user._id
      });
    });

    it("returns the record", async function() {
      record = <ContactGroupDocument> await permissions.read(record, user);

      expect(record.createdDate).to.exist;
      expect(record.name).to.exist;
      expect(record.numberOfMembers).to.exist;
    });
  });

  describe("remove()", function() {
    let record: ContactGroupDocument;
    let user: UserDocument;

    beforeEach(async function() {
      user = await User.mock();
      record = await ContactGroup.mock({ ownerId: user._id });
    });

    it("returns the record", async function() {
      record = <ContactGroupDocument> await permissions.remove(record, user);

      expect(record).to.exist;
    });
  });

  describe("update()", function() {
    let record: ContactGroupDocument;
    let user: UserDocument;

    beforeEach(async function() {
      user = await User.mock();
      record = await ContactGroup.mock({ ownerId: user._id });
    });

    it("updates and returns the record", async function() {
      const params = {
        createdDate: chance.hash(),
        name: chance.hash(),
        numberOfMembers: chance.integer()
      };

      record = <ContactGroupDocument> await permissions.update(record, params, {}, user);

      expect(record.createdDate).to.eql(params.createdDate);
      expect(record.name).to.eql(params.name);
      expect(record.numberOfMembers).to.eql(params.numberOfMembers);
    });
  });

  describe("where()", function() {
    it("returns a valid where query", async function() {
      const user = await User.mock();
      const params = {};

      const query = await permissions.where(params, user);

      expect(query).to.eql({ ownerId: user._id });
    });
  });
});
