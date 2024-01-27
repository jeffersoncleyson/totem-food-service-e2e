import { Then } from "@cucumber/cucumber";
import StepDefinitionUtil from "~/features/step-definitions/utils/utls-step-definitions";

Then("Should return Status Code {int}", async function (httpStatusCode: number) {
  StepDefinitionUtil.expectTobeNotNull(this.response);
  StepDefinitionUtil.expectTobeEqual(this.response?.status, httpStatusCode);
});