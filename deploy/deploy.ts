import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deploy: DeployFunction = async function ({ getNamedAccounts, deployments }: HardhatRuntimeEnvironment) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("HSTToken", { from: deployer, log: true });
};

deploy.tags = ["HSTToken"];
export default deploy;
