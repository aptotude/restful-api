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
        const attributes: string[] = [
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
        ];

        return attributes;
    }

    public async removePermissions(record: CallListDocument, user: UserDocument): Promise<boolean> {
        return true;
    }

    public async updatePermissions(record: CallListDocument, user: UserDocument): Promise<string[]> {
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

}
