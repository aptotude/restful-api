import { Comp, CompDocument, UserDocument } from "../index";
import { Permissions } from "./permissions";

export class CompPermissions extends Permissions {

  constructor() {
    super();

    this.Model = Comp;
  }

  public async createPermissions(user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
      "askingPrice",
      "archive",
      "buildingClass",
      "buyerId",
      "buyerCompanyId",
      "capRate",
      "cashOnCash",
      "closeDate",
      "commissionAmount",
      "commissionPercent",
      "contractId",
      "downPayment",
      "escalations",
      "grossCommissionAmount",
      "landlordCompanyId",
      "landlordContactId",
      "leaseCommencementDate",
      "leaseExpirationDate",
      "leaseTermMonths",
      "leaseTotal",
      "leaseType",
      "listingId",
      "listingType",
      "leasedPropertyId",
      "mortgageAmount",
      "netOperatingIncome",
      "occupancyAtClose",
      "occupancyDate",
      "options",
      "priceType",
      "pursuitId",
      "recordTypeId",
      "recordType",
      "rentCommencementDate",
      "rentalRate",
      "rentalRateType",
      "researchComplete",
      "salePrice",
      "sellerId",
      "sellerCompanyId",
      "soldPropertyId",
      "squareFootage",
      "suiteOrFloor",
      "tenancyAtClose",
      "tenantCompanyId",
      "tenantContactId",
      "termRemainingAtClose",
      "transactionDate",
      "type",
      "units"
    ];

    return attributes;
  }

  public async findPermissions(user: UserDocument): Promise<any> {
    const query: any = { ownerId: user._id };

    return query;
  }

  public async readPermissions(record: CompDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [];

    if (record.ownerId.equals(user._id)) {
      attributes.push(
        "_id",
        "askingPrice",
        "archive",
        "buildingClass",
        "buyerId",
        "buyerCompanyId",
        "capRate",
        "cashOnCash",
        "closeDate",
        "commissionAmount",
        "commissionPercent",
        "contractId",
        "createdAt",
        "downPayment",
        "escalations",
        "grossCommissionAmount",
        "landlordCompanyId",
        "landlordContactId",
        "leaseCommencementDate",
        "leaseExpirationDate",
        "leaseTermMonths",
        "leaseTotal",
        "leaseType",
        "listingId",
        "listingType",
        "leasedPropertyId",
        "mortgageAmount",
        "netOperatingIncome",
        "occupancyAtClose",
        "occupancyDate",
        "options",
        "ownerId",
        "priceType",
        "pursuitId",
        "recordTypeId",
        "recordType",
        "rentCommencementDate",
        "rentalRate",
        "rentalRateType",
        "researchComplete",
        "salePrice",
        "sellerId",
        "sellerCompanyId",
        "soldPropertyId",
        "squareFootage",
        "suiteOrFloor",
        "tenancyAtClose",
        "tenantCompanyId",
        "tenantContactId",
        "termRemainingAtClose",
        "transactionDate",
        "type",
        "units",
        "updatedAt"
      );
    }

    return attributes;
  }

  public async removePermissions(record: CompDocument, user: UserDocument): Promise<boolean> {
    return record.ownerId.equals(user._id);
  }

  public async updatePermissions(record: CompDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [];

    if (record.ownerId.equals(user._id)) {
      attributes.push(
        "askingPrice",
        "archive",
        "buildingClass",
        "buyerId",
        "buyerCompanyId",
        "capRate",
        "cashOnCash",
        "closeDate",
        "commissionAmount",
        "commissionPercent",
        "contractId",
        "downPayment",
        "escalations",
        "grossCommissionAmount",
        "landlordCompanyId",
        "landlordContactId",
        "leaseCommencementDate",
        "leaseExpirationDate",
        "leaseTermMonths",
        "leaseTotal",
        "leaseType",
        "listingId",
        "listingType",
        "leasedPropertyId",
        "mortgageAmount",
        "netOperatingIncome",
        "occupancyAtClose",
        "occupancyDate",
        "options",
        "priceType",
        "pursuitId",
        "recordTypeId",
        "recordType",
        "rentCommencementDate",
        "rentalRate",
        "rentalRateType",
        "researchComplete",
        "salePrice",
        "sellerId",
        "sellerCompanyId",
        "soldPropertyId",
        "squareFootage",
        "suiteOrFloor",
        "tenancyAtClose",
        "tenantCompanyId",
        "tenantContactId",
        "termRemainingAtClose",
        "transactionDate",
        "type",
        "units"
      );
    }

    return attributes;
  }

}
