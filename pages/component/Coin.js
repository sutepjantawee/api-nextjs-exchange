import React from "react";
import Bitkub from "./Bitkub";

export default function API({ dataCoin }) {
  // let coin = [dataCoin];
  // let dataCoin = [dataCoin]
  return (
    <div>
      {Object.keys(dataCoin).map((key, value) => {
        return (
          <>
            <Bitkub
              BinanceBTC={dataCoin.BinanceBTC}
              BinanceETH={dataCoin.BinanceETH}
              BitkupBTC={dataCoin.BitkupBTC}
              BitkupETH={dataCoin.BitkupETH}
              BinanceSOL={dataCoin.BinanceSOL}
              BitkupSOL={dataCoin.BitkupSOL}
            />
          </>
        );
      })}
    </div>
  );
}
