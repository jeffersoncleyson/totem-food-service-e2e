import { Before, After } from "@cucumber/cucumber";

Before(async (scenario) => {
  console.log(`\n=== Before Scenario: ${scenario.pickle.name} ===`);
});

After(async () => {
  // if there after
});
