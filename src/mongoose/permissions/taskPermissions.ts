import { Task, TaskDocument, UserDocument } from "../index";
import { Permissions } from "./permissions";

export class TaskPermissions extends Permissions {

  constructor() {
    super();

    this.Model = Task;
  }

  public async createPermissions(user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
      "callDisposition",
      "callResult",
      "contactId",
      "description",
      "dueDate",
      "isComplete",
      "lastModifiedDate",
      "marketingStatus",
      "ownerName",
      "priority",
      "status",
      "subject",
      "type",
      "whatId",
      "whatName"
    ];

    return attributes;
  }

  public async findPermissions(user: UserDocument): Promise<any> {
    const query: any = { ownerId: user._id };

    return query;
  }

  public async readPermissions(record: TaskDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [];

    if (record.ownerId.equals(user._id)) {
      attributes.push(
        "_id",
        "callDisposition",
        "callResult",
        "contactId",
        "createdAt",
        "description",
        "dueDate",
        "isComplete",
        "lastModifiedDate",
        "marketingStatus",
        "ownerId",
        "ownerName",
        "priority",
        "status",
        "subject",
        "type",
        "whatId",
        "whatName",
        "updatedAt"
      );
    }

    return attributes;
  }

  public async removePermissions(record: TaskDocument, user: UserDocument): Promise<boolean> {
    return record.ownerId.equals(user._id);
  }

  public async updatePermissions(record: TaskDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [];

    if (record.ownerId.equals(user._id)) {
      attributes.push(
        "callDisposition",
        "callResult",
        "contactId",
        "description",
        "dueDate",
        "isComplete",
        "lastModifiedDate",
        "marketingStatus",
        "ownerName",
        "priority",
        "status",
        "subject",
        "type",
        "whatId",
        "whatName"
      );
    }

    return attributes;
  }

}
