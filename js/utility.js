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

const getCurrentDate = function () {
  const date = new Date();
  return `${(date.getMonth() + 1).toString().padStart(2, "0")}-${date
    .getDate()
    .toString()
    .padStart(2, "0")}-${date.getFullYear()}`;
};

export default {
  formatNumber,
  cleanNumberFormat,
  getCurrentDate,
  calculateVolumeUnit,
};
