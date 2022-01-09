import axios from "axios";
import { trendingCoins } from "../config/api";

export const fetchTrendingCoins = async (currency) => {
  const { data } = await axios.get(trendingCoins(currency));
  return data;
};
