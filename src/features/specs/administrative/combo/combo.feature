@combo
Feature:
  As an Administrative
  I want to create a combo

  @CB-0001
  Scenario: CB-0001: <testCase>: Creating new combo
    Given The Administrator wants to create combo with name: '<name>', price: <price> and products: '<products>'
    When The Administrator create a new combo
    Then Should return Status Code <createHttpCode>
    And The response with a new combo name: '<name>'
    Examples:
      | testCase | name         | price | products | createHttpCode |
      | 001      | Combo balaco baco | 22.99 | 64826bb3554280604d93d7b6, 64826bb3554280604d93d7b5, 64826bb3554280604d93d7b4 | 201            |
      | 002      | Combo 3 marias   | 34.99 | 64826bb3554280604d93d7b3, 64826bb3554280604d93d7b7 | 201            |