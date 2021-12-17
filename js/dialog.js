import BrowserLocalStorage from "./BrowserLocalStorage.js";

const addWatchlistModal = function () {
  const html = `
    <div class="confirm_dialog-background">
        <div class="confirm_dialog-box">
          <div class="confirm_dialog-title">
            <span>Create a watchlist</span>
          </div>
          <div class="confirm_dialog-message">
            <label>Give your new watchlist a name</label>
            <input class="watchlist-input" type="text">
          </div>
          <div class="confirm_dialog_btn-box">
            <button class="confirm_button--submit">Submit</button>
            <button class="confirm_button--cancel">Cancel</button>
          </div>
        </div>
      </div>
      `;
  document.querySelector("body").insertAdjacentHTML("beforeend", html);
};

// To remove the dialog box and its background
const removeDialogBox = function () {
  document.querySelector("body").addEventListener("click", function (e) {
    if (
      e.target.classList.contains("confirm_dialog-background") ||
      e.target.classList.contains("confirm_button--cancel")
    ) {
      if (document.querySelector(".confirm_dialog-background"))
        document.querySelector(".confirm_dialog-background").remove();
    }
  });
};

const addStockToWatchlistModal = function () {
  const html = `
      <div class="confirm_dialog-background">
          <div class="confirm_dialog-box">
            <div class="confirm_dialog-title">
              <span>Add a stock to the list</span>
            </div>
            <div class="confirm_dialog-message">
              <label>Which stock would you like to add?</label>
              <input class="stock-input" type="text">
            </div>
            <div class="confirm_dialog_btn-box">
              <button class="confirm_button--submit">Submit</button>
              <button class="confirm_button--cancel">Cancel</button>
            </div>
          </div>
        </div>
        `;
  document.querySelector("body").insertAdjacentHTML("beforeend", html);
};

const addStockToWatchlistFromMainModal = function (stockTicker) {
  const existingLists = BrowserLocalStorage.getAllWatchlists();
  let listHtml = "";

  existingLists.forEach((list) => {
    listHtml += `<option value="${list}">${list}</option>`;
  });

  const html = `
      <div class="confirm_dialog-background">
          <div class="confirm_dialog-box">
            <div class="confirm_dialog-title">
              <span>Add ${stockTicker} to which watchlist?</span>
            </div>
            <div class="confirm_dialog-message">

            <select class="stock-watchlist__dropdown popup-watchlist__dropdown">
            ${listHtml}
            </select>
            </div>
            <div class="confirm_dialog_btn-box">
              <button class="confirm_button--submit">Submit</button>
              <button class="confirm_button--cancel">Cancel</button>
            </div>
          </div>
        </div>
        `;
  document.querySelector("body").insertAdjacentHTML("beforeend", html);
};

export default {
  addWatchlistModal,
  removeDialogBox,
  addStockToWatchlistModal,
  addStockToWatchlistFromMainModal,
};
