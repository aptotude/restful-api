import { File, FileDocument, UserDocument } from "../index";
import { Permissions } from "./permissions";

export class FilePermissions extends Permissions {

  constructor() {
    super();

    this.Model = File;
  }

  public async createPermissions(user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
        "compId",
        "contractId",
        "isPublic",
        "listingId",
        "name",
        "ownerId",
        "pursuitId"
    ];

    return attributes;
  }

  public async findPermissions(user: UserDocument): Promise<any> {
    const query: any = { ownerId: user._id };

    return query;
  }

  public async readPermissions(record: FileDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
        "_id",
        "compId",
        "contractId",
        "createdAt",
        "isPublic",
        "listingId",
        "name",
        "ownerId",
        "pursuitId",
        "updatedAt"
    ];

    return attributes;
  }

  public async removePermissions(record: FileDocument, user: UserDocument): Promise<boolean> {
    return true;
  }

  public async updatePermissions(record: FileDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
        "compId",
        "contractId",
        "isPublic",
        "listingId",
        "name",
        "ownerId",
        "pursuitId"
    ];

    return attributes;
  }

}
