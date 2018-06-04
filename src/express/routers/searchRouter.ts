import * as express from "express";
import * as passport from "passport";

import { Express, SearchController } from "../";

export class SearchRouter {
  constructor(router: express.Router) {
    const controller = new SearchController();

    /**
     * @api {get} /search Search
     * @apiName Search
     * @apiGroup Search
     * @apiDescription Returns an object of records matching search term.
     *
     * @apiParam {String[]} collection The collections to search. If not specified, will search all.
     * @apiParam {Number} limit Number of records to return.
     * @apiParam {String} search The search term for the query.
     *
     * @apiSuccess {[Pursuit](#api-Models-Pursuit)[]} pursuits Array of pursuits matching the criteria.
     */
    router.get(
      "/search",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.search)
    );
  }
}
