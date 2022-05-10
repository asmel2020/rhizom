import { ethers} from "hardhat";
import * as fs from 'fs';
async function main() {
    // We get the contract to deploy
    const RhizomEncodeNft = await ethers.getContractFactory("RhizomEncodeNft");
    const rhizomEncodeNft = await RhizomEncodeNft.deploy();

    await rhizomEncodeNft.deployed();

    const RhizomEncodeToken = await ethers.getContractFactory("RhizomEncodeToken");
    const rhizomEncodeToken = await RhizomEncodeToken.deploy();

    
    await rhizomEncodeToken.deployed();

    console.log("RhizomEncodeNft deployed to:", rhizomEncodeNft.address);

    console.log("RhizomEncodeToken deployed to:", rhizomEncodeToken.address);

    const EncodesAddress = { 
      rhizomEncodeToken:rhizomEncodeToken.address,
      rhizomEncodeNft:rhizomEncodeNft.address
  };
   
  fs.writeFileSync('EncodesAddress.json', JSON.stringify(EncodesAddress));
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });