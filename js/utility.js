function formatNumber(number) {
  //   console.log(`number is ${number}`);
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function cleanNumberFormat(numberString) {
  return numberString.substring(1, numberString.length).replace(/[,]+/g, "");
}

const calculateVolumeUnit = function (volume) {
  const vol =
    parseInt(volume) >= 1000000000000
      ? (parseInt(volume) / 1000000000000).toFixed(2) + "T"
      : parseInt(volume) >= 1000000000
      ? (parseInt(volume) / 1000000000).toFixed(2) + "B"
      : (parseInt(volume) / 1000000).toFixed(2) + "M";
  return vol;
};

const formatStockCardCompanyName = function (name) {
  if (name.length > 24) name = name.substring(0, 23) + "...";
  if (name.includes(" -")) return name.substring(0, name.indexOf("-"));
  return name;
};

const formatStockExchangeName = function (name) {
  if (name.toUpperCase().includes("NEW YORK STOCK EXCHANGE")) return "NYSE";
  else if (name.length > 10) return "";
  else return name;
};

const removeColorBox = function (boxElement) {
  boxElement.classList.remove("red-price-box");
  boxElement.classList.remove("green-price-box");
};

export default {
  formatNumber,
  cleanNumberFormat,
  formatStockCardCompanyName,
  calculateVolumeUnit,

  formatStockExchangeName,
  removeColorBox,
};
