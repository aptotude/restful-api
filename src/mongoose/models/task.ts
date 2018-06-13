import { Chance } from "chance";
import * as mongoose from "mongoose";

export interface TaskDocument extends mongoose.Document {
  [key: string]: any;

  callDisposition?: string;
  callResult?: string;
  contactId?: string;
  description?: string;
  dueDate?: string;
  isComplete?: boolean;
  lastModifiedDate?: string;
  marketingStatus?: string;
  ownerId?: mongoose.Types.ObjectId;
  ownerName?: string;
  priority?: string;
  status?: string;
  subject?: string;
  type?: string;
  whatId?: string;
  whatName?: string;
}

export interface TaskModel extends mongoose.Model<TaskDocument> {
  mock(params?: any): Promise<TaskDocument>;
}

const schema = new mongoose.Schema({
  callDisposition: String,
  callResult: String,
  contactId: String,
  description: String,
  dueDate: String,
  isComplete: Boolean,
  lastModifiedDate: String,
  marketingStatus: String,
  ownerId: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId
  },
  ownerName: String,
  priority: String,
  status: String,
  subject: String,
  type: String,
  whatId: String,
  whatName: String
}, {
  autoIndex: false,
  timestamps: true
});

schema.pre("save", function(next: any) {
  this.status = this.isComplete ? "Completed" : "Incomplete";

  return next();
});

/**
 * Creates a record with randomized required parameters if not specified.
 * @param {Object} params The parameters to initialize the record with.
 */
schema.statics.mock = async function(params?: any): Promise<TaskDocument> {
  const chance = new Chance();

  params = params || {};
  return this.create(params);
};

export const Task = mongoose.model<TaskDocument, TaskModel>("Task", schema);
