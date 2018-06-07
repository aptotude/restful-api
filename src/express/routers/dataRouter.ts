import * as express from "express";
import * as passport from "passport";

import { Express, DataController } from "../";

export class DataRouter {
  constructor(router: express.Router) {
    const controller = new DataController();

    /**
     * @api {get} /data Export Data
     * @apiName ExportData
     * @apiGroup Data
     * @apiDescription Returns a JSON file with all collection data.
     */
    router.get(
      "/data",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.export)
    );

    /**
     * @api {post} /data Import Data
     * @apiName ImportData
     * @apiGroup Data
     * @apiDescription Imports a JSON file into the user's collections.
     */
    router.post(
      "/data",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.import)
    );
  }
}
