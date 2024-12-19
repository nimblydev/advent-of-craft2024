1- First idea use fp and Either. I want to use the effect-ts library
2- refactor the pickUpGift to return Either<Gift, Error>
3- refactor findManufacturedGift to return Either<gift, Error> and change loadGiftsInSleigh to chain Eithers
4- refactor use pipe and flatMap to chain the functions
5- add classes for the three specific errors to be intercepted by an EffectCatchTags in loadGiftsInSleigh of the Business class.
6- add a logList to log errors and to keep feedbacks
7- simplify test and Business class by removing logList and use Sleigh to log errors like success
