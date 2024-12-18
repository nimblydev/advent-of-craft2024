1- First idea use fp and Either. I want to use the effect-ts library
2- refactor the pickUpGift to return Either<Gift, Error>
3- refactor findManufacturedGift to return Either<gift, Error> and change loadGiftsInSleigh to chain Eithers
4- refactor use pipe and flatMap to chain the functions
