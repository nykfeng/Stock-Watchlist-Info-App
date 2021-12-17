const alphaAvantageApiKey = "&apikey=WUJ9OTC4D6VO5XPG"; // Free API keys, very limited number of calls per minute
const twelveDataApiKey = "&apikey=8db7ea1de8034d9e96307414b66d5346"; // Free API keys, very limited number of calls per minute
const twelveDataUrl = "https://api.twelvedata.com/quote?symbol=";

const stockInfoAlphaVantage = async function (stock) {
  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock.ticker}${alphaAvantageApiKey}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data["Global Quote"];
  } catch (err) {
    console.log(`${err} while fetching ${stock.ticker}`);
  }
};

const stockQuoteTwelveData = async function (stock) {
  const url = `${twelveDataUrl}${stock.ticker}${twelveDataApiKey}`;
  try {
    const res = await axios.get(url);
    console.log(res.data);
    return res.data;
  } catch (e) {
    console.log("Error!", e);
  }
};

const otherInfoAlphaVantage = async function (stock) {
  const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stock.ticker}${alphaAvantageApiKey}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(`${err} while fetching ${stock.ticker}`);
  }
};

export default {
  stockInfoAlphaVantage,
  stockQuoteTwelveData,
  otherInfoAlphaVantage,
};
