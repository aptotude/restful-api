import * as express from "express";

import { Playbook, PlaybookDocument, PlaybookPermissions } from "../../mongoose";
import { RestController } from "./";

export class PlaybooksController {
  private restController: RestController;

  constructor() {
    this.restController = new RestController(Playbook, new PlaybookPermissions());
  }

  public async count(req: express.Request, res?: express.Response): Promise<{ count: number }> {
    return await this.restController.count(req.query, req.user);
  }

  public async create(req: express.Request, res?: express.Response): Promise<{ playbook: PlaybookDocument }> {
    const results = await this.restController.create(req.body, {}, req.user);
    const playbook = <PlaybookDocument> results.record;

    return { playbook };
  }

  public async find(req: express.Request, res?: express.Response): Promise<{ playbooks: PlaybookDocument[] }> {
    const results = await this.restController.find(req.query, req.user);
    const playbooks = <PlaybookDocument[]> results.records;

    return { playbooks };
  }

  public async findOne(req: express.Request, res?: express.Response): Promise<{ playbook: PlaybookDocument }> {
    const results = await this.restController.findOne(req.params, req.user);
    const playbook = <PlaybookDocument> results.record;

    return { playbook };
  }

  public async remove(req: express.Request, res?: express.Response): Promise<any> {
    return this.restController.remove(req.params, req.user);
  }

  public async update(req: express.Request, res?: express.Response): Promise<{ playbook: PlaybookDocument }> {
    const results = await this.restController.update(req.params, req.body, {}, req.user);
    const playbook = <PlaybookDocument> results.record;

    return { playbook };
  }
}
