@regression
@order
Feature:
  As an Administrative
  I want to create a order

  @order-0001
  Scenario: order-0001: <testCase>: Creating new order
    Given Category with name: '<categoryName>'
    Given Product with name: '<productName>'
    Given The Administrator wants to create order
    When The Administrator create a new order
    Then Should return Status Code <createHttpCode>
    And The response with a new order
    And Remove order created and expected Status Code <removeHttpCode>
    Examples:
      | testCase | categoryName | productName | createHttpCode | removeHttpCode |
      | 001      | Refrigerante | Coca-Cola   | 201            | 204            |
      | 002      | Sobremesa    | Bolo        | 201            | 204            |

  @order-0002
  Scenario: order-0002: <testCase>: Creating and Updating order
    Given Category with name: '<categoryName>'
    Given Product with name: '<productName>'
    Given The Administrator wants to create order
    When The Administrator create a new order
    Then Should return Status Code <createHttpCode>
    And The response with a new order
    Given The Administrator wants to update order
    When The Administrator update a order
    Then Update Order should return Status Code <updateHttpCode>
    And The response updating a order
    And Remove order created and expected Status Code <removeHttpCode>
    Examples:
      | testCase | categoryName | productName | productNameNew | createHttpCode | updateHttpCode | removeHttpCode |
      | 001      | Refrigerante | Coca-Cola   | Tubaina        | 201            | 202            | 204            |
      | 002      | Sobremesa    | Bolo        | Bolo Cenoura   | 201            | 202            | 204            |

  @order-0003
  Scenario: order-0003: <testCase>: Deleting non exist order
    Given The Administrator wants to delete order with id: '<name>'
    When Remove order created and expected Status Code <removeHttpCode>
    Examples:
      | testCase | name                     | removeHttpCode |
      | 001      | 6497aeb8edfe661e63ab140a | 204            |