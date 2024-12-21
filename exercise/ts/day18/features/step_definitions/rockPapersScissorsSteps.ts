import { Given, Then, When } from "@cucumber/cucumber";
import { Result, RockPaperScissors } from "../../src/rockPaperScissors";
import * as assert from "assert";
import { EmojiChoice } from "../../src/domain/Choice";

let result: Result;
let player1: EmojiChoice;
let player2: EmojiChoice;

Given(/^Player (\d+) chooses (.*)$/, function (player, choice) {
  if (player === 1) player1 = choice;
  else player2 = choice;
});

When(/^they play$/, function () {
  result = new RockPaperScissors().play(player1, player2);
});

Then(
  /^the result should be (.*) because (.*)$/,
  function (expectedWinner, expectedReason) {
    assert.deepEqual(result, {
      winner: expectedWinner,
      reason: expectedReason,
    });
  }
);
