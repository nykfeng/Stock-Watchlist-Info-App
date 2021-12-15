import Stock from "./Stock.js";
import render from "./render.js";
import dialog from "./dialog.js";
import WatchList from "./Watchlist.js";
import WatchListStock from "./WatchlistStock.js";
import BrowserLocalStorage from "./BrowserLocalStorage.js";

const watchlistCreateBtn = document.querySelector(
  ".stock-watchlist__create-btn"
);

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

watchlistCreateBtn.addEventListener("click", addNewWatchlist);

const createNewWatchlist = function (listName) {
  BrowserLocalStorage.addWatchlist(listName);
};

render.watchlistDropdown();
