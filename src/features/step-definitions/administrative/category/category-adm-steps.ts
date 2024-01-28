import { Given, When, Then } from "@cucumber/cucumber";
import StepDefinitionUtil from "~/features/step-definitions/utils/utls-step-definitions";
import CategoryAdmService from "~/services/administrative/category/category-adm-service";
import { BASE_STEP_DEFINITION_OPTIONS } from "~/support/constants";

// ######### BEGIN @ID-0001
Given("The Administrator wants to create category with name: {string}", BASE_STEP_DEFINITION_OPTIONS , async function (name: string) {
  this.body = {name: `e2e-${name}`} as object;
  this.headers = { "Content-Type": "application/json" } as object;
});

When("The Administrator create a new category", BASE_STEP_DEFINITION_OPTIONS , async function () {
  this.response = await CategoryAdmService.createCategory(this.body, this.headers);
});

Then("The response with a new category name: {string}", BASE_STEP_DEFINITION_OPTIONS , async function (param: string) {
  StepDefinitionUtil.expectTobeNotNull(this.response);
  const {body} = this.response;
  const {id, name, modifiedAt, createAt} = body;
  StepDefinitionUtil.expectTobeNotNull(id);
  StepDefinitionUtil.expectTobeNotNull(name);
  StepDefinitionUtil.expectTobeNotNull(modifiedAt);
  StepDefinitionUtil.expectTobeNotNull(createAt);
  StepDefinitionUtil.expectTobeEqual(name, `e2e-${param}`);
  StepDefinitionUtil.matchRegex(modifiedAt, /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d.\d+Z/);
  StepDefinitionUtil.matchRegex(createAt, /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d.\d+Z/);
});

Then("Remove category created and expected Status Code {int}", BASE_STEP_DEFINITION_OPTIONS , async function (httpStatusCode: number) {
  this.response = await CategoryAdmService.removeCategory(this.response?.body?.id, this.headers);
  StepDefinitionUtil.expectTobeNotNull(this.response);
  StepDefinitionUtil.expectTobeEqual(this.response?.status, httpStatusCode);
});
// ######### END @ID-0001

// ######### BEGIN @ID-0002
When("The Administrator try create a new category with same name", BASE_STEP_DEFINITION_OPTIONS , async function () {
  this.responseSameCategory = await CategoryAdmService.createCategory(this.body, this.headers);
});

Then("Should return Status Code Error {int}", BASE_STEP_DEFINITION_OPTIONS , async function (httpStatusCode: number) {
  StepDefinitionUtil.expectTobeNotNull(this.responseSameCategory);
  StepDefinitionUtil.expectTobeEqual(this.responseSameCategory?.status, httpStatusCode);
});
// ######### END @ID-0002

// ######### BEGIN @ID-0003
Given("The Administrator wants to update category with name: {string}", BASE_STEP_DEFINITION_OPTIONS , async function (name: string) {
  this.body = {name: `e2e-${name}-updated`} as object;
  this.headers = { "Content-Type": "application/json" } as object;
});

When("The Administrator update a category", BASE_STEP_DEFINITION_OPTIONS , async function () {
  this.response = await CategoryAdmService.updateCategory(this.response?.body?.id, this.body, this.headers);
});

Then("The response updating a category name: {string}" , BASE_STEP_DEFINITION_OPTIONS , async function (param: string) {
  StepDefinitionUtil.expectTobeNotNull(this.response);
  const {body} = this.response;
  const {id, name, modifiedAt, createAt} = body;
  StepDefinitionUtil.expectTobeNotNull(id);
  StepDefinitionUtil.expectTobeNotNull(name);
  StepDefinitionUtil.expectTobeNotNull(modifiedAt);
  StepDefinitionUtil.expectTobeNotNull(createAt);
  StepDefinitionUtil.expectTobeEqual(name, `e2e-${param}-updated`);
  StepDefinitionUtil.matchRegex(modifiedAt, /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d.\d+Z/);
  StepDefinitionUtil.matchRegex(createAt, /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d.\d+Z/);
});
// ######### END @ID-0003

// ######### BEGIN @ID-0004
Given("The Administrator wants to delete category with id: {string}" , BASE_STEP_DEFINITION_OPTIONS , async function (id: string) {
  this.headers = { "Content-Type": "application/json" } as object;
  this.response = {
    body: {
      id: id
    }
  }
});

// ######### END @ID-0004