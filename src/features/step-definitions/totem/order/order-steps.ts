import { Given, Then, When } from "@cucumber/cucumber";
import ProductAdmService from "~/services/administrative/product/product-adm-service";
import OrderService from "~/services/totem/order/order-service";
import StepDefinitionUtil from "../../utils/utls-step-definitions";
import UtilsEnv from "~/support/utils-env";

// ######### BEGIN @order-0001
Given("Product with name: {string}", async function (productName: string) {

  this.productPayload = {
    name: `e2e-${productName}`,
    description: 'e2e',
    image: 'https://e2e-image.com.br/image-e2e.png',
    price: 15,
    category: this.categoryId
  } as object;
  this.headers = { "Content-Type": "application/json" } as object;

  this.responseProduct = await ProductAdmService.createProduct(this.productPayload, this.headers);

  StepDefinitionUtil.expectTobeNotNull(this.responseProduct);
  StepDefinitionUtil.expectTobeEqual(this.responseProduct?.status, 201);

  const { body } = this.responseProduct;
  const { id, name, description, image, price, modifiedAt, createAt, category } = body;
  StepDefinitionUtil.expectTobeNotNull(id);
  StepDefinitionUtil.expectTobeNotNull(name);
  StepDefinitionUtil.expectTobeNotNull(modifiedAt);
  StepDefinitionUtil.expectTobeNotNull(createAt);
  StepDefinitionUtil.expectTobeEqual(name, `e2e-${productName}`);
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

  this.productId = id;
});

Given("The Administrator wants to create order", async function () {
  this.orderPayload = {
    products: [
      {
        id: this.productId,
        qtd: 1
      }
    ]
  } as object;
  this.headers = {
    "Content-Type": "application/json",
    "x-user-identifier": UtilsEnv.getEnv(UtilsEnv.USER_IDENTIFIER)
  } as object;
});

When("The Administrator create a new order", async function () {
  this.response = await OrderService.createOrder(this.orderPayload, this.headers);
});

Then("The response with a new order", async function () {
  StepDefinitionUtil.expectTobeNotNull(this.response);
  const { body } = this.response;
  await validateProducts(body?.products, this.productPayload, this.categoryName);
});


async function validateProducts(products: any[], productPayload: any, categoryName: string) {

  products.forEach((product => {

    const { id, name, description, image, price, modifiedAt, createAt, category } = product;

    StepDefinitionUtil.expectTobeNotNull(id);
    StepDefinitionUtil.expectTobeNotNull(name);
    StepDefinitionUtil.expectTobeNotNull(modifiedAt);
    StepDefinitionUtil.expectTobeNotNull(createAt);
    StepDefinitionUtil.expectTobeEqual(name, productPayload.name);
    StepDefinitionUtil.expectTobeEqual(description, productPayload.description);
    StepDefinitionUtil.expectTobeEqual(image, productPayload.image);
    StepDefinitionUtil.expectTobeEqual(price, productPayload.price);
    StepDefinitionUtil.matchRegex(modifiedAt, /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d.\d+Z/);
    StepDefinitionUtil.matchRegex(createAt, /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d.\d+Z/);

    StepDefinitionUtil.expectTobeNotNull(category);
    StepDefinitionUtil.expectTobeNotNull(category?.id);
    StepDefinitionUtil.expectTobeNotNull(category?.name);
    StepDefinitionUtil.expectTobeNotNull(category?.modifiedAt);
    StepDefinitionUtil.expectTobeNotNull(category?.createAt);
    StepDefinitionUtil.expectTobeEqual(category?.id, productPayload.category);
    StepDefinitionUtil.expectTobeEqual(category?.name, categoryName);
    StepDefinitionUtil.matchRegex(category?.modifiedAt, /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d.\d+Z/);
    StepDefinitionUtil.matchRegex(category?.createAt, /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d.\d+Z/);
  }))

}

Then("Remove order created and expected Status Code {int}", async function (httpStatusCode: number) {
  this.response = await OrderService.removeOrder(this.response?.body?.id, this.headers);
  StepDefinitionUtil.expectTobeNotNull(this.response);
  StepDefinitionUtil.expectTobeEqual(this.response?.status, httpStatusCode);
});
// ######### END @order-0001


// ######### BEGIN @order-0002
Given("The Administrator wants to update order", async function () {
  this.newQtdOfProduct = 2;
  this.orderPayloadUpdate = {
    products: [
      {
        id: this.productId,
        qtd: this.newQtdOfProduct
      }
    ]
  } as object;
  this.headers = {
    "Content-Type": "application/json",
    "x-user-identifier": UtilsEnv.getEnv(UtilsEnv.USER_IDENTIFIER)
  } as object;
});

When("The Administrator update a order", async function () {
  this.responseOrderUpdated = await OrderService.updateOrder(this.response?.body?.id, this.orderPayloadUpdate, this.headers);
});

Then("Update Order should return Status Code {int}", async function (httpStatusCode: number) {
  StepDefinitionUtil.expectTobeNotNull(this.responseOrderUpdated);
  StepDefinitionUtil.expectTobeEqual(this.responseOrderUpdated?.status, httpStatusCode);
});

Then("The response updating a order", async function () {
  const { body } = this.responseOrderUpdated;
  StepDefinitionUtil.expectTobeEqual(body?.products?.length, this.newQtdOfProduct);
  await validateProducts(body?.products, this.productPayload, this.categoryName);
});
// ######### END @order-0002

// ######### BEGIN @order-0003
Given("The Administrator wants to delete order with id: {string}", async function (id: string) {
  this.headers = { "Content-Type": "application/json" } as object;
  this.response = {
    body: {
      id: id
    }
  }
});
// ######### END @order-0003