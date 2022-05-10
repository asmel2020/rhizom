import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import { abi } from "../abi/abi";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import "../css/TokenCreat.css";
export const TokenCreat = () => {
  const {
    Moralis,
    isWeb3Enabled,
    enableWeb3,
    isAuthenticated,
  } = useMoralis();

  const [name, setname] = useState("");
  const [_Symbol, setSymbol] = useState("");
  const [supply, setsupply] = useState(0);
  const [owner, setowner] = useState("");
  const [textButton, settextButton] = useState("Create");
  const ethers = Moralis.web3Library;

  const handelName = (e) => {
    const nameValue = e.target.value;
    const MAX_CARATERCS = 8;
    if (nameValue.length <= MAX_CARATERCS) {
      setname(nameValue);
    }
  };

  const handelSymbol = (e) => {
    const symbolValue = e.target.value;
    const MAX_CARATERCS = 5;
    if (symbolValue.length <= MAX_CARATERCS) {
      setSymbol(symbolValue);
    }
  };

  const handelSupply = (e) => {
    const SupplyValue = e.target.value;
    const MAX_CARATERCS = Math.pow(10, 18);
    if (SupplyValue.length <= MAX_CARATERCS) {
      setsupply(SupplyValue);
    }
  };

  const handelOwner = (e) => {
    const OwnerValue = e.target.value;
    const MAX_CARATERCS = 42;
    if (OwnerValue.length <= MAX_CARATERCS) {
      setowner(OwnerValue);
    }
  };

  const validator = (name, ymbol, supply, owner) => {
    if (!(name.length >= 2) || !(name.length <= 8)) {
      return {
        status: false,
        message:
          "the name must have more than 3 characters and less than 8 characters",
      };
    }

    if (!(ymbol.length >= 2) || !(ymbol.length <= 5)) {
      return {
        status: false,
        message:
          "the symbol must have more than 2 characters and less than 5 characters",
      };
    }

    if (Number.isNaN(supply) || !(Number(supply) >= Number(1))) {
      return {
        status: false,
        message: "enter the supply",
      };
    }

    if (owner.length < 42) {
      return {
        status: false,
        message: "the wallet has to be 42 characters",
      };
    }

    if (!ethers.utils.isAddress(owner)) {
      return {
        status: false,
        message: "incorrect wallet format",
      };
    }

    return {
      status: true,
    };
  };

  const tokenCreate = async (name, ymbol, supply, owner) => {
    const MySwal = withReactContent(Swal);
    if(!isAuthenticated){
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "connect your wallet",
      });
      return
    }

    const btnRhizom = document.getElementById("btnRhizom");

    try {
      //habilitar web3
      if(!isWeb3Enabled && isAuthenticated){
        await enableWeb3();
      }

      // validar parametros
      const { status, message } = validator(name, ymbol, supply, owner);
      if (!status) {
        throw {
          message,
        };
      }
     
      const options = {
        contractAddress: process.env.REACT_APP_CONTRACT,
        functionName: "tokenCreate",
        abi: abi,
        params: {
          _name: name,
          _symbol: ymbol,
          _supply: supply,
          _owner: ethers.utils.getAddress(owner),
        },
      };

      settextButton(
        <div
          class="spinner-border text-dark spinner-border-sm"
          role="status"
        ></div>
      );

      btnRhizom.disabled = true;

      const transaction = await Moralis.executeFunction(options);
    
      await transaction.wait();

      setname("");
      setSymbol("");
      setsupply(0);
      setowner("");

      settextButton("Create");
      btnRhizom.disabled = false;
      MySwal.fire("Good job!", "You clicked the button!", "success");
    } catch (error) {
      settextButton("Create");

      btnRhizom.disabled = false;

      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  return (
    <>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          Name
        </label>
        <input
          type="text"
          class="form-control"
          onChange={handelName}
          value={name}
          id="exampleFormControlInput1"
          placeholder="Rhizom"
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          Symbol
        </label>
        <input
          type="text"
          class="form-control"
          onChange={handelSymbol}
          value={_Symbol}
          id="exampleFormControlInput1"
          placeholder="RH"
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          Supply
        </label>
        <input
          type="number"
          class="form-control"
          onChange={handelSupply}
          value={supply}
          min={1}
          max={Math.pow(10, 18)}
          id="exampleFormControlInput1"
          placeholder="Supply"
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          Owner
        </label>
        <input
          type="text"
          class="form-control"
          onChange={handelOwner}
          value={owner}
          id="exampleFormControlInput1"
          placeholder="Owner"
        />
      </div>
      
      <div class="d-grid gap-2 col-sm-3 ms-auto">
      <button
          class="btn btn-rhizom my-3"
          id="btnRhizom"
          onClick={() => {
            tokenCreate(name, _Symbol, supply, owner);
          }}
        >
          {textButton}
        </button>
       
      </div>
    </>
  );
};
