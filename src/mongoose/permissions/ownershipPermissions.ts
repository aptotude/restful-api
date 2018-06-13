import { Ownership, OwnershipDocument, UserDocument } from "../index";
import { Permissions } from "./permissions";

export class OwnershipPermissions extends Permissions {

  constructor() {
    super();

    this.Model = Ownership;
  }

  public async createPermissions(user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
      "companyId",
      "companyIdFromTrigger",
      "contactId",
      "contactRole",
      "isPrimaryContact",
      "propertyId"
    ];

    return attributes;
  }

  public async findPermissions(user: UserDocument): Promise<any> {
    const query: any = { ownerId: user._id };

    return query;
  }

  public async readPermissions(record: OwnershipDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [];

    if (record.ownerId.equals(user._id)) {
      attributes.push(
        "_id",
        "companyId",
        "companyIdFromTrigger",
        "contactId",
        "contactRole",
        "createdAt",
        "isPrimaryContact",
        "ownerId",
        "propertyId",
        "updatedAt"
      );
    }

    return attributes;
  }

  public async removePermissions(record: OwnershipDocument, user: UserDocument): Promise<boolean> {
    return record.ownerId.equals(user._id);
  }

  public async updatePermissions(record: OwnershipDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [];

    if (record.ownerId.equals(user._id)) {
      attributes.push(
        "companyId",
        "companyIdFromTrigger",
        "contactId",
        "contactRole",
        "isPrimaryContact",
        "propertyId"
      );
    }

    return attributes;
  }

}
