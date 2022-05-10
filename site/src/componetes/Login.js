import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

export const Login = () => {
  const [StatudLogin, setStatudLogin] = useState("Login");
  const { Moralis, enableWeb3, authenticate, isAuthenticated, user, logout } = useMoralis();

  useEffect(() => {
    if (isAuthenticated) {
      narrowWallet(user.get("ethAddress"));
      getNFT();
    }
  }, [isAuthenticated]);





    // Subscribe to onWeb3Enabled events
  const narrowWallet = (wallet) => {
    setStatudLogin(`LogOut (${wallet.slice(0, 5)}....${wallet.slice(38, 42)})`);
  };

  const getNFT = async()=>{
    const testnetNFTs = await Moralis.Web3API.account.getNFTs({ chain: "0x61" });
    console.log(testnetNFTs);
  }

  const switchNetwort = async () => {
    await enableWeb3();
    //await Moralis.enableWeb3({ provider: "walletconnect" });
    const chainId = await Moralis.chainId;

    if (chainId != "0x61") {
      const chainId = 97;
      const chainName = "BSC Testnet";
      const currencyName = "tBNB";
      const currencySymbol = "tBNB";
      const rpcUrl =
        "https://speedy-nodes-nyc.moralis.io/256a0fcaf30c6c2c2c8e1932/bsc/testnet";
      const blockExplorerUrl = "https://testnet.bscscan.com/";

      await Moralis.addNetwork(
        chainId,
        chainName,
        currencyName,
        currencySymbol,
        rpcUrl,
        blockExplorerUrl
      );
      await Moralis.switchNetwork("0x61");
    }
  };

  const login = async () => {
    if (!Moralis.isMetaMaskInstalled()) {
      alert("install metamask");
      return;
    }
    try {
      await switchNetwort();
     
      if (!isAuthenticated) {
        await authenticate({ signingMessage: "Welcome to Rhizom" }).then(
          (user) => {
            console.log(user);
            narrowWallet(user.get("ethAddress"));
          }
        );

    
        /*await authenticate({
          signingMessage: "Welcome to Rhizom",
          provider: "walletconnect",
          chainId: 97,
          mobileLinks: [        
            "metamask",
            "trust",
          ]}).then((user) => {
          narrowWallet(user.get("ethAddress"));
        });*/
      } else {
        await logout();
        setStatudLogin("Login");
      }
     
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button type="button" class="btn btn-rhizom " onClick={login}>
        {StatudLogin}
      </button>
    </>
  );
};
