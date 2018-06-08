import { Chance } from "chance";
import * as mongoose from "mongoose";

export interface AddressModel {
  label?: string;
  city?: string;
  postalCode?: string;
  state?: string;
  stateCode?: string;
  street?: string;
  country?: string;
  countryCode?: string;
  county?: string;
}

export interface EmailAddressModel {
  label?: string;
  address?: string;
}

export interface PhoneNumberModel {
  label?: string;
  number?: string;
  iconName?: string;
}

export interface ContactDocument extends mongoose.Document {
  [key: string]: any;

  address?: AddressModel;
  companyId?: any;
  description?: string;
  email?: EmailAddressModel;
  email2?: EmailAddressModel;
  fax?: PhoneNumberModel;
  firstName?: string;
  fullName?: string;
  homePhone?: PhoneNumberModel;
  lastName?: string;
  mobilePhone?: PhoneNumberModel;
  otherPhone?: PhoneNumberModel;
  ownerId?: string;
  phone?: PhoneNumberModel;
  recordTypeId?: string;
  selectedCompany?: any;
  title?: string;
  type?: string;
}

export interface ContactModel extends mongoose.Model<ContactDocument> {
  mock(params?: any): Promise<ContactDocument>;
}

const schema = new mongoose.Schema({
  address: mongoose.Schema.Types.Mixed,
  companyId: String,
  description: String,
  email: mongoose.Schema.Types.Mixed,
  email2: mongoose.Schema.Types.Mixed,
  fax: mongoose.Schema.Types.Mixed,
  firstName: String,
  fullName: String,
  homePhone: mongoose.Schema.Types.Mixed,
  lastName: String,
  mobilePhone: mongoose.Schema.Types.Mixed,
  otherPhone: mongoose.Schema.Types.Mixed,
  ownerId: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId
  },
  phone: mongoose.Schema.Types.Mixed,
  recordTypeId: String,
  selectedCompany: mongoose.Schema.Types.Mixed,
  title: String,
  type: String
}, {
  autoIndex: false,
  timestamps: true
});

/**
 * Creates a record with randomized required parameters if not specified.
 * @param {Object} params The parameters to initialize the record with.
 */
schema.statics.mock = async function(params?: any): Promise<ContactDocument> {
  const chance = new Chance();

  params = params || {};
  return this.create(params);
};

export const Contact = mongoose.model<ContactDocument, ContactModel>("Contact", schema);
