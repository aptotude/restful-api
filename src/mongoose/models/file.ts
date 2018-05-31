import * as bcrypt from "bcrypt-nodejs";
import { Chance } from "chance";
import * as mongoose from "mongoose";
import * as request from "request";

import { Config } from "../../config";
import { Mongoose, UserDocument } from "../";

export interface FileDocument extends mongoose.Document {
  [key: string]: any;

  compId?: string;
  contractId?: string;
  isPublic?: boolean;
  listingId?: string;
  name?: string;
  ownerId?: string;
  pursuitId?: string;
}

export interface FileModel extends mongoose.Model<FileDocument> {
  mock(params?: any): Promise<FileDocument>;
}

export class File {
  public model: FileModel;
  private schema: mongoose.Schema;

  constructor(config: Config) {
    this.setupSchema(config);
    this.model = mongoose.model<FileDocument, FileModel>("File", this.schema);
  }

  private setupSchema(config: Config) {
    this.schema = new mongoose.Schema({
      compId: {
        ref: "Comp",
        type: mongoose.Schema.Types.ObjectId
      },
      contractId: {
        ref: "Contract",
        type: mongoose.Schema.Types.ObjectId
      },
      isPublic: {
        default: false,
        type: Boolean
      },
      listingId: {
        ref: "Listing",
        type: mongoose.Schema.Types.ObjectId
      },
      name: String,
      ownerId: {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId
      },
      pursuitId: {
        ref: "Pursuit",
        type: mongoose.Schema.Types.ObjectId
      },
    }, {
      autoIndex: false,
      timestamps: true
    });

    this.setupSchemaMiddleware(config);
    this.setupSchemaStaticMethods(config);
    this.setupSchemaInstanceMethods(config);
  }

  private setupSchemaInstanceMethods(config: Config) { }

  private setupSchemaMiddleware(config: Config) { }

  private setupSchemaStaticMethods(config: Config) {
    /**
     * Creates a record with randomized required parameters if not specified.
     * @param {Object} params The parameters to initialize the record with.
     */
    this.schema.statics.mock = async function(params?: any): Promise<FileDocument> {
      const chance = new Chance();

      params = params || {};
      return this.create(params);
    };
  }
}
