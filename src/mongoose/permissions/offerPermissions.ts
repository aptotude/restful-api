import { Offer, OfferDocument, UserDocument } from "../index";
import { Permissions } from "./permissions";

export class OfferPermissions extends Permissions {

  constructor() {
    super();

    this.Model = Offer;
  }

  public async createPermissions(user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
      "additionalDeposit",
      "closeDate",
      "contractId",
      "feasibilityPeriod",
      "financingPeriod",
      "independentConsideration",
      "initialDeposit",
      "listingId",
      "name",
      "offerDate",
      "offerPrice",
      "ownerId",
      "purchaserId",
      "status"
    ];

    return attributes;
  }

  public async findPermissions(user: UserDocument): Promise<any> {
    const query: any = { ownerId: user._id };

    return query;
  }

  public async readPermissions(record: OfferDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [];

    if (record.ownerId.equals(user._id)) {
      attributes.push(
        "_id",
        "additionalDeposit",
        "closeDate",
        "contractId",
        "createdAt",
        "feasibilityPeriod",
        "financingPeriod",
        "independentConsideration",
        "initialDeposit",
        "listingId",
        "name",
        "offerDate",
        "offerPrice",
        "ownerId",
        "purchaserId",
        "status",
        "updatedAt"
      );
    }

    return attributes;
  }

  public async removePermissions(record: OfferDocument, user: UserDocument): Promise<boolean> {
    return record.ownerId.equals(user._id);
  }

  public async updatePermissions(record: OfferDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [];

    if (record.ownerId.equals(user._id)) {
      attributes.push(
        "additionalDeposit",
        "closeDate",
        "contractId",
        "feasibilityPeriod",
        "financingPeriod",
        "independentConsideration",
        "initialDeposit",
        "listingId",
        "name",
        "offerDate",
        "offerPrice",
        "ownerId",
        "purchaserId",
        "status"
      );
    }

    return attributes;
  }

}
