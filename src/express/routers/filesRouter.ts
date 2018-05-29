import * as express from "express";
import * as passport from "passport";

import { Express, FilesController } from "../";

export class FilesRouter {
  constructor(router: express.Router) {
    const controller = new FilesController();

    /**
     * @api {Object} File File
     * @apiName File
     * @apiGroup Models
     */

    /**
     * @api {get} /files Get File
     * @apiName GetFiles
     * @apiGroup File
     * @apiDescription Returns an array of files.
     *
     * @apiParam {Number} limit Number of records to return.
     * @apiParam {String} select A string of fields to select separated by spaces.
     * @apiParam {Number} skip Number of records to skip.
     * @apiParam {String} sort The sorting of the records.
     * @apiParam {Object} where The where clause for the query.
     *
     * @apiSuccess {[File](#api-Models-File)[]} files Array of files matching the criteria.
     */
    router.get(
      "/files",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.find)
    );

    /**
     * @api {post} /files Create File
     * @apiName CreateFile
     * @apiGroup File
     * @apiDescription Creates and returns a new file.
     *
     * @apiParam {[File](#api-Models-File)} - The attributes to set on the file.
     *
     * @apiSuccess {[File](#api-Models-File)} file The new file.
     */
    router.post(
      "/files",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.create)
    );

    /**
     * @api {get} /files Get File Count
     * @apiName GetFilesCount
     * @apiGroup File
     * @apiDescription Returns the number of File matching the given criteria.
     *
     * @apiParam {Object} where The where clause for the query.
     *
     * @apiSuccess {Number} count The number of File matching the given criteria.
     */
    router.get(
      "/files/count",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.count)
    );

    /**
     * @api {get} /files/:id Get File
     * @apiName GetFile
     * @apiGroup File
     * @apiDescription Returns a file by ID.
     *
     * @apiParam {String} :id The ID of the file.
     *
     * @apiSuccess {[File](#api-Models-File)} file The file matching the given ID.
     */
    router.get(
      "/files/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.findOne)
    );

    /**
     * @api {put} /files/:id Update File
     * @apiName UpdateFile
     * @apiGroup File
     * @apiDescription Updates and returns a file.
     *
     * @apiParam {[File](#api-Models-File)} - The attributes to set on the file.
     *
     * @apiSuccess {[File](#api-Models-File)} file The updated file.
     */
    router.put(
      "/files/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.update)
    );

    /**
     * @api {delete} /files/:id Remove File
     * @apiName RemoveFile
     * @apiGroup File
     * @apiDescription Removes a file.
     *
     * @apiParam {String} :id The ID of the file.
     */
    router.delete(
      "/files/:id",
      passport.authenticate("bearer", { session: false }),
      Express.handler.call(controller, controller.remove)
    );
  }
}
