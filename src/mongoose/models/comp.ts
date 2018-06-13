import { Chance } from "chance";
import * as mongoose from "mongoose";

export interface CompDocument extends mongoose.Document {
  [key: string]: any;

  askingPrice?: number;
  archive?: boolean;
  buildingClass?: string;
  buyerId?: string;
  buyerCompanyId?: string;
  capRate?: number;
  cashOnCash?: number;
  closeDate?: Date;
  commissionAmount?: number;
  commissionPercent?: number;
  contractId?: string;
  downPayment?: number;
  grossCommissionAmount?: number;
  landlordCompanyId?: string;
  landlordContactId?: string;
  leaseCommencementDate?: Date;
  leaseExpirationDate?: Date;
  leaseTermMonths?: number;
  leaseTotal?: number;
  leaseType?: string;
  leasedPropertyId?: string;
  listingId?: string;
  mortgageAmount?: number;
  name?: string;
  netOperatingIncome?: number;
  occupancyAtClose?: number;
  occupancyDate?: Date;
  options?: string;
  ownerId?: mongoose.Types.ObjectId;
  priceType?: string;
  pursuitId?: string;
  recordTypeId?: string;
  recordType?: string;
  rentCommencementDate?: Date;
  rentalRate?: number;
  rentalRateType?: string;
  researchComplete?: boolean;
  salePrice?: number;
  sellerId?: string;
  sellerCompanyId?: string;
  soldPropertyId?: string;
  squareFootage?: number;
  tenancyAtClose?: string;
  tenantCompanyId?: string;
  tenantContactId?: string;
  termRemainingAtClose?: string;
  transactionDate?: Date;
  type?: string;
  units?: number;
}

export interface CompModel extends mongoose.Model<CompDocument> {
  mock(params?: any): Promise<CompDocument>;
}

const schema = new mongoose.Schema({
  archive: Boolean,
  askingPrice: Number,
  buildingClass: String,
  buyerCompanyId: String,
  buyerId: String,
  capRate: Number,
  cashOnCash: Number,
  closeDate: Date,
  commissionAmount: Number,
  commissionPercent: Number,
  contractId: String,
  downPayment: Number,
  grossCommissionAmount: Number,
  leaseCommencementDate: Date,
  leaseExpirationDate: Date,
  leaseTermMonths: Number,
  leaseTotal: Number,
  leaseType: String,
  leasedPropertyId: String,
  listingId: String,
  mortgageAmount: Number,
  name: String,
  netOperatingIncome: Number,
  occupancyAtClose: Number,
  ownerId: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId
  },
  priceType: String,
  pursuitId: String,
  recordType: String,
  recordTypeId: String,
  researchComplete: Boolean,
  salePrice: Number,
  sellerCompanyId: String,
  sellerId: String,
  soldPropertyId: String,
  squareFootage: Number,
  tenancyAtClose: String,
  termRemainingAtClose: String,
  type: String,
  units: Number
}, {
  autoIndex: false,
  timestamps: true
});

/**
 * Creates a record with randomized required parameters if not specified.
 * @param {Object} params The parameters to initialize the record with.
 */
schema.statics.mock = async function(params?: any): Promise<CompDocument> {
  const chance = new Chance();

  params = params || {};
  return this.create(params);
};

export const Comp = mongoose.model<CompDocument, CompModel>("Comp", schema);
