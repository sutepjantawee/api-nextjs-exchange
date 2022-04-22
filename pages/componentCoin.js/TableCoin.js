import React from "react";
import Image from "next/image";
import btc from "../img/opengraph.png";
import eth from "../img/pngegg.png";
import sol from "../img/solana-sol-logo.png"
import Bitkub from "./Bitkub";
import Binance from "./Binance";
import FTX from "./FTX";
export default function TableCoin({ dataCoin }) {
  const BitkubCoin = [
    dataCoin.BinanceBTC,
    dataCoin.BinanceETH,
    dataCoin.BinanceSOL,
  ];
  const BinanceCoin = [
    dataCoin.BitkupBTC,
    dataCoin.BitkupETH,
    dataCoin.BitkupSOL,
  ];
  const FTXCoin = [dataCoin.FtxBTC, dataCoin.FtxETH, dataCoin.FtxSOL];

  return (
    <div>
      <div className="text-center text-3xl pt-10 pb-5 text-zinc-800">
        Exchange Compare Cryptocurrency Prices
      </div>
      <table class="min-w-full border text-center ">
        <thead class="border-b bg-gradient-to-r from-violet-600 to-fuchsia-600 text-gray-100 text-xl justify-items-center">
          <tr>
            <th scope="col" class="font-medium px-6 py-4 border-r ">
              <p>Name</p>
            </th>
            <th scope="col" class="font-medium  px-6 py-4 border-r">
              <p>Bitkup</p>
            </th>
            <th scope="col" class="font-medium  px-6 py-4 border-r">
              <p>Binace</p>
            </th>
            <th scope="col" class="font-medium  px-6 py-4 border-r">
              <p>FTX</p>
            </th>
          </tr>
        </thead>
        <tbody class="bg-gradient-to-r from-violet-600 to-fuchsia-600 ">
          <tr>
            <th class="font-medium px-6 border-r text-slate-200">
              <div className="text-lg py-2 text-center  border-b ">
                BTC-THB <div><Image src={btc} width={40} height={40} /></div>
              </div>
              <div className="text-lg py-2 text-center border-b">
                ETH-THB<div><Image src={eth} width={40} height={40} /></div>
              </div>
              <div className="text-lg py-2 text-center ">
                SOL-THB<div><Image src={sol}  width={35} height={35} /></div>
                </div>
            </th>
            <th class="font-medium  px-6  border-r ">
              {BitkubCoin.map((coin) => {
                return <Bitkub coins={coin} />;
              })}
            </th>
            <th class="font-medium  px-6 border-r">
              {BinanceCoin.map((coin) => {
                return <Binance coins={coin} />;
              })}
            </th>
            <th class="font-medium  px-6 border-r">
              {FTXCoin.map((coin) => {
                return <FTX coins={coin} />;
              })}
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
