import { expect } from "chai";
import { Chance } from "chance";
import * as nock from "nock";

import { Playbook, PlaybookDocument, PlaybookPermissions, User } from "../../../mongoose";

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

            const record = <PlaybookDocument> await permissions.create(params, {}, user);

            expect(record.name).to.eql(params.name);
            expect(record.targetStage).to.eql(params.targetStage);
        });
    });

    describe("read()", function() {
        let record: PlaybookDocument;

        beforeEach(async function() {
            record = await Playbook.mock({
                name: chance.hash(),
                targetStage: chance.hash()
            });
        });

        it("returns the record", async function() {
            const user = await User.mock();

            record = <PlaybookDocument> await permissions.read(record, user);

            expect(record.name).to.exist;
            expect(record.targetStage).to.exist;
        });
    });

    describe("remove()", function() {
        let record: PlaybookDocument;

        beforeEach(async function() {
            record = await Playbook.mock();
        });

        it("returns the record", async function() {
            const user = await User.mock();

            record = <PlaybookDocument> await permissions.remove(record, user);

            expect(record).to.exist;
        });
    });

    describe("update()", function() {
        let record: PlaybookDocument;

        beforeEach(async function() {
            record = await Playbook.mock();
        });

        it("updates and returns the record", async function() {
            const user = await User.mock();
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
