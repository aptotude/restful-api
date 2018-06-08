import * as express from "express";
import * as fs from "fs";
import * as mongoose from "mongoose";

import {
    BuyersNeedsController,
    CompaniesController,
    CompsController,
    ContactGroupsController,
    ContactsController,
    ContractsController,
    DealPartiesController,
    GroupsController,
    ListingsController,
    OffersController,
    OwnershipsController,
    PropertiesController,
    PursuitsController,
    TasksController,
    UsersController
} from "./";

import {
    BuyersNeed,
    BuyersNeedPermissions,
    Company,
    CompanyPermissions,
    Comp,
    CompPermissions,
    ContactGroup,
    ContactGroupPermissions,
    Contact,
    ContactPermissions,
    Contract,
    ContractPermissions,
    DealParty,
    DealPartyPermissions,
    Group,
    GroupPermissions,
    Listing,
    ListingPermissions,
    Offer,
    OfferPermissions,
    Ownership,
    OwnershipPermissions,
    Property,
    PropertyPermissions,
    Pursuit,
    PursuitPermissions,
    Task,
    TaskPermissions,
    User,
    UserPermissions,
    UserDocument
} from "../../mongoose";

export class DataController {

    public async export(req: express.Request, res?: express.Response): Promise<any> {
        const promises: any[] = [];

        promises.push(this.find(req.query.collections, BuyersNeedsController, "buyersNeeds", req));
        promises.push(this.find(req.query.collections, CompaniesController, "companies", req));
        promises.push(this.find(req.query.collections, CompsController, "comps", req));
        promises.push(this.find(req.query.collections, ContactGroupsController, "contactGroups", req));
        promises.push(this.find(req.query.collections, ContactsController, "contacts", req));
        promises.push(this.find(req.query.collections, ContractsController, "contracts", req));
        promises.push(this.find(req.query.collections, DealPartiesController, "dealParties", req));
        promises.push(this.find(req.query.collections, GroupsController, "groups", req));
        promises.push(this.find(req.query.collections, ListingsController, "listings", req));
        promises.push(this.find(req.query.collections, OffersController, "offers", req));
        promises.push(this.find(req.query.collections, OwnershipsController, "ownerships", req));
        promises.push(this.find(req.query.collections, PropertiesController, "properties", req));
        promises.push(this.find(req.query.collections, PursuitsController, "pursuits", req));
        promises.push(this.find(req.query.collections, TasksController, "tasks", req));
        promises.push(this.find(req.query.collections, UsersController, "users", req));

        const results = await Promise.all(promises);

        const records: any = {};
        results.forEach((r) => Object.assign(records, r));

        return records;
    }

    public async import(req: express.Request, res?: express.Response): Promise<any> {
        if (req.body.reset) {
            await this.removeUserDocuments(req.user);
        }

        req.body = this.replaceObjectIds(req.body);

        const createPromises: any[] = [];

        createPromises.push.apply(createPromises, this.create(BuyersNeedPermissions, req.body.buyersNeeds, req.user));
        createPromises.push.apply(createPromises, this.create(CompanyPermissions, req.body.companies, req.user));
        createPromises.push.apply(createPromises, this.create(CompPermissions, req.body.comps, req.user));
        createPromises.push.apply(createPromises, this.create(ContactGroupPermissions, req.body.contactGroups, req.user));
        createPromises.push.apply(createPromises, this.create(ContactPermissions, req.body.contacts, req.user));
        createPromises.push.apply(createPromises, this.create(ContractPermissions, req.body.contracts, req.user));
        createPromises.push.apply(createPromises, this.create(DealPartyPermissions, req.body.dealParties, req.user));
        createPromises.push.apply(createPromises, this.create(GroupPermissions, req.body.groups, req.user));
        createPromises.push.apply(createPromises, this.create(ListingPermissions, req.body.listings, req.user));
        createPromises.push.apply(createPromises, this.create(OfferPermissions, req.body.offers, req.user));
        createPromises.push.apply(createPromises, this.create(OwnershipPermissions, req.body.ownerships, req.user));
        createPromises.push.apply(createPromises, this.create(PropertyPermissions, req.body.properties, req.user));
        createPromises.push.apply(createPromises, this.create(PursuitPermissions, req.body.pursuits, req.user));
        createPromises.push.apply(createPromises, this.create(TaskPermissions, req.body.tasks, req.user));
        createPromises.push.apply(createPromises, this.create(UserPermissions, req.body.users, req.user));

        const results = await Promise.all(createPromises);

        return { successful: results.length };
    }

    /**
     * Creates records for the given user.
     * @param Permissions The Permission class to instantiate and use.
     * @param records The data for the records to create.
     * @param user The user to create the records for.
     */
    private create(Permissions: any, records: any, user: UserDocument) {
        if (!records || !records.length) {
            return [];
        }

        const permissions = new Permissions();

        return records.map((record: any) => {
            const override = this.getOverrideParameters(record, user);
            return permissions.create(record, override, user);
        });
    }

    /**
     * Finds all documents for a user.
     * @param collections The collections requested.
     * @param Controller The Controller to instantiate and use.
     * @param key The key of the records to check for.
     * @param req The Express Request object.
     */
    private find(collections: any[], Controller: any, key: string, req: express.Request) {
        if (collections && collections.indexOf(key) < 0) {
            return Promise.resolve(null);
        }

        const controller = new Controller();
        req.query.where = { ownerId: req.user._id };

        return controller.find(req);
    }

    /**
     * Generates an object for the override parameters in Permissions.create() functions.
     * @param record The record that override parameters are being generated for.
     * @param user The user creating the record.
     */
    private getOverrideParameters(record: any, user: UserDocument) {
        const params: any = { ownerId: user._id };

        if (record._id) {
            params._id = record._id;
        }

        if (record.createdAt) {
            params.createdAt = record.createdAt;
        }

        if (record.updatedAt) {
            params.updatedAt = record.updatedAt;
        }

        return params;
    }

    /**
     * Removes all documents associated with a given user.
     * @param user The user whos documents should be removed.
     */
    private removeUserDocuments(user: UserDocument) {
        return Promise.all([
            BuyersNeed.remove({ ownerId: user._id }),
            Company.remove({ ownerId: user._id }),
            Comp.remove({ ownerId: user._id }),
            ContactGroup.remove({ ownerId: user._id }),
            Contact.remove({ ownerId: user._id }),
            Contract.remove({ ownerId: user._id }),
            DealParty.remove({ ownerId: user._id }),
            Group.remove({ ownerId: user._id }),
            Listing.remove({ ownerId: user._id }),
            Offer.remove({ ownerId: user._id }),
            Ownership.remove({ ownerId: user._id }),
            Property.remove({ ownerId: user._id }),
            Pursuit.remove({ ownerId: user._id }),
            Task.remove({ ownerId: user._id })
        ]);
    }

    /**
     * Generates new ObjectIds for each ObjectId value on the given object.
     * @param data The data object to replace ObjectIds on.
     */
    private replaceObjectIds(data: any) {
        let json = JSON.stringify(data);

        const matches = json.match(/[0-9a-f]{24}/g);
        const uniqueMatches = matches.filter((match, i, arr) => arr.indexOf(match) === i);

        uniqueMatches.forEach((match) => {
            const objectId = mongoose.Types.ObjectId();
            const regex = new RegExp(match, "g");
            json = json.replace(regex, objectId.toHexString());
        });

        return JSON.parse(json);
    }

}
