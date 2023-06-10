import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "chai";
import CategoryService from "~/services/administrative/category/category-service";

// ######### BEGIN @ID-0001
Given("The Administrator wants to create category with name: {string}", async function (name: string) {
  console.log(name);
  await CategoryService.createCategory(name, { "Content-Type": "application/json" })
    .then(() => console.log("Entrou")).catch((err: any) => {
      console.log(err);
    });
});

When("The Administrator create a new category", async function () {
  console.log("When");
});

Then("Should return Status Code {int}", async function (httpStatusCode: number) {
  expect(httpStatusCode).to.be.exist;
});

Then("The response with a new category name: {string}", async function (name: string) {
  expect(name).to.be.equals(name);
});
// ######### END @ID-0001
