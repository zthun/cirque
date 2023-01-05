@TodoApp
Feature: ToDo App

Background:
  Given I navigate to the ToDo application

Scenario: Clicking the add button on the list adds a new item to the end of the list
  When I click the Add button on the "<list>" list on the todo application
  Then I should have "1" items in the "<list>" list on the todo application
  Examples:
  |list|
  |today|
  |tomorrow|

Scenario: Clicking on an item and changing the text updates the list items
  When I add an item named "Batman" to the "<list>" list on the todo application
  And I add an item named "Superman" to the "<list>" list on the todo application
  And I add an item named "Flash" to the "<list>" list on the todo application
  Then I should have "3" items in the "<list>" list on the todo application
  And the value of the items should be "Batman,Superman,Flash" in the "<list>" on the todo application
  Examples:
  |list|
  |today|
  |tomorrow|
