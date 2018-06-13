import { Chance } from "chance";
import * as mongoose from "mongoose";

import { AddressModel, ContactDocument, PhoneNumberModel } from "../";

export interface WebsiteModel {
  label?: string;
  url?: string;
}

export interface CompanyDocument extends mongoose.Document {
  [key: string]: any;

  billingAddress?: AddressModel;
  category?: string;
  description?: string;
  fax?: PhoneNumberModel;
  name?: string;
  numberOfEmployees?: number;
  ownerId?: mongoose.Types.ObjectId;
  phone?: PhoneNumberModel;
  shippingAddress?: AddressModel;
  type?: string;
  website?: WebsiteModel;
}

export interface CompanyModel extends mongoose.Model<CompanyDocument> {
  mock(params?: any): Promise<CompanyDocument>;
}

const schema = new mongoose.Schema({
  billingAddress: mongoose.Schema.Types.Mixed,
  category: String,
  description: String,
  fax: mongoose.Schema.Types.Mixed,
  name: String,
  numberOfEmployees: Number,
  ownerId: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId
  },
  phone: mongoose.Schema.Types.Mixed,
  shippingAddress: mongoose.Schema.Types.Mixed,
  type: String,
  website: mongoose.Schema.Types.Mixed
}, {
  autoIndex: false,
  timestamps: true
});

/**
 * Creates a record with randomized required parameters if not specified.
 * @param {Object} params The parameters to initialize the record with.
 */
schema.statics.mock = async function(params?: any): Promise<CompanyDocument> {
  const chance = new Chance();

  params = params || {};
  return this.create(params);
};

export const Company = mongoose.model<CompanyDocument, CompanyModel>("Company", schema);
