import { Contact, ContactDocument, UserDocument } from "../index";
import { Permissions } from "./permissions";

export class ContactPermissions extends Permissions {

  constructor() {
    super();

    this.Model = Contact;
  }

  public async createPermissions(user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
      "address",
      "companyId",
      "company",
      "description",
      "email",
      "email2",
      "fax",
      "firstName",
      "fullName",
      "homePhone",
      "lastName",
      "mobilePhone",
      "otherPhone",
      "phone",
      "selectedCompany",
      "title",
      "type"
    ];

    return attributes;
  }

  public async findPermissions(user: UserDocument): Promise<any> {
    const query: any = { ownerId: user._id };

    return query;
  }

  public async readPermissions(record: ContactDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [];

    if (record.ownerId.equals(user._id)) {
      attributes.push(
        "_id",
        "address",
        "companyId",
        "company",
        "createdAt",
        "description",
        "email",
        "email2",
        "fax",
        "firstName",
        "fullName",
        "homePhone",
        "lastName",
        "mobilePhone",
        "otherPhone",
        "ownerId",
        "phone",
        "selectedCompany",
        "title",
        "type",
        "updatedAt"
      );
    }

    return attributes;
  }

  public async removePermissions(record: ContactDocument, user: UserDocument): Promise<boolean> {
    return record.ownerId.equals(user._id);
  }

  public async updatePermissions(record: ContactDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [];

    if (record.ownerId.equals(user._id)) {
      attributes.push(
        "address",
        "companyId",
        "company",
        "description",
        "email",
        "email2",
        "fax",
        "firstName",
        "fullName",
        "homePhone",
        "lastName",
        "mobilePhone",
        "otherPhone",
        "phone",
        "selectedCompany",
        "title",
        "type"
      );
    }

    return attributes;
  }

}
