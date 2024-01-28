import { Then } from "@cucumber/cucumber";
import StepDefinitionUtil from "~/features/step-definitions/utils/utls-step-definitions";
import { BASE_STEP_DEFINITION_OPTIONS } from "~/support/constants";

Then("Should return Status Code {int}" , BASE_STEP_DEFINITION_OPTIONS , async function (httpStatusCode: number) {
  StepDefinitionUtil.expectTobeNotNull(this.response);
  StepDefinitionUtil.expectTobeEqual(this.response?.status, httpStatusCode);
});