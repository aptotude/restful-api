import { expect } from "chai";
import { Chance } from "chance";
import * as nock from "nock";

import { Ownership, OwnershipDocument, OwnershipPermissions, User, UserDocument } from "../../../mongoose";

const chance = new Chance();
const index = require("../../");
const permissions = new OwnershipPermissions();

describe("mongoose/permissions/ownershipPermissions.ts", function() {
  describe("create()", function() {
    it("creates a new record", async function() {
      const user = await User.mock();
      const params = {
        companyId: chance.hash(),
        companyIdFromTrigger: chance.hash(),
        contactId: chance.hash(),
        contactRole: chance.hash(),
        isPrimaryContact: chance.bool(),
        propertyId: chance.hash()
      };

      const record = <OwnershipDocument> await permissions.create(params, { ownerId: user._id }, user);

      expect(record.companyId).to.eql(params.companyId);
      expect(record.companyIdFromTrigger).to.eql(params.companyIdFromTrigger);
      expect(record.contactId).to.eql(params.contactId);
      expect(record.contactRole).to.eql(params.contactRole);
      expect(record.isPrimaryContact).to.eql(params.isPrimaryContact);
      expect(record.propertyId).to.eql(params.propertyId);
    });
  });

  describe("read()", function() {
    let record: OwnershipDocument;
    let user: UserDocument;

    beforeEach(async function() {
      user = await User.mock();
      record = await Ownership.mock({
        companyId: chance.hash(),
        companyIdFromTrigger: chance.hash(),
        contactId: chance.hash(),
        contactRole: chance.hash(),
        isPrimaryContact: chance.bool(),
        ownerId: user._id,
        propertyId: chance.hash()
      });
    });

    it("returns the record", async function() {
      record = <OwnershipDocument> await permissions.read(record, user);

      expect(record.companyId).to.exist;
      expect(record.companyIdFromTrigger).to.exist;
      expect(record.contactId).to.exist;
      expect(record.contactRole).to.exist;
      expect(record.isPrimaryContact).to.exist;
      expect(record.propertyId).to.exist;
    });
  });

  describe("remove()", function() {
    let record: OwnershipDocument;
    let user: UserDocument;

    beforeEach(async function() {
      user = await User.mock();
      record = await Ownership.mock({ ownerId: user._id });
    });

    it("returns the record", async function() {
      record = <OwnershipDocument> await permissions.remove(record, user);

      expect(record).to.exist;
    });
  });

  describe("update()", function() {
    let record: OwnershipDocument;
    let user: UserDocument;

    beforeEach(async function() {
      user = await User.mock();
      record = await Ownership.mock({ ownerId: user._id });
    });

    it("updates and returns the record", async function() {
      const params = {
        companyId: chance.hash(),
        companyIdFromTrigger: chance.hash(),
        contactId: chance.hash(),
        contactRole: chance.hash(),
        isPrimaryContact: chance.bool(),
        propertyId: chance.hash()
      };

      record = <OwnershipDocument> await permissions.update(record, params, {}, user);

      expect(record.companyId).to.eql(params.companyId);
      expect(record.companyIdFromTrigger).to.eql(params.companyIdFromTrigger);
      expect(record.contactId).to.eql(params.contactId);
      expect(record.contactRole).to.eql(params.contactRole);
      expect(record.isPrimaryContact).to.eql(params.isPrimaryContact);
      expect(record.propertyId).to.eql(params.propertyId);
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
