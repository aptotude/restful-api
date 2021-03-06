import { Mongoose, UserDocument } from "../index";
import { Permissions } from "./permissions";

export class UserPermissions extends Permissions {

  constructor() {
    super();

    this.Model = Mongoose.User;
  }

  public async createPermissions(user: UserDocument): Promise<string[]> {
    const attributes: string[] = [];

    // If the user is an admin
    if (user.level === 1) {
      attributes.push(
        "email",
        "password",
        "level"
      );
    }

    return attributes;
  }

  public async findPermissions(user: UserDocument): Promise<any> {
    const query: any = {};

    if (user.level === 0) {
      query.level = 0;
    }

    return query;
  }

  public async readPermissions(record: UserDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [
      "_id",
      "email"
    ];

    // If user is reading their own record
    if (record.id === user.id) {
      attributes.push(
        "level",
        "resetHash"
      );
    }

    // If user is an admin
    if (user.level === 1) {
      attributes.push(
        "level",
        "resetHash"
      );
    }

    return attributes;
  }

  public async removePermissions(record: UserDocument, user: UserDocument): Promise<boolean> {
    // If user is removing their own record
    if (record.id === user.id) {
      return true;
    }

    // If the user is an admin
    if (user.level === 1) {
      return true;
    }

    return false;
  }

  public async updatePermissions(record: UserDocument, user: UserDocument): Promise<string[]> {
    const attributes: string[] = [];

    // If user is modifying their own record
    if (record.id === user.id) {
      attributes.push(
        "email",
        "password"
      );
    }

    // If the user is an admin
    if (user.level === 1) {
      attributes.push(
        "email",
        "password",
        "level"
      );
    }

    return attributes;
  }

}
