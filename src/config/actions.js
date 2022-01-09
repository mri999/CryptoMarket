import axios from "axios";
import { coinList, trendingCoins } from "../config/api";

export const fetchTrendingCoins = async (currency) => {
  const { data } = await axios.get(trendingCoins(currency));
  return data;
};

export const fetchCoinList = async (currency) => {
  const { data } = await axios.get(coinList(currency));
  return data;
};
