# Heretics Fan Token

The smart contract have several function to manage fans and score:
 - `isFan`: does the user is know has fan (so own the SBT)
 - `scoreOf`: get the score of an user for the current season
 - `scoreForSeason`: get the score of an user for a previous season
 - `mint`: restricted to owner, it send a new SBT to the specified user
 - `increaseScore`: restricted to owner, it increase the score of the specified user
 - `startNewSeason`: restricted to owner, start a new season and reset the score for everyone (fan still keep their SBT, only the score is reset)

## Testing

You can run `yarn hardhat test` to run tests locally

## Deploy

You can run `yarn hardhat deploy --network bsc` to deploy the contract, but don't forget to set
your RPC URL and privateKey in `hardhat.config.ts`
