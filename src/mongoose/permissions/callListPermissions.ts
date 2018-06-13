import { CallList, CallListDocument, UserDocument } from "../index";
import { Permissions } from "./permissions";

export class CallListPermissions extends Permissions {

    constructor() {
        super();

        this.Model = CallList;
    }

    public async createPermissions(user: UserDocument): Promise<string[]> {
        const attributes: string[] = [
            "batchInfo",
            "configJson",
            "contactGroupId",
            "contactIds",
            "description",
            "dueDate",
            "name",
            "ownerId",
            "sfUserId",
            "type"
        ];

        return attributes;
    }

    public async findPermissions(user: UserDocument): Promise<any> {
        const query: any = { ownerId: user._id };

        return query;
    }

    public async readPermissions(record: CallListDocument, user: UserDocument): Promise<string[]> {
        const attributes: string[] = [];

        if (record.ownerId.equals(user._id)) {
            attributes.push(
                "_id",
                "batchInfo",
                "configJson",
                "contactGroupId",
                "contactIds",
                "description",
                "dueDate",
                "name",
                "ownerId",
                "sfUserId",
                "type"
            );
        }

        return attributes;
    }

    public async removePermissions(record: CallListDocument, user: UserDocument): Promise<boolean> {
        return record.ownerId.equals(user._id);
    }

    public async updatePermissions(record: CallListDocument, user: UserDocument): Promise<string[]> {
        const attributes: string[] = [];

        if (record.ownerId.equals(user._id)) {
            attributes.push(
                "batchInfo",
                "configJson",
                "contactGroupId",
                "contactIds",
                "description",
                "dueDate",
                "name",
                "ownerId",
                "sfUserId",
                "type"
            );
        }

        return attributes;
    }

}
