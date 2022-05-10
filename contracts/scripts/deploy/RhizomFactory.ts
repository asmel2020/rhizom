import { ethers,upgrades} from "hardhat";
async function main() {
  const Factory = await ethers.getContractFactory("RhizomFactory");

  const factory = await upgrades.deployProxy(Factory,{kind:'uups'});

  await factory.deployed();
  
  console.log("RhizomFactory deployed to:", factory.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });