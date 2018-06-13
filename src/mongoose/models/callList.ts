import { Chance } from "chance";
import * as mongoose from "mongoose";

export interface CallListDocument extends mongoose.Document {
    [key: string]: any;

    batchInfo?: any;
    configJson?: any;
    contactGroupId?: string;
    contactIds?: string[];
    description?: string;
    dueDate?: string;
    name?: string;
    ownerId?: mongoose.Types.ObjectId;
    sfUserId?: string;
    type?: string;
}

export interface CallListModel extends mongoose.Model<CallListDocument> {
    mock(params?: any): Promise<CallListDocument>;
}

const schema = new mongoose.Schema({
    batchInfo: mongoose.Schema.Types.Mixed,
    configJson: mongoose.Schema.Types.Mixed,
    contactGroupId: String,
    contactIds: [String],
    description: String,
    dueDate: String,
    name: String,
    ownerId: {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId
    },
    sfUserId: String,
    type: String
}, {
    autoIndex: false,
    timestamps: true
});

/**
 * Creates a record with randomized required parameters if not specified.
 * @param {Object} params The parameters to initialize the record with.
 */
schema.statics.mock = async function(params?: any): Promise<CallListDocument> {
    const chance = new Chance();

    params = params || {};
    return this.create(params);
};

export const CallList = mongoose.model<CallListDocument, CallListModel>("CallList", schema);
