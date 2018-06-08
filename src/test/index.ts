process.env.NODE_ENV = "test";

import {
  BuyersNeed,
  Comp,
  Company,
  Contact,
  ContactGroup,
  Contract,
  DealParty,
  File,
  Group,
  Listing,
  Offer,
  Ownership,
  Property,
  Pursuit,
  Task,
  Token,
  User,
} from "../mongoose";

// start the API server
const index = require("../");

beforeEach(async function() {
  // Reset the database
  await await Promise.all([
    BuyersNeed.remove({}),
    Comp.remove({}),
    Company.remove({}),
    Contact.remove({}),
    ContactGroup.remove({}),
    Contract.remove({}),
    DealParty.remove({}),
    File.remove({}),
    Group.remove({}),
    Listing.remove({}),
    Offer.remove({}),
    Ownership.remove({}),
    Property.remove({}),
    Pursuit.remove({}),
    Task.remove({}),
    Token.remove({}),
    User.remove({})
  ]);
});

export = {
  express: index.express,
  mongoose: index.mongoose
};
