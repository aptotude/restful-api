import { Chance } from "chance";
import * as mongoose from "mongoose";

import { User, UserDocument } from "../";

export interface GroupDocument extends mongoose.Document {
  [key: string]: any;

  isPrivate: boolean;
  name?: string;
  owner?: UserDocument;
  ownerId: mongoose.Types.ObjectId;
  users?: UserDocument[];
  userIds: mongoose.Types.ObjectId[];
}

export interface GroupModel extends mongoose.Model<GroupDocument> {
  mock(params?: any): Promise<GroupDocument>;
}

const schema = new mongoose.Schema({
  isPrivate: {
    default: false,
    type: Boolean
  },
  name: String,
  ownerId: {
    required: true,
    type: mongoose.Schema.Types.ObjectId
  },
  userIds: [mongoose.Schema.Types.ObjectId]
}, {
  autoIndex: false,
  timestamps: true
});

/**
 * Creates a record with randomized required parameters if not specified.
 * @param {Object} params The parameters to initialize the record with.
 */
schema.statics.mock = async function(params?: any): Promise<GroupDocument> {
  const chance = new Chance();

  params = params || {};
  if (!params.ownerId) {
    const user = await User.mock();
    params.ownerId = user._id;
  }

  return this.create(params);
};

export const Group = mongoose.model<GroupDocument, GroupModel>("Group", schema);
