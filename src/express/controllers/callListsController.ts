import * as express from "express";

import { CallList, CallListDocument, CallListPermissions } from "../../mongoose";
import { RestController } from "./";

export class CallListsController {
  private restController: RestController;

  constructor() {
    this.restController = new RestController(CallList, new CallListPermissions());
  }

  public async count(req: express.Request, res?: express.Response): Promise<{ count: number }> {
    return await this.restController.count(req.query, req.user);
  }

  public async create(req: express.Request, res?: express.Response): Promise<{ callList: CallListDocument }> {
    const results = await this.restController.create(req.body, {}, req.user);
    const callList = <CallListDocument> results.record;

    return { callList };
  }

  public async find(req: express.Request, res?: express.Response): Promise<{ callLists: CallListDocument[] }> {
    const results = await this.restController.find(req.query, req.user);
    const callLists = <CallListDocument[]> results.records;

    return { callLists };
  }

  public async findOne(req: express.Request, res?: express.Response): Promise<{ callList: CallListDocument }> {
    const results = await this.restController.findOne(req.params, req.user);
    const callList = <CallListDocument> results.record;

    return { callList };
  }

  public async remove(req: express.Request, res?: express.Response): Promise<any> {
    return this.restController.remove(req.params, req.user);
  }

  public async update(req: express.Request, res?: express.Response): Promise<{ callList: CallListDocument }> {
    const results = await this.restController.update(req.params, req.body, {}, req.user);
    const callList = <CallListDocument> results.record;

    return { callList };
  }
}
