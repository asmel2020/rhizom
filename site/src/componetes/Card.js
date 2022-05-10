import React, { useState } from "react";
import { TokenCreat } from "./TokenCreat";
import { NftCreate } from "./NftCreate";
import { History } from "./History";
import "../css/Card.css";


export const Card = () => {
  const [slider, setslider] = useState(1);

  const handelSlider = (active) => {
    setslider(active);
  };

  const option = () => {
    switch (slider) {
      case 1:
        return <TokenCreat />;
        break;
      case 2:
        return <NftCreate />;
        break;
      case 3:
        return <History />;
        break;
      default:
        return <TokenCreat />;
        break;
    }
  };

  return (
    <div className="row mt-5 my-auto w-100">
      <div className="row justify-content-center">
        <div className="col-11 col-sm-9 col-md-6 col-lg-6 col-xl-4 ">
          <div class="card bg-transparent border  ">
            <div class="card-header">
              <div className="row justify-content-center">
                <div className="col-4 d-flex justify-content-center">
                  <a
                    href="javascript:void(0)"
                    class=""
                    onClick={() => handelSlider(1)}
                    tabindex="-1"
                    role="button"
                    aria-disabled="true"
                  >
                    Token
                  </a>
                </div>
                <div className="col-4 d-flex justify-content-center border-start border-2">
                  <a
                    href="javascript:void(0)"
                    class=""
                    onClick={() => handelSlider(2)}
                    tabindex="-1"
                    role="button"
                    aria-disabled="true"
                  >
                    Nft
                  </a>
                </div>

                <div className="col-4 d-flex justify-content-center border-start border-2">
                  <a
                    href="javascript:void(0)"
                    class=""
                    onClick={() => handelSlider(3)}
                    tabindex="-1"
                    role="button"
                    aria-disabled="true"
                  >
                    History
                  </a>
                </div>
              </div>
            </div>
            <div class="card-body m-2">{option()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
