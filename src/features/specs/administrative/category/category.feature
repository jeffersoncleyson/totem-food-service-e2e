@category
Feature:
  As an Administrative
  I want to create a category

  @CT-0001
  Scenario: CT-0001: <testCase>: Creating new categories
    Given The Administrator wants to create category with name: '<name>'
    When The Administrator create a new category
    Then Should return Status Code <createHttpCode>
    And The response with a new category name: '<name>'
    And Remove category created and expected Status Code <removeHttpCode>
    Examples:
      | testCase | name         | createHttpCode | removeHttpCode |
      | 001      | Refrigerante | 201            | 204            |
      | 002      | Sobremesa    | 201            | 204            |

  @CT-0002
  Scenario: CT-0002: <testCase>: Error on create category with same name
    Given The Administrator wants to create category with name: '<name>'
    When The Administrator create a new category
    Then Should return Status Code <createHttpCode>
    And The response with a new category name: '<name>'
    When The Administrator try create a new category with same name
    Then Should return Status Code Error <errorHttpCode>
    And Remove category created and expected Status Code <removeHttpCode>
    Examples:
      | testCase | name         | createHttpCode | errorHttpCode | removeHttpCode |
      | 001      | Refrigerante | 201            | 400           | 204            |
      | 002      | Sobremesa    | 201            | 400           | 204            |

  @CT-0003
  Scenario: CT-0003: <testCase>: Creating and Updating categories
    Given The Administrator wants to create category with name: '<name>'
    When The Administrator create a new category
    Then Should return Status Code <createHttpCode>
    And The response with a new category name: '<name>'
    Given The Administrator wants to update category with name: '<name>'
    When The Administrator update a category
    Then Should return Status Code <updateHttpCode>
    And The response updating a category name: '<name>'
    And Remove category created and expected Status Code <removeHttpCode>
    Examples:
      | testCase | name         | createHttpCode | updateHttpCode | removeHttpCode |
      | 001      | Refrigerante | 201            | 202            | 204            |
      | 002      | Sobremesa    | 201            | 202            | 204            |

  @CT-0004
  Scenario: CT-0004: <testCase>: Deleting non exist category
    Given The Administrator wants to delete category with id: '<name>'
    When Remove category created and expected Status Code <removeHttpCode>
    Examples:
      | testCase | name                     | removeHttpCode |
      | 001      | 6497aeb8edfe661e63ab140a | 204            |