@product
Feature:
  As an Administrative
  I want to create a product

  # @CT-0001
  @PD-0001
  Scenario: PD-0001: <testCase>: Creating new products
    Given The Administrator wants to create product with name: '<name>', description: '<description>', price: <price>, image: '<image>', category: '<category>'
    When The Administrator create a new product
    Then Should return Status Code <createHttpCode>
    And The response with a new product name: '<name>'
    And Remove product created and expected Status Code <removeHttpCode>
    Examples:
      | testCase | name         | description | price | image | category | createHttpCode | removeHttpCode |
      | 001      | Coca-cola | Refrigerante sabor cola | 6.99 | https://product-image.s3.east-1.amazonaws.com/coca-cola.png | 64826bb3554280604d93d7b6 | 201    | 204  |
      | 002      | Fanta Uva    | Refrigerante sabor uva | 7.99 | https://product-image.s3.east-1.amazonaws.com/fanta-uva.png | 64826bb3554280604d93d7b6 | 201  | 204  |

  @PD-0002
  Scenario: PD-0002: <testCase>: Error on create product with same name
    Given The Administrator wants to create product with name: '<name>', description: '<description>', price: <price>, image: '<image>', category: '<category>'
    When The Administrator create a new product
    Then Should return Status Code <createHttpCode>
    And The response with a new product name: '<name>'
    When The Administrator try create a new product with same name
    Then Should return Status Code Error <errorHttpCode>
    And Remove product created and expected Status Code <removeHttpCode>
    Examples:
      | testCase | name         | description |  price | image |  category                                                  | createHttpCode | errorHttpCode | removeHttpCode |
      | 001      | Coca-cola | Refrigerante sabor cola |  6.99 | https://product-image.s3.east-1.amazonaws.com/coca-cola.png |  64826bb3554280604d93d7b6  | 201   | 400   | 204  |
      | 002      | Fanta Uva    | Refrigerante sabor uva |  7.99 | https://product-image.s3.east-1.amazonaws.com/fanta-uva.png |  64826bb3554280604d93d7b6  | 201   | 400   | 204  |

  @PD-0003
  Scenario: PD-0003: <testCase>: Creating and Updating categories
    Given The Administrator wants to create product with name: '<name>', description: '<description>', price: <price>, image: '<image>', category: '<category>'
    When The Administrator create a new product
    Then Should return Status Code <createHttpCode>
    And The response with a new product name: '<name>'
    Given The Administrator wants to update product with name: '<name>'
    When The Administrator update a product
    Then Should return Status Code <updateHttpCode>
    And The response updating a product name: '<name>'
    And Remove product created and expected Status Code <removeHttpCode>
    Examples:
      | testCase | name          | description | price | image | category  | createHttpCode | updateHttpCode | removeHttpCode |
      | 001      | Coca-cola  | Refrigerante sabor cola | 6.99 | https://product-image.s3.east-1.amazonaws.com/coca-cola.png  | 64826bb3554280604d93d7b6   | 201  | 202  | 204  |
      | 002      | Fanta Uva      | Refrigerante sabor uva | 7.99 | https://product-image.s3.east-1.amazonaws.com/fanta-uva.png | 64826bb3554280604d93d7b6   | 201  | 202  | 204  |

  @PD-0004
  Scenario: PD-0004: <testCase>: Deleting non exist product
    Given The Administrator wants to delete product with id: '<id>'
    When Remove product created and expected Status Code <removeHttpCode>
    Examples:
      | testCase | id                     | removeHttpCode |
      | 001      | 6497aeb8edfe661e63ab140a | 204            |