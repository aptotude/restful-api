import { Chance } from "chance";
import * as mongoose from "mongoose";

export interface BuyersNeedDocument extends mongoose.Document {
  [key: string]: any;

  acquisitionType?: string;
  buildingType?: string;
  buyerQuality?: string;
  contactId?: string;
  isActive?: boolean;
  market?: string;
  maxPrice?: string;
  maxSquareFootage?: string;
  minCapRate?: number;
  minCashOnCash?: number;
  minIrr?: number;
  minLirr?: number;
  minPrice?: string;
  minSquareFootage?: string;
  name?: string;
  ownerId?: mongoose.Types.ObjectId;
}

export interface BuyersNeedModel extends mongoose.Model<BuyersNeedDocument> {
  mock(params?: any): Promise<BuyersNeedDocument>;
}

const schema = new mongoose.Schema({
  acquisitionType: String,
  buildingType: String,
  buyerQuality: String,
  contactId: String,
  isActive: Boolean,
  market: String,
  maxPrice: String,
  maxSquareFootage: String,
  minCapRate: Number,
  minCashOnCash: Number,
  minIrr: Number,
  minLirr: Number,
  minPrice: String,
  minSquareFootage: String,
  name: String,
  ownerId: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId
  }
}, {
  autoIndex: false,
  timestamps: true
});

/**
 * Creates a record with randomized required parameters if not specified.
 * @param {Object} params The parameters to initialize the record with.
 */
schema.statics.mock = async function(params?: any): Promise<BuyersNeedDocument> {
  const chance = new Chance();

  params = params || {};
  return this.create(params);
};

export const BuyersNeed = mongoose.model<BuyersNeedDocument, BuyersNeedModel>("BuyersNeed", schema);
