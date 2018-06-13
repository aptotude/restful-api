import * as express from "express";
import * as passport from "passport";

import { Express, PlaybooksController } from "../";

export class PlaybooksRouter {
  constructor(router: express.Router) {
    const controller = new PlaybooksController();

    /**
     * @api {Object} Playbook Playbook
     * @apiName Playbook
     * @apiGroup Models
     * @apiParam {String} name
     * @apiParam {String} ownerId
     * @apiParam {String} targetStage
     * @apiParam {Object[]} taskTemplates
     */

    /**
     * @api {get} /playbooks Get Playbooks
     * @apiName GetPlaybooks
     * @apiGroup Playbooks
     * @apiDescription Returns an array of playbooks.
     *
     * @apiParam {Number} limit Number of records to return.
     * @apiParam {String} select A string of fields to select separated by spaces.
     * @apiParam {Number} skip Number of records to skip.
     * @apiParam {String} sort The sorting of the records.
     * @apiParam {Object} where The where clause for the query.
     *
     * @apiSuccess {[Playbook](#api-Models-Playbook)[]} playbooks Array of playbooks matching the criteria.
     */
    router.get(
      "/playbooks",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.find)
    );

    /**
     * @api {post} /playbooks Create Playbook
     * @apiName CreatePlaybook
     * @apiGroup Playbooks
     * @apiDescription Creates and returns a new playbook.
     *
     * @apiParam {[Playbook](#api-Models-Playbook)} - The attributes to set on the playbook.
     *
     * @apiSuccess {[Playbook](#api-Models-Playbook)} playbook The new playbook.
     */
    router.post(
      "/playbooks",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.create)
    );

    /**
     * @api {get} /playbooks Get Playbooks Count
     * @apiName GetPlaybooksCount
     * @apiGroup Playbooks
     * @apiDescription Returns the number of Playbooks matching the given criteria.
     *
     * @apiParam {Object} where The where clause for the query.
     *
     * @apiSuccess {Number} count The number of Playbooks matching the given criteria.
     */
    router.get(
      "/playbooks/count",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.count)
    );

    /**
     * @api {get} /playbooks/:id Get Playbook
     * @apiName GetPlaybook
     * @apiGroup Playbooks
     * @apiDescription Returns a playbook by ID.
     *
     * @apiParam {String} :id The ID of the playbook.
     *
     * @apiSuccess {[Playbook](#api-Models-Playbook)} playbook The playbook matching the given ID.
     */
    router.get(
      "/playbooks/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.findOne)
    );

    /**
     * @api {put} /playbooks/:id Update Playbook
     * @apiName UpdatePlaybook
     * @apiGroup Playbooks
     * @apiDescription Updates and returns a playbook.
     *
     * @apiParam {[Playbook](#api-Models-Playbook)} - The attributes to set on the playbook.
     *
     * @apiSuccess {[Playbook](#api-Models-Playbook)} playbook The updated playbook.
     */
    router.put(
      "/playbooks/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.update)
    );

    /**
     * @api {delete} /playbooks/:id Remove Playbook
     * @apiName RemovePlaybook
     * @apiGroup Playbooks
     * @apiDescription Removes a playbook.
     *
     * @apiParam {String} :id The ID of the playbook.
     */
    router.delete(
      "/playbooks/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.remove)
    );
  }
}
