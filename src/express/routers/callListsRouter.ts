import * as express from "express";
import * as passport from "passport";

import { Express, CallListsController } from "../";

export class CallListsRouter {
  constructor(router: express.Router) {
    const controller = new CallListsController();

    /**
     * @api {Object} CallList CallList
     * @apiName CallList
     * @apiGroup Models
     * @apiParam {Object} batchInfo
     * @apiParam {Object} configJson
     * @apiParam {String} contactGroupId
     * @apiParam {String[]} contactIds
     * @apiParam {String} description
     * @apiParam {String} dueDate
     * @apiParam {String} name
     * @apiParam {String} ownerId
     * @apiParam {String} sfUserId
     * @apiParam {String} type
     */

    /**
     * @api {get} /call-lists Get CallLists
     * @apiName GetCallLists
     * @apiGroup CallLists
     * @apiDescription Returns an array of callLists.
     *
     * @apiParam {Number} limit Number of records to return.
     * @apiParam {String} select A string of fields to select separated by spaces.
     * @apiParam {Number} skip Number of records to skip.
     * @apiParam {String} sort The sorting of the records.
     * @apiParam {Object} where The where clause for the query.
     *
     * @apiSuccess {[CallList](#api-Models-CallList)[]} callLists Array of callLists matching the criteria.
     */
    router.get(
      "/call-lists",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.find)
    );

    /**
     * @api {post} /call-lists Create CallList
     * @apiName CreateCallList
     * @apiGroup CallLists
     * @apiDescription Creates and returns a new callList.
     *
     * @apiParam {[CallList](#api-Models-CallList)} - The attributes to set on the callList.
     *
     * @apiSuccess {[CallList](#api-Models-CallList)} callList The new callList.
     */
    router.post(
      "/call-lists",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.create)
    );

    /**
     * @api {get} /call-lists Get CallLists Count
     * @apiName GetCallListsCount
     * @apiGroup CallLists
     * @apiDescription Returns the number of CallLists matching the given criteria.
     *
     * @apiParam {Object} where The where clause for the query.
     *
     * @apiSuccess {Number} count The number of CallLists matching the given criteria.
     */
    router.get(
      "/call-lists/count",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.count)
    );

    /**
     * @api {get} /call-lists/:id Get CallList
     * @apiName GetCallList
     * @apiGroup CallLists
     * @apiDescription Returns a callList by ID.
     *
     * @apiParam {String} :id The ID of the callList.
     *
     * @apiSuccess {[CallList](#api-Models-CallList)} callList The callList matching the given ID.
     */
    router.get(
      "/call-lists/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.findOne)
    );

    /**
     * @api {put} /call-lists/:id Update CallList
     * @apiName UpdateCallList
     * @apiGroup CallLists
     * @apiDescription Updates and returns a callList.
     *
     * @apiParam {[CallList](#api-Models-CallList)} - The attributes to set on the callList.
     *
     * @apiSuccess {[CallList](#api-Models-CallList)} callList The updated callList.
     */
    router.put(
      "/call-lists/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.update)
    );

    /**
     * @api {delete} /call-lists/:id Remove CallList
     * @apiName RemoveCallList
     * @apiGroup CallLists
     * @apiDescription Removes a callList.
     *
     * @apiParam {String} :id The ID of the callList.
     */
    router.delete(
      "/call-lists/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.remove)
    );
  }
}
