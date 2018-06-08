import * as express from "express";

import {
    CompsController,
    CompaniesController,
    ContactsController,
    ContractsController,
    ListingsController,
    PropertiesController,
    PursuitsController,
    TasksController
} from "./";

export class SearchController {
    private compsController: CompsController;
    private companiesController: CompaniesController;
    private contactsController: ContactsController;
    private contractsController: ContractsController;
    private listingsController: ListingsController;
    private propertiesController: PropertiesController;
    private pursuitsController: PursuitsController;
    private tasksController: TasksController;

    constructor() {
        this.compsController = new CompsController();
        this.companiesController = new CompaniesController();
        this.contactsController = new ContactsController();
        this.contractsController = new ContractsController();
        this.listingsController = new ListingsController();
        this.propertiesController = new PropertiesController();
        this.pursuitsController = new PursuitsController();
        this.tasksController = new TasksController();
    }

    public async search(req: express.Request, res?: express.Response): Promise<any> {
        if (!req.query.search) {
            throw new Error("Please supply a 'search' parameter.");
        }

        const collections: string[] = req.query.collections;
        const term = req.query.search.trim().replace(/ /g, ".* ");
        req.query = { limit: req.query.limit };

        const promises: any[] = [];

        if (!collections || collections.indexOf("comps") >= 0) {
            req.query.where = this.getWhereClause([
                "buildingClass",
                "leaseType",
                "name",
                "type"
            ], term);

            promises.push(this.compsController.find(req));
        }

        if (!collections || collections.indexOf("companies") >= 0) {
            req.query.where = this.getWhereClause([
                "description",
                "name",
                "type"
            ], term);

            promises.push(this.companiesController.find(req));
        }

        if (!collections || collections.indexOf("contacts") >= 0) {
            req.query.where = this.getWhereClause([
                "description",
                "firstName",
                "fullName",
                "lastName",
                "title",
                "type"
            ], term);

            promises.push(this.contactsController.find(req));
        }

        if (!collections || collections.indexOf("contracts") >= 0) {
            req.query.where = this.getWhereClause([
                "description",
                "name",
                "type"
            ], term);

            promises.push(this.contractsController.find(req));
        }

        if (!collections || collections.indexOf("listings") >= 0) {
            req.query.where = this.getWhereClause([
                "name",
                "type"
            ], term);

            promises.push(this.listingsController.find(req));
        }

        if (!collections || collections.indexOf("properties") >= 0) {
            req.query.where = this.getWhereClause([
                "city",
                "description",
                "market",
                "name",
                "state",
                "street",
                "type",
                "zip"
            ], term);

            promises.push(this.propertiesController.find(req));
        }

        if (!collections || collections.indexOf("pursuits") >= 0) {
            req.query.where = this.getWhereClause([
                "name",
                "type"
            ], term);

            promises.push(this.pursuitsController.find(req));
        }

        if (!collections || collections.indexOf("tasks") >= 0) {
            req.query.where = this.getWhereClause([
                "description",
                "subject",
                "type"
            ], term);

            promises.push(this.tasksController.find(req));
        }

        const results = await Promise.all(promises);

        const records: any = {};
        results.forEach((r) => Object.assign(records, r));

        return records;
    }

    private getWhereClause(fields: string[], term: string): any {
        const $or = fields.map((field) => {
            return { [field]: { $regex: `(^| )${term}.*`, $options: "i" } };
        });

        return { $or };
    }
}
