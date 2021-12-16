import BrowserLocalStorage from "./BrowserLocalStorage.js";
import fetch from "./fetch.js";
import utility from "./utility.js";

const watchlistDropdown = function () {
  const existingLists = BrowserLocalStorage.getAllWatchlists();
  const watchlistHeaderEl = document.querySelector(".stock-watchlist__header");
  const dropDownDiv = document.createElement("div");
  const dropDownList = document.createElement("select");
  dropDownDiv.classList.add("stock-watchlist__list-selector");
  dropDownList.classList.add("stock-watchlist__dropdown");
  dropDownDiv.append(dropDownList);

  existingLists.forEach((list) => {
    const html = `<option value="${list}">${list}</option>`;
    dropDownList.insertAdjacentHTML("beforeend", html);
  });
  watchlistHeaderEl.insertAdjacentElement("afterend", dropDownDiv);

  //   watchlist();
};

const watchlist = function (list) {
  const addStockBtn = document.createElement("button");
  addStockBtn.classList.add("list-item");
  addStockBtn.classList.add("add-stock-to-list-btn");
  addStockBtn.textContent = "+";
  const watchlistEl = document.querySelector(".stock-watchlist__list");
  watchlistEl.append(addStockBtn);

  const stocksOnList = BrowserLocalStorage.getAllStocksFromWatchlist(list);

  stocksOnList.map(async (stock) => {
    const html = await stockOnList(stock);
    watchlistEl.insertAdjacentHTML("afterbegin", html);
  });
};

const stockOnList = async function (stock) {
  const data = await fetch.stockInfoAlphaVantage(stock);
  const plusMinus = parseFloat(data["09. change"]);
  const html = `
  <div class="list-item ${plusMinus < 0 ? "red-box-label" : "green-box-label"}">
    <span class="stock-watchlist__ticker">${data["01. symbol"]}</span>
    <span class="stock-watchlist__price ${
      plusMinus < 0 ? "red-text" : "green-text"
    }">${parseFloat(data["05. price"]).toFixed(2)}</span>
    <span class="stock-watchlist__changePercent ${
      plusMinus < 0 ? "red-text" : "green-text"
    }">${parseFloat(data["10. change percent"]).toFixed(2)}%</span>
    <span class="stock-watchlist__volume">${utility.calculateVolumeUnit(
      parseInt(data["06. volume"])
    )}</span>
  </div>
  `;
  return html;
};

const stockChart = function (stockTicker) {
  const html = `
    <div id="tradingview_${stockTicker}"></div>
    `;
  const stockChartEl = document.querySelector(".stock-chart");
  stockChartEl.insertAdjacentHTML("afterbegin", html);
};

const stockInformation = function (stockTicker) {};

export default {
  watchlistDropdown,
  watchlist,
  stockChart,
};
