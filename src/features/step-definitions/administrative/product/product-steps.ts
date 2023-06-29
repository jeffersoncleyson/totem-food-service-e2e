import { Given, Then, When } from "@cucumber/cucumber";
import StepDefinitionUtil from "~/features/step-definitions/utils/utls-step-definitions";
import CategoryService from "~/services/administrative/category/category-service";

// ######### BEGIN @ID-0001
Given(
  "The Administrator wants to create product with name: {string}, description: {string}, price: {float}, image: {string}, category: {string}",
  async function (
    name: string,
    description: string,
    price: number,
    image: string,
    category: string
  ) {
    this.body = { name, description, price, image, category } as object;
    this.headers = { "Content-Type": "application/json" } as object;
  }
);

When("The Administrator create a new product", async function () {
  this.response = await CategoryService.createCategory(this.body, this.headers);
});

Then(
  "Should return Status Code {int}",
  async function (httpStatusCode: number) {
    StepDefinitionUtil.expectTobeNotNull(this.response);
    StepDefinitionUtil.expectTobeEqual(this.response?.status, httpStatusCode);
  }
);

Then(
  "The response with a new product name: {string}",
  async function (param: string) {
    StepDefinitionUtil.expectTobeNotNull(this.response);
    const { body } = this.response;
    const {
      id,
      name,
      description,
      image,
      price,
      category,
      modifiedAt,
      createAt,
    } = body;
    StepDefinitionUtil.expectTobeNotNull(id);
    StepDefinitionUtil.expectTobeNotNull(name);
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

Then(
  "Remove category created and expected Status Code {int}",
  async function (httpStatusCode: number) {
    this.response = await CategoryService.removeCategory(
      this.response?.body?.id,
      this.headers
    );
    StepDefinitionUtil.expectTobeNotNull(this.response);
    StepDefinitionUtil.expectTobeEqual(this.response?.status, httpStatusCode);
  }
);
// ######### END @ID-0001
