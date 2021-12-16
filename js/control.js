import Stock from "./Stock.js";
import render from "./render.js";
import dialog from "./dialog.js";
import WatchList from "./Watchlist.js";
import WatchListStock from "./WatchlistStock.js";
import tradingView from "./tradingView.js";
import BrowserLocalStorage from "./BrowserLocalStorage.js";

const watchlistCreateBtn = document.querySelector(
  ".stock-watchlist__create-btn"
);
const watchlistEl = document.querySelector(".stock-watchlist__list");

const addNewWatchlist = function () {
  dialog.addWatchlistModal();
  dialog.removeDialogBox();

  const btnSubmit = document.querySelector(".confirm_button--submit");
  const input = document.querySelector(".watchlist-input");
  input.focus();
  btnSubmit.addEventListener("click", function () {
    if (input.value) {
      console.log(input.value);
      createNewWatchlist(input.value);
    }
    document.querySelector(".confirm_dialog-background").remove();
  });
};

const removeCurrentWatchlistElements = function () {
  const watchlistEl = document.querySelector(".stock-watchlist__list");
  while (watchlistEl.firstChild) {
    watchlistEl.removeChild(watchlistEl.firstChild);
  }
};

watchlistCreateBtn.addEventListener("click", addNewWatchlist);

const createNewWatchlist = function (listName) {
  BrowserLocalStorage.addWatchlist(listName);
};

// Render watchlist after page loaded
const makeFirstList = function () {
  const listName = dropDownEl.value;
  removeCurrentWatchlistElements();
  render.watchlist(listName);
};

render.watchlistDropdown();

// This needs to be after it is rendered
const dropDownEl = document.querySelector(".stock-watchlist__dropdown");

const onLoad = function () {
  let currentStock = "NVDA";
  render.stockChart(currentStock);
  tradingView.add(currentStock);
};

onLoad();

dropDownEl.addEventListener("change", function (e) {
  let list = e.target.value;
  console.log(list);

  // Remove stock elements from the list
  removeCurrentWatchlistElements();
  render.watchlist(list);
});

// Add stock to watchlist
const addStockToWatchlist = function () {
  const addStockBtn = document.querySelector(".add-stock-to-list-btn");

  addStockBtn.addEventListener("click", function () {
    dialog.addStockToWatchlistModal();
    dialog.removeDialogBox();
    const list = dropDownEl.value;
    const btnSubmit = document.querySelector(".confirm_button--submit");
    const input = document.querySelector(".stock-input");
    input.focus();
    btnSubmit.addEventListener("click", function () {
      const stockTicker = input.value.toUpperCase();
      if (stockTicker) {
        console.log("input value is " + stockTicker);
        console.log("list is " + list);

        BrowserLocalStorage.addStockToWatchlist({ ticker: stockTicker }, list);
      }
      document.querySelector(".confirm_dialog-background").remove();
      removeCurrentWatchlistElements();
      render.watchlist(list);
    });
  });
};
addStockToWatchlist();
