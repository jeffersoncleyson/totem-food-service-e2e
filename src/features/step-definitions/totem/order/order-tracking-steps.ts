import { Then, When } from "@cucumber/cucumber";
import OrderService from "~/services/totem/order/order-service";
import { BASE_STEP_DEFINITION_OPTIONS } from "~/support/constants";
import UtilsEnv from "~/support/utils-env";
import StepDefinitionUtil from "../../utils/utls-step-definitions";

// ######### BEGIN @order-tracking-0001
When("The admin wants to track order by status {string}", { timeout: 15000 } , async function (status: string) {

  const headers = {
    "Content-Type": "application/json",
    "x-user-identifier": UtilsEnv.getEnv(UtilsEnv.USER_IDENTIFIER)
  } as object;

  this.responseFilterByStatus = await OrderService.listOrderByStatus(`status=${status}`, headers);
  this.targetStatus = status;
});

Then("The admin sees the order by status {string} and expected Status Code {int}" , BASE_STEP_DEFINITION_OPTIONS , async function (status: string, httpStatusCode: number) {
  StepDefinitionUtil.expectTobeNotNull(this.responseFilterByStatus);
  StepDefinitionUtil.expectTobeEqual(this.responseFilterByStatus?.status, httpStatusCode);

  const orders: [] = this.responseFilterByStatus.body;

  StepDefinitionUtil.expectNotEmpty(orders);
  orders.forEach(order => {
    StepDefinitionUtil.expectTobeEqual(order['status'], status)
  });
});
// ######### END @order-tracking-0001


// ######### BEGIN @order-tracking-0002
Then("The admin can't see the order by status {string} and expected Status Code {int}" , BASE_STEP_DEFINITION_OPTIONS , async function (status: string, httpStatusCode: number) {
  StepDefinitionUtil.expectTobeNotNull(this.responseFilterByStatus);
  StepDefinitionUtil.expectTobeEqual(this.responseFilterByStatus?.status, httpStatusCode);
  StepDefinitionUtil.expectTobeNotNull(this.responseFilterByStatus?.body?.error);
  StepDefinitionUtil.expectTobeNotNull(this.responseFilterByStatus?.body?.error?.title);
  StepDefinitionUtil.expectTobeNotNull(this.responseFilterByStatus?.body?.error?.description);

  StepDefinitionUtil.expectTobeEqual(this.responseFilterByStatus?.body?.error?.title, 'Invalid Enum');
  StepDefinitionUtil.expectTobeEqual(this.responseFilterByStatus?.body?.error?.description, `Invalid value [${status}], allowed status [[RECEIVED, READY, NEW, WAITING_PAYMENT, CANCELED, FINALIZED, IN_PREPARATION]]`);
});
// ######### END @order-tracking-0002


// ######### BEGIN @order-tracking-0003
When("The admin wants to track order by orderId", { timeout: 15000 } , async function () {

  const headers = {
    "Content-Type": "application/json",
    "x-user-identifier": UtilsEnv.getEnv(UtilsEnv.USER_IDENTIFIER)
  } as object;

  this.responseFilterByStatus = await OrderService.listOrderByStatus(`orderId=${this.orderId}`, headers);
});
// ######### END @order-tracking-0003