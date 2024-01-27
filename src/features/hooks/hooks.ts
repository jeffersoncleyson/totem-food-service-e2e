import { After, AfterAll, Before, BeforeAll } from "@cucumber/cucumber";
import UtilHooks from "~/support/utils-hooks";

Before(async (scenario) => {
  console.log(`\n=== Before Scenario: ${scenario.pickle.name} ===`);
});

After(async (scenario) => {
  if (scenario.pickle.name.indexOf('product-') == 0) {
    console.log(`\n=== After Scenario: ${scenario.pickle.name} ===`);
    await UtilHooks.clearCategoriesE2E();
    await UtilHooks.clearProductsE2E();
  }
});

BeforeAll(async () => {
  console.log(`\n=== Before All Scenario ===`);
  await UtilHooks.clearCategoriesE2E();
  await UtilHooks.clearProductsE2E();
});

AfterAll(async () => {
  console.log(`\n=== Before All Scenario ===`);
  await UtilHooks.clearCategoriesE2E();
  await UtilHooks.clearProductsE2E();
});


