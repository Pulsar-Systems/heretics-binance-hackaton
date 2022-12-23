import { expect } from "chai";
import { ethers, deployments } from "hardhat";
import { Contract } from "ethers";
import { getNamedSigners } from "@nomiclabs/hardhat-ethers/internal/helpers";
import { HSTToken } from "../typechain";

export const setupTests = deployments.createFixture(async (hre): Promise<Contract> => {
  const { deployments, ethers } = hre;

  const { deployer } = await getNamedSigners(hre);
  await deployments.fixture(); // ensure you start from a fresh deployments

  return await ethers.getContract("HSTToken", deployer);
});

describe("HSTToken", () => {
  it("Test HSTToken", async () => {
    // The fan address
    const fan = await ethers.getNamedSigner("executor");

    // 1. Deploy the contract
    const contract = <HSTToken>await setupTests();
    expect(await contract.isFan(fan.address)).to.equal(false);
    expect(contract.scoreOf(fan.address)).to.revertedWith("user didn't have token");

    // 2. Mint a HST for our fan
    await contract.mint(fan.address);
    expect(await contract.isFan(fan.address)).to.equal(true);
    expect(await contract.scoreOf(fan.address)).to.equal(0);

    // 3. Increase the score
    await contract.increaseScore(fan.address, 1000);
    expect(await contract.scoreOf(fan.address)).to.equal(1000);

    // 4. Start new season
    await contract.startNewSeason();
    expect(await contract.scoreForSeason(fan.address, 1)).to.equal(1000);
    expect(await contract.scoreOf(fan.address)).to.equal(0);
  });
});
