import * as bcrypt from "bcrypt-nodejs";
import { Chance } from "chance";
import * as mongoose from "mongoose";
import * as request from "request";

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

const schema = new mongoose.Schema({
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

/**
 * Creates a record with randomized required parameters if not specified.
 * @param {Object} params The parameters to initialize the record with.
 */
schema.statics.mock = async function(params?: any): Promise<FileDocument> {
  const chance = new Chance();

  params = params || {};
  return this.create(params);
};

export const File = mongoose.model<FileDocument, FileModel>("File", schema);
