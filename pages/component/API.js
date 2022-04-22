import React, { useState, useEffect } from "react";
import { w3cwebsocket as WebSocket } from "websocket";
import Coin from "./Coin";
import TableCoin from "../componentCoin.js/TableCoin"
import GraphCoin from "./graphCoin";

// const bitstampETHa =
// const ftxa =

function App() {
  //give an initial state so that the data won't be undefined at start
  const [bidsftx, setBidsftx] = useState([0]);
  const [bidsbitstamp, setBidsbitstamp] = useState([0]);
  const [bidsBitkup, setBidsbitkup] = useState([0]);
  const [bidsBitkupUsdt, setBidsbitkupUsdt] = useState([0]);
  const [bidsBinance, setBidsBinance] = useState([0]);
  const [bidsSatangPro, setBidsSatangPro] = useState([0]);

  const bitstamp = new WebSocket("wss://ws.bitstamp.net");
  const bitstampEth = new WebSocket("wss://ws.bitstamp.net");
  const ftx = new WebSocket("wss://ftx.com/ws/");
  const ftxEth = new WebSocket("wss://ftx.com/ws/");
  const ftxSol = new WebSocket("wss://ftx.com/ws/");
  
  const [bidsftxETH, setBidsftxETH] = useState([0]);
  const [bidsftxSOL, setBidsftxSOL] = useState([0]);
  const [bitstampETH, setBidsstampETH] = useState([0]);
  const [bidsBitkupETH, setBidsbitkupETH] = useState([0]);
  const [bidsBinanceETH, setBidsBinanceETH] = useState([0]);
  const [bidsSatangProETH, setBidsSatangProETH] = useState([0]);

  const [bidsBinanceSOL, setBidsBinanceSOL] = useState([0]);
  const [bidsBitkubSOL, setbidsBitkubSOL] = useState([0]);

  const binanceSOL = new WebSocket(
    "wss://stream.binance.com:9443/ws/solusdt@trade"
  );
  const bitkubSOL = new WebSocket(
    "wss://api.bitkub.com/websocket-api/market.trade.thb_sol"
  );


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
  const apiCallFtxSOL = {
    op: "subscribe",
    channel: "ticker",
    market: "SOL-PERP",
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

    ftxSol.onopen = (event) => {
      ftxSol.send(JSON.stringify(apiCallFtxSOL));
    };

    ftxSol.onmessage = function (event) {
      const json = JSON.parse(event.data);
      try {
        setBidsftxSOL(json.data.bid);
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

    //SOL
    binanceSOL.onmessage = (event) => {
      try {
        const json = JSON.parse(event.data);
        setBidsBinanceSOL(json.p);
      } catch (err) {}
    };
    bitkubSOL.onmessage = (event) => {
      try {
        const json = JSON.parse(event.data);
        setbidsBitkubSOL(json.rat);
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

  const BitkupBTC = Math.floor(bidsBitkup).toLocaleString();
  const BitkupETH = Math.floor(bidsBitkupETH).toLocaleString();

  const BinanceBTC = Math.floor(bidsBinance * bidsBitkupUsdt).toLocaleString();
  const BinanceETH = Math.floor(
    bidsBinanceETH * bidsBitkupUsdt
  ).toLocaleString();

  const BitstampBTC = Math.floor(firstBids).toLocaleString();
  const BitstampETH = Math.floor(firstBidETH).toLocaleString();

  const FtxBTC = Math.floor(bidsftx * bidsBitkupUsdt).toLocaleString();
  const FtxETH = Math.floor(bidsftxETH * bidsBitkupUsdt).toLocaleString();
  const FtxSOL = Math.floor(bidsftxSOL * bidsBitkupUsdt).toLocaleString();

  const SatangProBTC = Math.floor(bidsSatangPro).toLocaleString();
  const SatangProETH = Math.floor(bidsSatangProETH).toLocaleString();

  const BinanceSOL = Math.floor(bidsBinanceSOL * bidsBitkupUsdt).toLocaleString();
  const BitkupSOL = Math.floor(bidsBitkubSOL).toLocaleString();

  const dataCoin = {
    BitkupBTC: BitkupBTC,
    BitkupETH: BitkupETH,
    BinanceBTC: BinanceBTC,
    BinanceETH: BinanceETH,
    BitstampBTC: BitstampBTC,
    BitstampETH: BitstampETH,
    FtxBTC: FtxBTC,
    FtxETH: FtxETH,
    FtxSOL: FtxSOL,
    SatangProBTC: SatangProBTC,
    SatangProETH: SatangProETH,
    BinanceSOL:BinanceSOL,
    BitkupSOL:BitkupSOL
  };

  return (
    <div>
      <TableCoin dataCoin={dataCoin} />
      {/* <Coin dataCoin={dataCoin} /> */}
      {/* <GraphCoin dataCoin={Bitkup} /> */}
    </div>
  );
}

export default App;
