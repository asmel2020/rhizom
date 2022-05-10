import * as dotenv from "dotenv";
dotenv.config();
import { ethers, upgrades } from "hardhat";

const addressProxy:string = (process.env.PROXY_ADDRESS !== undefined) ? process.env.PROXY_ADDRESS : "";

async function main() {

  const Factory = await ethers.getContractFactory("RhizomFactory");
  await upgrades.upgradeProxy(addressProxy, Factory);

  console.log("Factory upgraded");
}

main();