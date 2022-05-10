import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { abi } from "../abi/abi";

export const History = () => {
  const { Moralis, enableWeb3, isAuthenticated, user } = useMoralis();
  const [histotyResult, sethistotyResult] = useState([]);
  useEffect(() => {
    if (isAuthenticated) {
      getHistory(user.get("ethAddress"));
    } else {
      sethistotyResult([]);
    }
  }, [isAuthenticated]);

  const getHistory = async (user) => {
    const atributo = {
      chain: process.env.REACT_APP_NETWORK,
      address: process.env.REACT_APP_CONTRACT,
      function_name: "getUserContracts",
      abi: abi,
      params: {
        _wallet: user,
      },
    };

    const result = await Moralis.Web3API.native.runContractFunction(atributo);

    const result_1 = result.map((result) => {
      const data = new Date(result[2] * 1000);
      return {
        types: result[0],
        name: result[3],
        symbol: result[4],
        supply: result[1],
        addressContrat: result[6],
        timeCreate: `${data.getDate()}/${data.getMonth()}/${data.getFullYear()}`,
      };
    });
    sethistotyResult(result_1.reverse());
  };

  return (
    <div className="table-responsive"> 
      <table className="table">
        <thead className="text-rhizom">
          <tr>
            <th className="text-center" scope="col">
              types
            </th>
            <th className="text-center" scope="col">
              name
            </th>
            <th className="text-center" scope="col">
              symbol
            </th>
            <th className="text-center" scope="col ">
              address
            </th>
            <th className="text-center" scope="col">
              data
            </th>
          </tr>
        </thead>
        <tbody className="text-white">
          {histotyResult.map(
            ({ types, name, symbol, addressContrat, timeCreate }) => {
              return (
                <tr>
                  <td className="text-center">
                    {types === "1" ? "Tokens" : "NFT"}
                  </td>
                  <td className="text-center">{name}</td>
                  <td className="text-center">{symbol}</td>
                  <td className="text-center">
                    <a
                      href={`https://testnet.bscscan.com/address/${addressContrat}`}
                      target="_blank"
                      className="link-light"
                    >
                      {`${addressContrat.slice(0, 5)}....${addressContrat.slice(
                      38,
                      42
                    )}`}
                    </a>
                  </td>
                  <td className="text-center">{timeCreate}</td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </div>
  );
};
