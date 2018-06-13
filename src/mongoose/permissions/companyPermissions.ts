import { Company, CompanyDocument, UserDocument } from "../index";
import { Permissions } from "./permissions";

export class CompanyPermissions extends Permissions {

  constructor() {
    super();

    this.Model = Company;
  }

  public async createPermissions(user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
      "billingAddress",
      "category",
      "contacts",
      "description",
      "fax",
      "name",
      "numberOfEmployees",
      "phone",
      "shippingAddress",
      "type",
      "website"
    ];

    return attributes;
  }

  public async findPermissions(user: UserDocument): Promise<any> {
    const query: any = { ownerId: user._id };

    return query;
  }

  public async readPermissions(record: CompanyDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [];

    if (record.ownerId.equals(user._id)) {
      attributes.push(
        "_id",
        "billingAddress",
        "category",
        "contacts",
        "createdAt",
        "description",
        "fax",
        "name",
        "numberOfEmployees",
        "ownerId",
        "phone",
        "shippingAddress",
        "type",
        "updatedAt",
        "website"
      );
    }

    return attributes;
  }

  public async removePermissions(record: CompanyDocument, user: UserDocument): Promise<boolean> {
    return record.ownerId.equals(user._id);
  }

  public async updatePermissions(record: CompanyDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [];

    if (record.ownerId.equals(user._id)) {
      attributes.push(
        "billingAddress",
        "category",
        "contacts",
        "description",
        "fax",
        "name",
        "numberOfEmployees",
        "phone",
        "shippingAddress",
        "type",
        "website"
      );
    }

    return attributes;
  }

}
