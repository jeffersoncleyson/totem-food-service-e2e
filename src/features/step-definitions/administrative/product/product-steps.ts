import { Given, Then, When } from "@cucumber/cucumber";
import StepDefinitionUtil from "~/features/step-definitions/utils/utls-step-definitions";
import ProductService from "~/services/administrative/product/product-service";

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
    this.body = {
      name: `e2e-${name}`,
      description,
      price,
      image,
      category,
    } as object;
    this.headers = { "Content-Type": "application/json" } as object;
  }
);

When("The Administrator create a new product", async function () {
  this.response = await ProductService.createProduct(this.body, this.headers);
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
    StepDefinitionUtil.expectTobeNotNull(description);
    StepDefinitionUtil.expectTobeNotNull(image);
    StepDefinitionUtil.expectTobeNotNull(price);
    StepDefinitionUtil.expectTobeNotNull(category);
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
  "Remove product created and expected Status Code {int}",
  async function (httpStatusCode: number) {
    this.response = await ProductService.removeProduct(
      this.response?.body?.id,
      this.headers
    );
    StepDefinitionUtil.expectTobeNotNull(this.response);
    StepDefinitionUtil.expectTobeEqual(this.response?.status, httpStatusCode);
  }
);
// ######### END @ID-0001

// ######### BEGIN @ID-0002
When(
  "The Administrator try create a new product with same name",
  async function () {
    this.responseSameProduct = await ProductService.createProduct(
      this.body,
      this.headers
    );
  }
);

Then(
  "Should return Status Code Error {int}",
  async function (httpStatusCode: number) {
    StepDefinitionUtil.expectTobeNotNull(this.responseSameProduct);
    StepDefinitionUtil.expectTobeEqual(
      this.responseSameProduct?.status,
      httpStatusCode
    );
  }
);
// ######### END @ID-0002

// ######### BEGIN @ID-0003
Given(
  "The Administrator wants to update product with name: {string}",
  async function (name: string) {
    this.body = { name: `e2e-${name}-updated` } as object;
    this.headers = { "Content-Type": "application/json" } as object;
  }
);

When("The Administrator update a product", async function () {
  this.response = await ProductService.updateProduct(
    this.response?.body?.id,
    this.body,
    this.headers
  );
});

Then(
  "The response updating a product name: {string}",
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
    StepDefinitionUtil.expectTobeNotNull(description);
    StepDefinitionUtil.expectTobeNotNull(image);
    StepDefinitionUtil.expectTobeNotNull(price);
    StepDefinitionUtil.expectTobeNotNull(category);
    StepDefinitionUtil.expectTobeNotNull(modifiedAt);
    StepDefinitionUtil.expectTobeNotNull(createAt);
    StepDefinitionUtil.expectTobeEqual(name, `e2e-${param}-updated`);
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
// ######### END @ID-0003

// ######### BEGIN @ID-0004
Given(
  "The Administrator wants to delete product with id: {string}",
  async function (id: string) {
    this.headers = { "Content-Type": "application/json" } as object;
    this.response = {
      body: {
        id: id,
      },
    };
  }
);
// ######### END @ID-0004