@regression
@product
Feature:
  As an Administrative
  I want to create a product

  @product-0001
  Scenario: product-0001: <testCase>: Creating new product
    Given Category with name: '<categoryName>'
    Given The Administrator wants to create product with name: '<productName>'
    When The Administrator create a new product
    Then Should return Status Code <createHttpCode>
    And The response with a new product name: '<productName>'
    And Remove product created and expected Status Code <removeHttpCode>
    Examples:
      | testCase | categoryName | productName | createHttpCode | removeHttpCode |
      | 001      | Refrigerante | Coca-Cola   | 201            | 204            |
      | 002      | Sobremesa    | Bolo        | 201            | 204            |

  @product-0002
  Scenario: product-0002: <testCase>: Error on create product with same name
    Given Category with name: '<categoryName>'
    Given The Administrator wants to create product with name: '<productName>'
    When The Administrator create a new product
    Then Should return Status Code <createHttpCode>
    And The response with a new product name: '<productName>'
    When The Administrator try create a new product with same name
    Then Same product should return Status Code Error <errorHttpCode>
    And Remove product created and expected Status Code <removeHttpCode>
    Examples:
      | testCase | categoryName | productName | createHttpCode | removeHttpCode | errorHttpCode |
      | 001      | Refrigerante | Coca-Cola   | 201            | 204            | 400           |
      | 002      | Sobremesa    | Bolo        | 201            | 204            | 400           |

  @product-0003
  Scenario: product-0003: <testCase>: Creating and Updating product
    Given Category with name: '<categoryName>'
    Given The Administrator wants to create product with name: '<productName>'
    When The Administrator create a new product
    Then Should return Status Code <createHttpCode>
    And The response with a new product name: '<productName>'
    Given The Administrator wants to update product with name: '<productNameNew>'
    When The Administrator update a product
    Then Update Product should return Status Code <updateHttpCode>
    And The response updating a product name: '<productNameNew>'
    And Remove product created and expected Status Code <removeHttpCode>
    Examples:
      | testCase | categoryName | productName | productNameNew | createHttpCode | updateHttpCode | removeHttpCode |
      | 001      | Refrigerante | Coca-Cola   | Tubaina        | 201            | 202            | 204            |
      | 002      | Sobremesa    | Bolo        | Bolo Cenoura   | 201            | 202            | 204            |

  @product-0004
  Scenario: product-0004: <testCase>: Deleting non exist product
    Given The Administrator wants to delete product with id: '<name>'
    When Remove product created and expected Status Code <removeHttpCode>
    Examples:
      | testCase | name                     | removeHttpCode |
      | 001      | 6497aeb8edfe661e63ab140a | 204            |


  @product-0005
  Scenario: product-0005: <testCase>: Creating and Updating product category
    Given Category with name: '<categoryName1>'
    Given The Administrator wants to create product with name: '<productName>'
    When The Administrator create a new product
    Then Should return Status Code <createHttpCode>
    And The response with a new product name: '<productName>'
    Given Category with name: '<categoryName2>'
    Given The Administrator wants to update product with name: '<productNameNew>'
    When The Administrator update a product
    Then Update Product should return Status Code <updateHttpCode>
    And The response updating a product name: '<productNameNew>'
    And Remove product created and expected Status Code <removeHttpCode>
    Examples:
      | testCase | categoryName1 | categoryName2 | productName | productNameNew | createHttpCode | updateHttpCode | removeHttpCode |
      | 001      | Refrigerante  | Suco Natural  | Coca-Cola   | Laranja        | 201            | 202            | 204            |
      | 002      | Sobremesa     | Especiais     | Bolo        | Bolo Cenoura   | 201            | 202            | 204            |