Feature: Authentication

  A user should be able to authenticate via SAML SSO

  Background:
  Given The following users exist in the IDP
    | id    | name          | role        |
    | 12345 | Johan Öbrink  | user        |
    | 67890 | HAL 9000      | superadmin  |
  

  
  Scenario: Not logged in
    Given I am not logged in
    When I visit the start page
    Then I should see a link to log in
  
  Scenario: Login as user
    Given I am logged in as Johan Öbrink
    When I authenticate via the IDP
    Then I should see the welcome page
      And The greeting should say "Welcome Johan Öbrink!"
      And There should be no admin menu
  
  Scenario: Login as admin
    Given I am logged in as HAL 9000
    When I authenticate via the IDP
    Then I should see the welcome page
      And The greeting should say "Welcome HAL 9000!"
      And There should be an admin menu