@CircusTypedocApp
Feature: ToDo App

Background:
  Given I navigate to the typedoc application

@CircusTypedocApp-Home
Scenario: Clicking the home button returns me to the root of the application
  When I search for "CircusBy" on the typedoc page
  And I click the home button
  Then I should be taken to a page with the title containing "Circus"


@CircusTypedocApp-Search
Scenario: Searching for a component navigates to that component
  When I search for "<phrase>" on the typedoc page
  Then I should be taken to a page with the title containing "<title>"
  Examples:
  |phrase|title|
  |CircusBy|ZCircusBy|
