import { Chance } from "chance";
import * as mongoose from "mongoose";

export interface ContactGroupDocument extends mongoose.Document {
  [key: string]: any;

  createdDate?: string;
  memberIds?: mongoose.Types.ObjectId[];
  name?: string;
  numberOfMembers?: number;
  ownerId?: string;
}

export interface ContactGroupModel extends mongoose.Model<ContactGroupDocument> {
  mock(params?: any): Promise<ContactGroupDocument>;
}

const schema = new mongoose.Schema({
  createdDate: String,
  memberIds: [{
    ref: "Contact",
    type: mongoose.Schema.Types.ObjectId
  }],
  name: String,
  numberOfMembers: Number,
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
schema.statics.mock = async function(params?: any): Promise<ContactGroupDocument> {
  const chance = new Chance();

  params = params || {};
  return this.create(params);
};

export const ContactGroup = mongoose.model<ContactGroupDocument, ContactGroupModel>("ContactGroup", schema);
