import { Chance } from "chance";
import * as mongoose from "mongoose";

export interface ContractDocument extends mongoose.Document {
  [key: string]: any;

  buyerAttorneyContactId?: string;
  buyerCompanyId?: string;
  buyerContactId?: string;
  buyerLoanContactId?: string;
  clientCompanyId?: string;
  clientContactId?: string;
  commissionAmount?: number;
  contractCloseDate?: string;
  contractPrice?: number;
  createdDate?: string;
  deposit?: number;
  description?: string;
  effectiveDate?: string;
  landlordCompanyId?: string;
  landlordContactId?: string;
  lastModifiedDate?: string;
  listingId?: string;
  name?: string;
  ownerId?: string;
  probability?: string;
  propertyId?: string;
  pursuitId?: string;
  recordTypeId?: string;
  sellerAttorneyContactId?: string;
  sellerCompanyId?: string;
  sellerContactId?: string;
  status?: string;
  tenantCompanyId?: string;
  tenantContactId?: string;
  titleCompanyAttorneyContactId?: string;
  type?: string;
}

export interface ContractModel extends mongoose.Model<ContractDocument> {
  mock(params?: any): Promise<ContractDocument>;
}

const schema = new mongoose.Schema({
  buyerAttorneyContactId: String,
  buyerCompanyId: String,
  buyerContactId: String,
  buyerLoanContactId: String,
  clientCompanyId: String,
  clientContactId: String,
  commissionAmount: Number,
  contractCloseDate: String,
  contractPrice: Number,
  createdDate: String,
  deposit: Number,
  description: String,
  effectiveDate: String,
  landlordCompanyId: String,
  landlordContactId: String,
  lastModifiedDate: String,
  listingId: String,
  name: String,
  ownerId: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId
  },
  probability: String,
  propertyId: String,
  pursuitId: String,
  recordTypeId: String,
  sellerAttorneyContactId: String,
  sellerCompanyId: String,
  sellerContactId: String,
  status: String,
  tenantCompanyId: String,
  tenantContactId: String,
  titleCompanyAttorneyContactId: String,
  type: String
}, {
  autoIndex: false,
  timestamps: true
});

/**
 * Creates a record with randomized required parameters if not specified.
 * @param {Object} params The parameters to initialize the record with.
 */
schema.statics.mock = async function(params?: any): Promise<ContractDocument> {
  const chance = new Chance();

  params = params || {};
  return this.create(params);
};

export const Contract = mongoose.model<ContractDocument, ContractModel>("Contract", schema);
