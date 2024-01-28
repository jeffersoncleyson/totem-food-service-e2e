import { Given, Then, When } from "@cucumber/cucumber";
import CategoryAdmService from "~/services/administrative/category/category-adm-service";
import StepDefinitionUtil from "../../utils/utls-step-definitions";
import ProductAdmService from "~/services/administrative/product/product-adm-service";
import { BASE_STEP_DEFINITION_OPTIONS } from "~/support/constants";

// ######### BEGIN @product-0001
Given("Category with name: {string}" , BASE_STEP_DEFINITION_OPTIONS , async function (categoryName: string) {

  this.categoryPaylod = { name: `e2e-${categoryName}` } as object;
  this.headers = { "Content-Type": "application/json" } as object;

  this.responseCategory = await CategoryAdmService.createCategory(this.categoryPaylod, this.headers);

  StepDefinitionUtil.expectTobeNotNull(this.responseCategory);
  StepDefinitionUtil.expectTobeEqual(this.responseCategory?.status, 201);

  const { body } = this.responseCategory;
  const { id, name, modifiedAt, createAt } = body;
  StepDefinitionUtil.expectTobeNotNull(id);
  StepDefinitionUtil.expectTobeNotNull(name);
  StepDefinitionUtil.expectTobeNotNull(modifiedAt);
  StepDefinitionUtil.expectTobeNotNull(createAt);
  StepDefinitionUtil.expectTobeEqual(name, `e2e-${categoryName}`);
  StepDefinitionUtil.matchRegex(modifiedAt, /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d.\d+Z/);
  StepDefinitionUtil.matchRegex(createAt, /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d.\d+Z/);

  this.categoryId = id;
  this.categoryName = name;
});

Given("The Administrator wants to create product with name: {string}" , BASE_STEP_DEFINITION_OPTIONS , async function (name: string) {
  this.productPayload = {
    name: `e2e-${name}`,
    description: 'e2e',
    image: 'https://e2e-image.com.br/image-e2e.png',
    price: 15,
    category: this.categoryId
  } as object;
  this.headers = { "Content-Type": "application/json" } as object;
});

When("The Administrator create a new product" , BASE_STEP_DEFINITION_OPTIONS , async function () {
  this.response = await ProductAdmService.createProduct(this.productPayload, this.headers);
});

Then("The response with a new product name: {string}" , BASE_STEP_DEFINITION_OPTIONS , async function (param: string) {
  StepDefinitionUtil.expectTobeNotNull(this.response);
  const { body } = this.response;
  const { id, name, description, image, price, modifiedAt, createAt, category } = body;
  StepDefinitionUtil.expectTobeNotNull(id);
  StepDefinitionUtil.expectTobeNotNull(name);
  StepDefinitionUtil.expectTobeNotNull(modifiedAt);
  StepDefinitionUtil.expectTobeNotNull(createAt);
  StepDefinitionUtil.expectTobeEqual(name, `e2e-${param}`);
  StepDefinitionUtil.expectTobeEqual(description, this.productPayload.description);
  StepDefinitionUtil.expectTobeEqual(image, this.productPayload.image);
  StepDefinitionUtil.expectTobeEqual(price, this.productPayload.price);
  StepDefinitionUtil.matchRegex(modifiedAt, /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d.\d+Z/);
  StepDefinitionUtil.matchRegex(createAt, /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d.\d+Z/);

  StepDefinitionUtil.expectTobeNotNull(category);
  StepDefinitionUtil.expectTobeNotNull(category?.id);
  StepDefinitionUtil.expectTobeNotNull(category?.name);
  StepDefinitionUtil.expectTobeNotNull(category?.modifiedAt);
  StepDefinitionUtil.expectTobeNotNull(category?.createAt);
  StepDefinitionUtil.expectTobeEqual(category?.id, this.productPayload.category);
  StepDefinitionUtil.expectTobeEqual(category?.name, this.categoryName);
  StepDefinitionUtil.matchRegex(category?.modifiedAt, /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d.\d+Z/);
  StepDefinitionUtil.matchRegex(category?.createAt, /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d.\d+Z/);
});

