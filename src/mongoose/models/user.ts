import * as bcrypt from "bcrypt-nodejs";
import { Chance } from "chance";
import * as mongoose from "mongoose";
import * as request from "request";

import { Token, TokenDocument } from "../";

export enum UserLevel {
  Default,
  Admin
}

export interface UserDocument extends mongoose.Document {
  [key: string]: any;

  companyName?: string;
  email?: string;
  firstName?: string;
  isActive?: boolean;
  lastName?: string;
  level?: number;
  password?: string;
  phone?: string;
  phoneCell?: string;
  profileId?: string;
  resetHash?: string;
  smallPhotoUrl?: string;
  title?: string;
  userRoleId?: string;

  isValidPassword(password: string): boolean;
  login(): Promise<{ token: TokenDocument, user: UserDocument }>;
  logout(token: string|mongoose.Schema.Types.ObjectId): Promise<UserDocument>;
  requestPasswordReset(): Promise<UserDocument>;
}

export interface UserModel extends mongoose.Model<UserDocument> {
  getPasswordHash(password: string): string;
  mock(params?: any): Promise<UserDocument>;
  resetPassword(resetHash: string, newPassword: string): Promise<UserDocument>;
}

const schema = new mongoose.Schema({
  companyName: String,
  email: {
    required: true,
    type: String,
    unique: true,
    uniqueCaseInsensitive: true,
    validate: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}/,
  },
  firstName: String,
  isActive: Boolean,
  lastName: String,
  level: {
    default: 0,
    type: Number
  },
  password: {
    required: true,
    type: String
  },
  phone: String,
  phoneCell: String,
  profileId: String,
  resetHash: String,
  smallPhotoUrl: String,
  title: String,
  userRoleId: String
}, {
  autoIndex: false,
  timestamps: true
});

schema.index({ email: 1 }, { unique: true });

schema.pre("save", function(next) {
  if (this.isModified("email")) {
    this.email = this.email.toLowerCase();
  }

  if (this.isModified("password")) {
    this.password = this.constructor.getPasswordHash(this.password);
  }

  return next();
});

/**
 * Hash a password.
 * @param {String} password The password to hash.
 */
schema.statics.getPasswordHash = function(password: string): string {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

/**
 * Creates a record with randomized required parameters if not specified.
 * @param {Object} params The parameters to initialize the record with.
 */
schema.statics.mock = async function(params?: any): Promise<UserDocument> {
  const chance = new Chance();

  params = params || {};
  if (!params.email) params.email = chance.email();
  if (!params.password) params.password = chance.hash();

  return this.create(params);
};

/**
 * Resets a user's password.
 * @param {String} resetHash The user's resetHash.
 * @param {String} newPassword The user's new password.
 */
schema.statics.resetPassword = async function(resetHash: string, newPassword: string): Promise<UserDocument> {
  if (!resetHash || !newPassword) {
    throw new Error("Please provide a resetHash and newPassword.");
  }

  const user = await User.findOneAndUpdate({
    resetHash
  }, {
    $unset: {
      resetHash: true
    },
    password: User.getPasswordHash(newPassword)
  }, {
    new: true
  });

  await Token.remove({ userId: user._id });

  return user;
};

/**
 * Check if the given password matches the user"s password.
 * @param {String} password The password to check.
 */
schema.methods.isValidPassword = function(password: string): boolean {
  return bcrypt.compareSync(password, this.password);
};

/**
 * Logs a user in.
 */
schema.methods.login = async function(): Promise<{ token: TokenDocument, user: UserDocument }> {
  const token = await Token.create({
    expiresAt: Token.getExpirationDate(),
    userId: this._id
  });

  return { token, user: this };
};

/**
 * Logs the user out.
 * @param {String} token The access token to be cleared.
 */
schema.methods.logout = async function(token: string|mongoose.Schema.Types.ObjectId): Promise<UserDocument> {
  if (!token) {
    throw new Error("A valid access token must be used for logout.");
  }

  await Token.remove({ _id: token });

  return this;
};

/**
 * Generates a resetHash and sends the user a Reset Password email.
 */
schema.methods.requestPasswordReset = async function(): Promise<UserDocument> {
  const isMailgunConfigured = process.env.MAILGUN_KEY && process.env.MAILGUN_DOMAIN;
  const isPasswordResetConfigured = process.env.PASSWORD_RESET_COMPANY &&
    process.env.PASSWORD_RESET_FROM &&
    process.env.PASSWORD_RESET_URL;

  if (!isMailgunConfigured || !isPasswordResetConfigured) {
    throw new Error("Mailgun and/or password reset settings not specified in configuration file.");
  }

  const chance = new Chance();
  this.resetHash = chance.hash();
  const user = await this.save();

  const resetUrl = process.env.PASSWORD_RESET_URL + user.resetHash;

  let html = "You have requested to reset your password. Please click the link below to create a new password:";
  html += "<br><br>";
  html += "<a href=" + resetUrl + ">" + resetUrl + "</a>";
  html += "<br><br>";
  html += "Thank you,";
  html += "<br>";
  html += process.env.PASSWORD_RESET_COMPANY;

  const url = "https://api:" + process.env.MAILGUN_KEY + "@api.mailgun.net/v3/" + process.env.MAILGUN_DOMAIN + "/messages";

  try {
    await new Promise((res, rej) => {
      request.post({
        form: {
          from: process.env.PASSWORD_RESET_FROM,
          html,
          subject: "Reset Password",
          to: user.email
        },
        url
      }, function(err, response, body) {
        return err ? rej(err) : res(body);
      });
    });

    return user;
  } catch (e) {
      this.resetHash = undefined;
      await this.save();

      throw new Error("An error occured sending the password reset email.");
  }
};

export const User = mongoose.model<UserDocument, UserModel>("User", schema);
