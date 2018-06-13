import { Playbook, PlaybookDocument, UserDocument } from "../index";
import { Permissions } from "./permissions";

export class PlaybookPermissions extends Permissions {

    constructor() {
        super();

        this.Model = Playbook;
    }

    public async createPermissions(user: UserDocument): Promise<string[]> {
        const attributes: string[] = [
            "name",
            "ownerId",
            "targetStage",
            "taskTemplates"
        ];

        return attributes;
    }

    public async findPermissions(user: UserDocument): Promise<any> {
        const query: any = { ownerId: user._id };

        return query;
    }

    public async readPermissions(record: PlaybookDocument, user: UserDocument): Promise<string[]> {
        const attributes: string[] = [];

        if (record.ownerId.equals(user._id)) {
            attributes.push(
                "_id",
                "name",
                "ownerId",
                "targetStage",
                "taskTemplates"
            );
        }

        return attributes;
    }

    public async removePermissions(record: PlaybookDocument, user: UserDocument): Promise<boolean> {
        return record.ownerId.equals(user._id);
    }

    public async updatePermissions(record: PlaybookDocument, user: UserDocument): Promise<string[]> {
        const attributes: string[] = [];

        if (record.ownerId.equals(user._id)) {
            attributes.push(
                "name",
                "ownerId",
                "targetStage",
                "taskTemplates"
            );
        }

        return attributes;
    }

}
