import Stock from "./js/Stock.js";
import fetch from "./js/fetch.js";
import Watchlist from "./js/Watchlist.js";
import BrowserLocalStorage from "./js/BrowserLocalStorage.js";
import WatchListStock from "./js/WatchlistStock.js";
// import control from "./js/control.js";
// import render from "./js/render.js";
import dialog from "./js/dialog.js";

// const stockData = await fetch.stockInfoAlphaVantage({ ticker: "IBM" });

// console.log(stockData);

// console.log(JSON.parse(JSON.stringify(stockData)));

BrowserLocalStorage.addWatchlist("Big Tech Companies");
BrowserLocalStorage.addWatchlist("Staple Value S&P");
BrowserLocalStorage.addWatchlist("High growth");
BrowserLocalStorage.addWatchlist("Fintech growth");

BrowserLocalStorage.addStockToWatchlist(
  { ticker: "AAPL" },
  "Big Tech Companies"
);
BrowserLocalStorage.addStockToWatchlist(
  { ticker: "AAPL" },
  "Big Tech Companies"
);
BrowserLocalStorage.addStockToWatchlist(
  { ticker: "AMZN" },
  "Big Tech Companies"
);
BrowserLocalStorage.addStockToWatchlist(
  { ticker: "NVDA" },
  "Big Tech Companies"
);
BrowserLocalStorage.addStockToWatchlist(
  { ticker: "GOOG" },
  "Big Tech Companies"
);

BrowserLocalStorage.deleteStockFromWatchlist(
  { ticker: "AAPL" },
  "Big Tech Companies"
);

const localWatchlists = [];

const AAPL = new Stock("AAPL", 170, 1.5, 5562323);
const NVDA = new Stock("NVDA", 309, 2.05, 125641613);
const watchlistStocks = new WatchListStock(AAPL);
watchlistStocks.add(NVDA);

console.log(watchlistStocks);

const init = function () {
  BrowserLocalStorage.getAllWatchlists().forEach((list) => {
    localWatchlists.push(new Watchlist(list, watchlistStocks.stockList));
  });
};

init();

console.log(localWatchlists);
