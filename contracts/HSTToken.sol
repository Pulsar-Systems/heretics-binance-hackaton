// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.8.0) (token/ERC721/ERC721.sol)

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @dev Implementation of a Soulbound Token (SBT).
 * Since there is no standard actually for SBT token we do it as an example.
 * In the future if an EIP that standardize SBT token arrive, it's a good idea to follow it.
 */
contract HSTToken is Ownable {
    // Token name
    string public name = "Heretics Soulbound Token";

    // Token symbol
    string public symbol = "HST";

    // The actual season
    uint256 public season = 1;

    // Mapping users
    mapping(address => bool) private users;

    // Mapping user to score by season
    mapping(uint256 => mapping(address => uint256)) private scores;

    /**
     * Return true if user isFan (mean user have the SBT)
     */
    function isFan(address user) public view returns (bool) {
        require(user != address(0), "address zero is not valid");
        return users[user];
    }

    /**
     * Return the score of an user for the actual season
     */
    function scoreOf(address user) public view returns (uint256) {
        require(user != address(0), "address zero is not valid");
        require(users[user], "user didn't have token");
        return scores[season][user];
    }

    /**
     * Return the score of an user for the specified season.
     * Should only be used to access historical data.
     */
    function scoreForSeason(address user, uint256 season_) public view returns (uint256) {
        require(user != address(0), "address zero is not valid");
        require(season_ >= 1 && season_ <= season, "season not exists");
        return scores[season_][user];
    }

    /**
     * This function can only be called by heretics team (owner of the contract) and is used to
     * mint a SBT for the specified user
     */
    function mint(address user) onlyOwner external {
        require(user != address(0), "address zero is not valid");
        require(!users[user], "user already own a token");
        users[user] = true;
    }

    /**
     * This function can only be called by heretics team (owner of the contract) and is used to
     * increase the score of the specified user by amount (for the current season).
     * We can imagine that this function can be also allowed to trusted sponsors when someone buy on their shop.
     */
    function increaseScore(address user, uint256 amount) onlyOwner external {
        require(user != address(0), "address zero is not valid");
        require(users[user], "user didn't have token");
        scores[season][user] += amount;
    }

    /**
     * This function can only be called by heretics team (owner of the contract) and is used to start a new season.
     * The immediate effect is to reset every score to 0 when you use the function `scoreOf`
     */
    function startNewSeason() onlyOwner external {
        season++;
    }
}
