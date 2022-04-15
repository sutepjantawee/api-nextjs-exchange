import React, { useState, useEffect } from "react";
import { w3cwebsocket as WebSocket } from "websocket";
import Image from "next/image";
import btc from "../img/opengraph.png";
import eth from "../img/pngegg.png";
const bitstampETHa = new WebSocket("wss://ws.bitstamp.net");
const ftxa = new WebSocket("wss://ftx.com/ws/");
function App() {
  //give an initial state so that the data won't be undefined at start
  const [bidsftx, setBidsftx] = useState([0]);
  const [bidsbitstamp, setBidsbitstamp] = useState([0]);
  const [bidsBitkup, setBidsbitkup] = useState([]);
  const [bidsBitkupUsdt, setBidsbitkupUsdt] = useState([]);
  const [bidsBinance, setBidsBinance] = useState([]);
  const [bidsSatangPro, setBidsSatangPro] = useState([]);

  const ftxEth = ftxa;
  const bitstampEth = bitstampETHa;
  const [bidsftxETH, setBidsftxETH] = useState([0]);
  const [bitstampETH, setBidsstampETH] = useState([0]);
  const [bidsBitkupETH, setBidsbitkupETH] = useState([]);
  const [bidsBinanceETH, setBidsBinanceETH] = useState([]);
  const [bidsSatangProETH, setBidsSatangProETH] = useState([]);

  const bitstamp = new WebSocket("wss://ws.bitstamp.net");
  const ftx = new WebSocket("wss://ftx.com/ws/");
  const bitkub = new WebSocket(
    "wss://api.bitkub.com/websocket-api/market.trade.thb_btc"
  );
  const bitkubUsdt = new WebSocket(
    "wss://api.bitkub.com/websocket-api/market.trade.thb_usdt"
  );
  const bitkubEth = new WebSocket(
    "wss://api.bitkub.com/websocket-api/market.trade.thb_eth"
  );
  const binance = new WebSocket(
    "wss://stream.binance.com:9443/ws/btcusdt@trade"
  );
  const binanceEth = new WebSocket(
    "wss://stream.binance.com:9443/ws/ethusdt@trade"
  );
  const satangpro = new WebSocket(
    "wss://ws.satangcorp.com/ws/btc_thb@aggTrade"
  );
  const satangproEth = new WebSocket(
    "wss://ws.satangcorp.com/ws/eth_thb@aggTrade"
  );

  const apiCallbitstamp = {
    event: "bts:subscribe",
    data: { channel: "order_book_btcusdt" },
  };
  const apiCallbitstampETH = {
    event: "bts:subscribe",
    data: { channel: "order_book_ethusdt" },
  };

  const apiCallFtx = {
    op: "subscribe",
    channel: "ticker",
    market: "BTC-PERP",
  };
  const apiCallFtxETH = {
    op: "subscribe",
    channel: "ticker",
    market: "ETH-PERP",
  };

  //ส่งการ apicall นี้ไปยังเซิร์ฟเวอร์เมื่อเปิด =>

  useEffect(() => {

    //Bitkup
    bitkubUsdt.onmessage = (event) => {
      try {
        const json = JSON.parse(event.data);
        setBidsbitkupUsdt(json.rat);
      } catch (err) {}
    };
    bitkubEth.onmessage = (event) => {
      console.log(event.data);
      try {
        const json = JSON.parse(event.data);

        setBidsbitkupETH(json.rat);
      } catch (err) {}
    };
    bitkub.onmessage = (event) => {
      try {
        const json = JSON.parse(event.data);
        setBidsbitkup(json.rat);
      } catch (err) {}
    };

    //Binance
    binance.onmessage = (event) => {
      try {
        const json = JSON.parse(event.data);
        setBidsBinance(json.p);
      } catch (err) {}
    };
    binanceEth.onmessage = (event) => {
      try {
        const json = JSON.parse(event.data);
        setBidsBinanceETH(json.p);
      } catch (err) {}
    };

    //Bitstamp
    bitstamp.onopen = (event) => {
      bitstamp.send(JSON.stringify(apiCallbitstamp));
    };

    bitstamp.onmessage = function (event) {
      const json = JSON.parse(event.data);
      try {
        if ((json.event = "data")) {
          setBidsbitstamp(json.data.bids.slice(0, 1));
        }
      } catch (err) {}
    };

    bitstampEth.onopen = (event) => {
      bitstampEth.send(JSON.stringify(apiCallbitstampETH));
    };

    bitstampEth.onmessage = function (event) {
      const json = JSON.parse(event.data);
      try {
        if ((json.event = "data")) {
          setBidsstampETH(json.data.bids.slice(0, 1));
        }
      } catch (err) {}
    };

    //Ftx
    ftx.onopen = (event) => {
      ftx.send(JSON.stringify(apiCallFtx));
    };

    ftx.onmessage = function (event) {
      const json = JSON.parse(event.data);
      try {
        setBidsftx(json.data.bid);
      } catch (err) {}
    };

    ftxEth.onopen = (event) => {
      ftxEth.send(JSON.stringify(apiCallFtxETH));
    };

    ftxEth.onmessage = function (event) {
      const json = JSON.parse(event.data);
      try {
        setBidsftxETH(json.data.bid);
      } catch (err) {}
    };

    //SatangPro
    satangpro.onmessage = (event) => {
      try {
        const json = JSON.parse(event.data);
        setBidsSatangPro(json.p);
      } catch (err) {}
    };
    satangproEth.onmessage = (event) => {
      try {
        const json = JSON.parse(event.data);
        setBidsSatangProETH(json.p);
      } catch (err) {}
    };
  }, []);

  // รับข้อมูลมา

  const firstBids = bidsbitstamp.map((item) => {
    return (
      <div>
        <p> {Math.floor(item[0] * bidsBitkupUsdt).toLocaleString()}</p>
      </div>
    );
  });
  const firstBidsUSDT = bidsbitstamp.map((item) => {
    return (
      <div>
        <p> {Math.floor(item[0]).toLocaleString()}</p>
      </div>
    );
  });

  const firstBidETH = bitstampETH.map((item) => {
    return (
      <div>
        <p> {Math.floor(item[0] * bidsBitkupUsdt).toLocaleString()}</p>
      </div>
    );
  });
  const firstBidETHUSDT = bitstampETH.map((item) => {
    return (
      <div>
        <p> {Math.floor(item[0]).toLocaleString()}</p>
      </div>
    );
  });

  return (
    <div>
      <div className="text-center text-3xl m-10 text-zinc-700">
        Exchange Compare Cryptocurrency Prices
      </div>

      {/* THB */}
      <div class="flex flex-col mx-10 ">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8 ">
            <div class="overflow-hidden">
              <table class="min-w-full border text-center ">
                <thead class="border-b bg-gradient-to-r from-violet-500 to-fuchsia-500 text-gray-100 text-xl justify-items-center">
                  <tr>
                    <th scope="col" class="font-medium px-6 py-4 border-r ">
                      <p>Name</p>
                    </th>
                    <th scope="col" class="font-medium  px-6 py-4 border-r">
                      <p>Bitkup</p>
                    </th>
                    <th scope="col" class="font-medium  px-6 py-4 border-r">
                      <p>Binance</p>
                    </th>
                    <th scope="col" class="font-medium px-6 py-4 border-r">
                      <p>Bitstamp</p>
                    </th>
                    <th scope="col" class="font-medium  px-6 py-4 border-r">
                      <p>Ftx</p>
                    </th>
                    <th scope="col" class="font-medium  px-6 py-4 ">
                      <p>SatangPro</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b bg-violet-50 text-lg text-gray-900 ">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium border-r justify-center grid">
                      <p className="text-lg">BTC-THB</p>
                      <p className="w-12 pt-2 ml-3">
                        <Image src={btc} className="rounded-xl " />
                      </p>
                    </td>
                    <td class="font-light px-6 py-4 whitespace-nowrap border-r">
                      {Math.floor(bidsBitkup).toLocaleString()}
                    </td>
                    <td class="font-light px-6 py-4 whitespace-nowrap border-r">
                      {Math.floor(
                        bidsBinance * bidsBitkupUsdt
                      ).toLocaleString()}
                    </td>
                    <td class="font-light px-6 py-4 whitespace-nowrap border-r">
                      {firstBids}
                    </td>
                    <td class="font-light px-6 py-4 whitespace-nowrap border-r">
                      {(bidsftx * bidsBitkupUsdt).toLocaleString()}
                    </td>
                    <td class="font-light px-6 py-4 whitespace-nowrap">
                      {Math.floor(bidsSatangPro).toLocaleString()}
                    </td>
                  </tr>

                  <tr class="border-b bg-indigo-50 text-lg text-gray-900 ">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium border-r justify-center grid">
                      <p className="text-lg">ETH-THB</p>
                      <p className="w-12 pt-2 ml-3">
                        <Image src={eth} className="rounded-xl " />
                      </p>
                    </td>
                    <td class="font-light px-6 py-4 whitespace-nowrap border-r">
                      {Math.floor(bidsBitkupETH).toLocaleString()}
                    </td>
                    <td class="font-light px-6 py-4 whitespace-nowrap border-r">
                      {Math.floor(
                        bidsBinanceETH * bidsBitkupUsdt
                      ).toLocaleString()}
                    </td>
                    <td class="tfont-light px-6 py-4 whitespace-nowrap border-r text-neutral-700">
                      {firstBidETH}
                    </td>
                    <td class="font-light px-6 py-4 whitespace-nowrap border-r">
                      {(bidsftxETH * bidsBitkupUsdt).toLocaleString()}
                    </td>
                    <td class="font-light px-6 py-4 whitespace-nowrap">
                      {Math.floor(bidsSatangProETH).toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* USDT */}
      <div class="flex flex-col mx-10 mt-4">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8 ">
            <div class="overflow-hidden">
              <table class="min-w-full border text-center ">
                <thead class="border-b bg-gradient-to-r from-violet-500 to-fuchsia-500 text-gray-100 text-xl justify-items-center">
                  <tr>
                    <th scope="col" class="font-medium px-6 py-4 border-r ">
                      <p>Name</p>
                    </th>
                    <th scope="col" class="font-medium  px-6 py-4 border-r">
                      <p>Bitkup</p>
                    </th>
                    <th scope="col" class="font-medium  px-6 py-4 border-r">
                      <p>Binance</p>
                    </th>
                    <th scope="col" class="font-medium px-6 py-4 border-r">
                      <p>Bitstamp</p>
                    </th>
                    <th scope="col" class="font-medium  px-6 py-4 border-r">
                      <p>Ftx</p>
                    </th>
                    <th scope="col" class="font-medium  px-6 py-4 ">
                      <p>SatangPro</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b bg-violet-50 text-lg text-gray-900 ">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium border-r justify-center grid">
                      <p className="text-lg">BTC-USDT</p>
                      <p className="w-12 pt-2 ml-3">
                        <Image src={btc} className="rounded-xl " />
                      </p>
                    </td>
                    <td class="font-light px-6 py-4 whitespace-nowrap border-r">
                      {Math.floor(bidsBitkup / bidsBitkupUsdt).toLocaleString()}
                    </td>
                    <td class="font-light px-6 py-4 whitespace-nowrap border-r">
                      {Math.floor(bidsBinance).toLocaleString()}
                    </td>
                    <td class="font-light px-6 py-4 whitespace-nowrap border-r">
                      {firstBidsUSDT}
                    </td>
                    <td class="font-light px-6 py-4 whitespace-nowrap border-r">
                      {bidsftx.toLocaleString()}
                    </td>
                    <td class="font-light px-6 py-4 whitespace-nowrap">
                      {Math.floor(
                        bidsSatangPro / bidsBitkupUsdt
                      ).toLocaleString()}
                    </td>
                  </tr>

                  <tr class="border-b bg-indigo-50 text-lg text-gray-900 ">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium border-r justify-center grid">
                      <p className="text-lg">ETH-USDT</p>
                      <p className="w-12 pt-2 ml-3">
                        <Image src={eth} className="rounded-xl " />
                      </p>
                    </td>
                    <td class="font-light px-6 py-4 whitespace-nowrap border-r">
                      {Math.floor(
                        bidsBitkupETH / bidsBitkupUsdt
                      ).toLocaleString()}
                    </td>
                    <td class="font-light px-6 py-4 whitespace-nowrap border-r">
                      {Math.floor(bidsBinanceETH).toLocaleString()}
                    </td>
                    <td class="tfont-light px-6 py-4 whitespace-nowrap border-r text-neutral-700">
                      {firstBidETHUSDT}
                    </td>
                    <td class="font-light px-6 py-4 whitespace-nowrap border-r">
                      {bidsftxETH.toLocaleString()}
                    </td>
                    <td class="font-light px-6 py-4 whitespace-nowrap">
                      {Math.floor(
                        bidsSatangProETH / bidsBitkupUsdt
                      ).toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
