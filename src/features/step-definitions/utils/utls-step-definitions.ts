import { expect } from "chai";

export default class StepDefinitionUtil {

  static expectTobeNotNull = (data: object) => {
    expect(data).to.not.equal(null);
  };

  static expectTobeEqual = (actual: object | string | number, expected: object | string | number) => {
    expect(actual).to.equal(expected);
  };

  static matchRegex = (data: string, regex: RegExp) => {
    const test = regex.test(data);
    expect(test).to.equal(true);
  };

  static expectToInclude = (actual: object | string | number, expected: number[]) => {
    expect(expected).to.include(actual);
  };
  
}