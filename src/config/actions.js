import axios from "axios";
import {
  coinList,
  trendingCoins,
  singleCoin,
  historicalChart,
} from "../config/api";

export const fetchTrendingCoins = async (currency) => {
  const { data } = await axios.get(trendingCoins(currency));
  return data;
};

export const fetchCoinList = async (currency) => {
  const { data } = await axios.get(coinList(currency));
  return data;
};

export const fetchCoinData = async (id) => {
  const { data } = await axios.get(singleCoin(id));
  return data;
};

export const fetchHistoricData = async (id, days, currency) => {
  const { data } = await axios.get(historicalChart(id, days, currency));
  return data.prices;
};
