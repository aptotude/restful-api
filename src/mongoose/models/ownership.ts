import { Chance } from "chance";
import * as mongoose from "mongoose";

export interface OwnershipDocument extends mongoose.Document {
  [key: string]: any;

  companyId?: string;
  companyIdFromTrigger?: string;
  contactId?: string;
  contactRole?: string;
  isPrimaryContact?: boolean;
  ownerId?: mongoose.Types.ObjectId;
  propertyId?: string;
}

export interface OwnershipModel extends mongoose.Model<OwnershipDocument> {
  mock(params?: any): Promise<OwnershipDocument>;
}

const schema = new mongoose.Schema({
  companyId: String,
  companyIdFromTrigger: String,
  contactId: String,
  contactRole: String,
  isPrimaryContact: Boolean,
  ownerId: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId
  },
  propertyId: String
}, {
  autoIndex: false,
  timestamps: true
});

/**
 * Creates a record with randomized required parameters if not specified.
 * @param {Object} params The parameters to initialize the record with.
 */
schema.statics.mock = async function(params?: any): Promise<OwnershipDocument> {
  const chance = new Chance();

  params = params || {};
  return this.create(params);
};

export const Ownership = mongoose.model<OwnershipDocument, OwnershipModel>("Ownership", schema);
