import { After, AfterAll, Before, BeforeAll } from "@cucumber/cucumber";
import UtilHooks from "~/support/utils-hooks";

Before(async (scenario) => {
  console.log(`\n=== Before Scenario: ${scenario.pickle.name} ===`);
});

After(async (scenario) => {
  const isProductScenario = scenario.pickle.name.includes('product-');
  const isOrderScenario = scenario.pickle.name.includes('order-');
  if (isProductScenario || isOrderScenario) {
    console.log(`\n=== After Scenario: ${scenario.pickle.name} ===`);
    await UtilHooks.clearOrdersE2E();
    await UtilHooks.clearProductsE2E();
    await UtilHooks.clearCategoriesE2E();
  }
});

BeforeAll(async () => {
  console.log(`\n=== Before All Scenario ===`);
  await UtilHooks.clearOrdersE2E();
  await UtilHooks.clearProductsE2E();
  await UtilHooks.clearCategoriesE2E();
});

AfterAll(async () => {
  console.log(`\n=== Before All Scenario ===`);
  await UtilHooks.clearOrdersE2E();
  await UtilHooks.clearProductsE2E();
  await UtilHooks.clearCategoriesE2E();
});


