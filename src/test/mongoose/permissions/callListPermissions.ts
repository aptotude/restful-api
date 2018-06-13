import { expect } from "chai";
import { Chance } from "chance";
import * as nock from "nock";

import { CallList, CallListDocument, CallListPermissions, User } from "../../../mongoose";

const chance = new Chance();
const index = require("../../");
const permissions = new CallListPermissions();

describe("mongoose/permissions/callListPermissions.ts", function() {
    describe("create()", function() {
        it("creates a new record", async function() {
            const user = await User.mock();
            const params = {
                batchInfo: chance.hash(),
                configJson: chance.hash(),
                contactGroupId: chance.hash(),
                description: chance.hash(),
                dueDate: chance.hash(),
                name: chance.hash(),
                sfUserId: chance.hash(),
                type: chance.hash()
            };

            const record = <CallListDocument> await permissions.create(params, {}, user);

            expect(record.batchInfo).to.eql(params.batchInfo);
            expect(record.configJson).to.eql(params.configJson);
            expect(record.contactGroupId).to.eql(params.contactGroupId);
            expect(record.description).to.eql(params.description);
            expect(record.dueDate).to.eql(params.dueDate);
            expect(record.name).to.eql(params.name);
            expect(record.sfUserId).to.eql(params.sfUserId);
            expect(record.type).to.eql(params.type);
        });
    });

    describe("read()", function() {
        let record: CallListDocument;

        beforeEach(async function() {
            record = await CallList.mock({
                batchInfo: chance.hash(),
                configJson: chance.hash(),
                contactGroupId: chance.hash(),
                description: chance.hash(),
                dueDate: chance.hash(),
                name: chance.hash(),
                sfUserId: chance.hash(),
                type: chance.hash()
            });
        });

        it("returns the record", async function() {
            const user = await User.mock();

            record = <CallListDocument> await permissions.read(record, user);

            expect(record.batchInfo).to.exist;
            expect(record.configJson).to.exist;
            expect(record.contactGroupId).to.exist;
            expect(record.description).to.exist;
            expect(record.dueDate).to.exist;
            expect(record.name).to.exist;
            expect(record.sfUserId).to.exist;
            expect(record.type).to.exist;
        });
    });

    describe("remove()", function() {
        let record: CallListDocument;

        beforeEach(async function() {
            record = await CallList.mock();
        });

        it("returns the record", async function() {
            const user = await User.mock();

            record = <CallListDocument> await permissions.remove(record, user);

            expect(record).to.exist;
        });
    });

    describe("update()", function() {
        let record: CallListDocument;

        beforeEach(async function() {
            record = await CallList.mock();
        });

        it("updates and returns the record", async function() {
            const user = await User.mock();
            const params = {
                batchInfo: chance.hash(),
                configJson: chance.hash(),
                contactGroupId: chance.hash(),
                description: chance.hash(),
                dueDate: chance.hash(),
                name: chance.hash(),
                sfUserId: chance.hash(),
                type: chance.hash()
            };

            record = <CallListDocument> await permissions.update(record, params, {}, user);

            expect(record.batchInfo).to.eql(params.batchInfo);
            expect(record.configJson).to.eql(params.configJson);
            expect(record.contactGroupId).to.eql(params.contactGroupId);
            expect(record.description).to.eql(params.description);
            expect(record.dueDate).to.eql(params.dueDate);
            expect(record.name).to.eql(params.name);
            expect(record.sfUserId).to.eql(params.sfUserId);
            expect(record.type).to.eql(params.type);
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
