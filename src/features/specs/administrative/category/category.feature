@category
Feature:
  As an Administrative
  I want to create a category

  @ID-0001
  Scenario: ID-0001: <testCase>: Creating new categories
    Given The Administrator wants to create category with name: '<name>'
    When The Administrator create a new category
    Then Should return Status Code <statusCode>
    And The response with a new category name: '<name>'
    Examples:
      | testCase | name         | statusCode |
      | CT-001   | Refrigerante | 201        |
      | CT-002   | Sobremesa    | 201        |