import render from "./render.js";
import dialog from "./dialog.js";
import fetch from "./fetch.js";
import tradingView from "./tradingView.js";
import BrowserLocalStorage from "./BrowserLocalStorage.js";
import utility from "./utility.js";

const watchlistCreateBtn = document.querySelector(
  ".stock-watchlist__create-btn"
);
const watchlistEl = document.querySelector(".stock-watchlist__list");
const historyListEl = document.querySelector(".recently-viewed__list");

let currentStock = "AAPL";
let currentList;

render.watchlistDropdown();

// This needs to be after it is rendered
const dropDownEl = document.querySelector(".stock-watchlist__dropdown");
currentList = dropDownEl.value;

const removeCurrentWatchlistElements = function () {
  const watchlistEl = document.querySelector(".stock-watchlist__list");
  while (watchlistEl.firstChild) {
    watchlistEl.removeChild(watchlistEl.firstChild);
  }
};

// Render watchlist after page loaded.
const makeAList = function (list = null) {
  const listName = list || currentList;
  removeCurrentWatchlistElements();
  render.watchlist(listName);
  addStockToWatchlist();
};

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
        BrowserLocalStorage.addStockToWatchlist({ ticker: stockTicker }, list);
      }
      document.querySelector(".confirm_dialog-background").remove();
      removeCurrentWatchlistElements();
      render.watchlist(list);
      addStockToWatchlist();
    });
  });
};

// On page load, these should execute
const onLoad = function () {
  makeAList();
  render.stockChart(currentStock);
  tradingView.add(currentStock);
  render.stockInformationFixed();
  render.stockInformationDynamic(currentStock);
  render.historyElement();
};

const addNewWatchlist = function () {
  dialog.addWatchlistModal();
  dialog.removeDialogBox();

  const btnSubmit = document.querySelector(".confirm_button--submit");
  const input = document.querySelector(".watchlist-input");
  input.focus();
  btnSubmit.addEventListener("click", function () {
    if (input.value) {
      createNewWatchlist(input.value);
      render.watchlistDropdown();
    }
    document.querySelector(".confirm_dialog-background").remove();
  });
};

watchlistCreateBtn.addEventListener("click", addNewWatchlist);

const createNewWatchlist = function (listName) {
  BrowserLocalStorage.addWatchlist(listName);
};

// If the dropdown menu ever changed, the list should follow
dropDownEl.addEventListener("change", function (e) {
  let list = e.target.value;
  currentList = list;
  // Remove stock elements from the list
  removeCurrentWatchlistElements();
  render.watchlist(list);
  addStockToWatchlist();
});

// Listen to main search button
const searchSubmitBtn = document.querySelector(".search-bar__submit");
searchSubmitBtn.addEventListener("click", function () {
  const searchInputEl = document.querySelector(".search-bar__input");
  const inputValue = searchInputEl.value.toUpperCase();
  searchInputEl.value = "";
  if (!inputValue) return;
  currentStock = inputValue;
  viewStockInfo(currentStock);
});

// Listen to add to a watchlist from main
const addToWatchlistFromMainBtn = document.querySelector(
  ".add-to-list__submit"
);
addToWatchlistFromMainBtn.addEventListener("click", function () {
  dialog.addStockToWatchlistFromMainModal(currentStock);
  dialog.removeDialogBox();

  const btnSubmit = document.querySelector(".confirm_button--submit");

  // const input = document.querySelector(".watchlist-input");
  // input.focus();
  btnSubmit.addEventListener("click", function () {
    const popupDropDownEl = document.querySelector(
      ".popup-watchlist__dropdown"
    );
    const list = popupDropDownEl.value;
    BrowserLocalStorage.addStockToWatchlist({ ticker: currentStock }, list);
    makeAList(list);
    document.querySelector(".confirm_dialog-background").remove();
  });
});

const makingHistoryData = async function (stockTicker) {
  const data = await fetch.stockQuoteTwelveData({ ticker: stockTicker });
  const viewedPrice = data.close;
  const viewedDate = utility.getCurrentDate();

  BrowserLocalStorage.addHistory(stockTicker, viewedDate, viewedPrice);
};

watchlistEl.addEventListener("click", function (e) {
  if (e.target.closest(".stock")) {
    if (e.target.classList.contains("stock")) {
      const targetEl = e.target;
      currentStock = targetEl.querySelector(
        ".stock-watchlist__ticker"
      ).textContent;
      viewStockInfo(currentStock);
    } else {
      const targetEl = e.target.parentElement;
      currentStock = targetEl.querySelector(
        ".stock-watchlist__ticker"
      ).textContent;
      viewStockInfo(currentStock);
    }
  }
});

historyListEl.addEventListener("click", function (e) {
  if (e.target.closest(".stock")) {
    if (e.target.classList.contains("stock")) {
      const targetEl = e.target;
      currentStock = targetEl.querySelector(
        ".stock-watchlist--stock-ticker"
      ).textContent;
      viewStockInfo(currentStock);
    } else {
      const targetEl = e.target.parentElement;
      currentStock = targetEl.querySelector(
        ".stock-watchlist--stock-ticker"
      ).textContent;
      viewStockInfo(currentStock);
    }
  }
});

const viewStockInfo = function (currentStock) {
  makingHistoryData(currentStock);
  render.historyElement();
  render.stockChart(currentStock);
  render.stockInformationFixed();
  render.stockInformationDynamic(currentStock);
};

export default {
  onLoad,
};
