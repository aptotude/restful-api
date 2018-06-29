import { Pursuit, PursuitDocument, UserDocument } from "../index";
import { Permissions } from "./permissions";

export class PursuitPermissions extends Permissions {

  constructor() {
    super();

    this.Model = Pursuit;
  }

  public async createPermissions(user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
      "brokerProposedPrice",
      "clientCompanyId",
      "clientContactId",
      "commissionAmount",
      "createdDate",
      "lastModifiedDate",
      "listProbability",
      "name",
      "probability",
      "propertyId",
      "pursuitDeliveryDate",
      "recordTypeId",
      "sellProbability",
      "sellerPriceExpectation",
      "status",
      "type"
    ];

    return attributes;
  }

  public async findPermissions(user: UserDocument): Promise<any> {
    const query: any = { ownerId: user._id };

    return query;
  }

  public async readPermissions(record: PursuitDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [];

    if (record.ownerId.equals(user._id)) {
      attributes.push(
        "_id",
        "brokerProposedPrice",
        "clientCompanyId",
        "clientContactId",
        "commissionAmount",
        "createdAt",
        "createdDate",
        "lastModifiedDate",
        "listProbability",
        "name",
        "probability",
        "propertyId",
        "pursuitDeliveryDate",
        "recordTypeId",
        "sellProbability",
        "sellerPriceExpectation",
        "status",
        "type",
        "updatedAt"
      );
    }

    return attributes;
  }

  public async removePermissions(record: PursuitDocument, user: UserDocument): Promise<boolean> {
    return record.ownerId.equals(user._id);
  }

  public async updatePermissions(record: PursuitDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [];

    if (record.ownerId.equals(user._id)) {
      attributes.push(
        "brokerProposedPrice",
        "clientCompanyId",
        "clientContactId",
        "commissionAmount",
        "createdDate",
        "lastModifiedDate",
        "listProbability",
        "name",
        "probability",
        "propertyId",
        "pursuitDeliveryDate",
        "recordTypeId",
        "sellProbability",
        "sellerPriceExpectation",
        "status",
        "type"
      );
    }

    return attributes;
  }

}
