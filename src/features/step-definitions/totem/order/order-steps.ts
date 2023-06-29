import { Given, Then, When } from "@cucumber/cucumber";
import StepDefinitionUtil from "~/features/step-definitions/utils/utls-step-definitions";
import OrderService from "~/services/totem/order/order-service";

// ######### BEGIN @ID-0001
Given(
  "The Totem wants to create order with customerId: {string}, with combo {string} and product {string}",
  async function (customerId: string, combo: string, product: string) {
    this.body = {
      customerId,
      combo: combo.split(",") as string[],
      product: product.split(",") as string[],
    } as object;
  }
);

When("The Totem create a new order", async function () {
  this.response = await OrderService.createOrder(this.body);
});

Then(
  "Should return Status Code {int}",
  async function (httpStatusCode: number) {
    StepDefinitionUtil.expectTobeNotNull(this.response);
    StepDefinitionUtil.expectTobeEqual(this.response?.status, httpStatusCode);
  }
);

Then("The response with a new order", async function () {
  StepDefinitionUtil.expectTobeNotNull(this.response);
  const { body } = this.response;
  const { customerId, name, modifiedAt, createAt } = body;
  StepDefinitionUtil.expectTobeNotNull(customerId);
  StepDefinitionUtil.expectTobeNotNull(name);
  StepDefinitionUtil.expectTobeNotNull(modifiedAt);
  StepDefinitionUtil.expectTobeNotNull(createAt);
  StepDefinitionUtil.matchRegex(
    modifiedAt,
    /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d.\d+Z/
  );
  StepDefinitionUtil.matchRegex(
    createAt,
    /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d.\d+Z/
  );
});

// ######### END @ID-0001

// ######### BEGIN @ID-0002
Given(
  "The Totem wants to update order with customerId: {string}, combo {string}, product {string}",
  async function (customerId: string, combo: string, product: string) {
    this.body = {
      customerId,
      combo: combo.split(",") as string[],
      product: product.split(",") as string[],
    } as object;
    this.headers = { "Content-Type": "application/json" } as object;
  }
);

When("The Totem update a order", async function () {
  StepDefinitionUtil.expectTobeNotNull(this.response);
  this.response = await OrderService.updateOrder(
    this.response?.body?.customerId,
    this.body
  );
});

Then("The response updating a order", async function () {
  StepDefinitionUtil.expectTobeNotNull(this.response);
  const { body } = this.response;
  const { customerId, name, modifiedAt, createAt } = body;
  StepDefinitionUtil.expectTobeNotNull(customerId);
  StepDefinitionUtil.expectTobeNotNull(name);
  StepDefinitionUtil.expectTobeNotNull(modifiedAt);
  StepDefinitionUtil.expectTobeNotNull(createAt);
  StepDefinitionUtil.matchRegex(
    modifiedAt,
    /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d.\d+Z/
  );
  StepDefinitionUtil.matchRegex(
    createAt,
    /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d.\d+Z/
  );
});

// ######### END @ID-0002

// ######### BEGIN @ID-0003
Given(
  "The Totem wants to update order status: {string}",
  async function (status: string) {
    this.body = {
      status,
      orderId: this.response?.body?.id,
    } as object;
    this.headers = { "Content-Type": "application/json" } as object;
  }
);

When("The Totem update a status order", async function () {
  StepDefinitionUtil.expectTobeNotNull(this.response);
  this.response = await OrderService.updateStatusOrder(
    this.response?.body?.orderId,
    this.body?.status
  );
});

Then("The response updating a status order", async function () {
  StepDefinitionUtil.expectTobeNotNull(this.response);
  const { body } = this.response;
  const { customerId, name, modifiedAt, createAt } = body;
  StepDefinitionUtil.expectTobeNotNull(customerId);
  StepDefinitionUtil.expectTobeNotNull(name);
  StepDefinitionUtil.expectTobeNotNull(modifiedAt);
  StepDefinitionUtil.expectTobeNotNull(createAt);
  StepDefinitionUtil.matchRegex(
    modifiedAt,
    /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d.\d+Z/
  );
  StepDefinitionUtil.matchRegex(
    createAt,
    /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d.\d+Z/
  );
});

// ######### END @ID-0003
