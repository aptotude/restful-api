import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import { RequestHandlerParams } from "express-serve-static-core";
import * as fs from "fs";
import * as http from "http";
import * as morgan from "morgan";
import * as path from "path";

import {
  delayMiddleware,
  mongoSessionStoreMiddleware,
  queryStringJsonParserMiddleware,

  AuthenticationRouter,
  BuyersNeedsRouter,
  CallListsRouter,
  CompsRouter,
  CompaniesRouter,
  ContactGroupsRouter,
  ContactsRouter,
  ContractsRouter,
  DataRouter,
  DealPartiesRouter,
  FilesRouter,
  GroupsRouter,
  ListingsRouter,
  OffersRouter,
  OwnershipsRouter,
  PlaybooksRouter,
  PropertiesRouter,
  PursuitsRouter,
  SearchRouter,
  TasksRouter,
  UsersRouter
} from "./";
import { ContactGroup } from "../mongoose";

export class Express {
  public app: express.Application;
  public server: http.Server;

  constructor() {
    this.app = express();

    if (process.env.ENVIRONMENT !== "test") {
      this.app.use(morgan("dev"));
    }

    // Allow CORS requests
    this.app.use(cors());

    // Disables the "x-powered-by" response header so users don't know we use Express
    this.app.disable("x-powered-by");

    // Sets up body parser so we can access req.body in controllers
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json({ limit: "50mb" }));

    // Delays all API calls to mimic Salesforce latency
    this.app.use(delayMiddleware);

    // Sets up Mongo to store our user web sessions
    this.app.use(mongoSessionStoreMiddleware);

    // Parses the query string's "query" value into an object from JSON
    this.app.use(queryStringJsonParserMiddleware);

    this.app.use(express.static(path.resolve(__dirname, "views")));
    this.setupRouters();

    this.server = this.app.listen(process.env.SERVER_PORT, (err: any) => {
      if (err) console.error(err);

      if (process.env.ENVIRONMENT !== "test") console.log("Express server running on port " + process.env.SERVER_PORT + ".");
    });
  }

  /**
   * Catches any errors thrown within Promises (async/await blocks).
   * @param fn The route function to guard.
   */
  public static handler(fn: (req: express.Request, res: express.Response) => Promise<any>): any {
    return async (req: express.Request, res: express.Response) => {
      try {
        const results = await fn.call(this, req, res);
        res.json(results);
      } catch (e) {
        let code = 400;

        if (e.message === "User does not have permission to perform this action.") {
          code = 403;
        }

        res.status(code).json({ error: e.message });
      }
    };
  }

  /**
   * Load routers and register them with Express.
   */
  private setupRouters() {
    const router = express.Router();
    this.app.use("/v1", router);

    const authenticationRouter = new AuthenticationRouter(router);
    const buyersNeedsRouter = new BuyersNeedsRouter(router);
    const callListsRouter = new CallListsRouter(router);
    const compsRouter = new CompsRouter(router);
    const companiesRouter = new CompaniesRouter(router);
    const contactsRouter = new ContactsRouter(router);
    const contactGroupsRouter = new ContactGroupsRouter(router);
    const contractsRouter = new ContractsRouter(router);
    const dataRouter = new DataRouter(router);
    const dealPartiesRouter = new DealPartiesRouter(router);
    const filesRouter = new FilesRouter(router);
    const groupsRouter = new GroupsRouter(router);
    const listingsRouter = new ListingsRouter(router);
    const offersRouter = new OffersRouter(router);
    const ownershipsRouter = new OwnershipsRouter(router);
    const playbooksRouter = new PlaybooksRouter(router);
    const propertiesRouter = new PropertiesRouter(router);
    const pursuitsRouter = new PursuitsRouter(router);
    const searchRouter = new SearchRouter(router);
    const tasksRouter = new TasksRouter(router);
    const usersRouter = new UsersRouter(router);
  }
}
