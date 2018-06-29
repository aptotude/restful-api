import { Chance } from "chance";
import * as mongoose from "mongoose";

export interface PursuitDocument extends mongoose.Document {
  [key: string]: any;

  brokerProposedPrice?: number;
  clientCompanyId?: string;
  clientContactId?: string;
  commissionAmount?: number;
  createdDate?: string;
  lastModifiedDate?: string;
  listProbability?: number;
  name?: string;
  ownerId?: mongoose.Types.ObjectId;
  probability?: number;
  propertyId?: string;
  pursuitDeliveryDate?: Date;
  recordTypeId?: string;
  sellerPriceExpectation?: number;
  sellProbability?: number;
  status?: string;
  type?: string;
}

export interface PursuitModel extends mongoose.Model<PursuitDocument> {
  mock(params?: any): Promise<PursuitDocument>;
}

const schema = new mongoose.Schema({
  brokerProposedPrice: Number,
  clientCompanyId: String,
  clientContactId: String,
  commissionAmount: Number,
  createdDate: String,
  lastModifiedDate: String,
  listProbability: Number,
  name: String,
  ownerId: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId
  },
  probability: Number,
  propertyId: String,
  pursuitDeliveryDate: Date,
  recordTypeId: String,
  sellProbability: Number,
  sellerPriceExpectation: Number,
  status: String,
  type: String
}, {
  autoIndex: false,
  timestamps: true
});

/**
 * Creates a record with randomized required parameters if not specified.
 * @param {Object} params The parameters to initialize the record with.
 */
schema.statics.mock = async function(params?: any): Promise<PursuitDocument> {
  const chance = new Chance();

  params = params || {};
  return this.create(params);
};

export const Pursuit = mongoose.model<PursuitDocument, PursuitModel>("Pursuit", schema);
