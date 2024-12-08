Feature: Basic elven Worksop

Scenario: An elven workshop can produce a known toy  
    Given an empty workshop with a known 'Super Nintendo' toy
    When I ask to produce a 'Super Nintendo'
    Then I should produce a 'Super Nintendo'

Scenario: An elven workshop can't produce a non existing toy
    Given an empty workshop
    When I ask to complete a non existing toy
    Then I should not produce anything


