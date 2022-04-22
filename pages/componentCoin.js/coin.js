import Box from "./box";

export default function App() {
  const result = ["BinanceBTC", "BinanceETH", "BinanceSOL"];
  const result1 = ["BitkupBTC", "BitkupETH", "BitkupSOL"];

//   const dataCoin = {
//     BitkupBTC: BitkupBTC,
//     BitkupETH: BitkupETH,
//     BitkupSOL:BitkupSOL,
    
//     BinanceBTC: BinanceBTC,
//     BinanceETH: BinanceETH,
//     BinanceSOL:BinanceSOL,
   
//   };

  return (
    <div className="App">
      <table class="min-w-full border text-center ">
        <thead class="border-b bg-gradient-to-r from-violet-500 to-fuchsia-500 text-gray-100 text-xl justify-items-center">
          <tr>
            <th scope="col" class="font-medium  px-6 py-4 border-r">
              <p>Bitkup</p>
            </th>
            <th scope="col" class="font-medium  px-6 py-4 border-r">
              <p>Binance</p>
            </th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
      {result.map((value) => {
        return <Box name={value} />;
      })}
      {result1.map((value1) => {
        return <Box name1={value1} />;
      })}
    </div>
  );
}
