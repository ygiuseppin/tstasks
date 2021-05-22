//const assert = require('assert');
const { expect } = require("chai");
const chai = require("chai");
const assert = chai.assert;
const chaiaspromise = require("chai-as-promised");
chai.use(chaiaspromise);


const UsersController = require("../controllers/Users");
const UserModel = require("../models/Users");

const value = "value";
describe("Users", async () => {
  beforeEach(() => {});

  afterEach(() => {});
  // Test login with stubs
  it("Should delete user", () => {
    // Stub model remove
    const stub = sinon.stub(UserModel, "remove");
    stub.returns([
      { email: "testemail", password: "testpassword", userId: "testUserId" },
    ]);

    // Test as promised
    return expect(UsersController.deleteUser()).to.eventually.equal({
      message: "User deleted",
    });
  });
});
