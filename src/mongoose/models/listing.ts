import { Chance } from "chance";
import * as mongoose from "mongoose";

export interface ListingDocument extends mongoose.Document {
  [key: string]: any;

  acquisitionType?: string;
  activityId?: string;
  askingPriceActual?: number;
  capRate?: number;
  commission?: string;
  commissionAmount?: number;
  createdDate?: string;
  dateOffMarket?: string;
  dateOnMarket?: string;
  expirationDate?: string;
  lastModifiedDate?: string;
  maxPrice?: number;
  maxSqft?: number;
  minCapRate?: number;
  minCashOnCash?: number;
  minIRR?: number;
  minLIRR?: number;
  minPrice?: number;
  minSqft?: number;
  name?: string;
  noi?: string;
  onMarketStatus?: string;
  ownerContact?: string;
  ownerId?: mongoose.Types.ObjectId;
  probability?: number;
  propertyId?: string;
  propertyType?: string;
  pursuitId?: string;
  recordTypeDeveloperName?: string;
  recordTypeId?: string;
  repAgreementDate?: string;
  seller?: string;
  stage?: string;
  totalReturn?: number;
  type?: string;
  yield?: number;
}

export interface ListingModel extends mongoose.Model<ListingDocument> {
  mock(params?: any): Promise<ListingDocument>;
}

const schema = new mongoose.Schema({
  acquisitionType: String,
  activityId: String,
  askingPriceActual: Number,
  capRate: Number,
  commission: String,
  commissionAmount: Number,
  createdDate: String,
  dateOffMarket: String,
  dateOnMarket: String,
  expirationDate: String,
  lastModifiedDate: String,
  maxPrice: Number,
  maxSqft: Number,
  minCapRate: Number,
  minCashOnCash: Number,
  minIRR: Number,
  minLIRR: Number,
  minPrice: Number,
  minSqft: Number,
  name: String,
  noi: String,
  onMarketStatus: String,
  ownerContact: String,
  ownerId: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId
  },
  probability: Number,
  propertyId: String,
  propertyType: String,
  pursuitId: String,
  recordTypeDeveloperName: String,
  recordTypeId: String,
  repAgreementDate: String,
  seller: String,
  stage: String,
  totalReturn: Number,
  type: String,
  yield: Number
}, {
  autoIndex: false,
  timestamps: true
});

/**
 * Creates a record with randomized required parameters if not specified.
 * @param {Object} params The parameters to initialize the record with.
 */
schema.statics.mock = async function(params?: any): Promise<ListingDocument> {
  const chance = new Chance();

  params = params || {};
  return this.create(params);
};

export const Listing = mongoose.model<ListingDocument, ListingModel>("Listing", schema);
