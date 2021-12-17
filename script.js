import control from "./js/control.js";
import BrowserLocalStorage from "./js/BrowserLocalStorage.js";
import Watchlist from "./js/Watchlist.js";

const localWatchlists = [];
const init = function () {
  BrowserLocalStorage.addWatchlist("Local Watchlist");
  BrowserLocalStorage.getAllWatchlists().forEach((list) => {
    const listOfStocks = BrowserLocalStorage.getAllStocksFromWatchlist(list);
    localWatchlists.push(new Watchlist(list, listOfStocks));
  });
  control.onLoad();
};

init();
