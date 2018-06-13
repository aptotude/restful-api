import { ContactGroup, ContactGroupDocument, UserDocument } from "../index";
import { Permissions } from "./permissions";

export class ContactGroupPermissions extends Permissions {

  constructor() {
    super();

    this.Model = ContactGroup;
  }

  public async createPermissions(user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
      "createdDate",
      "memberIds",
      "name",
      "numberOfMembers"
    ];

    return attributes;
  }

  public async findPermissions(user: UserDocument): Promise<any> {
    const query: any = { ownerId: user._id };

    return query;
  }

  public async readPermissions(record: ContactGroupDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [];

    if (record.ownerId.equals(user._id)) {
      attributes.push(
        "_id",
        "createdAt",
        "createdDate",
        "memberIds",
        "name",
        "numberOfMembers",
        "ownerId",
        "updatedAt"
      );
    }

    return attributes;
  }

  public async removePermissions(record: ContactGroupDocument, user: UserDocument): Promise<boolean> {
    return record.ownerId.equals(user._id);
  }

  public async updatePermissions(record: ContactGroupDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [];

    if (record.ownerId.equals(user._id)) {
      attributes.push(
        "createdDate",
        "memberIds",
        "name",
        "numberOfMembers"
      );
    }

    return attributes;
  }

}
