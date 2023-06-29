import { Given, Then } from "@cucumber/cucumber";

import OrderService from "~/services/administrative/order/order-service";
import StepDefinitionUtil from "../../utils/utls-step-definitions";

// ######### BEGIN @ID-0001
Given("The Administrative to get order list", async function () {
  this.response = await OrderService.list();
});

Then(
  "Should return Status Code {int}",
  async function (httpStatusCode: number) {
    StepDefinitionUtil.expectTobeNotNull(this.response);
    StepDefinitionUtil.expectTobeEqual(this.response?.status, httpStatusCode);
  }
);

// ######### END @ID-0001
