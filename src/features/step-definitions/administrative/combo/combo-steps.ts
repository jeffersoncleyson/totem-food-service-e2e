import { Given, Then, When } from "@cucumber/cucumber";
import StepDefinitionUtil from "~/features/step-definitions/utils/utls-step-definitions";
import ComboService from "~/services/administrative/combo/combo-service";

// ######### BEGIN @ID-0001
Given(
  "The Administrator wants to create combo with name: {string}, price: {float} and products: {string}",
  async function (name: string, price: number, products: string) {
    this.body = {
      name: `e2e-${name}`,
      price,
      products: products.split(",") as string[],
    } as object;
    this.headers = { "Content-Type": "application/json" } as object;
  }
);

When("The Administrator create a new combo", async function () {
  this.response = await ComboService.createCombo(this.body, this.headers);
});

Then(
  "Should return Status Code {int}",
  async function (httpStatusCode: number) {
    StepDefinitionUtil.expectTobeNotNull(this.response);
    StepDefinitionUtil.expectTobeEqual(this.response?.status, httpStatusCode);
  }
);

Then(
  "The response with a new combo name: {string}",
  async function (param: string) {
    StepDefinitionUtil.expectTobeNotNull(this.response);
    const { body } = this.response;
    const { id, name, price, products, modifiedAt, createAt } = body;
    StepDefinitionUtil.expectTobeNotNull(id);
    StepDefinitionUtil.expectTobeNotNull(name);
    StepDefinitionUtil.expectTobeNotNull(price);
    StepDefinitionUtil.expectTobeNotNull(products);
    StepDefinitionUtil.expectTobeNotNull(modifiedAt);
    StepDefinitionUtil.expectTobeNotNull(createAt);
    StepDefinitionUtil.expectTobeEqual(name, `e2e-${param}`);
    StepDefinitionUtil.matchRegex(
      modifiedAt,
      /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d.\d+Z/
    );
    StepDefinitionUtil.matchRegex(
      createAt,
      /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d.\d+Z/
    );
  }
);
// ######### END @ID-0001
