import BrowserLocalStorage from "./BrowserLocalStorage.js";

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
  addStockBtn.classList.add("add-stock-to-list-btn");
  const watchlistEl = document.querySelector(".stock-watchlist__list");
  watchlistEl.append(addStockBtn);

  const stocksOnList = BrowserLocalStorage.getAllStocksFromWatchlist(list.name);
};

export default {
  watchlistDropdown,
};
