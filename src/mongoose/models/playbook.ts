import { Chance } from "chance";
import * as mongoose from "mongoose";

export interface PlaybookDocument extends mongoose.Document {
    [key: string]: any;

    name?: string;
    ownerId?: string;
    targetStage?: string;
    taskTemplates?: any;
}

export interface PlaybookModel extends mongoose.Model<PlaybookDocument> {
    mock(params?: any): Promise<PlaybookDocument>;
}

const schema = new mongoose.Schema({
    name: String,
    ownerId: {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId
    },
    targetStage: String,
    taskTemplates: mongoose.Schema.Types.Mixed
}, {
    autoIndex: false,
    timestamps: true
});

/**
 * Creates a record with randomized required parameters if not specified.
 * @param {Object} params The parameters to initialize the record with.
 */
schema.statics.mock = async function(params?: any): Promise<PlaybookDocument> {
    const chance = new Chance();

    params = params || {};
    return this.create(params);
};

export const Playbook = mongoose.model<PlaybookDocument, PlaybookModel>("Playbook", schema);
