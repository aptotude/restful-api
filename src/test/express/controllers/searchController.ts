import { expect } from "chai";
import { Chance } from "chance";
import * as express from "express";

import { SearchController } from "../../../express";
import { Property, PropertyDocument, User, UserDocument } from "../../../mongoose";

const index = require("../../");

const chance = new Chance();
const searchController = new SearchController();

describe("express/controllers/searchController.ts", function() {
    let property: PropertyDocument;
    let user: UserDocument;

    beforeEach(async function() {
        user = await User.mock();
        property = await Property.mock({ name: chance.hash(), ownerId: user._id });
    });

    describe("search()", function() {
        context("when the search term matches", function() {
            it("returns the matches", async function() {
                const req = {
                    query: { search: property.name },
                    user
                } as express.Request;

                const res = await searchController.search(req);

                expect(res.properties).to.exist;
                expect(res.properties.length).to.eql(1);
            });
        });

        context("when the search term is invalid", function() {
            it ("returns an empty array", async function() {
                const req = {
                    query: { search: property.name + "!" },
                    user
                } as express.Request;

                const res = await searchController.search(req);

                expect(res.properties).to.exist;
                expect(res.properties.length).to.eql(0);
            });
        });
    });
});
