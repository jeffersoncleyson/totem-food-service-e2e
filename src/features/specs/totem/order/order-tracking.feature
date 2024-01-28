@regression
@order-tracking
Feature:
  As an Administrative
  I want to track orders

  @order-tracking-0001
  Scenario: order-tracking-0001: <testCase>: Admin tracking order by status: <filterBy>
    Given Category with name: '<categoryName>'
    Given Product with name: '<productName>'
    Given The Administrator wants to create order
    When The Administrator create a new order
    Then Should return Status Code <createHttpCode>
    And The response with a new order
    When The user update order to status '<status>'
    When The admin wants to track order by status '<filterBy>'
    Then The admin sees the order by status '<filterBy>' and expected Status Code <filterHttpCode>
    And Remove order created and expected Status Code <removeHttpCode>
    Examples:
      | testCase | categoryName | productName | status                                                           | filterBy        | createHttpCode | removeHttpCode | filterHttpCode |
      | 001      | Refrigerante | Coca-Cola   | NEW, WAITING_PAYMENT, RECEIVED, IN_PREPARATION, READY, FINALIZED | FINALIZED       | 201            | 204            | 200            |
      | 002      | Refrigerante | Coca-Cola   | NEW, WAITING_PAYMENT, RECEIVED, IN_PREPARATION, READY            | READY           | 201            | 204            | 200            |
      | 003      | Refrigerante | Coca-Cola   | NEW, WAITING_PAYMENT, RECEIVED, IN_PREPARATION                   | IN_PREPARATION  | 201            | 204            | 200            |
      | 004      | Refrigerante | Coca-Cola   | NEW, WAITING_PAYMENT, RECEIVED                                   | RECEIVED        | 201            | 204            | 200            |
      | 005      | Refrigerante | Coca-Cola   | NEW, WAITING_PAYMENT                                             | WAITING_PAYMENT | 201            | 204            | 200            |
      | 006      | Refrigerante | Coca-Cola   | NEW, WAITING_PAYMENT, CANCELED                                   | CANCELED        | 201            | 204            | 200            |
      | 007      | Refrigerante | Coca-Cola   | NEW                                                              | NEW             | 201            | 204            | 200            |

  @order-tracking-0002
  Scenario: order-tracking-0002: <testCase>: Error on filter with invalid status
    Given Category with name: '<categoryName>'
    Given Product with name: '<productName>'
    Given The Administrator wants to create order
    When The Administrator create a new order
    Then Should return Status Code <createHttpCode>
    And The response with a new order
    When The admin wants to track order by status '<filterBy>'
    Then The admin can't see the order by status '<filterBy>' and expected Status Code <filterHttpCode>
    And Remove order created and expected Status Code <removeHttpCode>
    Examples:
      | testCase | categoryName | productName | filterBy         | createHttpCode | removeHttpCode | filterHttpCode |
      | 001      | Refrigerante | Coca-Cola   | NEWs             | 201            | 204            | 400            |
      | 002      | Sobremesa    | Bolo        | WAITING_PAYMENTS | 201            | 204            | 400            |

  @order-tracking-0003
  Scenario: order-tracking-0003: <testCase>: Filter by orderId
    Given Category with name: '<categoryName>'
    Given Product with name: '<productName>'
    Given The Administrator wants to create order
    When The Administrator create a new order
    Then Should return Status Code <createHttpCode>
    And The response with a new order
    When The admin wants to track order by orderId
    Then The admin sees the order by status '<filterBy>' and expected Status Code <filterHttpCode>
    And Remove order created and expected Status Code <removeHttpCode>
    Examples:
      | testCase | categoryName | productName | filterBy | createHttpCode | removeHttpCode | filterHttpCode |
      | 001      | Refrigerante | Coca-Cola   | NEW      | 201            | 204            | 200            |
      | 002      | Sobremesa    | Bolo        | NEW      | 201            | 204            | 200            |

  @order-tracking-0004 @debug
  Scenario: order-tracking-0004: <testCase>: Filter by customer
    Given Category with name: '<categoryName>'
    Given Product with name: '<productName>'
    Given The Administrator wants to create order
    When The Administrator create a new order
    Then Should return Status Code <createHttpCode>
    And The response with a new order
    When The admin wants to track order by orderId
    Then The admin sees the order by status '<filterBy>' and expected Status Code <filterHttpCode>
    And Remove order created and expected Status Code <removeHttpCode>
    Examples:
      | testCase | categoryName | productName | filterBy | createHttpCode | removeHttpCode | filterHttpCode |
      | 001      | Refrigerante | Coca-Cola   | NEW      | 201            | 204            | 200            |
      | 002      | Sobremesa    | Bolo        | NEW      | 201            | 204            | 200            |