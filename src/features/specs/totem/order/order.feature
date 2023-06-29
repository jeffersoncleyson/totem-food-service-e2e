@order
Feature:
  As an Totem
  I want to create a order

  @OD-0001
  Scenario: OD-0001: <testCase>: Creating new order
    Given The Totem wants to create order with customerId: '<customerId>', with combo '<combo>' and product '<product>'
    When The Totem create a new order
    Then Should return Status Code <createHttpCode>
    And The response with a new order
    Examples:
      | testCase | customerId               | combo                                               | product                  | createHttpCode | 
      | 001      | 6497aeb8edfe661e63ab140a | 6497aeb8edfe661e63ab140a, 6497aeb8edfe661e63ab1402 | 2197aeb8edfe661e63ab140a, 6497aeb8edfe661e63a3240a | 201  | 
      | 002      | 6497aeb8edfe661e63ab230s | 6497aeb8edfe661e63ab140a, 6497aeb8edfe661e63ab1403 | 4597aeb8edfe661e63ab140a, 4597aeb8edfe661e63ab140a | 201  | 

  @OD-0002
  Scenario: OD-0002: <testCase>: Creating and Updating order
    Given The Totem wants to create order with customerId: '<customerId>', with combo '<combo>' and product '<product>'
    When The Totem create a new order
    Then Should return Status Code <createHttpCode>
    And The response with a new order
    Given The Totem wants to update order with customerId: '<customerId>', combo '<combo>', product '<product>'
    When The Totem update a order
    Then Should return Status Code <updateHttpCode>
    And The response updating a order
    Examples:
      | testCase | customerId               | combo                                               | product                                           | createHttpCode |  updateHttpCode | 
      | 001      | 6497aeb8edfe661e63ab140a | 6497aeb8edfe661e63ab140a, 6497aeb8edfe661e63ab1402 | 2197aeb8edfe661e63ab140a, 6497aeb8edfe661e63a3240a | 201           | 202 | 
      | 002      | 6497aeb8edfe661e63ab230s | 6497aeb8edfe661e63ab140a, 6497aeb8edfe661e63ab1403 | 4597aeb8edfe661e63ab140a, 4597aeb8edfe661e63ab140a | 201         | 202 | 

  @OD-0003
  Scenario: OD-0003: <testCase>: Creating and Updating Status order
    Given The Totem wants to create order with customerId: '<customerId>', with combo '<combo>' and product '<product>'
    When The Totem create a new order
    Then Should return Status Code <createHttpCode>
    And The response with a new order
    Given The Totem wants to update order status: '<status>'
    When The Totem update a status order
    Then Should return Status Code <updateHttpCode>
    And The response updating a status order
    Examples:
      | testCase | customerId               | combo                                               | product                                           | createHttpCode |  updateHttpCode | 
      | 001      | 6497aeb8edfe661e63ab140a | 6497aeb8edfe661e63ab140a, 6497aeb8edfe661e63ab1402 | 2197aeb8edfe661e63ab140a, 6497aeb8edfe661e63a3240a | 201           | 202 | 
      | 002      | 6497aeb8edfe661e63ab230s | 6497aeb8edfe661e63ab140a, 6497aeb8edfe661e63ab1403 | 4597aeb8edfe661e63ab140a, 4597aeb8edfe661e63ab140a | 201         | 202 | 