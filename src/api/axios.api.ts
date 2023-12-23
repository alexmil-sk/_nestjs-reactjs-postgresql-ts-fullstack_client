import axios from "axios";
import { getTokenFromLocalStorage } from "../helpers/localStorage.helper";

//Создаем новую версию axios с кастомным config.
export const instance = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: { Authorization: "Bearer " + getTokenFromLocalStorage() || "" },
});
