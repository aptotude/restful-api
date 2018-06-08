import * as express from "express";

import { File, FileDocument, FilePermissions } from "../../mongoose";
import { RestController } from "./";

export class FilesController {
  private restController: RestController;

  constructor() {
    this.restController = new RestController(File, new FilePermissions());
  }

  public async count(req: express.Request, res?: express.Response): Promise<{ count: number }> {
    return await this.restController.count(req.query, req.user);
  }

  public async create(req: express.Request, res?: express.Response): Promise<{ file: FileDocument }> {
    const results = await this.restController.create(req.body, {}, req.user);
    const file = <FileDocument> results.record;

    return { file };
  }

  public async find(req: express.Request, res?: express.Response): Promise<{ files: FileDocument[] }> {
    const results = await this.restController.find(req.query, req.user);
    const files = <FileDocument[]> results.records;

    return { files };
  }

  public async findOne(req: express.Request, res?: express.Response): Promise<{ file: FileDocument }> {
    const results = await this.restController.findOne(req.params, req.user);
    const file = <FileDocument> results.record;

    return { file };
  }

  public async remove(req: express.Request, res?: express.Response): Promise<any> {
    return this.restController.remove(req.params, req.user);
  }

  public async update(req: express.Request, res?: express.Response): Promise<{ file: FileDocument }> {
    const results = await this.restController.update(req.params, req.body, {}, req.user);
    const file = <FileDocument> results.record;

    return { file };
  }
}
