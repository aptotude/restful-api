import { expect } from "chai";
import { Chance } from "chance";
import * as nock from "nock";

import { Playbook, PlaybookDocument, PlaybookPermissions, User, UserDocument } from "../../../mongoose";

const chance = new Chance();
const index = require("../../");
const permissions = new PlaybookPermissions();

describe("mongoose/permissions/playbookPermissions.ts", function() {
    describe("create()", function() {
        it("creates a new record", async function() {
            const user = await User.mock();
            const params = {
                name: chance.hash(),
                targetStage: chance.hash()
            };

            const record = <PlaybookDocument> await permissions.create(params, { ownerId: user._id }, user);

            expect(record.name).to.eql(params.name);
            expect(record.targetStage).to.eql(params.targetStage);
        });
    });

    describe("read()", function() {
        let record: PlaybookDocument;
        let user: UserDocument;

        beforeEach(async function() {
            user = await User.mock();
            record = await Playbook.mock({
                name: chance.hash(),
                ownerId: user._id,
                targetStage: chance.hash()
            });
        });

        it("returns the record", async function() {
            record = <PlaybookDocument> await permissions.read(record, user);

            expect(record.name).to.exist;
            expect(record.targetStage).to.exist;
        });
    });

    describe("remove()", function() {
        let record: PlaybookDocument;
        let user: UserDocument;

        beforeEach(async function() {
            user = await User.mock();
            record = await Playbook.mock({ ownerId: user._id });
        });

        it("returns the record", async function() {
            record = <PlaybookDocument> await permissions.remove(record, user);

            expect(record).to.exist;
        });
    });

    describe("update()", function() {
        let record: PlaybookDocument;
        let user: UserDocument;

        beforeEach(async function() {
            user = await User.mock();
            record = await Playbook.mock({ ownerId: user._id });
        });

        it("updates and returns the record", async function() {
            const params = {
                name: chance.hash(),
                targetStage: chance.hash()
            };

            record = <PlaybookDocument> await permissions.update(record, params, {}, user);

            expect(record.name).to.eql(params.name);
            expect(record.targetStage).to.eql(params.targetStage);
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
