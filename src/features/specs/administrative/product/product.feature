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
    And Remove category created and expected Status Code <removeHttpCode>
    Examples:
      | testCase | name         | description | price | image | category | createHttpCode | removeHttpCode |
      | 001      | Coca-cola | Refrigerante sabor cola | 6.99 | https://product-image.s3.east-1.amazonaws.com/coca-cola.png | 64826bb3554280604d93d7b6 | 201    | 204  |
      | 002      | Fanta Uva    | Refrigerante sabor uva | 7.99 | https://product-image.s3.east-1.amazonaws.com/fanta-uva.png | 64826bb3554280604d93d7b6 | 201  | 204  |