Then("Remove product created and expected Status Code {int}" , BASE_STEP_DEFINITION_OPTIONS , async function (httpStatusCode: number) {
  this.response = await ProductAdmService.removeProduct(this.response?.body?.id, this.headers);
  StepDefinitionUtil.expectTobeNotNull(this.response);
  StepDefinitionUtil.expectTobeEqual(this.response?.status, httpStatusCode);
});
// ######### END @product-0001

// ######### BEGIN @product-0002
When("The Administrator try create a new product with same name" , BASE_STEP_DEFINITION_OPTIONS , async function () {
  this.responseSameProduct = await ProductAdmService.createProduct(this.productPayload, this.headers);
});

Then("Same product should return Status Code Error {int}" , BASE_STEP_DEFINITION_OPTIONS , async function (httpStatusCode: number) {
  StepDefinitionUtil.expectTobeNotNull(this.responseSameProduct);
  StepDefinitionUtil.expectTobeEqual(this.responseSameProduct?.status, httpStatusCode);
});
// ######### END @product-0002

// ######### BEGIN @product-0003
Given("The Administrator wants to update product with name: {string}" , BASE_STEP_DEFINITION_OPTIONS , async function (name: string) {
  this.productPayloadUpdated = {
    name: `e2e-${name}-updated`,
    description: 'e2e-updated',
    image: 'https://e2e-image.com.br/image-e2e-updated.png',
    price: 50,
    category: this.categoryId
  } as object;
  this.headers = { "Content-Type": "application/json" } as object;
});

When("The Administrator update a product" , BASE_STEP_DEFINITION_OPTIONS , async function () {
  this.responseProductUpdated = await ProductAdmService.updateProduct(this.response?.body?.id, this.productPayloadUpdated, this.headers);
});


Then("Update Product should return Status Code {int}" , BASE_STEP_DEFINITION_OPTIONS , async function (httpStatusCode: number) {
  StepDefinitionUtil.expectTobeNotNull(this.responseProductUpdated);
  StepDefinitionUtil.expectTobeEqual(this.responseProductUpdated?.status, httpStatusCode);
});

Then("The response updating a product name: {string}" , BASE_STEP_DEFINITION_OPTIONS , async function (param: string) {
  StepDefinitionUtil.expectTobeNotNull(this.responseProductUpdated);
  const { body } = this.responseProductUpdated;
  const { id, name, description, image, price, modifiedAt, createAt, category } = body;
  StepDefinitionUtil.expectTobeNotNull(id);
  StepDefinitionUtil.expectTobeNotNull(name);
  StepDefinitionUtil.expectTobeNotNull(modifiedAt);
  StepDefinitionUtil.expectTobeNotNull(createAt);
  StepDefinitionUtil.expectTobeEqual(name, `e2e-${param}-updated`);
  StepDefinitionUtil.expectTobeEqual(description, this.productPayloadUpdated.description);
  StepDefinitionUtil.expectTobeEqual(image, this.productPayloadUpdated.image);
  StepDefinitionUtil.expectTobeEqual(price, this.productPayloadUpdated.price);
  StepDefinitionUtil.matchRegex(modifiedAt, /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d.\d+Z/);
  StepDefinitionUtil.matchRegex(createAt, /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d.\d+Z/);

  StepDefinitionUtil.expectTobeNotNull(category);
  StepDefinitionUtil.expectTobeNotNull(category?.id);
  StepDefinitionUtil.expectTobeNotNull(category?.name);
  StepDefinitionUtil.expectTobeNotNull(category?.modifiedAt);
  StepDefinitionUtil.expectTobeNotNull(category?.createAt);
  StepDefinitionUtil.expectTobeEqual(category?.id, this.productPayloadUpdated.category);
  StepDefinitionUtil.expectTobeEqual(category?.name, this.categoryName);
  StepDefinitionUtil.matchRegex(category?.modifiedAt, /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d.\d+Z/);
  StepDefinitionUtil.matchRegex(category?.createAt, /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d.\d+Z/);
});
// ######### END @product-0003

// ######### BEGIN @product-0004
Given("The Administrator wants to delete product with id: {string}" , BASE_STEP_DEFINITION_OPTIONS , async function (id: string) {
  this.headers = { "Content-Type": "application/json" } as object;
  this.response = {
    body: {
      id: id
    }
  }
});
// ######### END @product-0004