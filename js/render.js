import BrowserLocalStorage from "./BrowserLocalStorage.js";
import fetch from "./fetch.js";
import utility from "./utility.js";
import tradingView from "./tradingView.js";

const watchlistDropdown = function () {
  //First check if there is already a list, if so delete it
  const stockDropDownEl = document.querySelector(
    ".stock-watchlist__list-selector"
  );
  stockDropDownEl?.remove();

  // Not we starting rendering the dropdown list from local storage
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

// const stockOnList = async function (stock) {
//   const data = await fetch.stockInfoAlphaVantage(stock);
//   const plusMinus = parseFloat(data["09. change"]);
//   const html = `
//   <div class="list-item ${plusMinus < 0 ? "red-box-label" : "green-box-label"}">
//     <span class="stock-watchlist__ticker">${data["01. symbol"]}</span>
//     <span class="stock-watchlist__price ${
//       plusMinus < 0 ? "red-text" : "green-text"
//     }">${parseFloat(data["05. price"]).toFixed(2)}</span>
//     <span class="stock-watchlist__changePercent ${
//       plusMinus < 0 ? "red-text" : "green-text"
//     }">${parseFloat(data["10. change percent"]).toFixed(2)}%</span>
//     <span class="stock-watchlist__volume">${utility.calculateVolumeUnit(
//       parseInt(data["06. volume"])
//     )}</span>
//   </div>
//   `;
//   return html;
// };

const stockOnList = async function (stock) {
  const data = await fetch.stockQuoteTwelveData(stock);
  const plusMinus = parseFloat(data.percent_change);
  const html = `
  <div class="list-item stock ${
    plusMinus < 0 ? "red-box-label" : "green-box-label"
  }">
    <span class="stock-watchlist__ticker">${stock.ticker}</span>
    <span class="stock-watchlist__price ${
      plusMinus < 0 ? "red-text" : "green-text"
    }">${parseFloat(data.close).toFixed(2) || "loading..."}</span>
    <span class="stock-watchlist__changePercent ${
      plusMinus < 0 ? "red-text" : "green-text"
    }">${parseFloat(data.percent_change).toFixed(2) || "loading..."}%</span>
    <span class="stock-watchlist__volume">${
      utility.calculateVolumeUnit(parseInt(data.volume)) || "loading..."
    }</span>
  </div>
  `;
  return html;
};

const stockChart = function (stockTicker) {
  const html = `
    <div id="tradingview_${stockTicker}"></div>
    `;
  const stockChartEl = document.querySelector(".stock-chart");
  while (stockChartEl.firstChild) {
    stockChartEl.removeChild(stockChartEl.firstChild);
  }

  stockChartEl.insertAdjacentHTML("afterbegin", html);
  tradingView.add(stockTicker);
};

const stockInformationFixed = function () {
  const html = `
    <div class="key-info shadow-box ">
        <div class="company-name">Company Name: loading...</div>
        <div class="sector highlight-box"></div>
    </div>
    <div class="mini-info shadow-box ">
        <div class="country">Country: loading...</div>
        <div class="exchange">Exchange: loading...</div>
        <div class="industry">Industry: loading...</div>
    </div>
    <div class="price-metrics shadow-box">
        <div class="analyst-target-price">Analyst Target Price: loading...</div>
        <div class="eps">Eearnings Per Share: loading...</div>
        <div class="profit-margin">Profit Margin: loading...</div>
    </div>
    <div class="PE shadow-box ">
        <div class="trailingPE">PE (Trailing): loading...</div>
        <div class="forwardPE">PE (Forward): loading...</div>
    </div>
    <div class="52Wk shadow-box ">
        <div class="s52WeekHigh">52 Week High: loading...</div>
        <div class="s52WeekLow">52 Week Low: loading...</div>
    </div>
    <div class="description shadow-box">loading...</div>
    `;
  const stockInfoSecEl = document.querySelector(".stock-information");
  while (stockInfoSecEl.firstChild) {
    stockInfoSecEl.removeChild(stockInfoSecEl.firstChild);
  }

  stockInfoSecEl.insertAdjacentHTML("beforeend", html);
};

const stockInformationDynamic = async function (stockTicker) {
  const data = await fetch.otherInfoAlphaVantage({ ticker: stockTicker });
  const companyName = document.querySelector(".company-name");
  const sector = document.querySelector(".sector");
  const country = document.querySelector(".country");
  const exchange = document.querySelector(".exchange");
  const industry = document.querySelector(".industry");
  const analystTargetPrice = document.querySelector(".analyst-target-price");
  const eps = document.querySelector(".eps");
  const profitMargin = document.querySelector(".profit-margin");
  const trailingPE = document.querySelector(".trailingPE");
  const forwardPE = document.querySelector(".forwardPE");
  const s52WeekHigh = document.querySelector(".s52WeekHigh");
  const s52WeekLow = document.querySelector(".s52WeekLow");
  const description = document.querySelector(".description");

  companyName.textContent = `Company Name: ${data.Name}`;
  sector.textContent = `${data.Sector}`;
  country.textContent = `Country: ${data.Country}`;
  exchange.textContent = `Exchange: ${data.Exchange}`;
  industry.textContent = `Industry: ${data.Industry.substring(0, 30)}`;
  analystTargetPrice.textContent = `Analyst Target Price: ${data.AnalystTargetPrice}`;
  eps.textContent = `Eearnings Per Share: ${data.EPS}`;
  profitMargin.textContent = `Profit Margin: ${data.ProfitMargin}`;
  trailingPE.textContent = `PE (Trailing): ${data.TrailingPE}`;
  forwardPE.textContent = `PE (Forward): ${data.ForwardPE}`;
  s52WeekHigh.textContent = `52 Week High: ${data["52WeekHigh"]}`;
  s52WeekLow.textContent = `52 Week Low: ${data["52WeekLow"]}`;
  description.textContent = `${data.Description}`;
};

const historyElement = async function () {
  const historyEl = document.querySelector(".recently-viewed__list");
  while (historyEl.firstChild) {
    historyEl.removeChild(historyEl.firstChild);
  }
  const historyList = BrowserLocalStorage.getStocksFromHistory();

  historyList.map(async (stock) => {
    const data = await fetch.stockQuoteTwelveData(stock);
    const plusMinus = data.close - stock.lastViewedPrice;
    const changePercent = (plusMinus / stock.lastViewedPrice) * 100;
    const html = `
    <div class="list-item stock history-list-item">
    <span class="stock-watchlist--stock-ticker">${stock.ticker}</span>
    <span class="stock-watchlist--change-since ${
      plusMinus >= 0 ? "green-text" : "red-text"
    }">${plusMinus > 0 ? "&#8593;" : "&#8595;"} ${changePercent.toFixed(
      2
    )}%</span>
    <span class="stock-watchlist--viewed-date"> Since ${
      stock.lastViewedDate
    }</span>
  </div>
    `;
    historyEl.insertAdjacentHTML("beforeend", html);
  });
};

export default {
  watchlistDropdown,
  watchlist,
  stockChart,
  stockInformationFixed,
  stockInformationDynamic,
  historyElement,
};
