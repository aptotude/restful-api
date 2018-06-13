import { BuyersNeed, BuyersNeedDocument, UserDocument } from "../index";
import { Permissions } from "./permissions";

export class BuyersNeedPermissions extends Permissions {

  constructor() {
    super();

    this.Model = BuyersNeed;
  }

  public async createPermissions(user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
      "acquisitionType",
      "buildingType",
      "buyerQuality",
      "contactId",
      "isActive",
      "market",
      "maxPrice",
      "maxSquareFootage",
      "minCapRate",
      "minCashOnCash",
      "minIrr",
      "minLirr",
      "minPrice",
      "minSquareFootage",
      "name",
    ];

    return attributes;
  }

  public async findPermissions(user: UserDocument): Promise<any> {
    const query: any = { ownerId: user._id };

    return query;
  }

  public async readPermissions(record: BuyersNeedDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [];

    if (record.ownerId.equals(user._id)) {
      attributes.push(
        "_id",
        "acquisitionType",
        "buildingType",
        "buyerQuality",
        "contactId",
        "createdAt",
        "isActive",
        "market",
        "maxPrice",
        "maxSquareFootage",
        "minCapRate",
        "minCashOnCash",
        "minIrr",
        "minLirr",
        "minPrice",
        "minSquareFootage",
        "name",
        "ownerId",
        "updatedAt"
      );
    }

    return attributes;
  }

  public async removePermissions(record: BuyersNeedDocument, user: UserDocument): Promise<boolean> {
    return record.ownerId.equals(user._id);
  }

  public async updatePermissions(record: BuyersNeedDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [];

    if (record.ownerId.equals(user._id)) {
      attributes.push(
        "acquisitionType",
        "buildingType",
        "buyerQuality",
        "contactId",
        "isActive",
        "market",
        "maxPrice",
        "maxSquareFootage",
        "minCapRate",
        "minCashOnCash",
        "minIrr",
        "minLirr",
        "minPrice",
        "minSquareFootage",
        "name"
      );
    }

    return attributes;
  }

}
