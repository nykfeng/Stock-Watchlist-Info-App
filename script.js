import Stock from "./js/Stock.js";
import fetch from "./js/fetch.js";

const apple = new Stock("AAPL");

console.log(apple);
console.log(3);

console.log(apple.ticker);

const stockData = await fetch.stockInfoAlphaVantage({ ticker: "IBM" });

console.log(stockData);

// console.log(JSON.parse(JSON.stringify(stockData)));
