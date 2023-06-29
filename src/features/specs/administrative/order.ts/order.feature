@order
Feature:
  As an Administrative
  I want to get order list 

  @OD-0004
  Scenario: OD-0001: <testCase>: Get order list
    Given The Totem wants to create order with customerId: '<customerId>', with combo '<combo>' and product '<product>'
    When The Totem create a new order
    Then Should return Status Code <createHttpCode>
    And The response with a new order
    Given The Administrative to get order list
    Then Should return Status Code <getHttpCode>

    Examples:
      | testCase | customerId               | combo                                               | product                  | createHttpCode |  getHttpCode |
      | 001      | 6497aeb8edfe661e63ab140a | 6497aeb8edfe661e63ab140a, 6497aeb8edfe661e63ab1402 | 2197aeb8edfe661e63ab140a, 6497aeb8edfe661e63a3240a | 201  | 200 | 
      | 002      | 6497aeb8edfe661e63ab230s | 6497aeb8edfe661e63ab140a, 6497aeb8edfe661e63ab1403 | 4597aeb8edfe661e63ab140a, 4597aeb8edfe661e63ab140a | 201  | 200 | 

