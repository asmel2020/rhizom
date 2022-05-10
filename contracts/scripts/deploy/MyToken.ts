import { ethers} from "hardhat";
const wallet ="0x6e4B6b4c5119085C730d74738e7D03Ce3e1E3b6B";
const uri ="https://gateway.pinata.cloud/ipfs/";
async function main() {
    // We get the contract to deploy
    const Greeter = await ethers.getContractFactory("MyToken");
    const greeter = await Greeter.deploy();

    await greeter.deployed();
    for (let index = 0; index < 10; index++) {
      await greeter.safeMint(wallet,`${uri}QmaL6DSgrcMSvJ13Uvvuuytm2CxcVaRPh2KR9sSKRejnAr/${index}.json`);
    }
   
    

    console.log("Greeter deployed to:", greeter.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });